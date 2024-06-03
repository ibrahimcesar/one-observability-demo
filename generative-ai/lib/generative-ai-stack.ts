import  { CfnOutput, RemovalPolicy, Stack, StackProps} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { bedrock } from '@cdklabs/generative-ai-cdk-constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3Deploy from 'aws-cdk-lib/aws-s3-deployment';

import * as path from 'node:path';

export class GenerativeAiStack extends Stack {

  constructor(scope: Construct, id: string, props?: StackProps) {
  super(scope, id, props);

    const kb = new bedrock.KnowledgeBase(this, `${this.node.tryGetContext('appName')}KnowledgeBase`, {
      embeddingsModel: bedrock.BedrockFoundationModel.TITAN_EMBED_TEXT_V1
    })

    const assetsBucket = new s3.Bucket(this, `${this.node.tryGetContext('appName')}Bucket`, {
      enforceSSL: true,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    } );

    new s3Deploy.BucketDeployment(this, `${this.node.tryGetContext('appName')}BucketDeploy`, {
      sources: [s3Deploy.Source.asset(path.join(__dirname, '../assets'))],
      destinationBucket: assetsBucket
    });

    new bedrock.S3DataSource(this, `${this.node.tryGetContext('appName')}KnowledgeBaseDatasource`, {
      bucket: assetsBucket,
      knowledgeBase: kb,
      dataSourceName: 'animals',
      chunkingStrategy: bedrock.ChunkingStrategy.FIXED_SIZE,
      maxTokens: 500,
      overlapPercentage: 20,
    })

    new CfnOutput(this, `${this.node.tryGetContext('appName')}KnowledgeBaseId`, {
      exportName: 'KnowledgeBaseId',
      value: kb.knowledgeBaseId
    });
  }
}
