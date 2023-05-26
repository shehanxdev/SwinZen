/**
 * this helper function takes a US mobile number in the international US format and convert it into domestic US format
 * @param {string} mobileNumber
 * @returns {string} formated mobile number in the format xxx-xxx-xxxx
 */

export const formatMobileNumber = (mobileNumber: string): string => {
  return mobileNumber.slice(3, 6) + '-' + mobileNumber.slice(7, 10) + '-' + mobileNumber.slice(11, 15);
};
