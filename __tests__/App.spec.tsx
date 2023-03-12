import React from 'react';

import { renderWithProviders } from '@sz/utils';

import App from './../src/app/App';

//TODO::remove this test file with the __test__ folder and add all the test files within the same directory
describe('App Component', () => {
  const getRenderedComponent = (props?: any) => {
    return renderWithProviders(<App {...props} />);
  };

  it(`renders correctly`, () => {
    const component = getRenderedComponent();
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
