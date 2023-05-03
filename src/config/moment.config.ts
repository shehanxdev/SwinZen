import moment from 'moment';

moment.updateLocale('en', {
  calendar: {
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    lastWeek: '[Last Week]',
  },
});

export { moment as customMomentFn };
