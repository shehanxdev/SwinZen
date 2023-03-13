import { useCallback, useEffect, useRef, useState } from 'react';

type QueryFn<TQueryFnData> = () => Promise<TQueryFnData>;

interface UseFetchInternalState<TQueryFnData, TQueryFnError> {
  data?: TQueryFnData;
  error?: TQueryFnError;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
}

export function useFetch<TQueryFnData = unknown, TQueryFnError = unknown>(
  fetchQuery: QueryFn<TQueryFnData>,
  disableAutoFetch?: boolean,
) {
  const [state, setState] = useState<UseFetchInternalState<TQueryFnData, TQueryFnError>>({
    isSuccess: false,
    isLoading: false,
    isError: false,
  });

  const isMounted = useRef(true);
  const queryIndex = useRef(0);

  const fetchData = useCallback(async () => {
    queryIndex.current = (queryIndex.current + 1) % Number.MAX_SAFE_INTEGER;
    const currentQueryIndex = queryIndex.current;

    try {
      // we reset only the status flags during a refresh, so if someone had wired `data` and `error` values to UI elements,
      // the won't go away in case of a refetch, until the refetch results have appeared
      setState(currentState => ({
        ...currentState,
        isLoading: true,
        isSuccess: false,
        isError: false,
      }));

      const data = await fetchQuery();

      // staleness check
      if (isMounted.current && queryIndex.current === currentQueryIndex) {
        setState({
          data,
          error: undefined,
          isLoading: false,
          isSuccess: true,
          isError: false,
        });
      }
    } catch (error) {
      // staleness check
      if (isMounted.current && queryIndex.current === currentQueryIndex) {
        setState({
          data: undefined,
          error: error as TQueryFnError,
          isLoading: false,
          isSuccess: false,
          isError: true,
        });
      }
    }
  }, [fetchQuery]);

  useEffect(() => {
    if (!disableAutoFetch) {
      fetchData();
    }

    isMounted.current = true;
    return () => {
      // we keep track if the parent component has been unmounted to avoid trying to update stale state
      isMounted.current = false;
    };

    // we want to run this effect ONLY on the first render of the parent component, and hence the empty dep. array
  }, []);

  return { ...state, refetch: fetchData };
}
