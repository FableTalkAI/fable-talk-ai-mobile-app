import { KeyboardAvoidingView, StyleSheet } from 'react-native';

import { OPTIONS } from './constants.ts';
import { KeyboardAvoidingViewCustomProps } from './types.ts';

const KeyboardAvoidingViewCustom = ({ children, style }: KeyboardAvoidingViewCustomProps) => {
  return (
    <KeyboardAvoidingView
      behavior={OPTIONS.behavior}
      style={[styles.flex1, style]}
      keyboardVerticalOffset={OPTIONS.keyboardVerticalOffset}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});

export default KeyboardAvoidingViewCustom;
