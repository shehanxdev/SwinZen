import React from 'react';
import { View } from 'react-native';

import { tw } from '@sz/config';

interface ProfileInfoCardnProps {
  children: React.ReactNode;
}

export function ProfileInfoCard({ children }: ProfileInfoCardnProps) {
  return (
    <View testID="ProfileInfoCardTestID" style={tw`my-1.5 p-5 rounded-2.5 bg-Primary-Sz700 items-start`}>
      {children}
    </View>
  );
}
