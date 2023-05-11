import React from 'react';

import { Text } from '@sz/components';
import { Color, TextAlignment, TextVariant } from '@sz/constants';
import { FaqSection } from '@sz/models';

export function FAQSectionContent(section: FaqSection) {
  return (
    <Text
      variant={TextVariant.Body2Regular}
      color={Color.Neutral.Sz500}
      textAlign={TextAlignment.Left}
      testID="FAQSectionContentTestID">
      {section.answer}
    </Text>
  );
}
