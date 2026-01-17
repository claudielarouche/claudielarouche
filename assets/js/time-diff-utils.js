/**
 * Time Difference Calculator - Utility Functions
 * Pure functions for time parsing and calculations
 */

/**
 * Parses a time string in "HH:MM" format to milliseconds
 * @param {string} timeString - Time in "HH:MM" format (e.g., "14:30")
 * @returns {number|null} - Time in milliseconds, or null if invalid
 */
export function parseTime(timeString) {
    if (!timeString) return null;

    const parts = timeString.split(":");
    if (parts.length !== 2) return null;

    const hours = Number(parts[0]);
    const minutes = Number(parts[1]);

    // Validate the parsed values
    if (isNaN(hours) || isNaN(minutes)) return null;
    if (hours < 0 || hours > 23) return null;
    if (minutes < 0 || minutes > 59) return null;

    return hours * 3600000 + minutes * 60000;
}

/**
 * Calculates the time difference between start and end times
 * @param {number} startTime - Start time in milliseconds
 * @param {number} endTime - End time in milliseconds
 * @returns {number} - Time difference in milliseconds (can be negative)
 */
export function calculateTimeDifference(startTime, endTime) {
    if (startTime == null || endTime == null) {
        throw new Error("Start time and end time must be provided");
    }
    return endTime - startTime;
}

/**
 * Formats a duration in milliseconds to an object with hours and minutes
 * @param {number} milliseconds - Duration in milliseconds
 * @returns {Object} - Object with hours, minutes, and decimalHours properties
 */
export function formatTimeDuration(milliseconds) {
    const isNegative = milliseconds < 0;
    const absMilliseconds = Math.abs(milliseconds);

    const hours = Math.floor(absMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((absMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const decimalHours = milliseconds / (1000 * 60 * 60);

    return {
        hours: isNegative ? -hours : hours,
        minutes: isNegative ? -minutes : minutes,
        decimalHours: parseFloat(decimalHours.toFixed(2)),
        isNegative
    };
}

/**
 * Formats duration as a human-readable string
 * @param {number} milliseconds - Duration in milliseconds
 * @returns {string} - Formatted string like "2 hours and 30 minutes"
 */
export function formatDurationString(milliseconds) {
    const { hours, minutes, decimalHours } = formatTimeDuration(milliseconds);
    return `${hours} hours and ${minutes} minutes (${decimalHours} decimal hours)`;
}

/**
 * Calculates total time from multiple time blocks
 * @param {Array<Object>} timeBlocks - Array of {startTime: string, endTime: string}
 * @returns {Object} - Object with total milliseconds and array of block details
 */
export function calculateTotalTime(timeBlocks) {
    let totalMilliseconds = 0;
    const blockDetails = [];
    const errors = [];

    timeBlocks.forEach((block, index) => {
        const startTime = parseTime(block.startTime);
        const endTime = parseTime(block.endTime);

        if (startTime === null) {
            errors.push({
                blockIndex: index,
                error: "Invalid start time format",
                value: block.startTime
            });
            return;
        }

        if (endTime === null) {
            errors.push({
                blockIndex: index,
                error: "Invalid end time format",
                value: block.endTime
            });
            return;
        }

        const timeDiff = calculateTimeDifference(startTime, endTime);
        totalMilliseconds += timeDiff;

        const formatted = formatTimeDuration(timeDiff);

        blockDetails.push({
            blockIndex: index,
            startTime: block.startTime,
            endTime: block.endTime,
            duration: timeDiff,
            formatted: formatted,
            isNegative: timeDiff < 0
        });
    });

    return {
        totalMilliseconds,
        totalFormatted: formatTimeDuration(totalMilliseconds),
        blocks: blockDetails,
        errors: errors,
        hasErrors: errors.length > 0,
        hasNegativeBlocks: blockDetails.some(b => b.isNegative)
    };
}

/**
 * Validates if a time string is in valid HH:MM format
 * @param {string} timeString - Time string to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export function isValidTimeFormat(timeString) {
    if (!timeString || typeof timeString !== 'string') return false;

    const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
    return timeRegex.test(timeString);
}

/**
 * Converts milliseconds to different time units
 * @param {number} milliseconds - Time in milliseconds
 * @returns {Object} - Object with conversions to various units
 */
export function convertMilliseconds(milliseconds) {
    return {
        milliseconds: milliseconds,
        seconds: milliseconds / 1000,
        minutes: milliseconds / (1000 * 60),
        hours: milliseconds / (1000 * 60 * 60),
        days: milliseconds / (1000 * 60 * 60 * 24)
    };
}
