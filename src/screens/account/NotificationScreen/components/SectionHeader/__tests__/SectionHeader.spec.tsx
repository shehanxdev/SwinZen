import * as React from 'react';

import { renderWithProviders } from '@sz/utils';

import { SectionHeader } from './../SectionHeader';

describe('SectionHeader Component', () => {
  const testID = 'SectionHeaderTestID';
  const mockTitle = 'test message';

  const getRenderedComponent = () => renderWithProviders(<SectionHeader testID={testID} title={mockTitle} />);

  it(`should render SectionHeader component correctly`, () => {
    const rendered = getRenderedComponent();
    const renderedTree = rendered.toJSON();
    expect(renderedTree).toMatchSnapshot();
  });

  it('should find the SectionHeader component via testID', () => {
    const { getByTestId } = getRenderedComponent();
    const foundSectionHeaderComponent = getByTestId(testID);
    expect(foundSectionHeaderComponent).toBeTruthy();
  });
});
