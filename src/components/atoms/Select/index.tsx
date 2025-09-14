import { SCREEN_HEIGHT } from '@gorhom/bottom-sheet';
import { useMemo, useRef, useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';

import { TriangleIcon } from '@/assets/icons';
import PressableCustom from '@/components/atoms/PressableCustom';
import TextCustom from '@/components/atoms/TextCustom';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import { BOX_SHADOW } from '@/core/constants/styles.ts';
import useTheme from '@/hooks/useTheme.ts';

import { MAX_DROPDOWN_HEIGHT, ROW_HEIGHT } from './constants.ts';
import { SelectProps } from './types.ts';

const Select = ({ defaultOption, options, width = 90 }: SelectProps) => {
  const { colors } = useTheme();

  const triggerRef = useRef<View>(null);
  const defaultIndex = options.findIndex(option => option === defaultOption);

  const [isOpen, setIsOpen] = useState(false);
  const [shouldOpenDown, setShouldOpenDown] = useState(true);
  const [selectedOption, setSelectedOption] = useState(defaultIndex !== -1 ? options[defaultIndex] : options[0]);
  const [triggerLayout, setTriggerLayout] = useState({ x: 0, y: 0, w: 0, h: 0 });

  const estimatedDropdownH = useMemo(
    () => Math.min(MAX_DROPDOWN_HEIGHT, options.length * ROW_HEIGHT + 2 * SPACING.xs),
    [options],
  );
  const top = useMemo(
    () =>
      shouldOpenDown
        ? triggerLayout.y + triggerLayout.h + SPACING.xxs
        : triggerLayout.y - (triggerLayout.h + ROW_HEIGHT + SPACING.xs + SPACING.xxs),
    [shouldOpenDown, triggerLayout.h, triggerLayout.y],
  );

  const computedStyles = StyleSheet.create({
    pressable: {
      width,
      backgroundColor: colors.backgroundHover,
    },
    flatListWrapper: {
      top,
      left: triggerLayout.x,
      width,
    },
    flatList: {
      width,
    },
    flatListContainer: {
      width,
      backgroundColor: colors.backgroundAlt,
    },
  });

  const selectOptionHandler = (index: number) => () => {
    setSelectedOption(options[index]);
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
        <PressableCustom onPress={openHandler} style={[styles.pressable, computedStyles.pressable]}>
          <TextCustom style={styles.flex1} numberOfLines={1} mode={TextModes.Caption} text={selectedOption} />
          <TriangleIcon />
        </PressableCustom>
      </View>

      <Modal transparent visible={isOpen} animationType="fade">
        <GestureHandlerRootView style={styles.flex1}>
          <Pressable onPressIn={() => setIsOpen(false)} style={StyleSheet.absoluteFill} />

          <View style={[styles.flatListWrapper, computedStyles.flatListWrapper]}>
            <FlatList
              style={[styles.flatList, computedStyles.flatList]}
              contentContainerStyle={[styles.flatListContainer, computedStyles.flatListContainer]}
              data={options}
              renderItem={({ item, index }) => (
                <PressableCustom onPress={selectOptionHandler(index)}>
                  <TextCustom mode={TextModes.Caption} text={item} />
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
    boxShadow: BOX_SHADOW.base,
  },
  flatListContainer: {
    gap: SPACING.xxs,
    maxHeight: MAX_DROPDOWN_HEIGHT,
    borderRadius: RADIUS.small,
    padding: SPACING.xs,
  },
});

export default Select;
