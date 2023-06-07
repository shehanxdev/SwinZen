import { renderWithProviders } from '@sz/test-utils';

import { GolfTipsData } from '../../../GolfTipsScreen/GolfTipsData';
import { GolfTipsWrapper } from '../GolfTipsWrapper';

describe('GolfTipsWrapper component', () => {
  const testID = 'GolfTipsWrapperTestID';

  const getRenderedComponent = () => renderWithProviders(<GolfTipsWrapper golfTips={GolfTipsData} testID={testID} />);

  it(`should render GolfTipsWrapper component correctly`, () => {
    const rendered = getRenderedComponent();
    const renderedTree = rendered.toJSON();
    expect(renderedTree).toMatchSnapshot();
  });

  it(`should find the GolfTipsWrapper component via testID`, () => {
    const { getByTestId } = getRenderedComponent();
    const foundGolfTipsWrapper = getByTestId(testID);
    expect(foundGolfTipsWrapper).toBeTruthy();
  });
});
