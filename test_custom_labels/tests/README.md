# Test Suites

This directory contains comprehensive test suites for custom metadata labels.

## Test Files

### `test-labels.js`

**Main comprehensive test suite** covering all scenarios.

- Tests both Vertex AI and Gemini API platforms
- Covers all label use cases and edge cases
- Generates detailed test reports
- Includes cross-platform compatibility tests

**Usage:**

```bash
npm test
# or
node tests/test-labels.js
```

### `test-vertex-ai-labels.js`

**Vertex AI specific tests** with detailed logging.

- Tests labels on model initialization
- Tests labels via invoke options
- Tests labels override behavior
- Tests edge cases (empty labels, no labels)
- Tests complex labels with special characters

**Usage:**

```bash
npm run test:vertex
# or
node tests/test-vertex-ai-labels.js
```

### `test-gemini-labels.js`

**Gemini API specific tests** with detailed logging.

- Tests labels on model initialization
- Tests labels via invoke options
- Tests labels override behavior
- Tests edge cases (empty labels, no labels)
- Tests complex labels with special characters
- Tests different Gemini models

**Usage:**

```bash
npm run test:gemini
# or
node tests/test-gemini-labels.js
```

### `test-both-platforms.js`

**Cross-platform comparison** and compatibility tests.

- Compares label usage between Vertex AI and Gemini API
- Tests platform-specific label variations
- Verifies cross-platform compatibility
- Provides detailed comparison results

**Usage:**

```bash
npm run test:both
# or
node tests/test-both-platforms.js
```

## Test Coverage

### Label Scenarios Tested

- ✅ Labels on model initialization
- ✅ Labels via invoke options
- ✅ Labels override behavior
- ✅ Empty labels object
- ✅ No labels provided
- ✅ Complex labels with special characters
- ✅ Different model variations

### Edge Cases Tested

- ✅ Authentication failures
- ✅ API quota limits
- ✅ Network errors
- ✅ Invalid credentials
- ✅ Missing environment variables

### Cross-Platform Tests

- ✅ Same labels on both platforms
- ✅ Platform-specific label variations
- ✅ Consistent behavior across platforms
- ✅ Error handling differences

## Test Results

Tests verify that custom metadata labels:

- Are properly included in API requests
- Work consistently across both platforms
- Handle edge cases correctly
- Support all label types and formats
- Provide appropriate error messages

## Requirements

- **Vertex AI**: Requires `GOOGLE_CLOUD_PROJECT` environment variable
- **Gemini API**: Requires `GOOGLE_API_KEY` environment variable
- **Both**: Proper authentication setup (see `docs/env.example`)
