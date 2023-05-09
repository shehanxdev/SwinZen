/**
 * Returns a masked version of an email address, replacing the characters between
 * the first character and the character before "@" symbol with a mask character (defaults to "*").
 *
 * @param {string} email - The email address to mask.
 * @param {string=} mask - The character to use as the mask (default "*").
 * @returns {string} The masked email address.
 */
export function getMaskedMail(email: string, mask?: string) {
  mask = mask || '*';
  return email.replace(/^(.)(.*)(.@.*)$/, function (_, a, b, c) {
    return a + b.replace(/./g, mask) + c;
  });
}
