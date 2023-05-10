import { render } from '@testing-library/react-native';
import * as React from 'react';

import { FAQScreen } from '../FAQScreen';

describe('FAQ screen', () => {
  const testID = 'FAQScreenTestID';

  const getRenderedScreen = () => render(<FAQScreen />);

  it(`should render FAQ Screen correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the FAQ Screen via testID', () => {
    const { getByTestId } = getRenderedScreen();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });
});
