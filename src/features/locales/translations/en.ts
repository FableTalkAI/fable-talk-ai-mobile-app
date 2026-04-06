import { Translations } from '../types.ts';

const en: Translations = {
  common: {
    dateOfBirth: 'Date of Birth',
    avatar: 'Avatar',
    interests: 'Interests',
    day: 'Day',
    month: 'Month',
    year: 'Year',
    settings: 'Settings',
    subscription: 'Subscription',
    email: 'Email',
    name: 'Name',
    yourName: 'Your name',
    alphabetically: 'Alphabetically',
    popularity: 'Popularity',
    dateAdded: 'Date added',
    enabled: 'Enabled',
    disabled: 'Disabled',
    contactUs: 'Contact us',
    noResults: 'No results',
    error: 'Error',
    success: 'Success',
    info: 'Info',
    warning: 'Warning',
    pinnedWarning:
      'You have reached the maximum number of pinned chats. Unpin a chat or upgrade your subscription plan',
  },

  empty: {
    agentSearch: {
      title: 'Ghost town here...',
      subtitle: 'We’ve looked everywhere, but couldn’t find that agent. Perhaps further dwell dragons?',
    },
    chatSearch: {
      title: 'No matches found',
      subtitle: 'Your search came up empty. Maybe it’s time to start a new conversation?',
    },
    tagSearch: {
      title: 'Tag? What tag?',
      subtitle: 'That keyword doesn’t ring a bell. Double-check the spelling or try another one',
    },
    selectedTags: {
      title: 'No tags, please select a tag',
    },
    allAgentsList: {
      title: 'Brewing failed!',
      subtitle:
        'With this many ingredients in your filters, the potion went up in smoke. Try a simpler recipe to make the agents reappear',
    },
    myAgentsList: {
      title: 'No party members yet',
      subtitle: 'It’s dangerous to go alone! Recruit your first agent to help you on your quest',
    },
  },

  tabBar: {
    home: 'Home',
    chat: 'Chat',
    profile: 'Profile',
  },

  languages: {
    uk: 'Ukrainian',
    en: 'English',
  },

  actions: {
    apply: 'Apply',
    clear: 'Clear',
    choose: 'Choose',
    send: 'Send',
    delete: 'Delete',
    cancel: 'Cancel',
    continue: 'Continue',
    logout: 'Logout',
    create: 'Create',
    update: 'Update',
  },

  bottomWindows: {
    permissionDenied: {
      title: 'Permission denied',
      subtitle: 'To use this feature, please enable photo access in settings',
    },
    deleteAccount: {
      title: 'Delete account',
      subtitle: 'Are you sure you want to delete your account?',
    },
    logout: {
      title: 'Logout from account',
      subtitle: 'Are you sure you want to logout from your account?',
    },
    searchFilter: {
      sort: 'Sort',
      filter: 'Filter',
      tags: 'Tags',
      selectedTags: 'Selected tags',
    },
    deleteChat: {
      title_one: 'Delete chat',
      title_other: 'Delete chats',
      subtitle_one: 'Are you sure you want to delete this chat?',
      subtitle_other: 'Are you sure you want to delete those chats?',
    },
    tagsSelector: {
      tags: 'Tags',
      selectedTags: 'Selected tags',
    },
  },

  modal: {
    premium: {
      title: {
        limitExceeded: 'Message limit reached',
        openPremiumAgent: 'Agent available with Premium',
        messagePremiumAgent: 'Premium Agent chat restricted',
        activeChatsLimit: 'Active chats limit reached',
        createAgentLimit: 'Create Agents with Premium',
      },
      description:
        'Want to create more and faster? With Premium, you can skip the ads and dive straight into action. Ready for takeoff?',
      adsDescription: 'Or watch a short video to get 5 extra messages right away 🚀',
      premiumButton: 'Go Premium',
      adsButton: 'Watch ad',
    },
  },

  auth: {
    splashText: 'Just Start\nChatting',
    signInButton: 'Sign In',
    signUpButton: 'Sign Up',
    signIn: {
      header: 'Login',
      subheader: 'Please login to continue',
      belowButton: "Don't have an account? ",
    },
    signUp: {
      header: 'Register',
      subheader: 'Please register to login',
      belowButton: 'Already have account? ',
    },
    verify: {
      header: 'Verification',
      subheader: 'Please enter the code from your email',
    },
    continueWith: 'Or continue with',
  },

  onboarding: {
    initialText: 'Start your communication with different agents',
    description: {
      name: 'Please, enter your name',
      dateOfBirth: 'Please, select your date of birth',
      avatar: "Uploading an avatar, it's optional*",
      interests: 'Please, select 2 tags',
    },
  },

  createAgent: {
    createHeader: 'Create Agent',
    updateHeader: 'Update Agent',
    agentCreatedSuccessfully: 'Agent successfully created and sent on moderation!',
    agentUpdatedSuccessfully: 'Agent successfully updated and sent on moderation!',
    agentCreateLimit: 'Slow down! Wait for your pending agents to be moderated before creating more',
    avatar: {
      error: 'Avatar is required',
    },
    name: {
      label: 'Name',
      placeholder: 'Enter agent name',
      minError: 'Minimum 1 character',
      maxError: 'Maximum 30 characters',
    },
    subtitle: {
      label: 'Subtitle',
      placeholder: 'Enter short description',
      minError: 'Minimum 50 characters',
    },
    description: {
      label: 'Descriptions',
      placeholder:
        'Describe your agent\nFor example: A cyberpunk detective in a leather coat, cynical, and coffee-loving...',
      minError: 'Minimum 250 characters',
    },
    tags: {
      label: 'Tags',
      subtitle: 'Selected',
      placeholder: 'Add tags +',
      minError: 'Add at least 2 tags',
      maxError: 'Maximum 12 tags',
    },
  },

  home: {
    all: 'All',
    my: 'My',
    onModeration: 'On Moderation',
    needEdit: 'Need Edit',
  },

  searchInput: {
    placeholder: 'Search chat by agent name',
  },

  settings: {
    notifications: 'Notifications',
    about: 'About',
    account: 'Account',
    pushNotifications: 'Push notifications',
    termsOfService: 'Terms of Service',
    legalInformation: 'Legal information',
    privacyPolicy: 'Privacy Policy',
    protectYourData: 'How we protect your data',
    getHelp: 'Get help',
    theme: 'Theme',
    changeAppTheme: 'Change app theme',
    removeYourAccount: 'Remove your account',
    exitFromAcc: 'Exit from your account',
    language: 'Language',
    changeAppLanguage: 'Change app language',
  },

  theme: {
    system: 'System',
    dark: 'Dark',
    light: 'Light',
  },

  subscription: {
    header: 'Subscriptions',
    month: '(${{price}}/month)',
    monthly: 'Monthly',
    annual: 'Annual',
    save: 'Save {{amount}}%',
    benefits: {
      messaging: 'Messaging',
      chats: 'Chats',
      premiumAgents: 'Premium Agents',
      advertisement: 'Advertisement',
      customization: 'Customization',
      addYourAgents: 'Add Your Agents',
    },
  },

  contactUs: {
    header: 'Contact Us',
    description:
      'Let us know the details of your request, and our team will do their best to assist you as soon as possible',
    placeholder: 'Type your message...',
  },

  search: {
    placeholder: 'Search agents by name...',
  },

  chat: {
    placeholder: 'Write a message...',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    lastDay: '[Yesterday]',
    remainingMessages_one: 'Careful, you have last free message left for today.',
    remainingMessages_other: '{{count}} free messages left for today. Use them wisely!',
  },

  validation: {
    name: 'Please enter a valid name',
    email: 'Please enter a valid email',
    empty: 'Required field',
  },

  serverResponses: {
    emailOrNameRequired: 'Email or name not valid',
    messageRequired: 'Please, enter the message!',
    messageSentSuccess: 'Message successfully sent',
    rateLimitedContactUs: 'Rate limited, please wait {{amount}} seconds',
    serverError: 'Oops, something went wrong, try again later',
    userUpdated: 'User updated successfully',
    emailRequired: 'Email required',
    noAvatarUploaded: 'Avatar required',
    avatarUploaded: 'Avatar successfully uploaded',
    userAlreadyExists: 'User already exists, please login',
    userNotFound: 'User not found, please register',
    emailOrCodeRequired: 'Please enter valid email or code',
    codeExpired: 'Code expired, login again',
    tooManyAttempts: 'Too many attempts, login again',
    wrongCode: 'Wrong code, remaining attempts: {{amount}}',
    chatIdsRequired: 'Please provide chat id',
    chatDeleted_one: 'Chat deleted',
    chatDeleted_other: 'Chats deleted',
    agentRequired: 'Agent information is missing or invalid',
    agentAlreadyExists: 'An agent with this name already exists',
    agentIdRequired: 'Agent id is required',
  },
};

export default en;
