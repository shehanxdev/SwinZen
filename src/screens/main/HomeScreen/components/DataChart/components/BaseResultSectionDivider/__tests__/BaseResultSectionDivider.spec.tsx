import { render } from '@testing-library/react-native';
import * as React from 'react';

import { BaseResultSectionDivider } from '../BaseResultSectionDivider';

describe('BaseResultSectionDivider component', () => {
  const getRenderedComponent = () => render(<BaseResultSectionDivider />);
  it(`should render BaseResultSectionDivider component correctly`, () => {
    const renderer = getRenderedComponent();
    const renderTree = renderer.toJSON();
    expect(renderTree).toMatchSnapshot();
  });
});
