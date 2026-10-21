#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { StaticSiteStack } from '../lib/static-site-stack'; // Loads your S3/CloudFront code
import { EcrStack, EcsStack } from '../lib/ecs-stack';

const app = new cdk.App();
new StaticSiteStack(app, 'MyStaticSiteStack', {
  env: { 
    account: process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.CDK_DEFAULT_REGION 
  },
});

const ecrStack = new EcrStack(app, 'EcrStack', {
  env: { account: '869093594607', region: 'us-east-1' },
});

new EcsStack(app, 'EcsStack', {
  env: { account: '869093594607', region: 'us-east-1' },
  repository: ecrStack.repository,
  certificateArn: app.node.tryGetContext('certificateArn'),
});

