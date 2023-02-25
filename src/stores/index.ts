import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';

import { Plugin, RematchDispatch, RematchRootState, init } from '@rematch/core';
import loadingPlugin, { ExtraModelsFromLoading } from '@rematch/loading';

import { RootModel, models } from './models';

type FullModel = ExtraModelsFromLoading<RootModel>;

export const initializeStore = () => {
  const plugins: Plugin<RootModel, FullModel, Partial<FullModel>>[] | undefined = [];

  // Add plugins
  plugins.push(loadingPlugin());

  const initializedStore = init<RootModel, FullModel>({
    models,
    plugins,
  });

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  store = initializedStore;

  return initializedStore;
};

export let store: ReturnType<typeof initializeStore>;

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel, FullModel>;

export const useDispatch = () => useReduxDispatch<Dispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export * from './models';
