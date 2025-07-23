import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { AppleIcon } from '@/assets/icons';
import { AvatarImage } from '@/assets/images';
import AutoImage from '@/components/atoms/AutoImage';
import Button from '@/components/atoms/Button';
import SafeAreaViewCustom from '@/components/atoms/SafeAreaViewCustom';
import ShadowCustom from '@/components/atoms/ShadowCustom';
import TextCustom from '@/components/atoms/TextCustom';
import TextInputCustom from '@/components/atoms/TextInputCustom';

const Man = () => {
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
