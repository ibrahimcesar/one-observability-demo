import { CfnOutput, Fn, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";

import * as path from 'node:path';

export class ApiGwtStack extends Stack {

    constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

        const appName = this.node.tryGetContext('appName');

        const fn = new lambda.Function(this, `${appName}Function`, {
            architecture: lambda.Architecture.ARM_64,
            code: lambda.Code.fromAsset(path.join(__dirname, '../services/lambda')),
            runtime: lambda.Runtime.PYTHON_3_10,
            handler: 'lambda_function.lambda_handler',
            environment: {
                "MODEL_ID": this.node.tryGetContext('modelId'),
                "KB_ID": Fn.importValue("KnowledgeBaseId")
            }
        });

        const endpoint = new apigw.LambdaRestApi(this, `${appName}LambdaRestApi`, {
            handler: fn,
            proxy: false,
        });

        new apigw.Method(this, 'POST', {
            httpMethod: 'POST',
            resource: endpoint.root
        })

        new CfnOutput(this, 'Url', {
            exportName: 'ApiGwtUrl',
            value: endpoint.url
        });
    }
}
