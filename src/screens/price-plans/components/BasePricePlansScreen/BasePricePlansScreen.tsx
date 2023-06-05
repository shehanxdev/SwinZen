import React from 'react';

import { BaseScreen, BaseScreenProps } from '../../../components';

export interface BasePricePlansScreenProps extends BaseScreenProps {}

export function BasePricePlansScreen({ children, ...rest }: BasePricePlansScreenProps) {
  return <BaseScreen {...rest}>{children}</BaseScreen>;
}
