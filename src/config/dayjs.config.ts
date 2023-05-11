import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';

// dayjs updateLocale plagin to manupulate calendar date
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  calendar: {
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    lastWeek: '[Last Week]',
  },
});

export { dayjs as szdayjs };
