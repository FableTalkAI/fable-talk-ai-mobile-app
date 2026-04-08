export type CheckPremiumHandlerParams = {
  func: () => Promise<void>;
  modalTitleKey: string;
  withAds?: boolean;
  skipCheck?: boolean;
};
