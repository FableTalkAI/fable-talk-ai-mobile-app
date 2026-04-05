import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import useModal from '@/features/overlay/hooks/useModal.ts';
import { XMarkIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import PressableCustom from '@/shared/ui/PressableCustom';
import SafeAreaViewCustom from '@/shared/ui/SafeAreaViewCustom';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

import { ModalCustomProps } from './types.ts';

const ModalCustom = ({ children, title, description }: ModalCustomProps) => {
  const { colors } = useTheme();
  const { closeModal } = useModal();

  const computedStyles = StyleSheet.create({
    scrollContainer: {
      backgroundColor: colors.backgroundBase,
    },
  });

  return (
    <Modal animationType="fade" visible transparent>
      <SafeAreaViewCustom isTransparent style={styles.wrapper}>
        <Pressable onPress={closeModal} style={[StyleSheet.absoluteFill, styles.overlay]} />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.scrollContainer, computedStyles.scrollContainer]}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <View>
            {title && <TextCustom style={styles.text} text={title} mode={TextModes.Title} />}
            {description && <TextCustom style={styles.text} text={description} textColor={colors.textSecondary} />}
          </View>

          {children}

          <PressableCustom
            withEnteringAnimation={false}
            withExitingAnimation={false}
            onPress={closeModal}
            hitSlop={10}
            containerStyle={styles.close}
          >
            <XMarkIcon width={12} height={12} fill={colors.textPrimary} />
          </PressableCustom>
        </ScrollView>
      </SafeAreaViewCustom>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: '#0000007F',
  },
  scroll: {
    marginVertical: SPACING.xxs,
    flexGrow: 0,
    maxWidth: 500,
  },
  scrollContainer: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.small,
    gap: SPACING.s,
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl * 1.5,
  },
  text: {
    textAlign: 'center',
  },
  close: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default ModalCustom;
