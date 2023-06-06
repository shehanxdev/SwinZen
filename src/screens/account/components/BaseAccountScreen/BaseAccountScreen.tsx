import React from 'react';

import { BaseScreen, BaseScreenProps } from '../../../components';

export interface BaseAccountScreenProps extends BaseScreenProps {}

export function BaseAccountScreen({ children, ...rest }: BaseAccountScreenProps) {
  return <BaseScreen {...rest}>{children}</BaseScreen>;
}
