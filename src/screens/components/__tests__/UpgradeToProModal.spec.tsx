import { RematchStore } from '@rematch/core';
import { fireEvent, waitFor } from '@testing-library/react-native';

import { Route } from '@sz/constants';
import { NavigationService } from '@sz/services';
import { FullModel, RootModel, initializeStore } from '@sz/stores';
import { renderWithProviders } from '@sz/test-utils';

import { UpgradeToProModal } from '../UpgradeToProModal';

describe('UpgradeToProModal', () => {
  const getRenderedScreen = () => renderWithProviders(<UpgradeToProModal />);

  const mockNavigate = jest.fn();
  let originalNavigate;

  let store: RematchStore<RootModel, FullModel>;
  beforeEach(() => {
    store = initializeStore();

    originalNavigate = NavigationService.navigate;
    NavigationService.navigate = mockNavigate;
  });

  afterEach(() => {
    NavigationService.navigate = originalNavigate;
  });

  it('Should render', () => {
    store.dispatch.appStore.setUpgradeModalVisible(true);

    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('Should close on cancel press', () => {
    store.dispatch.appStore.setUpgradeModalVisible(true);

    const { getByText } = getRenderedScreen();

    fireEvent.press(getByText('CANCEL'));

    expect(store.getState().appStore.isUpgradeModalVisible).toBe(false);
  });

  it('Should call the navigation on press upgrade', async () => {
    store.dispatch.appStore.setUpgradeModalVisible(true);

    const { getByText } = getRenderedScreen();

    fireEvent.press(getByText('UPGRADE PLAN'));

    expect(store.getState().appStore.isUpgradeModalVisible).toBe(false);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(Route.PricePlans);
    });
  });
});
