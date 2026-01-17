/**
 * Comprehensive tests for time-diff-utils.js
 * Tests all time calculation and parsing functions
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';
import {
    parseTime,
    calculateTimeDifference,
    formatTimeDuration,
    formatDurationString,
    calculateTotalTime,
    isValidTimeFormat,
    convertMilliseconds
} from '../assets/js/time-diff-utils.js';

describe('parseTime', () => {
    test('should parse valid time string correctly', () => {
        assert.strictEqual(parseTime('14:30'), 14 * 3600000 + 30 * 60000);
        assert.strictEqual(parseTime('00:00'), 0);
        assert.strictEqual(parseTime('23:59'), 23 * 3600000 + 59 * 60000);
    });

    test('should handle midnight (00:00)', () => {
        assert.strictEqual(parseTime('00:00'), 0);
    });

    test('should handle single digit hours and minutes', () => {
        assert.strictEqual(parseTime('0:0'), 0);
        assert.strictEqual(parseTime('9:5'), 9 * 3600000 + 5 * 60000);
    });

    test('should handle edge case of 23:59', () => {
        assert.strictEqual(parseTime('23:59'), 23 * 3600000 + 59 * 60000);
    });

    test('should return null for empty string', () => {
        assert.strictEqual(parseTime(''), null);
    });

    test('should return null for null input', () => {
        assert.strictEqual(parseTime(null), null);
    });

    test('should return null for undefined input', () => {
        assert.strictEqual(parseTime(undefined), null);
    });

    test('should return null for invalid format (no colon)', () => {
        assert.strictEqual(parseTime('1430'), null);
    });

    test('should return null for invalid format (too many colons)', () => {
        assert.strictEqual(parseTime('14:30:00'), null);
    });

    test('should return null for non-numeric hours', () => {
        assert.strictEqual(parseTime('abc:30'), null);
    });

    test('should return null for non-numeric minutes', () => {
        assert.strictEqual(parseTime('14:abc'), null);
    });

    test('should return null for hours > 23', () => {
        assert.strictEqual(parseTime('24:00'), null);
        assert.strictEqual(parseTime('25:30'), null);
    });

    test('should return null for negative hours', () => {
        assert.strictEqual(parseTime('-1:30'), null);
    });

    test('should return null for minutes > 59', () => {
        assert.strictEqual(parseTime('14:60'), null);
        assert.strictEqual(parseTime('14:99'), null);
    });

    test('should return null for negative minutes', () => {
        assert.strictEqual(parseTime('14:-5'), null);
    });
});

describe('calculateTimeDifference', () => {
    test('should calculate positive time difference', () => {
        const start = 9 * 3600000; // 9:00
        const end = 17 * 3600000; // 17:00
        assert.strictEqual(calculateTimeDifference(start, end), 8 * 3600000);
    });

    test('should calculate time difference with minutes', () => {
        const start = 9 * 3600000 + 30 * 60000; // 9:30
        const end = 17 * 3600000 + 45 * 60000; // 17:45
        const expected = 8 * 3600000 + 15 * 60000; // 8 hours 15 minutes
        assert.strictEqual(calculateTimeDifference(start, end), expected);
    });

    test('should calculate zero difference for same times', () => {
        const time = 12 * 3600000;
        assert.strictEqual(calculateTimeDifference(time, time), 0);
    });

    test('should calculate negative difference when end is before start', () => {
        const start = 17 * 3600000; // 17:00
        const end = 9 * 3600000; // 9:00
        assert.strictEqual(calculateTimeDifference(start, end), -8 * 3600000);
    });

    test('should throw error when start time is null', () => {
        assert.throws(
            () => calculateTimeDifference(null, 1000),
            { message: "Start time and end time must be provided" }
        );
    });

    test('should throw error when end time is null', () => {
        assert.throws(
            () => calculateTimeDifference(1000, null),
            { message: "Start time and end time must be provided" }
        );
    });

    test('should throw error when both times are null', () => {
        assert.throws(
            () => calculateTimeDifference(null, null),
            { message: "Start time and end time must be provided" }
        );
    });
});

describe('formatTimeDuration', () => {
    test('should format whole hours', () => {
        const result = formatTimeDuration(3600000); // 1 hour
        assert.strictEqual(result.hours, 1);
        assert.strictEqual(result.minutes, 0);
        assert.strictEqual(result.decimalHours, 1.00);
        assert.strictEqual(result.isNegative, false);
    });

    test('should format hours and minutes', () => {
        const duration = 2 * 3600000 + 30 * 60000; // 2:30
        const result = formatTimeDuration(duration);
        assert.strictEqual(result.hours, 2);
        assert.strictEqual(result.minutes, 30);
        assert.strictEqual(result.decimalHours, 2.50);
        assert.strictEqual(result.isNegative, false);
    });

    test('should format zero duration', () => {
        const result = formatTimeDuration(0);
        assert.strictEqual(result.hours, 0);
        assert.strictEqual(result.minutes, 0);
        assert.strictEqual(result.decimalHours, 0.00);
        assert.strictEqual(result.isNegative, false);
    });

    test('should handle negative duration', () => {
        const duration = -(2 * 3600000 + 30 * 60000); // -2:30
        const result = formatTimeDuration(duration);
        assert.strictEqual(result.hours, -2);
        assert.strictEqual(result.minutes, -30);
        assert.strictEqual(result.decimalHours, -2.50);
        assert.strictEqual(result.isNegative, true);
    });

    test('should round decimal hours to 2 decimal places', () => {
        const duration = 1 * 3600000 + 20 * 60000; // 1:20 = 1.333... hours
        const result = formatTimeDuration(duration);
        assert.strictEqual(result.decimalHours, 1.33);
    });

    test('should handle minutes only', () => {
        const duration = 45 * 60000; // 45 minutes
        const result = formatTimeDuration(duration);
        assert.strictEqual(result.hours, 0);
        assert.strictEqual(result.minutes, 45);
        assert.strictEqual(result.decimalHours, 0.75);
    });

    test('should handle large durations', () => {
        const duration = 24 * 3600000; // 24 hours
        const result = formatTimeDuration(duration);
        assert.strictEqual(result.hours, 24);
        assert.strictEqual(result.minutes, 0);
        assert.strictEqual(result.decimalHours, 24.00);
    });
});

describe('formatDurationString', () => {
    test('should format duration as readable string', () => {
        const duration = 2 * 3600000 + 30 * 60000;
        const result = formatDurationString(duration);
        assert.strictEqual(result, '2 hours and 30 minutes (2.5 decimal hours)');
    });

    test('should format zero duration', () => {
        const result = formatDurationString(0);
        assert.strictEqual(result, '0 hours and 0 minutes (0 decimal hours)');
    });

    test('should format single hour', () => {
        const result = formatDurationString(3600000);
        assert.strictEqual(result, '1 hours and 0 minutes (1 decimal hours)');
    });
});

describe('isValidTimeFormat', () => {
    test('should validate correct time formats', () => {
        assert.strictEqual(isValidTimeFormat('00:00'), true);
        assert.strictEqual(isValidTimeFormat('12:30'), true);
        assert.strictEqual(isValidTimeFormat('23:59'), true);
        assert.strictEqual(isValidTimeFormat('9:05'), true);
    });

    test('should reject invalid formats', () => {
        assert.strictEqual(isValidTimeFormat('24:00'), false);
        assert.strictEqual(isValidTimeFormat('12:60'), false);
        assert.strictEqual(isValidTimeFormat('1:1'), false); // should be 01:01 or 1:01
        assert.strictEqual(isValidTimeFormat('abc:def'), false);
        assert.strictEqual(isValidTimeFormat('12-30'), false);
        assert.strictEqual(isValidTimeFormat('12:30:00'), false);
    });

    test('should reject empty or null inputs', () => {
        assert.strictEqual(isValidTimeFormat(''), false);
        assert.strictEqual(isValidTimeFormat(null), false);
        assert.strictEqual(isValidTimeFormat(undefined), false);
    });

    test('should reject non-string inputs', () => {
        assert.strictEqual(isValidTimeFormat(123), false);
        assert.strictEqual(isValidTimeFormat({}), false);
        assert.strictEqual(isValidTimeFormat([]), false);
    });
});

describe('convertMilliseconds', () => {
    test('should convert 1 hour to all units', () => {
        const oneHour = 3600000;
        const result = convertMilliseconds(oneHour);
        assert.strictEqual(result.milliseconds, 3600000);
        assert.strictEqual(result.seconds, 3600);
        assert.strictEqual(result.minutes, 60);
        assert.strictEqual(result.hours, 1);
        assert.strictEqual(result.days, 1/24);
    });

    test('should convert 1 day to all units', () => {
        const oneDay = 24 * 3600000;
        const result = convertMilliseconds(oneDay);
        assert.strictEqual(result.milliseconds, 86400000);
        assert.strictEqual(result.seconds, 86400);
        assert.strictEqual(result.minutes, 1440);
        assert.strictEqual(result.hours, 24);
        assert.strictEqual(result.days, 1);
    });

    test('should handle zero', () => {
        const result = convertMilliseconds(0);
        assert.strictEqual(result.milliseconds, 0);
        assert.strictEqual(result.seconds, 0);
        assert.strictEqual(result.minutes, 0);
        assert.strictEqual(result.hours, 0);
        assert.strictEqual(result.days, 0);
    });

    test('should handle negative values', () => {
        const result = convertMilliseconds(-3600000);
        assert.strictEqual(result.hours, -1);
    });
});

describe('calculateTotalTime', () => {
    test('should calculate total for single time block', () => {
        const blocks = [
            { startTime: '09:00', endTime: '17:00' }
        ];
        const result = calculateTotalTime(blocks);

        assert.strictEqual(result.totalMilliseconds, 8 * 3600000);
        assert.strictEqual(result.blocks.length, 1);
        assert.strictEqual(result.blocks[0].duration, 8 * 3600000);
        assert.strictEqual(result.hasErrors, false);
        assert.strictEqual(result.hasNegativeBlocks, false);
    });

    test('should calculate total for multiple time blocks', () => {
        const blocks = [
            { startTime: '09:00', endTime: '12:00' },
            { startTime: '13:00', endTime: '17:00' }
        ];
        const result = calculateTotalTime(blocks);

        const expectedTotal = 3 * 3600000 + 4 * 3600000; // 3 + 4 hours
        assert.strictEqual(result.totalMilliseconds, expectedTotal);
        assert.strictEqual(result.blocks.length, 2);
        assert.strictEqual(result.totalFormatted.hours, 7);
        assert.strictEqual(result.totalFormatted.minutes, 0);
    });

    test('should handle time blocks with minutes', () => {
        const blocks = [
            { startTime: '09:30', endTime: '12:15' },
            { startTime: '13:00', endTime: '16:45' }
        ];
        const result = calculateTotalTime(blocks);

        // 2:45 + 3:45 = 6:30
        const expectedTotal = 6 * 3600000 + 30 * 60000;
        assert.strictEqual(result.totalMilliseconds, expectedTotal);
        assert.strictEqual(result.totalFormatted.hours, 6);
        assert.strictEqual(result.totalFormatted.minutes, 30);
    });

    test('should detect negative time blocks', () => {
        const blocks = [
            { startTime: '17:00', endTime: '09:00' } // End before start
        ];
        const result = calculateTotalTime(blocks);

        assert.strictEqual(result.hasNegativeBlocks, true);
        assert.strictEqual(result.blocks[0].isNegative, true);
        assert.strictEqual(result.totalMilliseconds < 0, true);
    });

    test('should handle mix of positive and negative blocks', () => {
        const blocks = [
            { startTime: '09:00', endTime: '17:00' }, // +8 hours
            { startTime: '14:00', endTime: '12:00' }  // -2 hours
        ];
        const result = calculateTotalTime(blocks);

        const expectedTotal = 8 * 3600000 - 2 * 3600000; // 6 hours
        assert.strictEqual(result.totalMilliseconds, expectedTotal);
        assert.strictEqual(result.hasNegativeBlocks, true);
        assert.strictEqual(result.blocks[1].isNegative, true);
    });

    test('should report errors for invalid start time', () => {
        const blocks = [
            { startTime: 'invalid', endTime: '17:00' }
        ];
        const result = calculateTotalTime(blocks);

        assert.strictEqual(result.hasErrors, true);
        assert.strictEqual(result.errors.length, 1);
        assert.strictEqual(result.errors[0].error, "Invalid start time format");
        assert.strictEqual(result.blocks.length, 0);
    });

    test('should report errors for invalid end time', () => {
        const blocks = [
            { startTime: '09:00', endTime: 'invalid' }
        ];
        const result = calculateTotalTime(blocks);

        assert.strictEqual(result.hasErrors, true);
        assert.strictEqual(result.errors.length, 1);
        assert.strictEqual(result.errors[0].error, "Invalid end time format");
    });

    test('should handle multiple errors', () => {
        const blocks = [
            { startTime: 'bad', endTime: '17:00' },
            { startTime: '09:00', endTime: 'bad' },
            { startTime: '10:00', endTime: '12:00' } // Valid
        ];
        const result = calculateTotalTime(blocks);

        assert.strictEqual(result.hasErrors, true);
        assert.strictEqual(result.errors.length, 2);
        assert.strictEqual(result.blocks.length, 1); // Only the valid one
    });

    test('should handle empty blocks array', () => {
        const result = calculateTotalTime([]);

        assert.strictEqual(result.totalMilliseconds, 0);
        assert.strictEqual(result.blocks.length, 0);
        assert.strictEqual(result.hasErrors, false);
    });

    test('should include block indices in results', () => {
        const blocks = [
            { startTime: '09:00', endTime: '10:00' },
            { startTime: '11:00', endTime: '12:00' }
        ];
        const result = calculateTotalTime(blocks);

        assert.strictEqual(result.blocks[0].blockIndex, 0);
        assert.strictEqual(result.blocks[1].blockIndex, 1);
    });

    test('should preserve original time strings in results', () => {
        const blocks = [
            { startTime: '09:30', endTime: '17:45' }
        ];
        const result = calculateTotalTime(blocks);

        assert.strictEqual(result.blocks[0].startTime, '09:30');
        assert.strictEqual(result.blocks[0].endTime, '17:45');
    });

    test('should handle midnight crossing (conceptually negative)', () => {
        const blocks = [
            { startTime: '23:00', endTime: '01:00' } // -22 hours (or +2 if crossing midnight)
        ];
        const result = calculateTotalTime(blocks);

        // Current implementation treats this as negative
        assert.strictEqual(result.hasNegativeBlocks, true);
        assert.strictEqual(result.blocks[0].duration < 0, true);
    });
});

describe('Integration tests', () => {
    test('should handle a typical workday calculation', () => {
        const blocks = [
            { startTime: '09:00', endTime: '12:00' },  // Morning: 3 hours
            { startTime: '13:00', endTime: '17:30' }   // Afternoon: 4.5 hours
        ];
        const result = calculateTotalTime(blocks);

        assert.strictEqual(result.totalFormatted.hours, 7);
        assert.strictEqual(result.totalFormatted.minutes, 30);
        assert.strictEqual(result.totalFormatted.decimalHours, 7.50);
        assert.strictEqual(result.hasErrors, false);
        assert.strictEqual(result.hasNegativeBlocks, false);
    });

    test('should handle parsing and calculating in sequence', () => {
        const start = parseTime('09:15');
        const end = parseTime('17:45');
        const diff = calculateTimeDifference(start, end);
        const formatted = formatTimeDuration(diff);

        assert.strictEqual(formatted.hours, 8);
        assert.strictEqual(formatted.minutes, 30);
        assert.strictEqual(formatted.decimalHours, 8.50);
    });

    test('should validate, parse, and calculate together', () => {
        const timeString = '14:30';

        assert.strictEqual(isValidTimeFormat(timeString), true);

        const parsed = parseTime(timeString);
        assert.strictEqual(parsed, 14 * 3600000 + 30 * 60000);

        const converted = convertMilliseconds(parsed);
        assert.strictEqual(converted.hours, 14.5);
    });
});

describe('Edge cases and boundary conditions', () => {
    test('should handle 00:00 to 00:00 (zero duration)', () => {
        const start = parseTime('00:00');
        const end = parseTime('00:00');
        const diff = calculateTimeDifference(start, end);
        assert.strictEqual(diff, 0);
    });

    test('should handle 23:59 to 23:59', () => {
        const start = parseTime('23:59');
        const end = parseTime('23:59');
        const diff = calculateTimeDifference(start, end);
        assert.strictEqual(diff, 0);
    });

    test('should handle very small time differences', () => {
        const start = parseTime('12:00');
        const end = parseTime('12:01');
        const diff = calculateTimeDifference(start, end);
        assert.strictEqual(diff, 60000); // 1 minute
    });

    test('should handle maximum single-day duration', () => {
        const start = parseTime('00:00');
        const end = parseTime('23:59');
        const diff = calculateTimeDifference(start, end);
        const formatted = formatTimeDuration(diff);
        assert.strictEqual(formatted.hours, 23);
        assert.strictEqual(formatted.minutes, 59);
    });

    test('should maintain precision in calculations', () => {
        const duration = 1 * 3600000 + 33 * 60000; // 1:33 = 1.55 hours
        const formatted = formatTimeDuration(duration);
        assert.strictEqual(formatted.decimalHours, 1.55);
    });
});
