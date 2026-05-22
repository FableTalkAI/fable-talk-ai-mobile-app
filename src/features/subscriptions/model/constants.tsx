import {
  AddAgentIcon,
  AdIcon,
  ChatIcon,
  MessageIcon,
  PencilAndStarIcon,
  PremiumAgentIcon,
  WarningIcon,
  XMarkIcon,
} from '@/shared/assets/icons';

export const BENEFITS = [
  {
    leftIcon: <MessageIcon />,
    text: 'subscription.benefits.messaging.header',
    freeIcon: <WarningIcon />,
    tooltipText: 'subscription.benefits.messaging.tooltipText',
  },
  {
    leftIcon: <ChatIcon width={24} height={24} />,
    text: 'subscription.benefits.chats.header',
    freeIcon: <WarningIcon />,
    tooltipText: 'subscription.benefits.chats.tooltipText',
  },
  {
    leftIcon: <AdIcon />,
    text: 'subscription.benefits.advertisement.header',
    freeIcon: <XMarkIcon />,
    tooltipText: 'subscription.benefits.advertisement.tooltipText',
  },
  {
    leftIcon: <PremiumAgentIcon />,
    text: 'subscription.benefits.premiumAgents.header',
    freeIcon: <XMarkIcon />,
    tooltipText: 'subscription.benefits.premiumAgents.tooltipText',
  },
  {
    leftIcon: <AddAgentIcon />,
    text: 'subscription.benefits.addYourAgents.header',
    freeIcon: <XMarkIcon />,
    tooltipText: 'subscription.benefits.addYourAgents.tooltipText',
  },
  {
    leftIcon: <PencilAndStarIcon />,
    text: 'subscription.benefits.customization.header',
    freeIcon: <XMarkIcon />,
    tooltipText: 'subscription.benefits.customization.tooltipText',
  },
];
