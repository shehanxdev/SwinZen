import { faker } from '@faker-js/faker';
import { RematchStore } from '@rematch/core';

import { LoginUserData, SignupUserData } from '@sz/models';
import { AuthService } from '@sz/services';

import { RootModel } from '.';
import { FullModel, initializeStore } from '..';

// Mock AuthService
jest.spyOn(AuthService, 'loginUserWithCredentials');
jest.spyOn(AuthService, 'registerUser');

describe('Unit testing user store', () => {
  let store: RematchStore<RootModel, FullModel>;
  beforeEach(() => {
    store = initializeStore();
  });

  it('should set access token and refresh token when loginUserWithCredentials is called', async () => {
    const accessToken = 'dummyAccessToken';
    const refreshToken = 'dummyRefreshToken';
    const payload: LoginUserData = { username: faker.internet.email(), password: faker.internet.password() };
    (AuthService.loginUserWithCredentials as jest.Mock).mockResolvedValueOnce({
      accessToken,
      refreshToken,
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

    // TODO: update return value once auth is refactored
    (AuthService.registerUser as jest.Mock).mockResolvedValueOnce({});

    await store.dispatch.userStore.registerUser(payload);

    const state = store.getState();
    expect(state.persistentUserStore.loginState).toBe('initial');
  });

  //TODO: Add more tests for other effects and reducers
});
