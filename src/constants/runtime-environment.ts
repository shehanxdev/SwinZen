// we declare jest as unknown in order to avoid type errors
declare const jest: unknown;

/**
 * `true` if app is running on jest testing environment
 */
export const IS_JEST_RUNTIME = typeof jest !== 'undefined';
