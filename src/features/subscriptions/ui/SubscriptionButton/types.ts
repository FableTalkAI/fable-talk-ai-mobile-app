export type SubscriptionButtonProps = {
  title: string;
  price: number;
  pricePerMonth: number;
  discount?: number;
  isSelected?: boolean;
  onPress?: () => void;
};
