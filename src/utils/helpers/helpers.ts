export function getMaskedMail(email: string) {
  // Note: This use to make masked mail with the first three letters and the mail domain
  const splittedMail = email?.split('@');
  const maskedMail =
    splittedMail && splittedMail[0].substring(0, 3) + '*'.repeat(splittedMail[0].length - 3) + '@' + splittedMail[1];
  return maskedMail;
}
