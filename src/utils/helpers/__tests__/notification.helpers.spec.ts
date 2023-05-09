import { renderHook } from '@testing-library/react-hooks';

import { NotificationDataType } from '@sz/models';

import { getSectionList } from '../notification.helpers';

describe('notification helper test cases', () => {
  describe('getSectionList function', () => {
    const getModifiedResult = (dataArray: NotificationDataType[]) => renderHook(() => getSectionList(dataArray));
    // const mockDate = new Date();
    const newDate = new Date();
    const timeZoneName = new Intl.DateTimeFormat().resolvedOptions().timeZone;
    const options = { timeZone: timeZoneName };
    const dateInTimeZone = newDate.toLocaleString('en-US', options);
    const mockDate = new Date(dateInTimeZone);

    // avoiding seconds issue, when test cases execution
    mockDate.setSeconds(0);

    it('should return a array with a object, Today as title property and dataArray as the data property', async () => {
      const dataArray = [
        {
          time: mockDate,
          message: 'test message one',
          read: false,
        },
        {
          time: mockDate,
          message: 'test message two',
          read: true,
        },
      ];
      const { result } = getModifiedResult(dataArray);

      const expectedResult = [
        {
          title: 'Today',
          data: [
            {
              time: mockDate,
              message: 'test message one',
              read: false,
            },
            {
              time: mockDate,
              message: 'test message two',
              read: true,
            },
          ],
        },
      ];
      expect(result.current).toStrictEqual(expectedResult);
    });

    it('should return a array with two objects, Today as title property and dataArray first item as the data property and Yesterday as title property and dataArray second item as the data property', async () => {
      // getting yesterday date
      const mockYesterday = new Date(mockDate);
      mockYesterday.setDate(mockYesterday.getDate() - 1);

      const dataArray = [
        {
          time: mockDate,
          message: 'test message one',
          read: false,
        },
        {
          time: mockYesterday,
          message: 'test message two',
          read: true,
        },
      ];
      const { result } = getModifiedResult(dataArray);

      const expectedResult = [
        {
          title: 'Today',
          data: [
            {
              time: mockDate,
              message: 'test message one',
              read: false,
            },
          ],
        },
        {
          title: 'Yesterday',
          data: [
            {
              time: mockYesterday,
              message: 'test message two',
              read: true,
            },
          ],
        },
      ];
      expect(result.current).toStrictEqual(expectedResult);
    });
  });
});
