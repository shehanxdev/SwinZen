import React from 'react';

import { Text } from '@sz/components';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

export function FAQSectionContent(section) {
  return (
    <Text variant={TextVariant.Body2Regular} color={Color.Neutral.Sz500} textAlign={TextAlignment.Left}>
      {section.content}
    </Text>
  );
}
