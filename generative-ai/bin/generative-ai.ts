#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ApiGwtStack } from '../lib/apigwt-stack';
import { FrontEndStack } from '../lib/frontend-stack';
import { DashboardsStack } from '../lib/dashboards-stack';
import { GenerativeAiStack } from '../lib/generative-ai-stack';

const app = new cdk.App({
    context: {
        appName: 'PetRecommender',
        modelId: 'anthropic.claude-v2',
    }
});

const genAiStack = new GenerativeAiStack(app, 'GenerativeAiStack', {
    description: 'Stack for a Generative AI Model to generate a pet recommendation'
});

const api = new ApiGwtStack(app, 'ApiGwtStack', {
    description: 'Stack for a REST API Gateway to serve a pet recommendation'
});

const frontend = new FrontEndStack(app, 'FrontEndStack', {
    description: 'Stack for a Cluster on EKS to run an Python webapplication that serves a website'
});

new DashboardsStack(app, 'DashboardsStack', {
    description: 'Stack for Dashboards to monitor the PetRecommender resources'
})

api.addDependency(genAiStack);
frontend.addDependency(api);

app.synth();