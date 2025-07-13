import { Button, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppleIcon } from '@/assets/icons';
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks.ts';
import { amountSelector } from '@/store/agents/selectors.ts';
import { setAmount } from '@/store/agents';

const Man = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const amount = useAppSelector(amountSelector);

  const amountHandler = () => dispatch(setAmount(5));

  console.log('ssss');
  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      <AppleIcon />
      <Text>{amount}</Text>
      <Button title={'res'} onPress={amountHandler} />
    </View>
  );
};

export default Man;
