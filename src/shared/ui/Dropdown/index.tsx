import { useMemo, useRef, useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';

import { MoreIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme';
import { SCREEN_HEIGHT } from '@/shared/model/constants.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import { BOX_SHADOW } from '@/shared/model/styles.ts';
import PressableCustom from '@/shared/ui/PressableCustom';
import ResizeIcon from '@/shared/ui/ResizeIcon';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

import { MAX_DROPDOWN_HEIGHT, ROW_HEIGHT } from './constants.ts';
import { DropdownProps } from './types.ts';

const Dropdown = ({ data, width = 110 }: DropdownProps) => {
  const { colors } = useTheme();

  const triggerRef = useRef<View>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [shouldOpenDown, setShouldOpenDown] = useState(true);
  const [triggerLayout, setTriggerLayout] = useState({ x: 0, y: 0, w: 0, h: 0 });

  const cloneElementProps = { width: 16, height: 16 };
  const estimatedDropdownH = useMemo(
    () => Math.min(MAX_DROPDOWN_HEIGHT, data.length * ROW_HEIGHT + (data.length - 1) * SPACING.xs + 2 * SPACING.xs),
    [data],
  );

  const top = useMemo(
    () =>
      shouldOpenDown
        ? triggerLayout.y + triggerLayout.h + SPACING.xxs
        : triggerLayout.y - (triggerLayout.h + ROW_HEIGHT + SPACING.xs + SPACING.xxs),
    [shouldOpenDown, triggerLayout.h, triggerLayout.y],
  );

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
    setIsOpen(false);
  };

  const openHandler = () => {
    requestAnimationFrame(() => {
      triggerRef.current?.measureInWindow?.((x, y, w, h) => {
        const spaceBelow = SCREEN_HEIGHT - (y + h);

        setTriggerLayout({ x, y, w, h });
        setShouldOpenDown(spaceBelow >= (estimatedDropdownH + SPACING.xxs) * 1.5);
        setIsOpen(true);
      });
    });
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
          <Pressable onPressIn={() => setIsOpen(false)} style={StyleSheet.absoluteFill} />

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
                  <TextCustom mode={TextModes.Secondary} text={item.title} />
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
