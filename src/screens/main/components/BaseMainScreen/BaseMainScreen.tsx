import React from 'react';

import { BaseScreen, BaseScreenProps } from './../../../components/BaseScreen';

export interface BaseMainScreenProps extends BaseScreenProps {}

export function BaseMainScreen({ children, ...rest }: BaseMainScreenProps) {
  return <BaseScreen {...rest}>{children}</BaseScreen>;
}
