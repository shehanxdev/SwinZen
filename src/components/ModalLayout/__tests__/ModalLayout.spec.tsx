import { fireEvent } from '@testing-library/react-native';
import React from 'react';
import { View } from 'react-native';

import { renderWithProviders } from '@sz/test-utils';

import { ModalLayout } from '../ModalLayout';

describe('ModalLayout component', () => {
  const testID = 'ModalLayoutTestID';
  const dummyChildren = <View></View>;
  const onLeftButtonPressMock = jest.fn();
  const onRightButtonPressMock = jest.fn();
  const handleModalCloseMock = jest.fn();

  const getRenderedComponent = () =>
    renderWithProviders(
      <ModalLayout
        showModal={true}
        handleModalClose={handleModalCloseMock}
        testID={testID}
        showCloseIcon={true}
        leftButtonTitle="cancel"
        rightButtonTitle="okay"
        onLeftButtonPress={onLeftButtonPressMock}
        onRightButtonPress={onRightButtonPressMock}>
        {dummyChildren}
      </ModalLayout>,
    );

  it(`should render ModalLayout component correctly`, () => {
    const rendered = getRenderedComponent();
    const renderedTree = rendered.toJSON();
    expect(renderedTree).toMatchSnapshot();
  });

  it(`should find the ModalLayout component via testID`, () => {
    const { getByTestId } = getRenderedComponent();
    const foundModalLayoutComponent = getByTestId(testID);
    expect(foundModalLayoutComponent).toBeTruthy();
  });

  it('calls `handleModalClose` when close icon is pressed', () => {
    const { getByTestId } = getRenderedComponent();
    const closeIcon = getByTestId(`${testID}-closeIconTestID`);
    fireEvent.press(closeIcon);
    expect(handleModalCloseMock).toHaveBeenCalledTimes(1);
  });

  it('calls `onLeftButtonPress` when left button is pressed', () => {
    const { getByTestId } = getRenderedComponent();
    const leftButton = getByTestId(`${testID}-leftButtonTestID`);
    fireEvent.press(leftButton);
    expect(onLeftButtonPressMock).toHaveBeenCalledTimes(1);
  });

  it('calls `onRightButtonPress` when right button is pressed', () => {
    const { getByTestId } = getRenderedComponent();
    const rightButton = getByTestId(`${testID}-rightButtonTestID`);
    fireEvent.press(rightButton);
    expect(onRightButtonPressMock).toHaveBeenCalledTimes(1);
  });
});
