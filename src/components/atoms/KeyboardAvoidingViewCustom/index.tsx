import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { KeyboardAvoidingViewCustomProps } from './types.ts';
import { OPTIONS } from './constants.ts';

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
