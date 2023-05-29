import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

// dayjs updateLocale plagin to manupulate calendar date
dayjs.extend(updateLocale);

// dayjs plagin for relative time calculation
dayjs.extend(relativeTime);

dayjs.updateLocale('en', {
  calendar: {
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    lastWeek: '[Last Week]',
  },
});

export { dayjs as szdayjs };
