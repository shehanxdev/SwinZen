import { faker } from '@faker-js/faker';
import { RematchStore } from '@rematch/core';

import { LoginUserData, SignupUserData } from '@sz/models';
import { AuthService, AuthTokens, SecureAuthService, UserService } from '@sz/services';

import { RootModel } from '..';
import { FullModel, initializeStore } from '../..';

describe('Unit testing user store', () => {
  let store: RematchStore<RootModel, FullModel>;
  beforeEach(() => {
    store = initializeStore();
  });

  it('should set access token and refresh token when loginUserWithCredentials is called', async () => {
    const userId = '';
    const accessToken = 'dummyAccessToken';
    const refreshToken = 'dummyRefreshToken';
    const payload: LoginUserData = { username: faker.internet.email(), password: faker.internet.password() };

    jest.spyOn(AuthService, 'loginUserWithCredentials').mockResolvedValueOnce({
      userId,
      accessToken,
      refreshToken,
      expiresIn: 0,
      refreshExpiresIn: 0,
    });

    await store.dispatch.userStore.loginUserWithCredentials(payload);

    const state = store.getState();
    expect(state.userStore.accessToken).toBe(accessToken);
    expect(state.userStore.refreshToken).toBe(refreshToken);
  });

  it('should clear access token and refresh token when logoutUser is called', async () => {
    const accessToken = 'dummyAccessToken';
    const refreshToken = 'dummyRefreshToken';
    store.dispatch.userStore.setAccessToken(accessToken);
    store.dispatch.userStore.setRefreshToken(refreshToken);

    await store.dispatch.userStore.logoutUser();

    const state = store.getState();
    expect(state.userStore.accessToken).toBeNull();
    expect(state.userStore.refreshToken).toBeNull();
  });

  it('should set login state to initial in persistentUserStore when registerUser is called', async () => {
    const payload: SignupUserData = {
      username: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.person.fullName(),
      promoCode: faker.lorem.word(),
    };

    jest.spyOn(AuthService, 'registerUser').mockResolvedValueOnce({
      user: {
        id: 'mockId',
        name: 'John',
        email: 'john.doe@example.com',
        username: 'johndoe',
        fcmTokens: [],
        retryAttempts: 0,
        profilePicture: 'https://example.com/profile.jpg',
        gender: 'male',
        city: 'New York',
        userStatus: '',
        lastLogin: '2023-05-20T10:00:00Z',
        deviceId: 'mockDeviceId',
        createdAt: '2023-05-19T08:00:00Z',
        updatedAt: '2023-05-20T12:00:00Z',
      },
      nextActionToken: 'next action token',
    });

    await store.dispatch.userStore.registerUser(payload);

    const state = store.getState();
    expect(state.persistentUserStore.loginState).toBe('initial');
  });

  it('should set auth tokens when getAuthTokensFromSecureStorage is called', async () => {
    const tokens: AuthTokens = {
      accessToken: 'dummyAccessToken',
      refreshToken: 'dummyRefreshToken',
    };

    jest.spyOn(SecureAuthService, 'getAuthTokens').mockResolvedValueOnce(tokens);

    await store.dispatch.userStore.getAuthTokensFromSecureStorage();

    const state = store.getState();
    expect(state.userStore.accessToken).toBe(tokens.accessToken);
    expect(state.userStore.refreshToken).toBe(tokens.refreshToken);
  });

  it('should logout user when getAuthTokensFromSecureStorage is called and SecureAuthService.getAuthTokens throws an exception', async () => {
    store.dispatch.persistentUserStore.setIsAuthenticate(true);

    jest.spyOn(SecureAuthService, 'getAuthTokens').mockRejectedValueOnce({});

    await store.dispatch.userStore.getAuthTokensFromSecureStorage();

    const state = store.getState();
    expect(state.userStore.accessToken).toBe(null);
    expect(state.userStore.refreshToken).toBe(null);
    expect(state.persistentUserStore.isAuthenticated).toBe(false);
  });

  it('should set next action token when getAuthTokensFromSecureStorage is called', async () => {
    const nextActionToken = 'dummyNextActionToken';

    jest.spyOn(SecureAuthService, 'getNextActionToken').mockResolvedValueOnce(nextActionToken);

    await store.dispatch.userStore.getNextActionFromSecureStorage();

    const state = store.getState();
    expect(state.userStore.nextActionToken).toBe(nextActionToken);
  });

  it('should set userData when getUserData is called', async () => {
    const mockUserResponse = {
      id: faker.string.numeric(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      fcmTokens: [faker.string.numeric()],
      retryAttempts: faker.number.int(0),
      profilePicture: faker.image.avatar(),
      gender: faker.person.gender(),
      city: faker.string.sample(),
      userStatus: faker.string.sample(),
      lastLogin: faker.date.past().toISOString(),
      deviceId: faker.string.numeric(),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.past().toISOString(),
    };
    const mockUserData = {
      name: mockUserResponse.name,
      email: mockUserResponse.email,
      username: mockUserResponse.username,
      fcmTokens: mockUserResponse.fcmTokens,
      profilePicture: mockUserResponse.profilePicture,
      gender: mockUserResponse.gender,
      city: mockUserResponse.city,
      userStatus: mockUserResponse.userStatus,
      deviceId: mockUserResponse.deviceId,
    };

    jest.spyOn(UserService, 'getUserData').mockResolvedValueOnce(mockUserResponse);

    await store.dispatch.userStore.getUserData();

    const state = store.getState();
    expect(state.userStore.userData).toStrictEqual(mockUserData);
  });

  it('should update userData when patchUserData is called', async () => {
    const mockUserData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      fcmTokens: [faker.string.numeric()],
      profilePicture: faker.image.avatar(),
      gender: faker.person.gender(),
      city: faker.string.sample(),
      userStatus: faker.string.sample(),
      deviceId: faker.string.numeric(),
    };
    const mockUserResponse = {
      id: faker.string.numeric(),
      name: mockUserData.name,
      email: mockUserData.email,
      username: mockUserData.username,
      fcmTokens: mockUserData.fcmTokens,
      retryAttempts: faker.number.int(0),
      profilePicture: mockUserData.profilePicture,
      gender: mockUserData.gender,
      city: mockUserData.city,
      userStatus: mockUserData.userStatus,
      lastLogin: faker.date.past().toISOString(),
      deviceId: mockUserData.deviceId,
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.past().toISOString(),
    };
    const updatedUserData = {
      name: mockUserData.name,
      email: mockUserData.email,
      username: mockUserData.username,
      fcmTokens: mockUserData.fcmTokens,
      profilePicture: mockUserData.profilePicture,
      gender: mockUserData.gender,
      city: mockUserData.city,
      userStatus: mockUserData.userStatus,
      deviceId: mockUserData.deviceId,
    };

    jest.spyOn(UserService, 'patchUserData').mockResolvedValueOnce(mockUserResponse);

    await store.dispatch.userStore.patchUserData(mockUserData);

    const state = store.getState();
    expect(state.userStore.userData).toStrictEqual(updatedUserData);
  });

  //TODO: Add more tests for other effects and reducers
});
