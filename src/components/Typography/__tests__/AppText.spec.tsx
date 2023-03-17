import { render } from '@testing-library/react-native';
import * as React from 'react';

import { Color, TextAlignment, TextVariant } from '@sz/constants';

import { AppTextProps } from '../AppText.types';
import { Text } from './../AppText.component';

describe('AppText Component', () => {
  const testID = 'AppTextTestID';
  const restPropSet = [
    {
      color: Color.Neutral.Sz200,
      underline: true,
      numberOfLines: 1,
    },
    {
      color: Color.Primary.Sz200,
      underline: false,
      numberOfLines: 2,
    },
  ];

  const getRenderedScreen = (props: AppTextProps) =>
    render(
      <Text {...props} testID={testID}>
        Dummy Text
      </Text>,
    );

  it('should find the component via testID', () => {
    const { getByTestId } = getRenderedScreen({ variant: TextVariant.Heading1 });
    const textComponent = getByTestId(testID);

    expect(textComponent).toBeTruthy();
  });

  describe('should render correctly', () => {
    for (const textAlignment in TextAlignment) {
      for (const textVariant in TextVariant) {
        for (const rest of restPropSet) {
          const propSet = {
            color: rest.color,
            textAlign: TextAlignment[textAlignment],
            variant: TextVariant[textVariant],
            numberOfLines: rest.numberOfLines,
            underline: rest.underline,
          };

          it(`should render correctly with TextAlignment prop : ${propSet.textAlign}, TextVariant prop : ${propSet.variant}, color prop :${rest.color}, underline prop :${rest.numberOfLines}, numberOfLine prop :${rest.underline}`, () => {
            const rendered = getRenderedScreen(propSet);
            const renderedTree = rendered.toJSON();
            expect(renderedTree).toMatchSnapshot();
          });
        }
      }
    }
  });
});
