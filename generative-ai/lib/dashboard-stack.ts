import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from 'constructs';
import { aws_cloudwatch as cloudwatch } from 'aws-cdk-lib';

export class DashboardsStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    new cloudwatch.CfnDashboard(this, 'BedrockDashboard', {
        dashboardBody: `{
            "widgets": [
                {
                    "type": "metric",
                    "x": 0,
                    "y": 0,
                    "width": 12,
                    "height": 4,
                    "properties": {
                        "metrics": [
                            [ "AWS/Bedrock", "Invocations", "ModelId", "arn:aws:bedrock:us-east-1::foundation-model/amazon.titan-embed-text-v1", { "period": 300, "stat": "Sum", "label": "${PROP('Dim.ModelId')}" } ],
                            [ "...", "cohere.command-light-text-v14", { "period": 300, "stat": "Sum", "label": "${PROP('Dim.ModelId')}" } ],
                            [ "...", "anthropic.claude-v2", { "period": 300, "stat": "Sum", "label": "${PROP('Dim.ModelId')}" } ]
                        ],
                        "legend": {
                            "position": "right"
                        },
                        "title": "Invocation Count",
                        "region": "us-east-1",
                        "liveData": false,
                        "timezone": "UTC"
                    }
                },
                {
                    "type": "metric",
                    "x": 12,
                    "y": 0,
                    "width": 12,
                    "height": 4,
                    "properties": {
                        "metrics": [
                            [ "AWS/Bedrock", "InvocationLatency", "ModelId", "arn:aws:bedrock:us-east-1::foundation-model/amazon.titan-embed-text-v1", { "period": 300, "stat": "Average", "label": "${PROP('Dim.ModelId')}" } ],
                            [ "...", "cohere.command-light-text-v14", { "period": 300, "stat": "Average", "label": "${PROP('Dim.ModelId')}" } ],
                            [ "...", "anthropic.claude-v2", { "period": 300, "stat": "Average", "label": "${PROP('Dim.ModelId')}" } ]
                        ],
                        "legend": {
                            "position": "right"
                        },
                        "title": "Invocation latency",
                        "region": "us-east-1",
                        "liveData": false,
                        "timezone": "UTC"
                    }
                },
                {
                    "type": "metric",
                    "x": 0,
                    "y": 4,
                    "width": 12,
                    "height": 4,
                    "properties": {
                        "metrics": [
                            [ "AWS/Bedrock", "Invocations", "ModelId", "arn:aws:bedrock:us-east-1::foundation-model/amazon.titan-embed-text-v1", { "period": 60, "stat": "Average", "label": "${PROP('Dim.ModelId')}" } ],
                            [ "...", "cohere.command-light-text-v14", { "period": 60, "stat": "Average", "label": "${PROP('Dim.ModelId')}" } ],
                            [ "...", "anthropic.claude-v2", { "period": 60, "stat": "Average", "label": "${PROP('Dim.ModelId')}" } ]
                        ],
                        "legend": {
                            "position": "right"
                        },
                        "title": "Invocation Per Minute",
                        "region": "us-east-1",
                        "liveData": false,
                        "timezone": "UTC"
                    }
                },
                {
                    "type": "metric",
                    "x": 12,
                    "y": 4,
                    "width": 12,
                    "height": 4,
                    "properties": {
                        "metrics": [
                            [ "AWS/Bedrock", "InputTokenCount", "ModelId", "arn:aws:bedrock:us-east-1::foundation-model/amazon.titan-embed-text-v1", { "period": 300, "stat": "Sum", "label": "[InputTokenCount ${PROP('Dim.ModelId')}]" } ],
                            [ "...", "cohere.command-light-text-v14", { "period": 300, "stat": "Sum", "label": "[InputTokenCount ${PROP('Dim.ModelId')}]" } ],
                            [ "...", "anthropic.claude-v2", { "period": 300, "stat": "Sum", "label": "[InputTokenCount ${PROP('Dim.ModelId')}]" } ],
                            [ ".", "OutputTokenCount", ".", "arn:aws:bedrock:us-east-1::foundation-model/amazon.titan-embed-text-v1", { "period": 300, "stat": "Sum", "label": "[OutputTokenCount ${PROP('Dim.ModelId')}]" } ],
                            [ "...", "cohere.command-light-text-v14", { "period": 300, "stat": "Sum", "label": "[OutputTokenCount ${PROP('Dim.ModelId')}]" } ],
                            [ "...", "anthropic.claude-v2", { "period": 300, "stat": "Sum", "label": "[OutputTokenCount ${PROP('Dim.ModelId')}]" } ]
                        ],
                        "legend": {
                            "position": "right"
                        },
                        "title": "Token Counts by Model",
                        "region": "us-east-1",
                        "liveData": false,
                        "timezone": "UTC"
                    }
                },
                {
                    "type": "metric",
                    "x": 0,
                    "y": 8,
                    "width": 8,
                    "height": 4,
                    "properties": {
                        "metrics": [
                            [ { "expression": "SEARCH('{AWS/Bedrock} MetricName=\"InputTokenCount\"', 'Sum', 300)" } ],
                            [ { "expression": "SEARCH('{AWS/Bedrock} MetricName=\"OutputTokenCount\"', 'Sum', 300)" } ]
                        ],
                        "legend": {
                            "position": "right"
                        },
                        "title": "InputTokenCount, OutputTokenCount",
                        "region": "us-east-1",
                        "liveData": false,
                        "timezone": "UTC"
                    }
                },
                {
                    "type": "metric",
                    "x": 8,
                    "y": 8,
                    "width": 8,
                    "height": 4,
                    "properties": {
                        "metrics": [
                            [ "AWS/Bedrock", "InvocationThrottles", { "stat": "Sum", "period": 300 } ]
                        ],
                        "legend": {
                            "position": "right"
                        },
                        "title": "Invocation Throttles",
                        "region": "us-east-1",
                        "liveData": false,
                        "timezone": "UTC"
                    }
                },
                {
                    "type": "metric",
                    "x": 16,
                    "y": 8,
                    "width": 8,
                    "height": 4,
                    "properties": {
                        "metrics": [
                            [ "AWS/Bedrock", "InvocationClientErrors", { "stat": "Sum", "period": 300 } ],
                            [ ".", "InvocationServerErrors", { "stat": "Sum", "period": 300 } ]
                        ],
                        "legend": {
                            "position": "right"
                        },
                        "title": "Invocation Error Count",
                        "region": "us-east-1",
                        "liveData": false,
                        "timezone": "UTC"
                    }
                }
            ]
        }`,
        dashboardName: 'Bedrock Dashboard',
    });

    new cloudwatch.CfnDashboard(this, 'PetRecommenderApp', {
        dashboardBody: `{
            "variables": [],
            "widgets": [
                {
                    "height": 6,
                    "width": 8,
                    "y": 0,
                    "x": 0,
                    "type": "metric",
                    "properties": {
                        "metrics": [
                            [ "AWS/Bedrock", "InvocationLatency", "ModelId", "ai21.j2-mid-v1", { "region": "us-east-1", "yAxis": "right", "visible": false } ],
                            [ "...", "anthropic.claude-v2", { "region": "us-east-1", "yAxis": "left", "period": 60 } ],
                            [ "...", "stability.stable-diffusion-xl-v0", { "region": "us-east-1", "yAxis": "right", "visible": false } ],
                            [ "...", "ai21.j2-ultra-v1", { "region": "us-east-1", "visible": false } ],
                            [ "...", "amazon.titan-image-generator-v1", { "region": "us-east-1", "visible": false } ],
                            [ "...", "amazon.titan-text-express-v1", { "region": "us-east-1", "visible": false } ],
                            [ "...", "anthropic.claude-instant-v1", { "region": "us-east-1", "visible": false } ],
                            [ "...", "anthropic.claude-v1", { "region": "us-east-1", "visible": false } ],
                            [ "...", "anthropic.claude-v2:1", { "region": "us-east-1", "visible": false } ],
                            [ "...", "arn:aws:bedrock:us-east-1::foundation-model/amazon.titan-embed-text-v1", { "region": "us-east-1", "period": 60 } ],
                            [ "...", "arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-instant-v1", { "region": "us-east-1", "visible": false } ],
                            [ "...", "meta.llama2-13b-chat-v1", { "region": "us-east-1", "visible": false } ],
                            [ "...", "meta.llama2-70b-chat-v1", { "region": "us-east-1", "visible": false } ],
                            [ "...", "stability.stable-diffusion-xl-v1", { "region": "us-east-1", "visible": false } ]
                        ],
                        "view": "timeSeries",
                        "stacked": false,
                        "region": "us-east-1",
                        "period": 300,
                        "stat": "Average",
                        "yAxis": {
                            "right": {
                                "showUnits": false
                            }
                        }
                    }
                },
                {
                    "height": 6,
                    "width": 7,
                    "y": 0,
                    "x": 8,
                    "type": "metric",
                    "properties": {
                        "metrics": [
                            [ "AWS/Bedrock", "Invocations", "ModelId", "anthropic.claude-v2", { "region": "us-east-1" } ],
                            [ "...", "arn:aws:bedrock:us-east-1::foundation-model/amazon.titan-embed-text-v1", { "region": "us-east-1" } ]
                        ],
                        "view": "timeSeries",
                        "stacked": true,
                        "region": "us-east-1",
                        "period": 60,
                        "stat": "Sum",
                        "yAxis": {
                            "left": {
                                "label": "Count",
                                "showUnits": false
                            }
                        }
                    }
                },
                {
                    "height": 5,
                    "width": 12,
                    "y": 6,
                    "x": 0,
                    "type": "metric",
                    "properties": {
                        "metrics": [
                            [ "AWS/Bedrock", "InputTokenCount", { "region": "us-east-1" } ],
                            [ ".", "OutputTokenCount", { "region": "us-east-1" } ]
                        ],
                        "sparkline": false,
                        "view": "gauge",
                        "region": "us-east-1",
                        "yAxis": {
                            "left": {
                                "min": 20,
                                "max": 10000
                            }
                        },
                        "period": 60,
                        "stat": "Sum",
                        "annotations": {
                            "horizontal": [
                                {
                                    "color": "#d62728",
                                    "label": "Above forecasts",
                                    "value": 7000,
                                    "fill": "above"
                                },
                                {
                                    "color": "#2ca02c",
                                    "label": "Untitled annotation",
                                    "value": 5000,
                                    "fill": "below"
                                },
                                [
                                    {
                                        "color": "#ff7f0e",
                                        "label": "Untitled annotation",
                                        "value": 5001
                                    },
                                    {
                                        "value": 6999,
                                        "label": "Untitled annotation"
                                    }
                                ]
                            ]
                        }
                    }
                },
                {
                    "height": 5,
                    "width": 12,
                    "y": 6,
                    "x": 12,
                    "type": "log",
                    "properties": {
                        "query": "SOURCE '/test/textGeneration/Bedrock' | fields @timestamp, identity.arn, input.inputTokenCount, output.outputTokenCount\n| stats sum(input.inputTokenCount) as totalInputTokens, sum(output.outputTokenCount) as totalOutputTokens, count(*) as invocationCount by identity.arn",
                        "region": "us-east-1",
                        "stacked": false,
                        "title": "InvocationSummary by User",
                        "view": "table"
                    }
                },
                {
                    "height": 6,
                    "width": 6,
                    "y": 17,
                    "x": 0,
                    "type": "metric",
                    "properties": {
                        "metrics": [
                            [ "AWS/AOSS", "IndexingOCU", "ClientId", "731118248683", { "region": "us-east-1" } ],
                            [ ".", "SearchOCU", ".", ".", { "region": "us-east-1" } ]
                        ],
                        "view": "timeSeries",
                        "stacked": true,
                        "region": "us-east-1",
                        "legend": {
                            "position": "bottom"
                        },
                        "title": "VectorDB - IndexingOCU, SearchOCU",
                        "period": 60,
                        "stat": "Average"
                    }
                },
                {
                    "height": 6,
                    "width": 6,
                    "y": 17,
                    "x": 6,
                    "type": "metric",
                    "properties": {
                        "metrics": [
                            [ "AWS/AOSS", "IndexingOCU", "ClientId", "731118248683", { "visible": false, "region": "us-east-1" } ],
                            [ ".", "SearchOCU", ".", ".", { "visible": false, "region": "us-east-1" } ],
                            [ ".", "SearchableDocuments", "CollectionName", "bedrock-sample-rag-730", "CollectionId", "whmwiyf5sdsds41bl320", "ClientId", "731118248683", { "visible": false, "region": "us-east-1" } ],
                            [ ".", "SearchRequestRate", ".", ".", ".", ".", ".", ".", { "region": "us-east-1", "period": 60 } ],
                            [ ".", "SearchRequestErrors", ".", ".", ".", ".", ".", ".", { "visible": false, "region": "us-east-1" } ],
                            [ ".", "2xx", ".", ".", ".", ".", ".", ".", { "region": "us-east-1", "period": 60 } ]
                        ],
                        "view": "timeSeries",
                        "stacked": false,
                        "region": "us-east-1",
                        "legend": {
                            "position": "bottom"
                        },
                        "stat": "Average",
                        "period": 300,
                        "title": "VectorDB - 2xx, SearchRequestRate"
                    }
                },
                {
                    "height": 6,
                    "width": 6,
                    "y": 17,
                    "x": 18,
                    "type": "metric",
                    "properties": {
                        "metrics": [
                            [ "AWS/AOSS", "IndexingOCU", "ClientId", "731118248683", { "visible": false, "region": "us-east-1" } ],
                            [ ".", "SearchOCU", ".", ".", { "visible": false, "region": "us-east-1" } ],
                            [ ".", "SearchableDocuments", "CollectionName", "bedrock-sample-rag-730", "CollectionId", "whmwiyf5sdsds41bl320", "ClientId", "731118248683", { "visible": false, "region": "us-east-1" } ],
                            [ ".", "SearchRequestRate", ".", ".", ".", ".", ".", ".", { "visible": false, "region": "us-east-1" } ],
                            [ ".", "SearchRequestErrors", ".", ".", ".", ".", ".", ".", { "region": "us-east-1", "period": 60 } ],
                            [ ".", "2xx", ".", ".", ".", ".", ".", ".", { "visible": false, "region": "us-east-1" } ]
                        ],
                        "view": "timeSeries",
                        "stacked": false,
                        "region": "us-east-1",
                        "legend": {
                            "position": "bottom"
                        },
                        "stat": "Average",
                        "period": 300,
                        "title": "SearchRequestErrors"
                    }
                },
                {
                    "height": 6,
                    "width": 6,
                    "y": 17,
                    "x": 12,
                    "type": "metric",
                    "properties": {
                        "metrics": [
                            [ "AWS/AOSS", "IndexingOCU", "ClientId", "731118248683", { "visible": false, "region": "us-east-1" } ],
                            [ ".", "SearchOCU", ".", ".", { "visible": false, "region": "us-east-1" } ],
                            [ ".", "SearchRequestLatency", "CollectionName", "bedrock-sample-rag-730", "CollectionId", "whmwiyf5sdsds41bl320", "ClientId", "731118248683", { "region": "us-east-1" } ],
                            [ ".", "IngestionRequestLatency", ".", ".", ".", ".", ".", ".", { "region": "us-east-1" } ]
                        ],
                        "view": "timeSeries",
                        "stacked": false,
                        "region": "us-east-1",
                        "legend": {
                            "position": "bottom"
                        },
                        "stat": "Average",
                        "period": 300,
                        "title": "RetreivalLatency"
                    }
                },
                {
                    "height": 6,
                    "width": 8,
                    "y": 11,
                    "x": 16,
                    "type": "metric",
                    "properties": {
                        "metrics": [
                            [ "AWS/Lambda", "Invocations", "FunctionName", "PetRecommender" ],
                            [ ".", "Errors", ".", "." ],
                            [ ".", "Throttles", ".", "." ]
                        ],
                        "view": "timeSeries",
                        "stacked": true,
                        "region": "us-east-1",
                        "title": "PromptRecommender-Lambda Performance",
                        "period": 60,
                        "stat": "Sum"
                    }
                },
                {
                    "height": 6,
                    "width": 8,
                    "y": 11,
                    "x": 0,
                    "type": "metric",
                    "properties": {
                        "metrics": [
                            [ "AWS/Lambda", "Invocations", "FunctionName", "promptAugmenter", { "visible": false, "region": "us-east-1" } ],
                            [ ".", "Throttles", ".", ".", { "visible": false, "region": "us-east-1" } ],
                            [ ".", "Errors", ".", ".", { "visible": false, "region": "us-east-1" } ],
                            [ "AWS/ApiGateway", "Count", "ApiName", "promptAugmenter-API", { "region": "us-east-1", "period": 60, "stat": "Sum" } ],
                            [ ".", "5XXError", ".", ".", { "region": "us-east-1", "period": 60, "stat": "Sum" } ],
                            [ ".", "4XXError", ".", ".", { "region": "us-east-1", "period": 60, "stat": "Sum" } ]
                        ],
                        "view": "timeSeries",
                        "stacked": false,
                        "region": "us-east-1",
                        "title": "PetRecommenderAPI - Performance",
                        "stat": "Average",
                        "period": 300
                    }
                },
                {
                    "height": 6,
                    "width": 8,
                    "y": 11,
                    "x": 8,
                    "type": "metric",
                    "properties": {
                        "metrics": [
                            [ "AWS/Lambda", "Invocations", "FunctionName", "promptAugmenter", { "visible": false, "region": "us-east-1" } ],
                            [ ".", "Throttles", ".", ".", { "visible": false, "region": "us-east-1" } ],
                            [ ".", "Errors", ".", ".", { "visible": false, "region": "us-east-1" } ],
                            [ "AWS/ApiGateway", "Latency", "ApiName", "promptAugmenter-API" ]
                        ],
                        "view": "timeSeries",
                        "stacked": false,
                        "region": "us-east-1",
                        "title": "PetRecommenderAPI - Latency",
                        "stat": "Average",
                        "period": 300
                    }
                },
                {
                    "height": 6,
                    "width": 9,
                    "y": 0,
                    "x": 15,
                    "type": "metric",
                    "properties": {
                        "metrics": [
                            [ "AWS/Bedrock", "OutputTokenCount", "ModelId", "meta.llama2-13b-chat-v1", { "region": "us-east-1", "visible": false } ],
                            [ "AWS/Bedrock", "OutputTokenCount", "ModelId", "anthropic.claude-v2", { "region": "us-east-1" } ],
                            [ "AWS/Bedrock", "InputTokenCount", "ModelId", "meta.llama2-13b-chat-v1", { "region": "us-east-1", "visible": false } ],
                            [ "AWS/Bedrock", "InputTokenCount", "ModelId", "anthropic.claude-v2", { "region": "us-east-1" } ],
                            [ "AWS/Bedrock", "InputTokenCount", "ModelId", "arn:aws:bedrock:us-east-1::foundation-model/amazon.titan-embed-text-v1", { "region": "us-east-1", "visible": false } ]
                        ],
                        "view": "timeSeries",
                        "stacked": true,
                        "region": "us-east-1",
                        "title": "Token usage",
                        "period": 300,
                        "stat": "Average"
                    }
                }
            ]
        }`,
        dashboardName: 'PetRecommender App Dashboard',
    });

    new cloudwatch.CfnDashboard(this, 'PetRecommenderRelevance', {
        dashboardBody: `{
            "widgets": [
                {
                    "height": 6,
                    "width": 8,
                    "y": 0,
                    "x": 16,
                    "type": "metric",
                    "properties": {
                        "period": 60,
                        "region": "us-east-1",
                        "stacked": false,
                        "timezone": "UTC",
                        "title": "TopCustomers-InvalidQueries - ",
                        "view": "timeSeries",
                        "legend": {
                            "position": "bottom"
                        },
                        "insightRule": {
                            "maxContributorCount": 10,
                            "orderBy": "Sum",
                            "ruleName": "TopCustomers-InvalidQueries"
                        }
                    }
                },
                {
                    "height": 6,
                    "width": 16,
                    "y": 6,
                    "x": 0,
                    "type": "log",
                    "properties": {
                        "query": "SOURCE '/aws/lambda/PetRecommender' | fields @timestamp, customer_id, user_input\n| filter ispresent(user_input)\n| sort @timestamp desc\n| limit 5",
                        "region": "us-east-1",
                        "title": "InvalidUserInput",
                        "view": "table"
                    }
                },
                {
                    "height": 6,
                    "width": 8,
                    "y": 0,
                    "x": 8,
                    "type": "metric",
                    "properties": {
                        "metrics": [
                            [ "BedRock-ContextRetrieval", "InvalidUserQuery", "service", "PetRecommender" ]
                        ],
                        "sparkline": true,
                        "view": "timeSeries",
                        "stacked": true,
                        "region": "us-east-1",
                        "legend": {
                            "position": "bottom"
                        },
                        "stat": "Average",
                        "period": 60,
                        "title": "InvalidUserQuery",
                        "setPeriodToTimeRange": true
                    }
                },
                {
                    "height": 6,
                    "width": 8,
                    "y": 0,
                    "x": 0,
                    "type": "metric",
                    "properties": {
                        "metrics": [
                            [ "KapoorGenAISolutions", "MaxPetScore", "service", "promptAugmenter", { "visible": false, "region": "us-east-1" } ],
                            [ "BedRock-ContextRetrieval", "ContextSimilarityScore_max", "service", "PetRecommender" ]
                        ],
                        "view": "timeSeries",
                        "stacked": false,
                        "region": "us-east-1",
                        "stat": "Average",
                        "period": 60,
                        "yAxis": {
                            "left": {
                                "label": "Score",
                                "showUnits": false,
                                "min": 0
                            }
                        },
                        "title": "ContextSimilarityScore_max",
                        "annotations": {
                            "horizontal": [
                                {
                                    "label": "Min acceptable score",
                                    "value": 0.004
                                }
                            ]
                        }
                    }
                },
                {
                    "height": 6,
                    "width": 8,
                    "y": 6,
                    "x": 16,
                    "type": "metric",
                    "properties": {
                        "metrics": [
                            [ "AWS/Logs", "LogEventsWithFindings", "DataProtectionOperation", "Audit", "PolicyName", "ACCOUNT_DATA_PROTECTION_POLICY", "LogGroupName", "/test/textGeneration/Bedrock", { "region": "us-east-1" } ]
                        ],
                        "view": "timeSeries",
                        "stacked": false,
                        "region": "us-east-1",
                        "title": "SensitiveDataDetected",
                        "period": 60,
                        "stat": "Sum",
                        "setPeriodToTimeRange": true,
                        "sparkline": false,
                        "trend": false
                    }
                }
            ]
        }`,
        dashboardName: 'PetRecommender Relevance Dashboard',
    });
    }
}
