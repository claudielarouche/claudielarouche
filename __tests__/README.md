# Test Suite

This directory contains comprehensive tests for the Claudie Larouche portfolio website.

## Test Coverage

### Time Diff Utils (`time-diff-utils.test.js`)

Comprehensive tests for the time calculation utilities used in the time difference calculator tool.

**Functions Tested:**
- `parseTime()` - Parses time strings in "HH:MM" format to milliseconds
- `calculateTimeDifference()` - Calculates time differences between two times
- `formatTimeDuration()` - Formats milliseconds to hours/minutes/decimal hours
- `formatDurationString()` - Creates human-readable time duration strings
- `isValidTimeFormat()` - Validates time string format
- `convertMilliseconds()` - Converts milliseconds to various time units
- `calculateTotalTime()` - Calculates totals from multiple time blocks

**Test Coverage:** 60 tests across 9 test suites

**Test Categories:**
1. **parseTime Tests (15 tests)** - Valid inputs, invalid inputs, edge cases, boundary validation
2. **calculateTimeDifference Tests (7 tests)** - Positive/negative differences, error handling
3. **formatTimeDuration Tests (7 tests)** - Various durations, negative values, precision
4. **formatDurationString Tests (3 tests)** - Human-readable formatting
5. **isValidTimeFormat Tests (4 tests)** - Format validation, input validation
6. **convertMilliseconds Tests (4 tests)** - Unit conversions
7. **calculateTotalTime Tests (12 tests)** - Multiple blocks, error handling, edge cases
8. **Integration Tests (3 tests)** - End-to-end workflows
9. **Edge Cases Tests (5 tests)** - Boundary conditions, precision

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run specific test file
```bash
node --test __tests__/time-diff-utils.test.js
```

## Testing Framework

This project uses **Node.js built-in test runner** (available in Node.js v18+), which provides:
- Zero dependencies (built into Node.js)
- Native ES modules support
- TAP output format
- Excellent performance
- Watch mode support

## Writing New Tests

Tests use the Node.js `test` and `describe` functions from `node:test` module:

```javascript
import { test, describe } from 'node:test';
import assert from 'node:assert';

describe('My Function', () => {
    test('should do something', () => {
        assert.strictEqual(myFunction(), expectedValue);
    });
});
```

## Test Results

Latest test run: **60/60 tests passing** ✅

All tests include:
- Valid input cases
- Invalid input cases
- Edge cases
- Boundary conditions
- Error handling
- Integration scenarios
- Negative value handling
- Precision validation
