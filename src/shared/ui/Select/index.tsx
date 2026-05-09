import { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';

import { TriangleIcon } from '@/shared/assets/icons';
import { useDropdownLayout } from '@/shared/hooks/useDropdownLayout.ts';
import useTheme from '@/shared/hooks/useTheme';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import { BOX_SHADOW } from '@/shared/model/styles.ts';
import PressableCustom from '@/shared/ui/PressableCustom';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

import { SelectProps } from './types.ts';

const Select = <T,>({ defaultValue, options, width = 110, onChange }: SelectProps<T>) => {
  const { colors } = useTheme();

  const { top, estimatedDropdownH, openHandler, isOpen, triggerRef, triggerLayout, closeHandler } = useDropdownLayout(
    options.length,
  );

  const defaultIndex = options.findIndex(option => option.value === defaultValue);
  const [selectedOption, setSelectedOption] = useState(defaultIndex !== -1 ? options[defaultIndex] : options[0]);

  const optionsTitles = options.map(option => option.title);

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
      maxHeight: estimatedDropdownH,
    },
    flatListContainer: {
      width,
      backgroundColor: colors.backgroundSecondary,
    },
  });

  const selectOptionHandler = (index: number) => () => {
    setSelectedOption(options[index]);
    onChange(options[index].value);
    closeHandler();
  };

  return (
    <>
      <View ref={triggerRef}>
        <PressableCustom onPress={openHandler} style={[styles.pressable, computedStyles.pressable]}>
          <TextCustom style={styles.flex1} numberOfLines={1} mode={TextModes.Secondary} text={selectedOption.title} />
          <TriangleIcon />
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
              data={optionsTitles}
              renderItem={({ item, index }) => (
                <PressableCustom onPress={selectOptionHandler(index)}>
                  <TextCustom text={item} />
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
});

export default Select;
