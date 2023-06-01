import { renderWithProviders } from '@sz/test-utils';

import { BaseScreen, BaseScreenProps } from '../BaseScreen';

describe('BaseScreen', () => {
  const getRenderedScreen = (props?: Partial<BaseScreenProps>) =>
    renderWithProviders(
      <BaseScreen {...props}>
        <></>
      </BaseScreen>,
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
