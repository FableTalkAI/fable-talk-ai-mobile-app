export type DeleteChatBottomWindowProps = {
  close: () => void;
  multiSelectionsChatIds: string[];
  clear?: () => void;
  onDelete?: () => void;
};
