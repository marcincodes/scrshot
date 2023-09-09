import React, { ReactNode } from 'react';
import { View } from 'react-native';

interface ScrshotAreaProps {
  children: ReactNode;
}

export function ScrshotArea({ children }: ScrshotAreaProps) {
  return (
    <View testID='scrshot-area'>
      {children}
    </View>
  )
}

export default ScrshotArea;
