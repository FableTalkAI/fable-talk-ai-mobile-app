import { Translations } from '@/features/locales/types.ts';

const uk: Translations = {
  common: {
    dateOfBirth: 'Дата народження',
    avatar: 'Аватар',
    interests: 'Інтереси',
    day: 'День',
    month: 'Місяць',
    year: 'Рік',
    settings: 'Налаштування',
    subscription: 'Підписки',
    email: 'Пошта',
    yourName: "Ваше ім'я",
    alphabetically: 'За алфавітом',
    popularity: 'За популярністю',
    dateAdded: 'За датою',
    name: "Ім'я",
    enabled: 'Увімкнуто',
    disabled: 'Вимкнуто',
    contactUs: 'Зв’язатися з нами',
    noResults: 'Нічого не знайдено',
    error: 'Помилка',
    success: 'Успішно',
    info: 'Інформація',
    warning: 'Увага',
    pinnedWarning: 'Ви досягли максимального ліміту закріплених чатів. Відкріпіть чат або оновіть свій тарифний план',
    customization: 'Кастомізація',
  },

  empty: {
    agentSearch: {
      title: 'Тут порожньо...',
      subtitle: 'Ми шукали всюди, але такого Агента не знайшли. Схоже, далі живуть тільки дракони.',
    },
    chatSearch: {
      title: 'Жодного збігу',
      subtitle: 'Цей пошук не дав результатів. Можливо, варто почати новий чат?',
    },
    tagSearch: {
      title: 'Тег десь забаром',
      subtitle: 'Ми не знайшли нічого схожого. Перевірте, чи немає помилки в слові.',
    },
    selectedTags: {
      title: 'Тегів немає, будь ласка, оберіть тег',
    },
    allAgentsList: {
      title: 'Невдала трансмутація',
      subtitle:
        'Ви намішали стільки інгредієнтів у фільтрах, що зілля просто випарувалося разом з Агентами. Спробуйте простіший рецепт',
    },
    myAgentsList: {
      title: 'Жодного учасника в групі',
      subtitle: 'Не вирушайте в дорогу наодинці! Створіть свого першого Агента — надійного супутника для ваших пригод',
    },
  },

  tabBar: {
    home: 'Головна',
    chat: 'Чат',
    profile: 'Профіль',
  },

  languages: {
    uk: 'Українська',
    en: 'Англійська',
  },

  image: {
    pickerSizeError: 'Файл занадто великий для завантаження (макс. 5 МБ)',
  },

  actions: {
    apply: 'Застосувати',
    clear: 'Очистити',
    select: 'Обрати',
    subscribe: 'Підписатися',
    send: 'Відправити',
    delete: 'Видалити',
    cancel: 'Скасувати',
    continue: 'Продовжити',
    logout: 'Вихід',
    create: 'Створити',
    update: 'Оновити',
  },

  bottomWindows: {
    permissionDenied: {
      title: 'Доступ заборонений',
      subtitle: 'Для використання цієї функції, будь ласка, увімкніть доступ до фото у налаштуваннях',
    },
    deleteAccount: {
      title: 'Видалити акаунт',
      subtitle: 'Ви впевнені, що хочете видалити свій акаунт?',
    },
    logout: {
      title: 'Вийти з акаунту',
      subtitle: 'Ви впевнені, що хочете вийти зі свого акаунту?',
    },
    searchFilter: {
      sort: 'Сортування',
      filter: 'Фільтрація',
      tags: 'Теги',
      selectedTags: 'Обрані теги',
    },
    deleteChat: {
      title_one: 'Видалити чат',
      title_other: 'Видалити чаты',
      subtitle_one: 'Ви впевнені, що хочете видалити цей чат?',
      subtitle_other: 'Ви впевнені, що хочете видалити ці чати?',
    },
    tagsSelector: {
      tags: 'Теги',
      selectedTags: 'Обрані теги',
    },
  },

  modal: {
    premium: {
      title: {
        limitExceeded: 'Ліміт повідомлень вичерпано',
        openPremiumAgent: 'Цей Агент доступний з Premium',
        messagePremiumAgent: 'Спілкування з Premium Агентом обмежено',
        activeChatsLimit: 'Досягнуто ліміт активних чатів',
        createAgentLimit: 'Створення Агентів з Premium',
        customization: 'Кастомізація з Premium',
      },
      description:
        'Бажаєте створювати більше та швидше? З Premium вам не доведеться чекати та дивитися рекламу. Полетіли?',
      adsDescription: 'Або перегляньте коротке відео, щоб отримати ще 5 повідомлень прямо зараз 🚀',
      premiumButton: 'Оформити Premium',
      adsButton: 'Подивитися Рекламу',
    },
  },

  auth: {
    splashText: 'Просто\nПочни Чат',
    signInButton: 'Увійти',
    signUpButton: 'Створити',
    agreement: 'Реєструючись у FableTalkAI, ви погоджуєтеся з нашими',
    termsOfService: ' Умовами обслуговування',
    and: ' та ',
    privacyPolicy: 'Політикою конфіденційності',
    signIn: {
      header: 'Вхід',
      subheader: 'Будь ласка, увійдіть, щоб продовжити',
      belowButton: 'Немає облікового запису? ',
    },
    signUp: {
      header: 'Реєстрація',
      subheader: 'Будь ласка, зареєструйтесь, щоб увійти',
      belowButton: 'Вже маєте обліковий запис? ',
    },
    verify: {
      header: 'Верифікація',
      subheader: 'Будь ласка, введіть код з вашої пошти',
    },
    continueWith: 'Або продовжуйте з',
  },

  onboarding: {
    initialText: 'Відкрий для себе спілкування з різними Агентами',
    description: {
      name: "Будь ласка, введіть ваше ім'я",
      dateOfBirth: 'Будь ласка, вкажіть дату народження',
      avatar: 'Завантажте аватар, це опціонально*',
      interests: 'Будь ласка, оберіть 2 теги',
    },
  },

  createAgent: {
    createHeader: 'Створити Агента',
    updateHeader: 'Оновити Агента',
    agentCreatedSuccessfully: 'Агента успішно створено та відправлено на модерацію!',
    agentUpdatedSuccessfully: 'Агента успішно оновлено та відправлено на модерацію!',
    agentCreateLimit: 'Ого, полегше! Дочекайся модерації попередніх Агентів, перш ніж створювати нових',
    avatar: {
      error: 'Аватар обов’язковий',
    },
    name: {
      label: 'Ім’я',
      placeholder: 'Введіть ім’я Агента',
      minError: 'Мінімум 1 символ',
      maxError: 'Максимум 30 символів',
    },
    subtitle: {
      label: 'Підзаголовок',
      placeholder: 'Введіть короткий опис',
      minError: 'Мінімум 50 символів',
    },
    description: {
      label: 'Опис',
      placeholder: 'Опишіть свого Агента\nНаприклад: Кіберпанк-детектив у шкіряному плащу, цинічний і обожнює каву...',
      minError: 'Мінімум 250 символів',
    },
    tags: {
      label: 'Теги',
      subtitle: 'Обрані',
      placeholder: 'Додати теги +',
      minError: 'Додайте щонайменше 2 теги',
      maxError: 'Максимум 12 тегів',
    },
  },

  home: {
    all: 'Всі',
    my: 'Мої',
    onModeration: 'На Модерації',
    needEdit: 'Потребує редагування',
  },

  searchInput: {
    placeholder: 'Пошук у чаті за іменем Агента',
  },

  customization: {
    wallpaper: 'Фон чату',
    avatar: 'Аватар',
    chat: 'Чат',
    messages: {
      agent: 'Повідомлення Агента',
      you: 'Ваше повідомлення',
    },
  },

  settings: {
    notifications: 'Повідомлення',
    about: 'Про застосунок',
    account: 'Акаунт',
    pushNotifications: 'Сповіщення',
    termsOfService: 'Умови обслуговування',
    legalInformation: 'Юридична інформація',
    privacyPolicy: 'Політика конфіденційності',
    protectYourData: 'Як ми захищаємо ваші дані',
    getHelp: 'Отримати допомогу',
    theme: 'Тема',
    changeAppTheme: 'Змінити тему застосунку',
    removeYourAccount: 'Видалити обліковий запис',
    exitFromAcc: 'Завершити сесію в акаунті',
    language: 'Мова',
    changeAppLanguage: 'Змінити мову застосунку',
  },

  theme: {
    system: 'Системна',
    dark: 'Темна',
    light: 'Світла',
  },

  subscription: {
    header: 'Підписки',
    month: '({{price}}/місяць)',
    monthly: 'Місячна',
    annual: 'Річна',
    save: 'Заощадь {{amount}}%',
    activeSubscriptionStatus: 'Статус Активної Підписки',
    restorePurchase: 'Відновити Покупку',
    successfullyRestored: 'Покупки успішно відновлено',
    failedRestored: 'Не вдалося відновити покупки',
    benefits: {
      messaging: 'Чатінг',
      chats: 'Чати',
      premiumAgents: 'Преміум Агенти',
      advertisement: 'Реклама',
      customization: 'Кастомізація',
      addYourAgents: 'Додавання Власних Агентів',
    },
  },

  contactUs: {
    header: "Зв'яжіться з нами",
    description: 'Дайте нам деталі вашого запиту, і наша команда зробить все можливе, щоб допомогти вам належним чином',
    placeholder: 'Напишіть повідомлення...',
  },

  search: {
    placeholder: "Пошук Агентів за ім'ям...",
  },

  chat: {
    placeholder: 'Напишіть ваше повідомлення...',
    sameDay: '[Сьогодні]',
    nextDay: '[Завтра]',
    lastDay: '[Вчора]',
    remainingMessages_one: 'Обережно, у вас залишилося останнє безкоштовне повідомлення на сьогодні.',
    remainingMessages_other: 'На сьогодні залишилося {{count}} безкоштовних повідомлень. Використовуйте їх з розумом!',
  },

  validation: {
    name: "Будь ласка, введіть дійсне ім'я",
    email: 'Будь ласка, введіть дійсний імейл',
    empty: "Обов'язкове поле",
  },

  update: {
    title: 'Доступна Нова Версія',
    description: 'Доступна нова версія додатка. Оновіть зараз, щоб отримати останні функції та покращення',
    button: 'Оновити Зараз',
  },

  serverResponses: {
    emailOrNameRequired: "Електронна адреса або ім'я недійсні",
    messageRequired: 'Будь ласка, введіть повідомлення!',
    messageSentSuccess: 'Повідомлення успішно надіслано',
    rateLimitedContactUs: 'Запит обмежений, будь ласка, зачекайте {{amount}} секунд',
    serverError: 'Ой, щось пішло не так, спробуйте ще раз пізніше',
    userUpdated: 'Користувача успішно оновлено',
    emailRequired: "Електронна адреса обов'язкова",
    noAvatarUploaded: "Аватар обов'язковий",
    avatarUploaded: 'Аватар успішно завантажено',
    userAlreadyExists: 'Користувач вже існує, будь ласка, увійдіть',
    userNotFound: 'Користувач не знайдено, будь ласка, зареєструйтесь',
    emailOrCodeRequired: 'Будь ласка, введіть дійсну електронну адресу або код',
    codeExpired: 'Код закінчився, увійдіть знову',
    tooManyAttempts: 'Забагато спроб, увійдіть ще раз',
    wrongCode: 'Неправильний код, залишилося спроб: {{amount}}',
    chatIdsRequired: 'Будь ласка, надайте айді чату',
    chatDeleted_one: 'Чат видалено',
    chatDeleted_other: 'Чати видалено',
    agentRequired: 'Дані Агента обов’язкові для заповнення',
    agentAlreadyExists: 'Агент з таким ім’ям уже існує',
    agentIdRequired: 'Айді Агента обов`язкове',
    undefined: 'Ой, щось пішло не так, спробуйте ще раз пізніше',
  },
};

export default uk;
