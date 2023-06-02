import { renderWithProviders } from '@sz/test-utils';

import { BaseAccountScreen, BaseAccountScreenProps } from '../BaseAccountScreen';

describe('BaseAccountScreen', () => {
  const getRenderedScreen = (props?: Partial<BaseAccountScreenProps>) =>
    renderWithProviders(
      <BaseAccountScreen {...props}>
        <></>
      </BaseAccountScreen>,
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
