import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { CheckpointAnalysisResult, CheckpointAnalysisResultProps } from './../CheckpointAnalysisResult';

describe('CheckpointAnalysisResult', () => {
  const testID = 'CheckpointAnalysisResultTestID';
  const onPressMock = jest.fn();

  const getRenderedCheckpointAnalysisResultComponent = (props?: Partial<CheckpointAnalysisResultProps>) =>
    render(
      <CheckpointAnalysisResult
        checkPoint="Checkpoint"
        subCheckpoint="Sub Checkpoint"
        onPress={onPressMock}
        overallStatus={'fail'}
        {...props}
      />,
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should find the component via testID', () => {
    const { getByTestId } = getRenderedCheckpointAnalysisResultComponent();
    const passwordField = getByTestId(testID);
    expect(passwordField).toBeTruthy();
  });

  test(`should render correctly`, () => {
    const rendered = getRenderedCheckpointAnalysisResultComponent();
    const renderedTree = rendered.toJSON();
    expect(renderedTree).toMatchSnapshot();
  });

  it('should trigger onPress callback when overallStatus is fail', () => {
    const { getByTestId } = getRenderedCheckpointAnalysisResultComponent({ overallStatus: 'fail' });

    const pressableComponent = getByTestId(testID);

    fireEvent.press(pressableComponent);

    expect(onPressMock).toHaveBeenCalled();
  });

  it('should not trigger onPress callback when overallStatus is pass', () => {
    const { getByTestId } = getRenderedCheckpointAnalysisResultComponent({ overallStatus: 'pass' });

    const pressableComponent = getByTestId(testID);

    fireEvent.press(pressableComponent);

    expect(onPressMock).not.toHaveBeenCalled();
  });
});
