import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
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
import TextInputCustom from '@/components/atoms/TextInputCustom';
import { RADIUS } from '@/core/constants/sizes.ts';
import SafeAreaViewCustom from '@/components/atoms/SafeAreaViewCustom';
import KeyboardAvoidingViewCustom from '@/components/atoms/KeyboardAvoidingViewCustom';
import { ScrollView } from 'react-native-gesture-handler';

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
    <SafeAreaViewCustom>
      <View style={[styles.container, computedStyles.container]}>
        <AppleIcon />
        <TextCustom text="asdsa" mode="title" />
        <Button title={'res'} onPress={() => console.log('rety')} />
        <TouchableOpacity>
          <TextCustom text="asdsa" mode="title" />
        </TouchableOpacity>
        <ShadowCustom mode="medium">
          <TextCustom text="asdsa" mode="title" />
        </ShadowCustom>
        <TextInputCustom placeholder="textsss" leftIcon={<AppleIcon />} shadowMode="base" />
        <TextInputCustom placeholder="textsss" leftIcon={<AppleIcon />} shadowMode="medium" />
        <TextInputCustom placeholder="textsss" leftIcon={<AppleIcon />} shadowMode="alt" />
        <AutoImage source={AvatarImage} paddingHorizontal={30} />
      </View>
    </SafeAreaViewCustom>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 32,
  },
});

export default Man;
