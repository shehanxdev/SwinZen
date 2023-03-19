import { fireEvent, render } from '@testing-library/react-native';
import * as React from 'react';

import { LinkProps } from '../Link.types';
import { Link } from './../Link.component';

describe('Link Component', () => {
  const testID = 'LinkTestID';
  const linkText = 'linkText';
  const mockOnPressFunction = jest.fn();

  const getRenderedScreen = (props?: Partial<LinkProps>) =>
    render(<Link {...props} onPress={mockOnPressFunction} testID={testID} text={linkText} />);

  it(`should show text of the link`, () => {
    const { getByText } = getRenderedScreen();

    const foundLinkText = getByText(linkText);

    expect(foundLinkText.props.children).toEqual(linkText);
  });

  it('should find the link via testID', () => {
    const { getByTestId } = getRenderedScreen();

    const foundLink = getByTestId(testID);

    expect(foundLink).toBeTruthy();
  });

  it('should call onPress function', () => {
    const { getByTestId } = getRenderedScreen();

    fireEvent.press(getByTestId(testID));

    expect(mockOnPressFunction).toHaveBeenCalled();
  });
});
