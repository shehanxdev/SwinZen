import { renderWithProviders } from '@sz/test-utils';

import { BaseLibraryScreen, BaseLibraryScreenProps } from '../BaseLibraryScreen';

describe('BaseLibraryScreen', () => {
  const getRenderedScreen = (props?: Partial<BaseLibraryScreenProps>) =>
    renderWithProviders(
      <BaseLibraryScreen {...props}>
        <></>
      </BaseLibraryScreen>,
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
