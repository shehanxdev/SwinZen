import { render } from '@testing-library/react-native';
import * as React from 'react';

import { PasswordField, PasswordFieldProps } from './../PasswordField';

describe('PasswordField Component', () => {
  const testID = 'PasswordFieldTestID';
  const dummyName = 'PasswordFieldName';
  const dummyLabel = 'PasswordFieldLabel';

  const getRenderedPasswordFieldComponet = (props?: Partial<PasswordFieldProps>) =>
    render(<PasswordField {...props} testID={testID} name={dummyName} label={dummyLabel} />);

  it(`should render correctly`, () => {
    const rendered = getRenderedPasswordFieldComponet();
    const renderedTree = rendered.toJSON();
    expect(renderedTree).toMatchSnapshot();
  });

  it('should find the PasswordField component via testID', () => {
    const { getByTestId } = getRenderedPasswordFieldComponet();
    const foundPasswordFieldComponent = getByTestId(testID);
    expect(foundPasswordFieldComponent).toBeTruthy();
  });
});
