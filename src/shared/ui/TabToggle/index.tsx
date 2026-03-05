import { BlurView } from '@react-native-community/blur';
import { useMemo, useRef } from 'react';
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  LayoutAnimationConfig,
  runOnJS,
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Theme } from '@/features/profile/store/user/types.ts';
import useTheme from '@/shared/hooks/useTheme.ts';
import { WINDOW_WIDTH } from '@/shared/model/device.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import { BOX_SHADOW } from '@/shared/model/styles.ts';
import ResizeIcon from '@/shared/ui/ResizeIcon';
import TextCustom from '@/shared/ui/TextCustom';

import { TabToggleProps } from './types.ts';

const TabToggle = ({
  tabs,
  tabContainerWidth = WINDOW_WIDTH - SPACING.xl * 2,
  style,
  activeTab,
  onChange,
  leftIcon,
  rightIcon,
}: TabToggleProps) => {
  const { colors, theme } = useTheme();

  const previousIndex = useRef(0);
  const translateX = useSharedValue(0);

  const tabWidth = tabContainerWidth / tabs.length;
  const cloneElementProps = {
    width: 20,
    height: 20,
  };
  const [entering, exiting] = useMemo(() => {
    const direction = activeTab > previousIndex.current ? 1 : -1;

    const enteringLocal = direction === 1 ? SlideInRight : SlideInLeft;
    const exitingLocal = direction === 1 ? SlideOutRight : SlideOutLeft;

    return [enteringLocal, exitingLocal];
  }, [activeTab]);

  const computedStyles = StyleSheet.create({
    tabsWrapper: {
      width: tabContainerWidth,
      backgroundColor: colors.backgroundBase,
    },
    tabButton: {
      width: tabWidth,
    },
    slider: {
      backgroundColor: colors.backgroundBase,
    },
  });

  const animatedSliderStyle = useAnimatedStyle(() => {
    return {
      width: tabWidth - 8,
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  }, [tabWidth]);

  const updateIndex = (newIndex: number) => {
    if (newIndex === activeTab) return;

    previousIndex.current = activeTab;
    onChange(newIndex);

    translateX.value = withSpring(newIndex * tabWidth, {
      damping: 15,
      stiffness: 120,
    });
  };

  const pan = Gesture.Pan()
    .activeOffsetX([-20, 20])
    .onEnd(e => {
      if (e.translationX < -50 && activeTab < tabs.length - 1) {
        runOnJS(updateIndex)(activeTab + 1);
      } else if (e.translationX > 50 && activeTab > 0) {
        runOnJS(updateIndex)(activeTab - 1);
      }
    });

  return (
    <View style={[styles.flex1, style]}>
      <View style={styles.wrapper}>
        {leftIcon}

        <View style={[styles.tabsWrapper, computedStyles.tabsWrapper]}>
          <Animated.View style={[styles.slider, computedStyles.slider, animatedSliderStyle]}>
            <BlurView blurType={theme === Theme.Dark ? 'dark' : 'light'} style={StyleSheet.absoluteFill} />
          </Animated.View>

          {tabs.map((tab, i) => {
            const textStyles: StyleProp<TextStyle> = {
              color: activeTab === i ? colors.textPrimary : colors.gray40,
              fontWeight: activeTab === i ? '600' : '400',
            };

            return (
              <TouchableOpacity
                key={i}
                activeOpacity={0.7}
                onPress={() => updateIndex(i)}
                style={[styles.tabButton, computedStyles.tabButton]}
              >
                <ResizeIcon icon={tab.icon} cloneElementProps={cloneElementProps} />
                <TextCustom text={tab.name} style={textStyles} />
              </TouchableOpacity>
            );
          })}
        </View>

        {rightIcon}
      </View>

      <GestureDetector gesture={pan}>
        <LayoutAnimationConfig skipEntering>
          <Animated.View key={`tab-${activeTab}`} entering={entering} exiting={exiting} style={styles.flex1}>
            {tabs[activeTab].content}
          </Animated.View>
        </LayoutAnimationConfig>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  tabsWrapper: {
    alignSelf: 'center',
    borderRadius: RADIUS.circle,
    flexDirection: 'row',
    position: 'relative',
    boxShadow: BOX_SHADOW.medium,
  },
  slider: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    left: 4,
    overflow: 'hidden',
    borderRadius: RADIUS.circle,
    boxShadow: BOX_SHADOW.strong,
  },
  tabButton: {
    flexDirection: 'row',
    gap: SPACING.xxs,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.s,
    zIndex: 1,
  },
});

export default TabToggle;
