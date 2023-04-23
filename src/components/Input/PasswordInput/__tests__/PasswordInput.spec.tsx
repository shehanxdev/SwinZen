import { fireEvent, render } from '@testing-library/react-native';

import { PasswordField, PasswordFieldProps } from '../PasswordInput';

describe('PasswordField component', () => {
  const TEST_ID = 'PasswordFieldTestID';
  const mockOnChangeFunction = jest.fn();

  const getRenderedPasswordFieldComponent = (props?: Partial<PasswordFieldProps>) =>
    render(<PasswordField {...props} testID={TEST_ID} />);

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should find the PasswordField component via testID', () => {
    const { getByTestId } = getRenderedPasswordFieldComponent();
    const passwordField = getByTestId(TEST_ID);
    expect(passwordField).toBeTruthy();
  });

  test(`should render correctly`, () => {
    const rendered = getRenderedPasswordFieldComponent();
    const renderedTree = rendered.toJSON();
    expect(renderedTree).toMatchSnapshot();
  });

  it('should call onChangeText event when typed', async () => {
    const dummyInput = 'cL123456@!';
    const { getByTestId } = getRenderedPasswordFieldComponent({ onChangeText: mockOnChangeFunction });

    const inputElement = getByTestId(TEST_ID);

    expect(inputElement).toBeTruthy();

    if (!inputElement) return;

    fireEvent.changeText(inputElement, dummyInput);

    expect(mockOnChangeFunction).toBeCalled();
  });

  //TODO::add show/hide password on EyeIcon click test once the text field refactoring PRs get merged.
});
