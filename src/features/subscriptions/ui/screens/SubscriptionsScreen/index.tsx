import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import useSubscription from '@/features/subscriptions/hooks/useSubscription.ts';
import { SubscriptionButton } from '@/features/subscriptions/ui/SubscriptionButton/index.tsx';
import { CheckmarkRoundedIcon } from '@/shared/assets/icons/index.ts';
import useTheme from '@/shared/hooks/useTheme.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import { BOX_SHADOW } from '@/shared/model/styles.ts';
import Button from '@/shared/ui/Button';
import Header from '@/shared/ui/Header';
import ResizeIcon from '@/shared/ui/ResizeIcon/index.tsx';
import SafeAreaViewCustom from '@/shared/ui/SafeAreaViewCustom';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

import { BENEFITS } from './constants.tsx';
import { SubscriptionPlans } from './types.ts';

const SubscriptionScreen = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  useSubscription();
  const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionPlans>(SubscriptionPlans.Annual);

  const computedStyles = StyleSheet.create({
    benefitRow: {
      borderColor: colors.backgroundQuaternary,
    },
    mark: {
      backgroundColor: colors.backgroundQuaternary,
    },
    containerHeaderText: {
      backgroundColor: colors.backgroundBase,
    },
  });

  const resizeIconOptions = {
    leftIcon: {
      fill: colors.iconPrimary,
    },
  };

  const ListHeader = (
    <View style={[styles.containerHeaderText, computedStyles.containerHeaderText]}>
      <TextCustom text="Free" mode={TextModes.Subtitle} style={styles.mark} />
      <TextCustom text="Pro" mode={TextModes.Subtitle} style={[styles.mark, computedStyles.mark]} />
    </View>
  );

  return (
    <SafeAreaViewCustom>
      <Header title={t('subscription.header')} />
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <FlatList
            style={styles.list}
            data={BENEFITS}
            bounces={false}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={ListHeader}
            renderItem={({ item, index }) => {
              const isLast = index === BENEFITS.length - 1;

              return (
                <View
                  key={item.text}
                  style={[computedStyles.benefitRow, styles.benefitRow, isLast && styles.benefitLastRow]}
                >
                  <View style={styles.titleContainer}>
                    <ResizeIcon icon={item.leftIcon} cloneElementProps={resizeIconOptions.leftIcon} />
                    <TextCustom text={t(item.text)} style={styles.benefitsText} />
                  </View>

                  <View style={styles.markContainer}>
                    <View style={styles.mark}>
                      <ResizeIcon icon={item.freeIcon} />
                    </View>
                    <View style={[styles.mark, computedStyles.mark]}>
                      <ResizeIcon icon={<CheckmarkRoundedIcon width={24} height={24} />} />
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>

      <View style={styles.subscriptionButtonsContainer}>
        <SubscriptionButton
          title={t('subscription.annual')}
          price={79.99}
          pricePerMonth={6.66}
          discount={15}
          isSelected={selectedSubscription === SubscriptionPlans.Annual}
          onPress={() => setSelectedSubscription(SubscriptionPlans.Annual)}
        />
        <SubscriptionButton
          title={t('subscription.monthly')}
          price={7.99}
          pricePerMonth={7.99}
          isSelected={selectedSubscription === SubscriptionPlans.Monthly}
          onPress={() => setSelectedSubscription(SubscriptionPlans.Monthly)}
        />
      </View>

      <Button
        title={t('actions.choose')}
        onPress={() => {
          console.log('Selected subscription:');
        }}
      />
    </SafeAreaViewCustom>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginBottom: SPACING.xl,
  },
  container: {
    borderRadius: RADIUS.large,
    boxShadow: BOX_SHADOW.intense,
  },
  list: {
    borderRadius: RADIUS.large,
  },
  containerHeaderText: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingVertical: SPACING.m,
  },
  markContainer: {
    height: '100%',
    flexDirection: 'row',
  },
  mark: {
    width: 60,
    paddingVertical: SPACING.xxs,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  benefitRow: {
    flexDirection: 'row',
    marginLeft: SPACING.m,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  benefitLastRow: {
    borderBottomWidth: 0,
  },
  benefitsText: {
    paddingLeft: SPACING.xs,
    flexShrink: 1,
  },
  subscriptionButtonsContainer: {
    flexDirection: 'row',
    gap: SPACING.m,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: SPACING.m,
  },
});

export default SubscriptionScreen;
