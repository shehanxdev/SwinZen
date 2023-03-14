import { act, renderHook } from '@testing-library/react-hooks';

import { useFetch } from './../useFetch';

/**
 * Utility function to generate async query functions
 * @param callback Callback function to monitor the invocations
 * @param shouldResolve Should the promise resolve or reject
 * @param value Resolve/rejection value
 * @param waitingTime Waiting time before the resolve/reject
 */
function getAsyncFn<TReturnType = unknown>(
  callback: jest.Mock,
  shouldResolve: boolean,
  value: TReturnType,
  waitingTime = 0,
) {
  return () => {
    return new Promise<TReturnType>((resolve, reject) => {
      callback(); // first callback

      setTimeout(() => {
        callback(); // second callback
        if (shouldResolve) resolve(value);
        else reject(value);
      }, waitingTime);
    });
  };
}

describe('useFetch Hook', () => {
  it('should call the query function at mount', async () => {
    const listnerFn = jest.fn();
    const asyncFn = getAsyncFn(listnerFn, true, { resolved: true });

    const { waitForNextUpdate } = renderHook(() => useFetch(asyncFn));

    expect(listnerFn).toBeCalled();
    await waitForNextUpdate();
    expect(listnerFn).toBeCalledTimes(2);
  });

  it('should only call the query function once', async () => {
    const listnerFn = jest.fn();
    const asyncFn = getAsyncFn(listnerFn, true, { resolved: true });

    const { waitForNextUpdate, rerender } = renderHook(() => useFetch(asyncFn));

    expect(listnerFn).toBeCalled();
    await waitForNextUpdate();
    expect(listnerFn).toBeCalledTimes(2);

    rerender();
    rerender();
    rerender();

    expect(listnerFn).toBeCalledTimes(2);
  });

  it('should indicate isLoading until the query function has resolved', async () => {
    const listnerFn = jest.fn();
    const asyncFn = getAsyncFn(listnerFn, true, { resolved: true });

    const { waitForNextUpdate, result } = renderHook(() => useFetch(asyncFn));

    expect(result.current.isLoading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.isLoading).toBe(false);
  });

  it('should indicate isSuccess once the query function resolves', async () => {
    const listnerFn = jest.fn();
    const asyncFn = getAsyncFn(listnerFn, true, { resolved: true });

    const { waitForNextUpdate, result } = renderHook(() => useFetch(asyncFn));

    expect(result.current.isSuccess).toBe(false);
    await waitForNextUpdate();
    expect(result.current.isSuccess).toBe(true);
  });

  it('should indicate isError if the query function rejects', async () => {
    const listnerFn = jest.fn();
    const asyncFn = getAsyncFn(listnerFn, false, { resolved: false });

    const { waitForNextUpdate, result } = renderHook(() => useFetch(asyncFn));

    expect(result.current.isError).toBe(false);
    await waitForNextUpdate();
    expect(result.current.isError).toBe(true);
  });

  it('should return the query function results using data attribute', async () => {
    const listnerFn = jest.fn();
    const asyncFn = getAsyncFn(listnerFn, true, { resolved: true });

    const { waitForNextUpdate, result } = renderHook(() => useFetch(asyncFn));

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();
    await waitForNextUpdate();
    expect(result.current.data).toMatchObject({ resolved: true });
    expect(result.current.error).toBeUndefined();
  });

  it('should return the query function error using error attribute in case of an exception', async () => {
    const listnerFn = jest.fn();
    const asyncFn = getAsyncFn(listnerFn, false, { resolved: false });

    const { waitForNextUpdate, result } = renderHook(() => useFetch(asyncFn));

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();
    await waitForNextUpdate();
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toMatchObject({ resolved: false });
  });

  it('should call the query function again if `refetch` is called', async () => {
    const listnerFn = jest.fn();
    const asyncFn = getAsyncFn(listnerFn, true, { resolved: false }, 50);

    const { waitForNextUpdate, result } = renderHook(() => useFetch(asyncFn));
    await waitForNextUpdate();

    await act(async () => {
      result.current.refetch();
    });

    expect(listnerFn).toHaveBeenCalledTimes(3);
    await waitForNextUpdate();
    expect(listnerFn).toHaveBeenCalledTimes(4);
  });

  it('should return the latest query function invocation results if the query function was called multiple times', async () => {
    let counter = 0;
    const asyncFn = () => {
      const currentValue = counter;
      counter += 1;
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(currentValue);
        }, 10);
      });
    };

    const { waitForNextUpdate, result } = renderHook(() => useFetch(asyncFn));
    await waitForNextUpdate();

    for (let it = 0; it < 10; it += 1) {
      await act(async () => {
        result.current.refetch();
      });
    }

    expect(result.current).toMatchObject({
      data: 0,
      error: undefined,
      isError: false,
      isLoading: true,
      isSuccess: false,
      refetch: result.current.refetch,
    });

    await waitForNextUpdate();

    expect(result.current).toMatchObject({
      data: 10,
      error: undefined,
      isError: false,
      isLoading: false,
      isSuccess: true,
      refetch: result.current.refetch,
    });
  });
});
