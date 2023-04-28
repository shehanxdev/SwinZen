// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';

import { NotificationDataType } from '@sz/models';

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

/**
 * Returns a section list array with title and data propertised
 * which is needed for RN SectionList to work properly
 *
 * @param {NotificationDataType[]} dataArray - The data array to manipulate.
 */

// manipulating moment calender according to the design, should config when component is rendering and testing
moment.updateLocale('en', {
  calendar: {
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    lastWeek: '[Last Week]',
  },
});

export function getSectionList(dataArray: NotificationDataType[]) {
  function getCategorisedAry() {
    // Create an object to store the sections
    const sections = {};

    // Loop through the dummyData array
    dataArray.forEach(item => {
      // Get the date string in the format 'YYYY-MM-DD'
      const date = item.time.toISOString().split('T')[0];

      // If the section does not exist in the sections object, create it
      if (!sections[date]) {
        sections[date] = [];
      }

      // Add the item to the corresponding section
      sections[date].push(item);
    });

    return sections;
  }

  function getMappedAry() {
    // Convert the sections object into an array of sections with titles
    const sectionList = Object.keys(getCategorisedAry()).map(date => ({
      title: moment(date).calendar(),
      data: getCategorisedAry()[date],
    }));

    return sectionList;
  }

  return getMappedAry();
}
