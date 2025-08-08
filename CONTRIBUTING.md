# Contributing to Bucket List Tracker

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### Pull Requests

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/bucket-list-tracker.git
   cd bucket-list-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your AWS configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Code Style

We use ESLint and Prettier for code formatting. Please ensure your code follows these standards:

- Run `npm run lint` to check for linting errors
- Run `npm run format` to automatically format code
- Use meaningful variable and function names
- Add comments for complex logic
- Follow React best practices

## Commit Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation changes
- `style:` formatting changes
- `refactor:` code refactoring
- `test:` adding tests
- `chore:` maintenance tasks

Examples:
```
feat: add image upload functionality
fix: resolve authentication timeout issue
docs: update API documentation
```

## Testing

- Write unit tests for new components and functions
- Add integration tests for new features
- Ensure all tests pass before submitting PR
- Maintain or improve code coverage

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Documentation

- Update README.md for significant changes
- Document new API endpoints
- Add inline code comments for complex logic
- Update deployment documentation if needed

## Issue Reporting

### Bug Reports

A good bug report shouldn't leave others needing to chase you up for more information. Please include:

- A quick summary and/or background
- Steps to reproduce
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening)

### Feature Requests

We love feature requests! Before creating one:

- Check if the feature already exists
- Look for existing feature requests
- Provide detailed description and use cases
- Consider implementation complexity

## Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── styles/             # Global styles
├── __tests__/          # Test files
└── types/              # TypeScript definitions

amplify/
├── auth/               # Authentication configuration
├── data/               # GraphQL schema and resolvers
├── storage/            # File storage configuration
└── backend.ts          # Backend resource definition

docs/                   # Documentation
├── API.md              # API documentation
├── DEPLOYMENT.md       # Deployment guide
└── ARCHITECTURE.md     # Architecture overview
```

## AWS Resources

When working with AWS resources:

- Use infrastructure as code (Amplify CLI)
- Follow AWS security best practices
- Test in development environment first
- Document any manual configuration steps

## Code Review Process

All submissions require review. We use GitHub pull requests for this purpose:

1. Create a feature branch
2. Make your changes
3. Add tests and documentation
4. Submit pull request
5. Address review feedback
6. Merge after approval

### Review Criteria

- Code quality and style
- Test coverage
- Documentation updates
- Security considerations
- Performance impact
- Backward compatibility

## Community

- Be respectful and inclusive
- Help others learn and grow
- Share knowledge and best practices
- Provide constructive feedback

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to open an issue for any questions or concerns. We're here to help!
