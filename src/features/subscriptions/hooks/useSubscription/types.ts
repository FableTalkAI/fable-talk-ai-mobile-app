export type CheckPremiumHandlerParams = {
  func: () => void;
  modalTitleKey: string;
  withAds?: boolean;
  skipCheck?: boolean;
};
