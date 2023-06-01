import React from 'react';

import { BaseScreen, BaseScreenProps } from '../../../components';

export interface BaseLibraryScreenProps extends BaseScreenProps {}

export function BaseLibraryScreen({ children, ...rest }: BaseLibraryScreenProps) {
  return <BaseScreen {...rest}>{children}</BaseScreen>;
}
