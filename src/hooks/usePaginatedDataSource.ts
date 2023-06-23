import { useCallback, useEffect, useRef, useState } from 'react';

export type UsePaginatedDataSourceTKey = string | number | symbol;
export type UsePaginatedDataSourceFetchFn<TDataItem> = (page: number) => Promise<TDataItem[]>;
export type UsePaginatedDataSourceKeyExtractor<TDataItem, TDataItemKey extends UsePaginatedDataSourceTKey> = (
  item: TDataItem,
) => TDataItemKey;

export interface UsePaginatedDataSourceState<TDataItem, TFetchError> {
  data?: Array<TDataItem>;
  isLoading: boolean;
  isError: boolean;
  isAllDataFetched: boolean;
  error?: TFetchError;
}

/**
 * A hook that allows to fetch paginated data asynchronoulsy.
 *
 * @param fetchFunction Paginated fetch function
 * @param keyExtractor Key extractor for fetched data items. NOTE: the hook is not sensitive to updates done to keyExtractor function
 * @param pageSize Expected page size for a single fetch query
 * @returns state variables (`isLoading`, `isError`, `isAllDataFetched`), and querying functions (`populateNextPage`, `reset`)
 */
export function usePaginatedDataSource<TDataItem, TDataItemKey extends UsePaginatedDataSourceTKey, TFetchError = Error>(
  fetchFunction: UsePaginatedDataSourceFetchFn<TDataItem>,
  keyExtractor: UsePaginatedDataSourceKeyExtractor<TDataItem, TDataItemKey>,
  pageSize?: number,
) {
  // internal state
  // We keep the internal state in refs to avoid re-renders, and to simplify the implementation
  const queryId = useRef(0);
  const pagesPopulated = useRef(0);
  const isError = useRef(false);
  const isLoading = useRef(false);
  const isAllDataFetched = useRef(false);
  const isMounted = useRef(true);
  const dataSet = useRef(new Set<TDataItemKey>());

  // shared state
  const [state, setState] = useState<UsePaginatedDataSourceState<TDataItem, TFetchError>>({
    isError: false,
    isLoading: false,
    isAllDataFetched: false,
  });

  // paginated data fetching function
  const populateNextPage = useCallback(async () => {
    if (isError.current) {
      // not going to try fetch more because there has been an error
      return;
    }

    if (isLoading.current) {
      // there is already a pending query
      return;
    }

    if (isAllDataFetched.current) {
      // there is no more data to fetch
      return;
    }

    queryId.current = (queryId.current + 1) % Number.MAX_SAFE_INTEGER;
    const currentQueryId = queryId.current;

    try {
      isLoading.current = true;
      setState(currentState => ({ ...currentState, isLoading: true, isError: false }));

      const newData = await fetchFunction(pagesPopulated.current + 1);

      if (!isMounted.current) {
        // if the parent companent has been dismounted by the time data returned
        // we do not proceed
        return;
      }

      if (queryId.current !== currentQueryId) {
        // new queries have been submitted during the time that the function was awaiting for results
        // so we have to disregard the result here
        // this scenario is possible if `reset` was called while some data was being fetched
        return;
      }

      // filter mechanism to avoid potential duplicates
      // NOTE: we won't need the filter mechanism if we're guaranteed to get the correct data
      const filteredNewData: TDataItem[] = [];

      for (const dataItem of newData) {
        const key = keyExtractor(dataItem);
        if (!dataSet.current.has(key)) {
          dataSet.current.add(key);
          filteredNewData.push(dataItem);
        }
      }

      // if a page size has been specified, and if there are more pages available, then the current response must have length equal to `pageSize`
      // regardless of the specification of page size, newData must be non-empty, in order for us to expect more pages
      const isMorePagesPossible = newData.length !== 0 && (pageSize ? newData.length === pageSize : true);

      if (isMorePagesPossible) {
        pagesPopulated.current += 1;
      } else {
        isAllDataFetched.current = true;
      }

      isLoading.current = false;

      setState(currentState => ({
        ...currentState,
        data: [...(currentState.data || []), ...filteredNewData],
        isLoading: false,
        isAllDataFetched: !isMorePagesPossible,
        isError: false,
        error: undefined,
      }));
    } catch (error) {
      if (queryId.current !== currentQueryId) {
        // new queries have been submitted during the time that the function was awaiting for results
        // so we have to disregard the result here
        // this scenario is possible if `reset` was called while some data was being fetched
        return;
      }

      console.error('Failed to fetch more data with the paginated data source', error);
      isError.current = true;
      isLoading.current = false;
      setState(currentState => ({
        ...currentState,
        isLoading: false,
        isError: true,
        error: error as TFetchError,
      }));
    }

    // we are intentionally dropping `keyExtractor` to avoid render loops
  }, [dataSet, pagesPopulated, fetchFunction]);

  // state resetting function, that flushes all previously fetched data
  const reset = useCallback(() => {
    dataSet.current.clear();
    pagesPopulated.current = 0;
    isAllDataFetched.current = false;
    isLoading.current = false;
    isError.current = false;

    setState({
      isAllDataFetched: false,
      isLoading: false,
      isError: false,
    });
  }, []);

  // safety check to prevent state updates on unmounted components
  useEffect(() => {
    isMounted.current = true;
    populateNextPage();
    return () => {
      isMounted.current = false;
    };
  }, []);

  // expose desired functions and attributes to hook consumer
  return {
    reset,
    populateNextPage,
    ...state,
  };
}
