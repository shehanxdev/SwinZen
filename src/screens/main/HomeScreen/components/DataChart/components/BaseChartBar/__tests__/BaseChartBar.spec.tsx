import { render } from '@testing-library/react-native';
import * as React from 'react';

import { BaseChartBar, BaseChartBarProps } from '../BaseChartBar';

describe('BaseChartBar component', () => {
  const testID = 'BaseChartBarComponentTestID';
  const initialBarValue = 5;
  const initialchartBarType = 'pass';
  const propsSet: BaseChartBarProps[] = [
    { barValue: 5, chartBarType: 'pass' },
    { barValue: 9, chartBarType: 'pass' },
    { barValue: 2, chartBarType: 'fail' },
  ];

  const getRenderedComponent = (props?: Partial<BaseChartBarProps>) =>
    render(<BaseChartBar {...props} barValue={initialBarValue} chartBarType={initialchartBarType} />);

  describe('should render correctly', () => {
    for (const prop of propsSet) {
      it(`should render correctly with ${JSON.stringify(prop)}`, () => {
        const rendered = getRenderedComponent({ ...prop });
        const renderedTree = rendered.toJSON();
        expect(renderedTree).toMatchSnapshot();
      });
    }
  });

  it('should find the BaseChartBar component via testID', () => {
    const { getByTestId } = getRenderedComponent();
    const foundComponent = getByTestId(testID);
    expect(foundComponent).toBeTruthy();
  });
});
