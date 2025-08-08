#!/bin/bash

# Bucket List Tracker - Quick AWS Deployment Script
# This script helps you deploy your app to AWS Amplify (Free Tier)

echo "🎯 Bucket List Tracker - AWS Deployment Setup"
echo "=============================================="
echo ""

# Check if Amplify CLI is installed
if ! command -v amplify &> /dev/null; then
    echo "❌ Amplify CLI not found. Installing..."
    npm install -g @aws-amplify/cli
    echo "✅ Amplify CLI installed"
else
    echo "✅ Amplify CLI found"
fi

echo ""
echo "📋 Next Steps:"
echo "1. Configure AWS credentials: amplify configure"
echo "2. Initialize project: amplify init"
echo "3. Add authentication: amplify add auth"
echo "4. Add API: amplify add api"
echo "5. Add storage: amplify add storage"
echo "6. Deploy backend: amplify push"
echo "7. Add hosting: amplify add hosting"
echo "8. Publish app: amplify publish"
echo ""

read -p "Would you like to start the configuration now? (y/n): " choice

if [[ $choice == "y" || $choice == "Y" ]]; then
    echo ""
    echo "🚀 Starting Amplify configuration..."
    echo "This will open AWS Console in your browser"
    echo "Follow the prompts to create IAM user and get credentials"
    echo ""
    
    amplify configure
    
    echo ""
    echo "✅ Configuration complete!"
    echo "Run 'amplify init' to initialize your project"
else
    echo ""
    echo "📖 When ready, follow the DEPLOYMENT_GUIDE.md for detailed instructions"
fi

echo ""
echo "🎯 Happy deploying!"
