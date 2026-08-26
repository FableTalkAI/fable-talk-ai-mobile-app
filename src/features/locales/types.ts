export enum Languages {
  UK = 'uk',
  EN = 'en',
  JA = 'ja',
  KO = 'ko',
}

export type Empty = {
  title: string;
  subtitle?: string;
};

export type SubscriptionBenefit = {
  header: string;
  tooltipText: string;
};

export type Input = {
  label?: string;
  placeholder?: string;
  error?: string;
  minError?: string;
  maxError?: string;
};

export type Translations = {
  common: {
    dateOfBirth: string;
    avatar: string;
    interests: string;
    day: string;
    month: string;
    year: string;
    settings: string;
    subscription: string;
    email: string;
    name: string;
    yourName: string;
    alphabetically: string;
    popularity: string;
    dateAdded: string;
    enabled: string;
    disabled: string;
    contactUs: string;
    noResults: string;
    error: string;
    success: string;
    info: string;
    warning: string;
    pinnedWarning: string;
    customization: string;
  };

  empty: {
    agentSearch: Empty;
    chatSearch: Empty;
    tagSearch: Empty;
    selectedTags: Empty;
    allAgentsList: Empty;
    myAgentsList: Empty;
  };

  tabBar: {
    home: string;
    chat: string;
    profile: string;
  };

  languages: {
    uk: string;
    en: string;
    ja: string;
    ko: string;
  };

  image: {
    pickerSizeError: string;
  };

  actions: {
    apply: string;
    clear: string;
    select: string;
    subscribe: string;
    send: string;
    delete: string;
    cancel: string;
    continue: string;
    logout: string;
    create: string;
    update: string;
    share: string;
    retry: string;
  };

  share: {
    chat_message: string;
    subject: string;
  };

  bottomWindows: {
    permissionDenied: {
      title: string;
      subtitle: string;
    };
    deleteAccount: {
      title: string;
      subtitle: string;
    };
    logout: {
      title: string;
      subtitle: string;
    };
    searchFilter: {
      sort: string;
      filter: string;
      tags: string;
      selectedTags: string;
    };
    deleteChat: {
      title_one: string;
      title_other: string;
      subtitle_one: string;
      subtitle_other: string;
    };
    tagsSelector: {
      tags: string;
      selectedTags: string;
    };
  };

  modal: {
    premium: {
      title: {
        limitExceeded: string;
        openPremiumAgent: string;
        messagePremiumAgent: string;
        activeChatsLimit: string;
        createAgentLimit: string;
        customization: string;
      };
      description: string;
      adsDescription: string;
      premiumButton: string;
      adsButton: string;
      successToast: string;
    };
  };

  auth: {
    splashText: string;
    signInButton: string;
    signUpButton: string;
    agreement: string;
    termsOfService: string;
    privacyPolicy: string;
    and: string;
    signIn: {
      header: string;
      subheader: string;
      belowButton: string;
    };
    signUp: {
      header: string;
      subheader: string;
      belowButton: string;
    };
    verify: {
      header: string;
      subheader: string;
    };
    continueWith: string;
  };

  onboarding: {
    initialText: string;
    description: {
      name: string;
      dateOfBirth: string;
      avatar: string;
      interests: string;
    };
  };

  createAgent: {
    createHeader: string;
    updateHeader: string;
    agentCreatedSuccessfully: string;
    agentUpdatedSuccessfully: string;
    agentCreateLimit: string;
    avatar: Input;
    name: Input;
    subtitle: Input;
    description: Input;
    tags: Input & {
      subtitle: string;
    };
  };

  home: {
    all: string;
    my: string;
    onModeration: string;
    needEdit: string;
  };

  searchInput: {
    placeholder: string;
  };

  customization: {
    wallpaper: string;
    avatar: string;
    chat: string;
    messages: {
      agent: string;
      you: string;
    };
  };

  settings: {
    notifications: string;
    about: string;
    account: string;
    pushNotifications: string;
    termsOfService: string;
    privacyPolicy: string;
    legalInformation: string;
    protectYourData: string;
    getHelp: string;
    theme: string;
    changeAppTheme: string;
    removeYourAccount: string;
    exitFromAcc: string;
    language: string;
    changeAppLanguage: string;
  };

  theme: {
    system: string;
    dark: string;
    light: string;
  };

  subscription: {
    header: string;
    month: string;
    monthly: string;
    annual: string;
    save: string;
    activeSubscriptionStatus: string;
    restorePurchase: string;
    successfullyRestored: string;
    failedRestored: string;
    benefits: {
      messaging: SubscriptionBenefit;
      chats: SubscriptionBenefit;
      premiumAgents: SubscriptionBenefit;
      advertisement: SubscriptionBenefit;
      customization: SubscriptionBenefit;
      addYourAgents: SubscriptionBenefit;
    };
  };

  contactUs: {
    header: string;
    description: string;
    placeholder: string;
  };

  search: {
    placeholder: string;
    trendingAgents: string;
  };

  chat: {
    placeholder: string;
    sameDay: string;
    nextDay: string;
    lastDay: string;
    remainingMessages_one: string;
    remainingMessages_other: string;
  };

  validation: {
    name: string;
    email: string;
    empty: string;
  };

  update: {
    title: string;
    description: string;
  };

  noConnection: {
    title: string;
    description: string;
  };

  serverResponses: {
    emailOrNameRequired: string;
    messageRequired: string;
    messageSentSuccess: string;
    rateLimitedContactUs: string;
    serverError: string;
    userUpdated: string;
    emailRequired: string;
    noAvatarUploaded: string;
    avatarUploaded: string;
    userAlreadyExists: string;
    userNotFound: string;
    emailOrCodeRequired: string;
    codeExpired: string;
    tooManyAttempts: string;
    wrongCode: string;
    chatIdsRequired: string;
    chatDeleted_one: string;
    chatDeleted_other: string;
    agentRequired: string;
    agentAlreadyExists: string;
    agentIdRequired: string;
    undefined: string;
  };
};
