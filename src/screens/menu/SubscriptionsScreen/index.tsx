import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';

import { CheckmarkIcon, XMarkIcon } from '@/assets/icons';
import Button from '@/components/atoms/Button';
import TextCustom from '@/components/atoms/TextCustom';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';
import Header from '@/components/molecules/Header';
import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import { BOX_SHADOW } from '@/core/constants/styles.ts';
import useTheme from '@/hooks/useTheme.ts';

import { CARD_HEIGHT, SUBSCRIPTIONS } from './constants.ts';
import { SubscriptionPlans } from './types.ts';

const SubscriptionScreen = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const ref = useRef<ICarouselInstance>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const computedStyles = StyleSheet.create({
    priceColor: {
      color: colors.textTertiary,
    },
  });

  const gradientMap: Record<SubscriptionPlans, string[]> = {
    free: [colors.backgroundHover, colors.warningDark],
    basic: [colors.backgroundHover, colors.link],
    premium: [colors.backgroundHover, colors.primary40],
  };

  return (
    <SafeAreaViewCustom>
      <Header title={t('subscription.header')} />
      <Carousel
        ref={ref}
        data={SUBSCRIPTIONS}
        width={SCREEN_WIDTH}
        height={CARD_HEIGHT}
        mode="parallax"
        loop={false}
        containerStyle={styles.carouselContainer}
        onSnapToItem={index => setActiveIndex(index)}
        renderItem={({ item }) => (
          <View style={styles.wrapper}>
            <LinearGradient
              colors={gradientMap[item.gradientKey]}
              style={[styles.linearGradient, { height: CARD_HEIGHT }]}
              locations={[0, 0.85]}
            >
              <TextCustom text={t(item.name)} mode={TextModes.Xxl} style={styles.header} />

              <View style={styles.priceContainer}>
                <TextCustom text={item.price} mode={TextModes.Title} />
                <TextCustom text={t('subscription.month')} mode={TextModes.Title} style={computedStyles.priceColor} />
              </View>

              <View style={styles.iconContainer}>
                <item.icon />
              </View>

              <View style={styles.listContainer}>
                {item.pros.map((pro, index) => (
                  <View style={styles.innerListContainer} key={`pro-${index}`}>
                    <CheckmarkIcon />
                    <TextCustom text={t(pro)} mode={TextModes.Secondary} style={styles.prosAndConsText} />
                  </View>
                ))}

                {item.cons.map((con, index) => (
                  <View style={styles.innerListContainer} key={`con-${index}`}>
                    <XMarkIcon />
                    <TextCustom text={t(con)} mode={TextModes.Secondary} style={styles.prosAndConsText} />
                  </View>
                ))}
              </View>
            </LinearGradient>
          </View>
        )}
      />
      <Button
        title={t('actions.choose')}
        containerStyle={styles.button}
        onPress={() => {
          const selected = SUBSCRIPTIONS[activeIndex];
          console.log('Selected subscription:', selected);
        }}
      />
    </SafeAreaViewCustom>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: SPACING.xs,
  },
  carouselContainer: {
    marginLeft: -SPACING.xl,
  },
  linearGradient: {
    borderRadius: RADIUS.medium,
    boxShadow: BOX_SHADOW.strong,
  },
  header: {
    textAlign: 'center',
    paddingTop: SPACING.lg,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: SPACING.xs,
  },
  iconContainer: {
    alignItems: 'center',
    paddingTop: SPACING.m,
    paddingBottom: SPACING.lg,
  },
  listContainer: {
    paddingHorizontal: SPACING.m,
  },
  innerListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: SPACING.xs,
  },
  prosAndConsText: {
    paddingLeft: SPACING.xs,
  },
  button: {
    paddingTop: SPACING.xl,
  },
});

export default SubscriptionScreen;
