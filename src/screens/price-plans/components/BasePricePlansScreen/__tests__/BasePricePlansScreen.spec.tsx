import { renderWithProviders } from '@sz/test-utils';

import { BasePricePlansScreen, BasePricePlansScreenProps } from '../BasePricePlansScreen';

describe('BasePricePlansScreen', () => {
  const getRenderedScreen = (props?: Partial<BasePricePlansScreenProps>) =>
    renderWithProviders(
      <BasePricePlansScreen {...props}>
        <></>
      </BasePricePlansScreen>,
    );
  it('Should render with ScrollView', () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });

  it('Should render without ScrollView', () => {
    const renderer = getRenderedScreen({ wrapWithScrollView: false });
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });
});
