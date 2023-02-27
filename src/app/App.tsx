import React from 'react';
import { Text, View } from 'react-native';

import { tw } from '@config/index';

export function App() {
  return (
    <View style={tw`pt-15 pl-5`}>
      <Text>Hello from SwingZen</Text>
    </View>
  );
}

export default App;
