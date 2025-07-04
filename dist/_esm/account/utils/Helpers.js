export const isDebugging = () => {
    try {
        return (process?.env?.SDK_DEBUG === "true" ||
            process?.env?.REACT_APP_SDK_DEBUG === "true" ||
            process?.env?.NEXT_PUBLIC_SDK_DEBUG === "true");
    }
    catch (e) {
        return false;
    }
};
export const isStaging = () => {
    try {
        return process?.env?.STAGING?.toString() === "true";
    }
    catch (e) {
        return false;
    }
};
export const bigIntReplacer = (_, value) => {
    if (typeof value === "bigint") {
        return `${value.toString()}n`;
    }
    return value;
};
/**
 * @internal
 * Returns a random integer between min and max
 * @param min - The minimum value (inclusive)
 * @param max - The maximum value (inclusive)
 * @returns A random integer between min and max
 */
export const getRandomInt = (min = 1, max = 10000000000000) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
/**
 * @internal
 * Returns a random bigint between min and max
 * @param min - The minimum value (inclusive)
 * @param max - The maximum value (inclusive)
 * @returns A random bigint between min and max
 */
export const getRandomBigInt = (min = 1n, max = 10000000000000n) => {
    return (BigInt(Math.floor(Math.random() * (Number(max) - Number(min) + 1))) + min);
};
//# sourceMappingURL=Helpers.js.map