// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';

/**
 * Returns a moment object that with modificatons
 *
 * @param {string | Date} data - The data/time string or Date object.
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
