import { renderHook } from '@testing-library/react-hooks';

import { User, UserData } from '@sz/models';

import { mapUserData } from '../user.helpers';

describe('user helpers test cases', () => {
  describe('getUserData function', () => {
    const getRenderedMaskedMail = (data: User) => renderHook(() => mapUserData(data));
    const mockDate = new Date('2023-05-25');

    it('should return a mapped user data', () => {
      const data = {
        id: '12345',
        name: 'dummmy name',
        email: 'dummymail@gmail.com',
        username: 'dummyuser',
        fcmTokens: ['12345'],
        retryAttempts: 0,
        profilePicture: null,
        gender: null,
        city: null,
        userStatus: 'dummyStatus',
        lastLogin: null,
        deviceId: null,
        createdAt: mockDate.toISOString(),
        updatedAt: mockDate.toISOString(),
      };
      const { result } = getRenderedMaskedMail(data);

      const expectedResult: UserData = {
        name: 'dummmy name',
        email: 'dummymail@gmail.com',
        username: 'dummyuser',
        fcmTokens: ['12345'],
        profilePicture: null,
        gender: null,
        city: null,
        userStatus: 'dummyStatus',
        deviceId: null,
      };
      expect(result.current).toStrictEqual(expectedResult);
    });
  });
});
