import { Button, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppleIcon } from '@/assets/icons';
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks.ts';
import { amountSelector } from '@/store/agents/selectors.ts';
import { setAmount } from '@/store/agents';
import useTheme from '@/hooks/useTheme.ts';

const Man = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const amount = useAppSelector(amountSelector);

  const amountHandler = () => dispatch(setAmount(5));

  const computedStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
  });

  return (
    <View style={[styles.container, computedStyles.container]}>
      <AppleIcon />
      <Text>{amount}</Text>
      <Button title={'res'} onPress={amountHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Man;
