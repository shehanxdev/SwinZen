import { Plugin, RematchDispatch, RematchRootState, init } from '@rematch/core';
import loadingPlugin, { ExtraModelsFromLoading } from '@rematch/loading';
import persistPlugin from '@rematch/persist';
import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';

import { getPersistPluginConfig } from '@sz/config';
import { IS_JEST_RUNTIME } from '@sz/constants';

import { RootModel, models } from './models';

export type FullModel = ExtraModelsFromLoading<RootModel>;

export let store: ReturnType<typeof initializeStore>;

export const initializeStore = () => {
  const plugins: Plugin<RootModel, FullModel, Partial<FullModel>>[] | undefined = [];

  // Add plugins
  plugins.push(loadingPlugin());

  // Add plugins not required for testing
  if (!IS_JEST_RUNTIME) {
    plugins.push(persistPlugin(getPersistPluginConfig()));
  }

  const initializedStore = init<RootModel, FullModel>({
    models,
    plugins,
  });

  store = initializedStore;

  return initializedStore;
};

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel, FullModel>;

export const useDispatch = () => useReduxDispatch<Dispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export * from './models';
