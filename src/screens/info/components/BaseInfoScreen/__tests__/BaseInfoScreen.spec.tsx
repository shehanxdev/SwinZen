import { renderWithProviders } from '@sz/test-utils';

import { BaseInfoScreen, BaseInfoScreenProps } from '../BaseInfoScreen';

describe('BaseInfoScreen', () => {
  const getRenderedScreen = (props?: Partial<BaseInfoScreenProps>) =>
    renderWithProviders(
      <BaseInfoScreen {...props}>
        <></>
      </BaseInfoScreen>,
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
