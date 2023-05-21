import { faker } from '@faker-js/faker';
import { RematchStore } from '@rematch/core';

import { LoginUserData, SignupUserData } from '@sz/models';
import { AuthService, AuthTokens, SecureAuthService } from '@sz/services';

import { RootModel } from '..';
import { FullModel, initializeStore } from '../..';

describe('Unit testing user store', () => {
  let store: RematchStore<RootModel, FullModel>;
  beforeEach(() => {
    store = initializeStore();
  });

  it('should set access token and refresh token when loginUserWithCredentials is called', async () => {
    const accessToken = 'dummyAccessToken';
    const refreshToken = 'dummyRefreshToken';
    const payload: LoginUserData = { username: faker.internet.email(), password: faker.internet.password() };

    jest.spyOn(AuthService, 'loginUserWithCredentials').mockResolvedValueOnce({
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

  //TODO: Add more tests for other effects and reducers
});
