# Copilot Instructions for Bucket List Tracker

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a React application built with Vite for AWS Amplify deployment. The application serves as a bucket list tracker with the following features:

## Project Architecture
- **Frontend**: React 18 with Vite
- **Backend**: AWS Amplify (Authentication, Data, Storage)
- **Database**: DynamoDB (via Amplify Data)
- **Authentication**: Cognito (via Amplify Auth)
- **File Storage**: S3 (via Amplify Storage)
- **Deployment**: AWS Amplify Hosting

## Key Components
- User authentication and authorization
- Bucket list item management (CRUD operations)
- File upload for bucket list item images
- Responsive design for mobile and desktop
- Real-time data synchronization

## Development Guidelines
- Use React functional components with hooks
- Follow AWS Amplify best practices
- Implement proper error handling and loading states
- Use modern JavaScript/ES6+ features
- Maintain clean, readable code structure
- Include comprehensive documentation

## AWS Services Integration
- Use Amplify CLI for backend setup
- Configure proper IAM roles and permissions
- Implement GraphQL for data operations
- Use Amplify UI components when possible
- Follow AWS security best practices
