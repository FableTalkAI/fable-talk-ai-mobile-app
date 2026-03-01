export enum Languages {
  UK = 'uk',
  EN = 'en',
}

export type Empty = {
  title: string;
  subtitle?: string;
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
  };

  empty: {
    agentSearch: Empty;
    chatSearch: Empty;
    tagSearch: Empty;
    selectedTags: Empty;
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
  };

  actions: {
    apply: string;
    clear: string;
    choose: string;
    send: string;
    delete: string;
    cancel: string;
    continue: string;
    logout: string;
    create: string;
    update: string;
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

  auth: {
    splashText: string;
    signInButton: string;
    signUpButton: string;
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

  settings: {
    notifications: string;
    about: string;
    account: string;
    pushNotifications: string;
    termsOfService: string;
    legalInformation: string;
    privacyPolicy: string;
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
    benefits: {
      messaging: string;
      chats: string;
      premiumAgents: string;
      advertisement: string;
      customization: string;
      addYourAgents: string;
    };
  };

  contactUs: {
    header: string;
    description: string;
    placeholder: string;
  };

  search: {
    placeholder: string;
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
    chatDeleted: string;
    agentRequired: string;
    agentAlreadyExists: string;
    agentIdRequired: string;
  };
};
