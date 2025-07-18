import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppleIcon } from '@/assets/icons';
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks.ts';
import { amountSelector } from '@/store/agents/selectors.ts';
import { setAmount } from '@/store/agents';
import useTheme from '@/hooks/useTheme.ts';
import TextCustom from '@/components/atoms/TextCustom';
import Button from '@/components/atoms/Button';
import ShadowCustom from '@/components/atoms/ShadowCustom';
import AutoImage from '@/components/atoms/AutoImage';
import { AvatarImage } from '@/assets/images';

const Man = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const amount = useAppSelector(amountSelector);

  const amountHandler = () => dispatch(setAmount(5));

  const computedStyles = StyleSheet.create({
    container: {
      backgroundColor: '',
    },
  });

  return (
    <View style={[styles.container, computedStyles.container]}>
      <AppleIcon />
      <TextCustom text="asdsa" mode="title" />
      <Button title={'res'} onPress={() => console.log('rety')} />
      <ShadowCustom mode="medium">
        <TextCustom text="asdsa" mode="title" />
      </ShadowCustom>
      <AutoImage source={AvatarImage} paddingHorizontal={30} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Man;
