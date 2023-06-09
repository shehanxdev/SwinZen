/**
 * Returns a masked version of an email address, replacing the characters between
 * the first character and the character before "@" symbol with a mask character (defaults to "*").
 *
 * @param {string} email - The email address to mask.
 * @param {string} mask - The character to use as the mask (default "*").
 * @returns {string} The masked email address.
 */
export function getMaskedMail(email: string, mask: string = '*') {
  const pattern = /^(.)(.*)(.@.*)$/;
  return email.replace(pattern, function (_, a, b, c) {
    return a + b.replace(/./g, mask) + c;
  });
}

/**
 * Returns a string with required size of digits with leading zeros
 * In default this function will return two decimal number as a string.
 *
 * @param {number} number - The pad needed number.
 * @param {number} size - The length of the number.
 * @returns {string} The pad added number as a string.
 */
export const addPadToNumber = (number: number, size: number = 2): string => {
  let num = number.toString();
  if (num.length < size) {
    num = '0'.repeat(size - num.length) + num;
  }
  return num;
};

/**
 * Converts a given seconds to minutes and seconds format => (00:00)
 *
 * @param {number} seconds - amount of seconds that needs to be converted
 * @returns {string} formatted time
 */
export const convertToMinutesAndSeconds = (seconds: number) => {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  let formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  let formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
  return formattedMinutes + ':' + formattedSeconds;
};
