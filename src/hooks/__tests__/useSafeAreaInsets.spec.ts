import { renderHook } from '@testing-library/react-hooks';

import { useSafeAreaInsets } from '../useSafeAreaInsets';

describe('useSafeAreaInsets Hook', () => {
  const defaultInsets = { top: 0, right: 0, bottom: 0, left: 0 };

  const getRenderedUseSafeAreaInsetsCustomHook = () => renderHook(() => useSafeAreaInsets());

  it('should return the top inset value', async () => {
    const { result } = getRenderedUseSafeAreaInsetsCustomHook();

    expect(result.current.top).toBe(defaultInsets.top);
  });

  it('should return the right inset value', async () => {
    const { result } = getRenderedUseSafeAreaInsetsCustomHook();

    expect(result.current.right).toBe(defaultInsets.right);
  });

  it('should return the bottom inset value', async () => {
    const { result } = getRenderedUseSafeAreaInsetsCustomHook();

    expect(result.current.bottom).toBe(defaultInsets.bottom);
  });

  it('should return the left inset value', async () => {
    const { result } = getRenderedUseSafeAreaInsetsCustomHook();

    expect(result.current.left).toBe(defaultInsets.left);
  });
});
