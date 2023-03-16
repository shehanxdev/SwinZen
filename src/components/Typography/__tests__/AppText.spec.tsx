import { render } from '@testing-library/react-native';
import * as React from 'react';

import { Color, TextAlignment, TextVariant } from '@sz/constants';

import { AppTextProps } from '../AppText.types';
import { Text } from './../AppText.component';

describe('AppText Component', () => {
  const testID = 'AppTextTestID';
  const Colors = [Color.Neutral.Sz200, Color.Primary.Sz200];
  const underlineValues = [true, false];
  const numberOfLines = [1, 2];

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
        for (const underlineValue of underlineValues) {
          for (const numberOfLine of numberOfLines) {
            for (const color of Colors) {
              const propSet = {
                color: color,
                textAlign: TextAlignment[textAlignment],
                variant: TextVariant[textVariant],
                numberOfLines: numberOfLine,
                underline: underlineValue,
              };

              it(`should render correctly with TextAlignment prop : ${propSet.textAlign}, TextVariant prop : ${propSet.variant}, color prop :${color}, underline prop :${underlineValue}, numberOfLine prop :${numberOfLine}`, () => {
                const rendered = getRenderedScreen(propSet);
                const renderedTree = rendered.toJSON();
                expect(renderedTree).toMatchSnapshot();
              });
            }
          }
        }
      }
    }
  });
});
