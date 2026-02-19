import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { OPTIONS } from './constants.ts';
import { KeyboardAvoidingViewCustomProps } from './types.ts';

const KeyboardAvoidingViewCustom = ({ children, style, scrollContentStyle }: KeyboardAvoidingViewCustomProps) => {
  return (
    <KeyboardAvoidingView
      behavior={OPTIONS.behavior}
      style={[styles.flex1, style]}
      keyboardVerticalOffset={OPTIONS.keyboardVerticalOffset}
    >
      <ScrollView
        style={styles.flex1}
        contentContainerStyle={scrollContentStyle}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});

export default KeyboardAvoidingViewCustom;
