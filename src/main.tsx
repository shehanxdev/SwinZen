import React from 'react';
import { Provider } from 'react-redux';

import App from './app/App';
import { initializeStore, store } from './stores/';

initializeStore();

export function Main() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default Main;
