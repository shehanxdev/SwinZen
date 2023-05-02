import { render } from '@testing-library/react-native';
import * as React from 'react';

import { VideoCountCard } from '../VideoCountCard';

describe('VideoCountCard Component', () => {
  const count = 24;
  const description = 'random description';

  const getRenderedScreen = () => render(<VideoCountCard count={count} description={description} />);

  it(`should render Component correctly`, () => {
    const renderer = getRenderedScreen();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });
});
