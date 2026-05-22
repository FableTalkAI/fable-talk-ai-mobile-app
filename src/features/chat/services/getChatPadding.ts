import { CHAT_PADDING } from '@/features/chat/model/constants.ts';

export const getChatPadding = (isSending?: boolean, isSuggestions?: boolean) => {
  let padding = CHAT_PADDING.default;

  if (isSuggestions) {
    padding = CHAT_PADDING.suggestions;
  }

  return isSending ? padding.isSending : padding.default;
};
