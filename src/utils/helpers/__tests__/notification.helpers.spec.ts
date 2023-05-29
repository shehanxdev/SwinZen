import { renderHook } from '@testing-library/react-hooks';

import { NotificationsType } from '@sz/constants';
import { Notification } from '@sz/models';

import { getSectionList } from '../notification.helpers';

const MOCK_DATE = '2023-05-15';

describe('notification helper test cases', () => {
  describe('getSectionList function', () => {
    const getModifiedResult = (dataArray: Notification[]) => renderHook(() => getSectionList(dataArray));
    const mockId = '12345';
    const mockUserId = '12345';
    const mockType = NotificationsType.PUSH_NOTIFICATION;

    const mockDate = new Date(MOCK_DATE);

    // avoiding seconds issue, when test cases execution
    mockDate.setSeconds(0);

    beforeEach(() => {
      jest.useFakeTimers().setSystemTime(new Date(MOCK_DATE));
    });

    it('should return a array with a object, Today as title property and dataArray as the data property', () => {
      const dataArray = [
        {
          id: mockId,
          userId: mockUserId,
          notificationType: mockType,
          payload: 'test message one',
          title: 'Title One',
          isRead: false,
          createdAt: mockDate.toISOString(),
          updatedAt: mockDate.toISOString(),
        },
        {
          id: mockId,
          userId: mockUserId,
          notificationType: mockType,
          payload: 'test message two',
          title: 'Title Two',
          isRead: true,
          createdAt: mockDate.toISOString(),
          updatedAt: mockDate.toISOString(),
        },
      ];
      const { result } = getModifiedResult(dataArray);

      const expectedResult = [
        {
          title: 'Today',
          data: [
            {
              id: mockId,
              userId: mockUserId,
              notificationType: mockType,
              payload: 'test message one',
              title: 'Title One',
              isRead: false,
              createdAt: mockDate.toISOString(),
              updatedAt: mockDate.toISOString(),
            },
            {
              id: mockId,
              userId: mockUserId,
              notificationType: mockType,
              payload: 'test message two',
              title: 'Title Two',
              isRead: true,
              createdAt: mockDate.toISOString(),
              updatedAt: mockDate.toISOString(),
            },
          ],
        },
      ];
      expect(result.current).toStrictEqual(expectedResult);
    });

    it('should return a array with two objects, Today as title property and dataArray first item as the data property and Yesterday as title property and dataArray second item as the data property', () => {
      // getting yesterday date
      const mockYesterday = new Date(mockDate);
      mockYesterday.setDate(mockYesterday.getDate() - 1);

      const dataArray = [
        {
          id: mockId,
          userId: mockUserId,
          notificationType: mockType,
          payload: 'test message one',
          title: 'Title One',
          isRead: false,
          createdAt: mockDate.toISOString(),
          updatedAt: mockDate.toISOString(),
        },
        {
          id: mockId,
          userId: mockUserId,
          notificationType: mockType,
          payload: 'test message two',
          title: 'Title Two',
          isRead: true,
          createdAt: mockYesterday.toISOString(),
          updatedAt: mockYesterday.toISOString(),
        },
      ];
      const { result } = getModifiedResult(dataArray);

      const expectedResult = [
        {
          title: 'Today',
          data: [
            {
              id: mockId,
              userId: mockUserId,
              notificationType: mockType,
              payload: 'test message one',
              title: 'Title One',
              isRead: false,
              createdAt: mockDate.toISOString(),
              updatedAt: mockDate.toISOString(),
            },
          ],
        },
        {
          title: 'Yesterday',
          data: [
            {
              id: mockId,
              userId: mockUserId,
              notificationType: mockType,
              payload: 'test message two',
              title: 'Title Two',
              isRead: true,
              createdAt: mockYesterday.toISOString(),
              updatedAt: mockYesterday.toISOString(),
            },
          ],
        },
      ];
      expect(result.current).toStrictEqual(expectedResult);
    });
  });
});
