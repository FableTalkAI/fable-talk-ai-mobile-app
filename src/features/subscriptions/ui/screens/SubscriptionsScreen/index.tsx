import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';

import { CheckmarkIcon, XMarkIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import { BOX_SHADOW } from '@/shared/model/styles.ts';
import Button from '@/shared/ui/Button';
import Header from '@/shared/ui/Header';
import SafeAreaViewCustom from '@/shared/ui/SafeAreaViewCustom';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

import { CARD_HEIGHT, SUBSCRIPTIONS } from './constants.ts';
import { SubscriptionPlans } from './types.ts';

const SubscriptionScreen = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const ref = useRef<ICarouselInstance>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const gradientMap: Record<SubscriptionPlans, string[]> = {
    free: [colors.gray10, colors.warningDark],
    basic: [colors.gray10, colors.link],
    premium: [colors.gray10, colors.primary40],
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
              <TextCustom textColor={colors.gray90} text={t(item.name)} mode={TextModes.Xxl} style={styles.header} />

              <View style={styles.priceContainer}>
                <TextCustom textColor={colors.gray90} text={item.price} mode={TextModes.Title} />
                <TextCustom textColor={colors.textTertiary} text={t('subscription.month')} mode={TextModes.Title} />
              </View>

              <View style={styles.iconContainer}>
                <item.icon />
              </View>

              <View style={styles.listContainer}>
                {item.pros.map((pro, index) => (
                  <View style={styles.innerListContainer} key={`pro-${index}`}>
                    <CheckmarkIcon />
                    <TextCustom
                      textColor={colors.gray90}
                      text={t(pro)}
                      mode={TextModes.Secondary}
                      style={styles.prosAndConsText}
                    />
                  </View>
                ))}

                {item.cons.map((con, index) => (
                  <View style={styles.innerListContainer} key={`con-${index}`}>
                    <XMarkIcon />
                    <TextCustom
                      textColor={colors.gray90}
                      text={t(con)}
                      mode={TextModes.Secondary}
                      style={styles.prosAndConsText}
                    />
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
