export type SubscriptionButtonProps = {
  title: string;
  price: string;
  pricePerMonth: string | null;
  discount?: number;
  isSelected?: boolean;
  onPress?: () => void;
};
