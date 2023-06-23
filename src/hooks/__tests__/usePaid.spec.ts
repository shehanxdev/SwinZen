import { renderHook } from '@testing-library/react-hooks';

import { useDispatch, useSelector } from '@sz/stores';

import { usePaid } from '../usePaid';

jest.mock('@sz/stores', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('usePaid', () => {
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(jest.fn());
  });

  afterEach(() => {
    (useDispatch as jest.Mock).mockClear();
    (useSelector as jest.Mock).mockClear();
  });

  it('should return the isPaid value from the state', () => {
    (useSelector as jest.Mock).mockReturnValueOnce(true);

    const { result } = renderHook(() => usePaid());

    expect(result.current.isPaid).toBe(true);
  });

  it('should dispatch the setUpgradeModalVisible action if user is not paid', () => {
    (useSelector as jest.Mock).mockReturnValueOnce(false);

    const setUpgradeModalVisibleMock = jest.fn();

    const dispatchMock = {
      appStore: {
        setUpgradeModalVisible: setUpgradeModalVisibleMock,
      },
    };
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);

    const { result } = renderHook(() => usePaid());

    const restrictedAction = result.current.restrictPaidAction(() => {});

    restrictedAction();

    expect(setUpgradeModalVisibleMock).toHaveBeenCalledWith(true);
  });

  it('should return the provided action if user is paid', () => {
    (useSelector as jest.Mock).mockReturnValueOnce(true);

    const { result } = renderHook(() => usePaid());

    const actionMock = jest.fn();
    const restrictedAction = result.current.restrictPaidAction(actionMock);

    restrictedAction();

    expect(actionMock).toHaveBeenCalled();
  });
});
