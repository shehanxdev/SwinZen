import { render } from '@testing-library/react-native';
import * as React from 'react';

import { BaseResultsSection } from '../BaseResultsSection';

describe('BaseResultsSection component', () => {
  const propsSet = [
    { passes: 10, fails: 5 },
    { passes: 8, fails: 2 },
    { passes: 1, fails: 3 },
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
