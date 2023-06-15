import * as React from 'react';

import { renderWithProviders } from '@sz/test-utils';

import { BaseUploadScreen, BaseUploadScreenProps } from '../BaseUploadScreen';

describe('BaseUploadScreen Component', () => {
  const testID = 'BaseUploadScreenTestID';
  const getRenderedScreen = (props?: Partial<BaseUploadScreenProps>) =>
    renderWithProviders(
      <BaseUploadScreen {...props}>
        <></>
      </BaseUploadScreen>,
    );

  it(`should render BaseUploadScreen component correctly`, () => {
    const rendered = getRenderedScreen();
    const renderedTree = rendered.toJSON();
    expect(renderedTree).toMatchSnapshot();
  });

  it(`should find the BaseUploadScreen component via testID`, () => {
    const { getByTestId } = getRenderedScreen();
    const foundCustomHeaderComponent = getByTestId(testID);
    expect(foundCustomHeaderComponent).toBeTruthy();
  });
});
