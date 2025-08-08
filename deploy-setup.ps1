# Bucket List Tracker - Quick AWS Deployment Script (PowerShell)
# This script helps you deploy your app to AWS Amplify (Free Tier)

Write-Host "🎯 Bucket List Tracker - AWS Deployment Setup" -ForegroundColor Cyan
Write-Host "==============================================`n" -ForegroundColor Cyan

# Check if Amplify CLI is installed
try {
    $amplifyVersion = amplify --version
    Write-Host "✅ Amplify CLI found: $amplifyVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Amplify CLI not found. Installing..." -ForegroundColor Red
    npm install -g @aws-amplify/cli
    Write-Host "✅ Amplify CLI installed" -ForegroundColor Green
}

Write-Host "`n📋 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Configure AWS credentials: amplify configure"
Write-Host "2. Initialize project: amplify init"
Write-Host "3. Add authentication: amplify add auth"
Write-Host "4. Add API: amplify add api"
Write-Host "5. Add storage: amplify add storage"
Write-Host "6. Deploy backend: amplify push"
Write-Host "7. Add hosting: amplify add hosting"
Write-Host "8. Publish app: amplify publish`n"

$choice = Read-Host "Would you like to start the configuration now? (y/n)"

if ($choice -eq "y" -or $choice -eq "Y") {
    Write-Host "`n🚀 Starting Amplify configuration..." -ForegroundColor Green
    Write-Host "This will open AWS Console in your browser"
    Write-Host "Follow the prompts to create IAM user and get credentials`n"
    
    amplify configure
    
    Write-Host "`n✅ Configuration complete!" -ForegroundColor Green
    Write-Host "Run 'amplify init' to initialize your project"
} else {
    Write-Host "`n📖 When ready, follow the DEPLOYMENT_GUIDE.md for detailed instructions" -ForegroundColor Yellow
}

Write-Host "`n🎯 Happy deploying!" -ForegroundColor Cyan

# Keep window open
Read-Host "Press Enter to exit"
