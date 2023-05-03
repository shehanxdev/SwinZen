import { NotificationDataType } from '@sz/models';

import { updatedMoment } from './moment';

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
 * Returns a sections array after categorising by the date
 *
 * @param {NotificationDataType[]} dataArray - The data array to manipulate.
 */
function getSectonsByDate(dataArray: NotificationDataType[]) {
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

/**
 * Returns a section list array with title and data array propertised by the categorised sections
 *
 * @param {NotificationDataType[]} dataArray - The data array to manipulate.
 */
function getMappedSectionsByCalendar(dataArray: NotificationDataType[]) {
  const sectionList = Object.keys(getSectonsByDate(dataArray)).map(date => ({
    title: updatedMoment(date).calendar(),
    data: getSectonsByDate(dataArray)[date],
  }));

  return sectionList;
}

/**
 * Returns a section list array with title and data propertised
 * which is needed for RN SectionList to work properly
 *
 * @param {NotificationDataType[]} dataArray - The data array to manipulate.
 */
export function getSectionList(dataArray: NotificationDataType[]) {
  return getMappedSectionsByCalendar(dataArray);
}
