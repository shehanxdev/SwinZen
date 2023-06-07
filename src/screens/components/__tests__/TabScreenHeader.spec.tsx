import { renderWithProviders } from '@sz/test-utils';

import { TabScreenHeader } from '../TabScreenHeader';

describe('TabScreenHeader', () => {
  const getRenderedScreen = () => renderWithProviders(<TabScreenHeader title="Title" />);
  it('Should render', () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });
});
