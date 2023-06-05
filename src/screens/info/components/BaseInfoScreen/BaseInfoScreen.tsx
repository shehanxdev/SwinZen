import React from 'react';

import { BaseScreen, BaseScreenProps } from '../../../components';

export interface BaseInfoScreenProps extends BaseScreenProps {}

export function BaseInfoScreen({ children, ...rest }: BaseInfoScreenProps) {
  return <BaseScreen {...rest}>{children}</BaseScreen>;
}
