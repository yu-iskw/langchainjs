# Custom Metadata Labels Test Suite

This directory contains a comprehensive test suite for custom metadata labels with both Vertex AI and Gemini API through LangChain.

## 📁 Directory Structure

```
test_custom_labels/
├── README.md                 # This file - main documentation
├── package.json              # Project dependencies and scripts
├── package-lock.json         # Locked dependencies
├── tests/                    # Comprehensive test suites
│   ├── test-labels.js        # Main comprehensive test suite
│   ├── test-vertex-ai-labels.js    # Vertex AI specific tests
│   ├── test-gemini-labels.js       # Gemini API specific tests
│   └── test-both-platforms.js      # Cross-platform comparison
└── docs/                     # Documentation and setup files
    ├── README.md             # Detailed documentation
    └── env.example           # Environment variables template
```

## 🚀 Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cp docs/env.example .env
   # Edit .env with your credentials
   ```

3. **Run tests:**

   ```bash
   # Run all tests
   npm test

   # Run specific test suites
   npm run test:vertex
   npm run test:gemini
   npm run test:both
   ```

## 📋 Test Categories

### **Test Suites** (`tests/`)

- **`test-labels.js`** - Comprehensive test suite covering all scenarios
- **`test-vertex-ai-labels.js`** - Vertex AI specific tests with detailed logging
- **`test-gemini-labels.js`** - Gemini API specific tests with detailed logging
- **`test-both-platforms.js`** - Cross-platform comparison and compatibility tests

### **Documentation** (`docs/`)

- **`README.md`** - Detailed documentation with setup instructions
- **`env.example`** - Environment variables template

## 🔧 Available Scripts

```bash
# Main test commands
npm test                    # Run comprehensive test suite
npm run test:vertex         # Run Vertex AI tests only
npm run test:gemini         # Run Gemini API tests only
npm run test:both           # Run cross-platform comparison

# Debug commands (all tests run in debug mode by default)
npm run test:vertex
npm run test:gemini
```

## 🎯 Key Features Tested

- ✅ Labels on model initialization
- ✅ Labels via invoke options
- ✅ Labels override behavior
- ✅ Edge cases (empty labels, no labels)
- ✅ Complex labels with special characters
- ✅ Cross-platform compatibility
- ✅ Error handling and authentication
- ✅ Different model variations

## 🔍 Debug Information

The debug functionality is integrated into the test files. All test scripts run in debug mode by default:

- **Run tests with debug output**: `npm run test:vertex` or `npm run test:gemini`
- **Set environment variable**: `DEBUG_LABELS=true npm run test:vertex`

Debug mode helps identify issues with:

- Label property assignment
- API call formation
- Authentication problems
- Cross-platform differences

## 📊 Test Results

Tests verify that custom metadata labels:

- Are properly included in API requests
- Work consistently across both platforms
- Handle edge cases correctly
- Support all label types and formats

## 🚨 Current Status

**Note**: The debug scripts have revealed that custom metadata labels are currently **not working correctly** in the LangChain implementation. The `labels` property is not being properly assigned to model instances, preventing labels from being included in API requests.

This test suite provides the foundation for verifying when this issue is fixed.

## 📖 Detailed Documentation

For comprehensive setup instructions, troubleshooting, and detailed examples, see:

- [`docs/README.md`](docs/README.md) - Complete documentation
- [`docs/env.example`](docs/env.example) - Environment setup template
