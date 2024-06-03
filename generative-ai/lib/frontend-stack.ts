import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { DockerImageAsset } from 'aws-cdk-lib/aws-ecr-assets';
import { KubectlV29Layer } from '@aws-cdk/lambda-layer-kubectl-v29';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as eks from 'aws-cdk-lib/aws-eks';

import * as path from 'node:path';

export class FrontEndStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

      const appName = this.node.tryGetContext('appName');

      const cluster = new eks.Cluster(this, `${appName}Cluster`, {
        version: eks.KubernetesVersion.V1_29,
        defaultCapacity: 0,
        kubectlLayer:  new KubectlV29Layer(this, 'KubectlLayer'),
        outputClusterName: true,
        albController: {
            version: eks.AlbControllerVersion.V2_6_2
        },
        placeClusterHandlerInVpc: true,
      });

      const image = new DockerImageAsset(this, `${appName}DockerImage`, {
        directory: path.join(__dirname, '../services/frontend'),
        buildArgs: {
          PORT: '8080',
          ENDPOINT: this.node.tryGetContext('ApiGwtUrl')
        }
      });

      cluster.addNodegroupCapacity(`${appName}NodeGroup`, {
        instanceTypes: [new ec2.InstanceType('t3.medium')],
        minSize: cluster.node.tryGetContext('node_group_min_size'),
        desiredSize: 1,
        maxSize: cluster.node.tryGetContext('node_group_max_size'),
        diskSize: 10,
        amiType: eks.NodegroupAmiType.AL2_X86_64,
        capacityType: eks.CapacityType.SPOT
      });

      cluster.addManifest(`${appName}Deployment`, {
        apiVersion: 'apps/v1',
        kind: 'Deployment',
        metadata: {
          name: 'pet-recommender'
        },
        spec: {
          replicas: 1,
          selector: {
            matchLabels: {
              app: 'pet-recommender'
            }
          },
          template: {
            metadata: {
              labels: {
                app: 'pet-recommender'
              }
            },
            spec: {
              containers: [
                {
                  name: 'pet-recommender',
                  image: image.imageUri,
                  ports: [
                    {
                      containerPort: 8080
                    }
                  ]
                }
              ]
            }
          }
        }
      });

      cluster.addManifest( `${this.node.tryGetContext('appName')}Service`, {
              apiVersion: 'v1',
              kind: 'Service',
              metadata: {
                  name: 'pet-recommender'
              },
              spec: {
                  type: 'LoadBalancer',
                  ports: [
                      {
                          port: 80,
                          targetPort: 8080
                      }
                  ],
                  selector: {
                      app: 'pet-recommender'
                  }
              }
          });

      cluster.addManifest(`${this.node.tryGetContext('appName')}Ingress`, {
            apiVersion: 'networking.k8s.io/v1',
            kind: 'Ingress',
            metadata: {
              name: 'pet-recommender',
              annotations: {
                'kubernetes.io/ingress.class': 'alb',
                'alb.ingress.kubernetes.io/scheme': 'internet-facing',
                'alb.ingress.kubernetes.io/target-type': 'ip'
              }
            },
            spec: {
              rules: [
                {
                  http: {
                    paths: [
                      {
                        path: '/',
                        pathType: 'Prefix',
                        backend: {
                          service: {
                            name: 'pet-recommender',
                            port: {
                              number: 80
                            }
                          }
                        }
                      }
                    ]
                  }
                }
              ]
            }
        });

      const serviceAddress = new eks.KubernetesObjectValue(this, `${this.node.tryGetContext('appName')}Alb`, {
        cluster: cluster,
        objectType: 'service',
        objectName: 'pet-recommender',
        jsonPath: '.status.loadBalancer.ingress[0].hostname',
      });

      new CfnOutput(this, `${this.node.tryGetContext('appName')}LoadBalancerHostname`, {
        value: `http://${serviceAddress.value}`
      });
    }
}
