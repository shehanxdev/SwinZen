// Note: This use to make masked mail with the first and last letter and the mail domain
export function getMaskedMail(email: string, mask?: string) {
  mask = mask || '*';
  return email.replace(/^(.)(.*)(.@.*)$/, function (_, a, b, c) {
    return a + b.replace(/./g, mask) + c;
  });
}
