# 🚀 AWS Free Tier Deployment Guide for Bucket List Tracker

## Prerequisites

### 1. AWS Account Setup (Free Tier)
1. **Create AWS Account**: Go to [aws.amazon.com](https://aws.amazon.com) and create a free account
2. **Verify Email**: Check your email and verify your account
3. **Add Payment Method**: Add a credit card (required even for free tier, but you won't be charged if you stay within limits)

### 2. Install Required Tools

```powershell
# Install Node.js 18+ (if not already installed)
# Download from: https://nodejs.org/

# Install Amplify CLI globally
npm install -g @aws-amplify/cli

# Verify installation
amplify --version
```

## 🎯 Step-by-Step Deployment

### Step 1: Configure AWS Amplify CLI

```powershell
# Configure Amplify with your AWS credentials
amplify configure
```

This will:
1. Open AWS console in your browser
2. Ask you to create an IAM user
3. Provide you with Access Key ID and Secret Access Key
4. Configure your local Amplify CLI

**Follow these IAM user creation steps:**
1. Choose region: `us-east-1` (recommended for free tier)
2. Create IAM user with `AdministratorAccess-Amplify` policy
3. Download credentials CSV file
4. Enter credentials in CLI

### Step 2: Initialize Amplify Project

```powershell
# Navigate to your project directory
cd "e:\Cloud_Projects"

# Initialize Amplify backend
amplify init
```

**Configuration options:**
- Project name: `bucketlisttracker`
- Environment name: `dev`
- Default editor: `Visual Studio Code`
- App type: `javascript`
- Framework: `react`
- Source directory: `src`
- Build directory: `dist`
- Build command: `npm run build`
- Start command: `npm run dev`
- AWS Profile: `default` (the one you just created)

### Step 3: Add Authentication (Free Tier)

```powershell
# Add Cognito authentication
amplify add auth
```

**Configuration options:**
- Use default configuration: `Default configuration`
- Sign in method: `Username`
- Advanced settings: `No, I am done`

### Step 4: Add API and Database (Free Tier)

```powershell
# Add GraphQL API with DynamoDB
amplify add api
```

**Configuration options:**
- Service: `GraphQL`
- API name: `bucketlistapi`
- Authorization type: `Amazon Cognito User Pool`
- Additional auth types: `No`
- Schema template: `Single object with fields`
- Edit schema: `Yes`

Replace the schema with this:

```graphql
type BucketListItem @model @auth(rules: [{ allow: owner }]) {
  id: ID!
  title: String!
  description: String
  location: String
  priority: String
  completed: Boolean!
  imageUrl: String
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
}
```

### Step 5: Add Storage (Free Tier)

```powershell
# Add S3 storage for images
amplify add storage
```

**Configuration options:**
- Service: `Content (Images, audio, video, etc.)`
- Resource name: `bucketliststorage`
- Bucket name: (accept default)
- Access: `Auth users only`
- Auth users: `create/update, read, delete`

### Step 6: Deploy Backend to AWS

```powershell
# Deploy all resources to AWS
amplify push
```

This will:
1. Create AWS resources (Cognito, AppSync, DynamoDB, S3)
2. Generate configuration files
3. Set up the backend infrastructure

**This process takes 5-15 minutes**

### Step 7: Update Frontend Configuration

After deployment, Amplify will create `src/aws-exports.js`. Update your App.jsx:

```jsx
import { useEffect, useState } from 'react'
import { Amplify } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { generateClient } from 'aws-amplify/data'
import awsExports from './aws-exports'
import BucketListApp from './components/BucketListApp'
import '@aws-amplify/ui-react/styles.css'
import './App.css'

// Configure Amplify
Amplify.configure(awsExports)

// Create the data client
const client = generateClient()

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Router>
          <div className="app">
            <header className="app-header">
              <div className="header-content">
                <h1>🎯 My Bucket List Tracker</h1>
                <div className="user-info">
                  <span>Welcome, {user?.username || 'User'}!</span>
                  <button onClick={signOut} className="sign-out-btn">
                    Sign out
                  </button>
                </div>
              </div>
            </header>
            
            <main className="app-main">
              <Routes>
                <Route path="/" element={<BucketListApp user={user} client={client} />} />
              </Routes>
            </main>
            
            <footer className="app-footer">
              <p>&copy; 2025 Bucket List Tracker - Built with AWS Amplify</p>
            </footer>
          </div>
        </Router>
      )}
    </Authenticator>
  )
}

export default App
```

### Step 8: Deploy Frontend to Amplify Hosting

```powershell
# Add hosting
amplify add hosting
```

**Configuration options:**
- Service: `Amplify Console`
- Type: `Manual deployment`

```powershell
# Build and deploy
npm run build
amplify publish
```

## 🎯 Alternative: GitHub Integration (Recommended)

### Option 1: Deploy via GitHub (Easier)

1. **Push to GitHub:**
```powershell
git add .
git commit -m "Ready for AWS deployment"
git push origin main
```

2. **Connect to Amplify Console:**
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
   - Click "New app" → "Host web app"
   - Choose "GitHub"
   - Select your repository
   - Select branch: `main`
   - Accept default build settings
   - Click "Save and deploy"

3. **Automatic Deployment:**
   - Every git push will trigger automatic deployment
   - Build logs available in Amplify Console
   - Live URL provided after deployment

## 💰 Free Tier Limits (Stay Within These)

### AWS Free Tier Limits:
- **Cognito**: 50,000 MAUs (Monthly Active Users)
- **DynamoDB**: 25 GB storage, 25 RCU/WCU
- **S3**: 5 GB storage, 20,000 GET requests, 2,000 PUT requests
- **AppSync**: 250,000 query/mutation operations
- **Lambda**: 1M requests, 400,000 GB-seconds compute time
- **Amplify Hosting**: 1,000 build minutes, 15 GB data transfer

### Tips to Stay Free:
- Don't exceed 50,000 users per month
- Keep images under 5 GB total
- Monitor usage in AWS billing dashboard
- Delete unused resources

## 🛠️ Testing Your Deployment

1. **Frontend URL**: Check Amplify Console for your app URL
2. **Authentication**: Test user registration and login
3. **Bucket List**: Add, edit, delete items
4. **Images**: Upload test images to S3
5. **Real-time**: Open app in multiple tabs to test sync

## 🔧 Troubleshooting

### Common Issues:

1. **Build Fails:**
```powershell
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

2. **Authentication Not Working:**
```powershell
# Check Amplify status
amplify status
# Refresh backend
amplify pull
```

3. **GraphQL Errors:**
```powershell
# Regenerate API
amplify update api
amplify push
```

## 📊 Monitoring Your Usage

1. **AWS Billing Dashboard:**
   - Go to AWS Console → Billing
   - Check "Free Tier" usage
   - Set up billing alerts

2. **Amplify Console:**
   - Monitor app performance
   - Check build history
   - View access logs

## 🎯 Post-Deployment Steps

1. **Custom Domain (Optional):**
   - Buy domain from Route 53 or external provider
   - Configure in Amplify Console
   - SSL certificate automatically provided

2. **Environment Variables:**
   - Set production environment variables in Amplify Console
   - Configure different environments (dev, staging, prod)

3. **Performance Optimization:**
   - Enable CloudFront caching
   - Optimize images
   - Monitor Core Web Vitals

## 🚀 Going Live Checklist

- [ ] Backend deployed successfully
- [ ] Frontend deployed to Amplify Hosting
- [ ] Authentication working
- [ ] Database operations working
- [ ] File uploads working
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Monitoring set up
- [ ] Free tier limits monitored

Your Bucket List Tracker is now live on AWS! 🎉

**Estimated Total Cost: $0.00** (within free tier limits)
**Deployment Time**: 30-60 minutes
**Maintenance**: Minimal (serverless architecture)
