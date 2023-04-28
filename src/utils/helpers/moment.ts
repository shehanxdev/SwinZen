// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';

/**
 * Returns a masked version of an email address, replacing the characters between
 * the first character and the character before "@" symbol with a mask character (defaults to "*").
 *
 * @param {string | Date} data - The email address to mask.
 */
export function customMoment(data?: string | Date) {
  // manipulating moment calender according to the design, should config when component is rendering and testing
  moment.updateLocale('en', {
    calendar: {
      lastDay: '[Yesterday]',
      sameDay: '[Today]',
      lastWeek: '[Last Week]',
    },
  });

  return moment(data);
}
