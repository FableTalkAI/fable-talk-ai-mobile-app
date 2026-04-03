export type SubscriptionButtonProps = {
  title: string;
  price: number;
  pricePerMonth: number | null;
  discount?: number;
  isSelected?: boolean;
  onPress?: () => void;
};
