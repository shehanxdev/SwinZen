import { fireEvent, render } from '@testing-library/react-native';
import * as React from 'react';

import { SwingDataExpandButton } from '../SwingDataExpandButton';

describe('SwingDataExpandButton component', () => {
  const swingData = [
    { label: 'Label 1', value: 'Value 1' },
    { label: 'Label 2', value: 'Value 2' },
  ];
  const testID = 'SwingDataExpandButtonTestID';
  const getRenderedComponent = () => render(<SwingDataExpandButton swingData={swingData} testID={testID} />);

  it(`should render SwingDataExpandButton component correctly`, () => {
    const renderer = getRenderedComponent();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('should find the SwingDataExpandButton component via testID', () => {
    const { getByTestId } = getRenderedComponent();
    const foundScreen = getByTestId(testID);
    expect(foundScreen).toBeTruthy();
  });

  it('renders the button with correct text', () => {
    const { getByText } = getRenderedComponent();
    const button = getByText('Swing data +');
    expect(button).toBeTruthy();
  });

  it('expands the content when the button is pressed', () => {
    const { getByText, queryByText } = getRenderedComponent();
    const button = getByText('Swing data +');

    fireEvent.press(button);
    expect(queryByText('Label 1')).toBeTruthy();
    expect(queryByText('Value 1')).toBeTruthy();
    expect(queryByText('Label 2')).toBeTruthy();
    expect(queryByText('Value 2')).toBeTruthy();
  });
});
