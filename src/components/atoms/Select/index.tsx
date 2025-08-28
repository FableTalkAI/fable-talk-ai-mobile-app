import { SCREEN_HEIGHT } from '@gorhom/bottom-sheet';
import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeInUp, FadeOutDown, FadeOutUp } from 'react-native-reanimated';

import { TriangleIcon } from '@/assets/icons';
import PressableCustom from '@/components/atoms/PressableCustom';
import ShadowCustom from '@/components/atoms/ShadowCustom';
import { ShadowCustomModes } from '@/components/atoms/ShadowCustom/types.ts';
import TextCustom from '@/components/atoms/TextCustom';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';

import { MAX_DROPDOWN_HEIGHT, ROW_HEIGHT, VSPACE } from './constants.ts';
import { SelectProps, SelectRef } from './types.ts';

const Select = forwardRef<SelectRef, SelectProps>(({ defaultOption, options, width = 90, onChange }, ref) => {
  const { colors } = useTheme();

  const triggerRef = useRef<View>(null);
  const defaultIndex = options.findIndex(option => option === defaultOption);

  const [isOpen, setIsOpen] = useState(false);
  const [offset, setOffset] = useState({ shouldOpenDown: true, value: ROW_HEIGHT });
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex !== -1 ? defaultIndex : 0);

  const selectedOption = useMemo(() => options[selectedIndex], [options, selectedIndex]);
  const estimatedDropdownH = useMemo(
    () => Math.min(MAX_DROPDOWN_HEIGHT, options.length * ROW_HEIGHT + 2 * SPACING.xs),
    [options],
  );
  const animatedValue = useMemo(() => {
    return offset.shouldOpenDown
      ? { entering: FadeInUp, exiting: FadeOutUp }
      : { entering: FadeInDown, exiting: FadeOutDown };
  }, [offset]);

  const computedStyles = StyleSheet.create({
    pressable: {
      width,
      padding: SPACING.xs,
      borderRadius: RADIUS.small,
      backgroundColor: colors.backgroundHover,
      marginBottom: SPACING.xxs,
    },
    shadow: {
      width,
      backgroundColor: colors.backgroundAlt,
      maxHeight: MAX_DROPDOWN_HEIGHT,
      borderRadius: RADIUS.small,
      padding: SPACING.xs,
    },
    flatListContainer: {
      gap: SPACING.xxs,
    },
    dropdown: {
      ...(offset.shouldOpenDown ? { top: offset.value } : { bottom: offset.value + VSPACE }),
    },
  });

  useImperativeHandle(
    ref,
    () => ({
      close: closeHandler,
    }),
    [],
  );

  const selectOptionHandler = (index: number) => () => {
    setSelectedIndex(index);
    onChange?.(options[index]);
    setIsOpen(false);
  };

  const openHandler = () => {
    requestAnimationFrame(() => {
      triggerRef.current?.measureInWindow?.((x, y, w, h) => {
        const spaceBelow = SCREEN_HEIGHT - (y + h);
        const shouldOpenDownLocal = spaceBelow >= estimatedDropdownH + VSPACE;
        const value = h || ROW_HEIGHT;

        setOffset({
          shouldOpenDown: shouldOpenDownLocal,
          value,
        });
        setIsOpen(true);
      });
    });
  };

  const closeHandler = () => {
    setIsOpen(false);
  };

  return (
    <View ref={triggerRef}>
      <PressableCustom
        onPress={isOpen ? closeHandler : openHandler}
        style={[styles.pressable, computedStyles.pressable]}
      >
        <TextCustom style={styles.text} numberOfLines={1} mode={TextModes.Caption} text={selectedOption} />
        <TriangleIcon />
      </PressableCustom>

      {isOpen && (
        <Animated.View
          entering={animatedValue.entering}
          exiting={animatedValue.exiting}
          style={[styles.dropdown, computedStyles.dropdown]}
        >
          <ShadowCustom mode={ShadowCustomModes.Medium} style={computedStyles.shadow}>
            <FlatList
              contentContainerStyle={computedStyles.flatListContainer}
              data={options}
              renderItem={({ item, index }) => (
                <PressableCustom onPress={selectOptionHandler(index)}>
                  <TextCustom mode={TextModes.Caption} text={item} />
                </PressableCustom>
              )}
            />
          </ShadowCustom>
        </Animated.View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
  },
  dropdown: {
    position: 'absolute',
  },
});

export default Select;
