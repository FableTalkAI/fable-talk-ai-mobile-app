import {
  AddAgentIcon,
  AdIcon,
  ChatIcon,
  MessageIcon,
  PencilAndStarIcon,
  PremiumAgentIcon,
  WarningIcon,
  XMarkIcon,
} from '@/shared/assets/icons/index.ts';

export const BENEFITS = [
  {
    leftIcon: <MessageIcon />,
    text: 'subscription.benefits.messaging',
    freeIcon: <WarningIcon />,
  },
  {
    leftIcon: <ChatIcon width={24} height={24} />,
    text: 'subscription.benefits.chats',
    freeIcon: <WarningIcon />,
  },
  {
    leftIcon: <AdIcon />,
    text: 'subscription.benefits.advertisement',
    freeIcon: <XMarkIcon />,
  },
  {
    leftIcon: <PremiumAgentIcon />,
    text: 'subscription.benefits.premiumAgents',
    freeIcon: <XMarkIcon />,
  },
  {
    leftIcon: <AddAgentIcon />,
    text: 'subscription.benefits.addYourAgents',
    freeIcon: <XMarkIcon />,
  },
  {
    leftIcon: <PencilAndStarIcon />,
    text: 'subscription.benefits.customization',
    freeIcon: <XMarkIcon />,
  },
];
