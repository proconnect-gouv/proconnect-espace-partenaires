# E2E Testing with UUV

End-to-end tests for ProConnect Espace Partenaires using UUV (User-centric Usecases Validator) framework with Playwright and BDD.

## Prerequisites

- Node.js >= 22
- npm package manager

## Installation

```bash
npm install
```

## Available Scripts

### Basic Testing

- **`npm test`** - Run all tests headlessly
- **`npm run test:open`** - Open UUV UI for interactive test development and debugging

### Debug & Development

- **`npm run test:debug`** - Run tests with browser visible and slow motion for debugging
- **`npm run test:screenshot`** - Run tests and capture screenshots only on failure
- **`npm run test:video`** - Run tests with video recording enabled

## Project Structure

```
e2e/
├── uuv/
│   ├── features/           # BDD feature files (.feature)
│   ├── playwright.config.ts # UUV Playwright configuration
│   └── reports/            # Generated test reports (ignored by git)
├── test-results/           # Test artifacts and videos (ignored by git)
└── package.json           # Dependencies and scripts
```

## Writing Tests

1. Create `.feature` files in `uuv/features/` directory
2. Use Gherkin syntax for BDD scenarios
3. UUV provides built-in step definitions for common UI interactions

## Configuration

The UUV configuration is located in `uuv/playwright.config.ts` and includes:

- Browser: Chrome/Chromium
- Base URL: http://localhost:3000
- Video recording: Configurable via `PW_VIDEO=1` environment variable
- Test directory: `features/` for BDD scenarios

## Environment Variables

- `PW_VIDEO=1` - Enable video recording for all tests
- `PW_HEADED=1` - Run tests with browser visible
- `PW_SLOW_MO=1000` - Slow down operations by specified milliseconds
- `PW_SCREENSHOT=only-on-failure` - Capture screenshots on test failure

## Reports

After running tests, view reports with:

```bash
npx playwright show-report
```

Reports are generated in:
- HTML report: `playwright-report/`
- UUV reports: `uuv/reports/`
- Test artifacts: `test-results/`