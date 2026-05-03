import { TFunction } from 'i18next';

export const getMockChatMessages = (t: TFunction<'translation', undefined>) => [
  {
    _id: 2,
    text: t('customization.messages.agent'),
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Agent',
    },
  },
  {
    _id: 1,
    text: t('customization.messages.you'),
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'You',
    },
  },
];
