# Deployment Troubleshooting Guide

## Common Deployment Issues and Solutions

### Issue 1: "npm error notarget No matching version found"

**Problem**: Package version doesn't exist in npm registry.

**Example Error**: `npm error notarget No matching version found for @aws-amplify/backend-cli@^1.16.1`

**Solution**: 
- Check available versions: `npm view @aws-amplify/backend-cli versions --json`
- Use the latest stable version: `@aws-amplify/backend-cli@^1.8.0`
- Verify version compatibility with other Amplify packages

### Issue 2: "npm error could not determine executable to run" with ampx command

**Problem**: The `ampx` command is not found during the Amplify build process.

**Solution**: 
- Ensure `@aws-amplify/backend-cli` is installed as a dev dependency
- Check that `package.json` includes: `"@aws-amplify/backend-cli": "^1.8.0"`
- Verify the amplify.yml file runs `npm ci` before trying to use `npx ampx`

### Issue 3: TypeScript compilation errors in backend

**Problem**: Backend TypeScript files fail to compile.

**Solution**:
- Ensure `typescript` is installed as a dev dependency
- Add proper `tsconfig.json` configuration
- Check that all backend resource files use proper imports

### Issue 4: AWS SDK version conflicts

**Problem**: Peer dependency warnings or conflicts with AWS SDK versions.

**Solution**:
- Use consistent AWS SDK versions across all packages
- Consider using `npm install --legacy-peer-deps` if needed
- Check for outdated packages with `npm outdated`

### Issue 5: Build cache issues

**Problem**: Stale cache causing build failures.

**Solution**:
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Use `--no-cache` flag in deployment if available

## Pre-deployment Checklist

1. ✅ `@aws-amplify/backend-cli@^1.8.0` is in devDependencies
2. ✅ All Amplify backend resources are properly configured
3. ✅ TypeScript configuration is present if using TS
4. ✅ amplify.yml uses correct Node.js version (20)
5. ✅ All required environment variables are set in Amplify Console

## Useful Commands

```bash
# Test ampx command locally
npx ampx --version

# Check for outdated packages
npm outdated

# Install dependencies with legacy peer deps
npm install --legacy-peer-deps

# Clean build
npm ci --cache .npm --prefer-offline
```
