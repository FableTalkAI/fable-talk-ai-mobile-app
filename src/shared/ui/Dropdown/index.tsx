import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';

import { MoreIcon } from '@/shared/assets/icons';
import { useDropdownLayout } from '@/shared/hooks/useDropdownLayout.ts';
import useTheme from '@/shared/hooks/useTheme';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import { BOX_SHADOW } from '@/shared/model/styles.ts';
import PressableCustom from '@/shared/ui/PressableCustom';
import ResizeIcon from '@/shared/ui/ResizeIcon';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

import { DropdownProps } from './types.ts';

const Dropdown = ({ data, width = 110 }: DropdownProps) => {
  const { colors } = useTheme();

  const { top, estimatedDropdownH, openHandler, isOpen, triggerRef, triggerLayout, closeHandler } = useDropdownLayout(
    data.length,
  );
  const cloneElementProps = { width: 16, height: 16 };

  const computedStyles = StyleSheet.create({
    flatListWrapper: {
      top,
      left: triggerLayout.x - width + 20,
      width,
    },
    flatList: {
      width,
      maxHeight: estimatedDropdownH,
    },
    flatListContainer: {
      width,
      backgroundColor: colors.backgroundSecondary,
    },
  });

  const onPressHandler = (index: number) => () => {
    data[index].onPress();
    closeHandler();
  };

  return (
    <>
      <View ref={triggerRef}>
        <PressableCustom hitSlop={10} onPress={openHandler} style={styles.pressable}>
          <MoreIcon fill={colors.iconPrimary} />
        </PressableCustom>
      </View>

      <Modal transparent visible={isOpen} animationType="fade">
        <GestureHandlerRootView style={styles.flex1}>
          <Pressable onPressIn={closeHandler} style={StyleSheet.absoluteFill} />

          <View style={[styles.flatListWrapper, computedStyles.flatListWrapper]}>
            <FlatList
              style={[styles.flatList, computedStyles.flatList]}
              contentContainerStyle={[styles.flatListContainer, computedStyles.flatListContainer]}
              bounces={false}
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={({ item, index }) => (
                <PressableCustom style={styles.pressableItem} onPress={onPressHandler(index)}>
                  <ResizeIcon icon={item.icon} cloneElementProps={cloneElementProps} />
                  <TextCustom text={item.title} />
                </PressableCustom>
              )}
            />
          </View>
        </GestureHandlerRootView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.xs,
    borderRadius: RADIUS.small,
  },
  flex1: {
    flex: 1,
  },
  flatListWrapper: {
    position: 'absolute',
  },
  flatList: {
    borderRadius: RADIUS.small,
    boxShadow: BOX_SHADOW.strong,
  },
  flatListContainer: {
    gap: SPACING.xs,
    borderRadius: RADIUS.small,
    padding: SPACING.xs,
  },
  pressableItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
});

export default Dropdown;
