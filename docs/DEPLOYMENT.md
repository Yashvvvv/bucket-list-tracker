# Deployment Guide

## AWS Amplify Deployment Steps

### Prerequisites
- AWS Account with appropriate permissions
- GitHub repository with the project code
- Node.js 18+ installed locally

### Step 1: Connect to AWS Amplify Console

1. Navigate to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "New app" → "Host web app"
3. Choose "GitHub" as the source
4. Authorize AWS Amplify to access your GitHub account
5. Select your repository and branch (usually `main`)

### Step 2: Configure Build Settings

The build configuration is already provided in `amplify.yml`:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci --cache .npm --prefer-offline
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .npm/**/*
```

### Step 3: Environment Variables

Set the following environment variables in Amplify Console:

```
NODE_ENV=production
VITE_APP_NAME=Bucket List Tracker
```

### Step 4: Deploy Backend Resources

```bash
# Install Amplify CLI globally
npm install -g @aws-amplify/cli

# Configure Amplify with your AWS credentials
amplify configure

# Initialize Amplify in your project
amplify init

# Add authentication
amplify add auth

# Add API (GraphQL)
amplify add api

# Add storage
amplify add storage

# Push all resources to AWS
amplify push
```

### Step 5: Update Frontend Configuration

After backend deployment, update `src/amplifyconfig.json` with the actual values from your AWS resources.

### Step 6: Deploy Frontend

1. Commit and push your changes to GitHub
2. Amplify will automatically trigger a new build
3. Monitor the build process in the Amplify Console

### Step 7: Custom Domain (Optional)

1. In Amplify Console, go to "Domain management"
2. Add your custom domain
3. Configure DNS settings as provided by Amplify
4. Wait for SSL certificate provisioning

## Environment-Specific Deployments

### Staging Environment
- Branch: `develop`
- URL: `https://develop.your-app-id.amplifyapp.com`
- Backend: Staging resources

### Production Environment
- Branch: `main`
- URL: `https://main.your-app-id.amplifyapp.com`
- Backend: Production resources
- Custom domain: `https://your-domain.com`

## Monitoring and Maintenance

### CloudWatch Logs
Monitor application logs in AWS CloudWatch:
- Frontend access logs
- Backend function logs
- Error tracking and alerting

### Performance Monitoring
- Use AWS X-Ray for distributed tracing
- Monitor API performance in AppSync console
- Track user metrics with CloudWatch Insights

### Cost Optimization
- Monitor AWS costs in Cost Explorer
- Set up billing alerts
- Optimize DynamoDB read/write capacity
- Use S3 lifecycle policies for old files

## Troubleshooting Common Issues

### Build Failures
1. Check Node.js version compatibility
2. Verify all dependencies are listed in package.json
3. Check for environment-specific build errors

### Authentication Issues
1. Verify Cognito configuration
2. Check redirect URLs
3. Validate user pool settings

### API Connection Problems
1. Verify AppSync endpoint configuration
2. Check IAM permissions
3. Validate GraphQL schema

## Security Checklist

- [ ] Enable MFA for AWS root account
- [ ] Use IAM roles with minimal permissions
- [ ] Enable CloudTrail logging
- [ ] Configure WAF rules if needed
- [ ] Regular security audits
- [ ] Monitor unusual access patterns

## Backup and Disaster Recovery

### Data Backup
- DynamoDB: Enable point-in-time recovery
- S3: Enable versioning and cross-region replication
- Code: Ensure GitHub backups

### Recovery Procedures
1. Infrastructure: Use Amplify CLI to recreate resources
2. Data: Restore from DynamoDB backups
3. Files: Restore from S3 versioning

## Performance Optimization

### Frontend
- Enable CloudFront CDN
- Optimize bundle size
- Implement lazy loading
- Use Progressive Web App features

### Backend
- Optimize DynamoDB queries
- Implement proper caching
- Use Lambda provisioned concurrency if needed
- Monitor and adjust timeout settings
