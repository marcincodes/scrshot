import React from 'react';
import { View } from 'react-native';

export function ScrshotArea({ children }) {
  return (
    <View testID='scrshot-area'>
      {children}
    </View>
  )
}

export default ScrshotArea;
