import { render } from '@testing-library/react-native';
import * as React from 'react';

import { Color, TextAlignment, TextVariant } from '@sz/constants';

import { AppTextProps } from '../AppText.types';
import { Text } from './../AppText.component';

describe('AppText Component', () => {
  const testID = 'AppTextTestID';

  const AppTextPropSet = [
    {
      color: Color.Neutral.Sz200,
      textAlign: TextAlignment.Auto,
      variant: TextVariant.Heading1,
      numberOfLines: 1,
      underline: false,
    },
    {
      color: Color.Primary.Sz600,
      textAlign: TextAlignment.Left,
      variant: TextVariant.Heading1,
      numberOfLines: 2,
      underline: true,
    },
    {
      color: Color.Primary.Sz600,
      textAlign: TextAlignment.Left,
      variant: TextVariant.Heading1,
      numberOfLines: 2,
      underline: true,
    },
    {
      color: Color.Tertiary.Sz600,
      textAlign: TextAlignment.Center,
      variant: TextVariant.SubTitle2SemiBold,
      numberOfLines: 1,
      underline: false,
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
    for (const AppTextProp of AppTextPropSet) {
      it(`should render prop set ${AppTextProp}`, () => {
        const rendered = getRenderedScreen({ ...AppTextProp });
        const renderedTree = rendered.toJSON();
        expect(renderedTree).toMatchSnapshot();
      });
    }
  });
});
