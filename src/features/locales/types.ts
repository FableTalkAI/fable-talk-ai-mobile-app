export enum Languages {
  UK = 'uk',
  EN = 'en',
}

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
      selected: string;
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

  home: {
    searchInput: string;
  };

  searchInput: {
    placeholder: string;
  };

  settings: {
    notifications: string;
    about: string;
    account: string;
    pushNotifications: string;
    termsAndConditions: string;
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
    free: {
      name: string;
      pros: string[];
      cons: string[];
    };
    basic: {
      name: string;
      pros: string[];
      cons: string[];
    };
    premium: {
      name: string;
      pros: string[];
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
  };
};
