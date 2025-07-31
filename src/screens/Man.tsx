import { ScrollView, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { AppleIcon, NotificationBellIcon } from '@/assets/icons';
import { AvatarImage } from '@/assets/images';
import AutoImage from '@/components/atoms/AutoImage';
import Button from '@/components/atoms/Button';
import ShadowCustom from '@/components/atoms/ShadowCustom';
import TextCustom from '@/components/atoms/TextCustom';
import TextInputCustom from '@/components/atoms/TextInputCustom';
import Avatar from '@/components/molecules/Avatar';
import Header from '@/components/molecules/Header';
import KeyboardAvoidingViewCustom from '@/components/molecules/KeyboardAvoidingViewCustom';
import OptionBar from '@/components/molecules/OptionBar';
import { OptionBarColorModes, OptionBarModes } from '@/components/molecules/OptionBar/types.ts';
import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom';
import Skeleton from '@/components/molecules/Skeleton';

const Man = () => {
  const computedStyles = StyleSheet.create({
    container: {
      backgroundColor: '',
    },
  });

  return (
    <SafeAreaViewCustom>
      <KeyboardAvoidingViewCustom>
        <ScrollView>
          <Header header="Man" />

          <OptionBar title="Settings" mode={OptionBarModes.Simple} />
          <OptionBar
            title="Settings"
            subtitle="Enable"
            mode={OptionBarModes.Complex}
            colorMode={OptionBarColorModes.Red}
            leftIcon={<NotificationBellIcon />}
          />

          <Avatar />

          <View style={[styles.container, computedStyles.container]}>
            <AppleIcon />
            <TextCustom text="asdsa" mode="title" />
            <Button title={'res'} onPress={() => console.log('rety')} isDisable />
            <TouchableOpacity>
              <TextCustom text="asdsa" mode="title" />
            </TouchableOpacity>
            <ShadowCustom mode="medium">
              <TextCustom text="asdsa" mode="title" />
            </ShadowCustom>
            <AutoImage source={AvatarImage} paddingHorizontal={30} />

            <Skeleton />

            <TextInputCustom placeholder="textsss" />
            <TextInputCustom placeholder="textsss" leftIcon={<AppleIcon />} shadowMode="medium" />
            <TextInputCustom placeholder="textsss" leftIcon={<AppleIcon />} shadowMode="alt" />
          </View>
        </ScrollView>
      </KeyboardAvoidingViewCustom>
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
