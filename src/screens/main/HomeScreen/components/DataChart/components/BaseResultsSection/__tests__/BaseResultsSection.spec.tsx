import { render } from '@testing-library/react-native';
import * as React from 'react';

import { BaseResultsSection } from '../BaseResultsSection';

describe('BaseResultsSection component', () => {
  const propsSet = [
    { passes: 10, fails: 5, label: 'Overall' },
    { passes: 8, fails: 2, label: 'Setup' },
    { passes: 1, fails: 3, label: 'Backswing' },
    { passes: 2, fails: 5, label: 'Downswing' },
  ];

  describe('should render correctly', () => {
    for (const prop of propsSet) {
      it(`should render correctly with ${JSON.stringify(prop)}`, () => {
        const rendered = render(<BaseResultsSection {...prop} />);
        const renderedTree = rendered.toJSON();
        expect(renderedTree).toMatchSnapshot();
      });
    }
  });
});
