import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

import {
  GreenCheckMarkIcon,
  RedCrossIcon,
  SubscriptionBasicIcon,
  SubscriptionFreeIcon,
  SubscriptionPremiumIcon,
} from '@/assets/icons';
import Button from '@/components/atoms/Button';
import TextCustom from '@/components/atoms/TextCustom';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';
import Header from '@/components/molecules/Header';
import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';

const SubscriptionScreen = () => {
  const { colors } = useTheme();

  const subscriptions = [
    {
      name: 'Free',
      price: '0$',
      pros: [
        'Completely free',
        'Access to a basic set of Agents',
        'Try out the app without any commitment',
        'Limited but sufficient session time for exploration',
      ],
      cons: [
        'Daily message limit',
        'Contains Advertising',
        'Only basic Agents available',
        'Possible delays during peak hours due to lower server priority',
      ],
      svg: SubscriptionFreeIcon,
    },
    {
      name: 'Basic',
      price: '5$',
      pros: [
        'Affordable, great for regular use',
        'Higher message limit',
        'Access to more Agents',
        'Faster responses with priority processing',
      ],
      cons: ['Small limits on message limit  ', 'Limited customization'],
      svg: SubscriptionBasicIcon,
    },
    {
      name: 'Premium',
      price: '12$',
      pros: [
        'Unlimited messages and sessions',
        'Full access to all Agents',
        'Highest request priority',
        'Full customization access',
      ],
      cons: [],
      svg: SubscriptionPremiumIcon,
    },
  ];

  const computedStyles = StyleSheet.create({
    cardContainer: {
      maxWidth: SCREEN_WIDTH - 32 * 2,
      width: SCREEN_WIDTH - 32 * 2,
    },
    priceColor: {
      color: colors.textSecondary,
    },
  });

  return (
    <SafeAreaViewCustom>
      <Header title="Subscriptions" />
      <FlatList
        data={subscriptions}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <View style={computedStyles.cardContainer}>
            <LinearGradient colors={[colors.backgroundBase, colors.warningDark]} style={styles.linearGradient}>
              <TextCustom text={item.name} mode={TextModes.Xxl} style={styles.header} />

              <View style={styles.priceContainer}>
                <TextCustom text={item.price} mode={TextModes.Title} />
                <TextCustom text="/month" mode={TextModes.Title} style={computedStyles.priceColor} />
              </View>

              <View style={styles.iconContainer}>
                <item.svg />
              </View>

              <View style={styles.listContainer}>
                {item.pros.map((pro, index) => (
                  <View style={styles.innerListContainer} key={`pro-${index}`}>
                    <GreenCheckMarkIcon />
                    <TextCustom text={pro} mode={TextModes.Caption} style={styles.prosAndConsText} />
                  </View>
                ))}

                {item.cons.map((con, index) => (
                  <View style={styles.innerListContainer} key={`con-${index}`}>
                    <RedCrossIcon />
                    <TextCustom text={con} mode={TextModes.Caption} style={styles.prosAndConsText} />
                  </View>
                ))}
              </View>
            </LinearGradient>
          </View>
        )}
      />
      <Button title="Choose" containerStyle={styles.button} onPress={() => {}} />
    </SafeAreaViewCustom>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  linearGradient: {
    flex: 1,
    padding: SPACING.m,
    borderRadius: RADIUS.medium,
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
