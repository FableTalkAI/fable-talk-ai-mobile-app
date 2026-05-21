import { useState } from 'react';
import { LayoutChangeEvent, Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useDropdownLayout } from '@/shared/hooks/useDropdownLayout.ts';
import useTheme from '@/shared/hooks/useTheme';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/shared/model/constants.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import { BOX_SHADOW } from '@/shared/model/styles.ts';
import TextCustom from '@/shared/ui/TextCustom';

import { TooltipProps } from './types.ts';

export const Tooltip = ({ children, content, style }: TooltipProps) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { openHandler, isOpen, triggerRef, triggerLayout, closeHandler } = useDropdownLayout(1);

  const [tooltipWidth, setTooltipWidth] = useState(0);
  const [realHeight, setRealHeight] = useState(0);

  const triggerCenterY = triggerLayout.y + triggerLayout.h / 2;
  const isOpenedDown = triggerCenterY <= SCREEN_HEIGHT / 2;

  const exactTop = triggerLayout.y + triggerLayout.h + 8;
  const exactBottom = SCREEN_HEIGHT - triggerLayout.y + 8;

  const calculatedMaxHeight = isOpenedDown
    ? SCREEN_HEIGHT - exactTop - (insets.bottom || 12)
    : triggerLayout.y - (insets.top || 12);

  const isScrollEnabled = realHeight >= calculatedMaxHeight;

  const targetLeft = triggerLayout.x + triggerLayout.w / 2 - tooltipWidth / 2;
  const correctedLeft = Math.max(SPACING.s, Math.min(targetLeft, SCREEN_WIDTH - tooltipWidth - SPACING.s));

  const computedStyles = StyleSheet.create({
    tooltipContainer: {
      top: isOpenedDown ? exactTop : undefined,
      bottom: !isOpenedDown ? exactBottom : undefined,
      left: correctedLeft,
      maxHeight: calculatedMaxHeight,
      maxWidth: SCREEN_WIDTH - SPACING.s * 2,
      backgroundColor: colors.backgroundBase,
    },
  });

  const onLayoutHandler = (e: LayoutChangeEvent) => {
    setTooltipWidth(e.nativeEvent.layout.width);
    setRealHeight(e.nativeEvent.layout.height);
  };

  return (
    <>
      <View style={style} ref={triggerRef} collapsable={false}>
        <Pressable hitSlop={10} onPress={openHandler}>
          {children}
        </Pressable>
      </View>

      <Modal transparent visible={isOpen} animationType="fade" onRequestClose={closeHandler}>
        <Pressable style={styles.overlay} onPress={closeHandler} />

        <View onLayout={onLayoutHandler} style={[styles.tooltipContainer, computedStyles.tooltipContainer]}>
          <Pressable disabled={isScrollEnabled} onPress={closeHandler}>
            <ScrollView
              scrollEnabled={isScrollEnabled}
              bounces={false}
              showsVerticalScrollIndicator={isScrollEnabled}
              contentContainerStyle={styles.scrollContent}
            >
              {typeof content === 'string' ? <TextCustom text={content} /> : content}
            </ScrollView>
          </Pressable>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000059',
    ...StyleSheet.absoluteFillObject,
  },
  tooltipContainer: {
    position: 'absolute',
    borderRadius: RADIUS.small,
    padding: SPACING.s,
    boxShadow: BOX_SHADOW.intense,
    alignSelf: 'flex-start',
  },
  scrollContent: {
    alignSelf: 'flex-start',
  },
});
