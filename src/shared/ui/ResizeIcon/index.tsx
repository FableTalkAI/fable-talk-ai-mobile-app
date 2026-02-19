import { cloneElement } from 'react';
import { StyleSheet, View } from 'react-native';

import { ResizeIconProps } from './types.ts';

const ResizeIcon = ({ icon, containerStyle, cloneElementProps }: ResizeIconProps) => {
  if (!icon) return null;

  return <View style={[styles.container, containerStyle]}>{cloneElement(icon, cloneElementProps)}</View>;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ResizeIcon;
