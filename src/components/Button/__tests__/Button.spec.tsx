import { fireEvent, render } from '@testing-library/react-native';
import * as React from 'react';

import { Color } from '@sz/constants';

import { Button } from '../Button.component';
import { ButtonProps } from '../Button.types';

describe('Button Component', () => {
  const dummyText = 'dummy text';
  const otherPropSet = [
    {
      backgroundColor: Color.Primary.Sz300,
      activeStateBackgroundColor: Color.Secondary.Sz100,
      textColor: Color.Transparency.Sz24,
    },
    {
      backgroundColor: Color.Neutral.White,
      activeStateBackgroundColor: Color.Neutral.Sz100,
      textColor: Color.Neutral.Sz300,
      disabledBackgroundColor: Color.Neutral.Sz100,
      disabledTextColor: Color.Neutral.Sz100,
      borderColor: Color.Neutral.Sz100,
      disabledBorderColor: Color.Neutral.Sz100,
      disable: true,
    },
    {
      backgroundColor: Color.Tertiary.Sz700,
      activeStateBackgroundColor: Color.Secondary.Sz100,
      fullWidth: true,
    },
  ];
  const testID = 'ButtonTestID';
  const mockOnPressFunction = jest.fn();
  const mockOnLongPressFunction = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  const getRenderedButtonComponent = (props?: Partial<ButtonProps>) =>
    render(<Button {...props} onPress={mockOnPressFunction} testID={testID} title={dummyText} />);

  describe('should render correctly', () => {
    for (const otherProp of otherPropSet) {
      it(`should render correctly with ${otherProp}`, () => {
        const rendered = getRenderedButtonComponent({ ...otherProp });
        const renderedTree = rendered.toJSON();
        expect(renderedTree).toMatchSnapshot();
      });
    }
  });

  it('should find the button via testID', () => {
    const { getByTestId } = getRenderedButtonComponent();
    const foundButton = getByTestId(testID);

    expect(foundButton).toBeTruthy();
  });

  it(`should show relevant text inside the button`, () => {
    const { getByText } = getRenderedButtonComponent();
    const foundTextElement = getByText(dummyText);

    expect(foundTextElement.props.children).toEqual(dummyText);
  });

  it('should not call on press function, if the button IS IN disable state', () => {
    const { getByTestId } = getRenderedButtonComponent({ disabled: true });

    fireEvent.press(getByTestId(testID));
    expect(mockOnPressFunction).not.toHaveBeenCalled();
  });

  it('should call on press function, if the button IS NOT in disable state', () => {
    const { getByTestId } = getRenderedButtonComponent({ disabled: false });

    fireEvent.press(getByTestId(testID));
    expect(mockOnPressFunction).toHaveBeenCalled();
  });

  it('should not call on long press function, if the button IS IN disable state', () => {
    const { getByTestId } = getRenderedButtonComponent({ disabled: true, onLongPress: mockOnLongPressFunction });

    fireEvent.press(getByTestId(testID));
    expect(mockOnPressFunction).not.toHaveBeenCalled();
  });

  it('should call on long press function, if the button IS NOT in disable state', () => {
    const { getByTestId } = getRenderedButtonComponent({ disabled: false, onLongPress: mockOnLongPressFunction });

    fireEvent.press(getByTestId(testID));
    expect(mockOnPressFunction).toHaveBeenCalled();
  });
});
