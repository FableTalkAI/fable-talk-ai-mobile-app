import { Translations } from '../types.ts';

const ko: Translations = {
  common: {
    dateOfBirth: '생년월일',
    avatar: '아바타',
    interests: '관심사',
    day: '일',
    month: '월',
    year: '년',
    settings: '설정',
    subscription: '구독',
    email: '이메일',
    name: '이름',
    yourName: '내 이름',
    alphabetically: '가나다순',
    popularity: '인기순',
    dateAdded: '추가된 날짜순',
    enabled: '활성화됨',
    disabled: '비활성화됨',
    contactUs: '문의하기',
    noResults: '결과 없음',
    error: '오류',
    success: '성공',
    info: '정보',
    warning: '경고',
    pinnedWarning:
      '고정할 수 있는 채팅의 최대 개수에 도달했습니다. 채팅 고정을 해제하거나 구독 플랜을 업그레이드하세요',
    customization: '꾸미기',
  },

  empty: {
    agentSearch: {
      title: '여긴 유령 도시네요...',
      subtitle: '어디를 찾아봐도 해당 에이전트를 찾을 수 없습니다. 혹시 더 멀리 있는 드래곤을 찾아봐야 할까요?',
    },
    chatSearch: {
      title: '일치하는 결과가 없습니다',
      subtitle: '검색 결과가 없습니다. 새로운 대화를 시작해 보는 건 어떨까요?',
    },
    tagSearch: {
      title: '태그요? 무슨 태그요?',
      subtitle: '해당 키워드가 기억나지 않네요. 철자를 다시 확인하거나 다른 키워드를 사용해 보세요',
    },
    selectedTags: {
      title: '태그가 없습니다. 태그를 선택해 주세요',
    },
    allAgentsList: {
      title: '조합 실패!',
      subtitle:
        '필터에 재료가 너무 많아서 물약이 연기처럼 사라졌습니다. 더 간단하게 조합해서 에이전트를 다시 불러오세요',
    },
    myAgentsList: {
      title: '아직 파티원이 없습니다',
      subtitle: '혼자 가는 것은 위험합니다! 첫 번째 에이전트를 영입하고 모험을 시작하세요',
    },
  },

  tabBar: {
    home: '홈',
    chat: '채팅',
    profile: '프로필',
  },

  languages: {
    uk: '우크라이나어',
    en: '영어',
    ja: '일본어',
    ko: '한국어',
  },

  image: {
    pickerSizeError: '파일이 너무 커서 업로드할 수 없습니다 (최대 5MB)',
  },

  actions: {
    apply: '적용',
    clear: '지우기',
    select: '선택',
    subscribe: '구독하기',
    send: '보내기',
    delete: '삭제',
    cancel: '취소',
    continue: '계속',
    logout: '로그아웃',
    create: '생성',
    update: '업데이트',
    share: '공유',
    retry: '다시 시도',
  },

  share: {
    chat_message: '{{agentName}}와의 채팅을 확인해 보세요!😱\n여기에서 직접 채팅할 수 있어요:',
    subject: 'FableTalkAI: 인터랙티브 스토리',
  },

  bottomWindows: {
    permissionDenied: {
      title: '권한이 거부되었습니다',
      subtitle: '이 기능을 사용하려면 설정에서 사진 접근 권한을 허용해 주세요',
    },
    deleteAccount: {
      title: '계정 삭제',
      subtitle: '정말로 계정을 삭제하시겠습니까?',
    },
    logout: {
      title: '계정에서 로그아웃',
      subtitle: '정말로 로그아웃하시겠습니까?',
    },
    searchFilter: {
      sort: '정렬',
      filter: '필터',
      tags: '태그',
      selectedTags: '선택한 태그',
    },
    deleteChat: {
      title_one: '채팅 삭제',
      title_other: '채팅 삭제',
      subtitle_one: '이 채팅을 삭제하시겠습니까?',
      subtitle_other: '이 채팅들을 삭제하시겠습니까?',
    },
    tagsSelector: {
      tags: '태그',
      selectedTags: '선택한 태그',
    },
  },

  modal: {
    premium: {
      title: {
        limitExceeded: '메시지 한도에 도달했습니다',
        openPremiumAgent: 'Premium에서 이용 가능한 에이전트입니다',
        messagePremiumAgent: 'Premium 에이전트 채팅이 제한됩니다',
        activeChatsLimit: '활성 채팅 한도에 도달했습니다',
        createAgentLimit: 'Premium으로 에이전트 생성',
        customization: 'Premium으로 꾸미기',
      },
      description:
        '더 많이, 더 빠르게 만들고 싶으신가요? Premium에서는 광고를 건너뛰고 바로 시작할 수 있습니다. 준비되셨나요?',
      adsDescription: '또는 짧은 광고 영상을 보고 지금 바로 추가 메시지 5개를 받으세요 🚀',
      premiumButton: 'Premium으로 업그레이드',
      adsButton: '광고 보기',
      successToast: '보너스 메시지 5개를 받았습니다!',
    },
  },

  auth: {
    splashText: '지금 바로\n채팅을 시작하세요',
    signInButton: '로그인',
    signUpButton: '가입하기',
    agreement: 'FableTalkAI에 가입하면 다음 사항에 동의하게 됩니다:',
    termsOfService: ' 이용약관',
    and: ' 및 ',
    privacyPolicy: '개인정보 처리방침',
    signIn: {
      header: '로그인',
      subheader: '계속하려면 로그인해 주세요',
      belowButton: '계정이 없으신가요? ',
    },
    signUp: {
      header: '회원가입',
      subheader: '로그인하려면 회원가입해 주세요',
      belowButton: '이미 계정이 있으신가요? ',
    },
    verify: {
      header: '인증',
      subheader: '이메일로 전송된 코드를 입력해 주세요',
    },
    continueWith: '또는 다음으로 계속하기',
  },

  onboarding: {
    initialText: '다양한 에이전트와의 대화를 시작해 보세요',
    description: {
      name: '이름을 입력해 주세요',
      dateOfBirth: '생년월일을 선택해 주세요',
      avatar: '아바타 업로드 (선택 사항)*',
      interests: '태그를 2개 선택해 주세요',
    },
  },

  createAgent: {
    createHeader: '에이전트 생성',
    updateHeader: '에이전트 수정',
    agentCreatedSuccessfully: '에이전트가 성공적으로 생성되었으며 검토를 위해 제출되었습니다!',
    agentUpdatedSuccessfully: '에이전트가 성공적으로 수정되었으며 검토를 위해 제출되었습니다!',
    agentCreateLimit: '잠시만 기다려 주세요! 보류 중인 에이전트의 검토가 완료되기 전에는 더 이상 생성할 수 없습니다',
    avatar: {
      error: '아바타는 필수입니다',
    },
    name: {
      label: '이름',
      placeholder: '에이전트 이름 입력',
      minError: '최소 1자 이상 입력해 주세요',
      maxError: '최대 30자까지 입력할 수 있습니다',
    },
    subtitle: {
      label: '부제목',
      placeholder: '짧은 설명 입력',
      minError: '최소 50자 이상 입력해 주세요',
    },
    description: {
      label: '설명',
      placeholder: '에이전트에 대해 설명해 주세요\n예: 가죽 코트를 입은 냉소적이고 커피를 좋아하는 사이버펑크 탐정...',
      minError: '최소 250자 이상 입력해 주세요',
    },
    tags: {
      label: '태그',
      subtitle: '선택됨',
      placeholder: '태그 추가 +',
      minError: '태그를 최소 2개 추가해 주세요',
      maxError: '최대 12개의 태그까지 선택할 수 있습니다',
    },
  },

  home: {
    all: '전체',
    my: '내 에이전트',
    onModeration: '검토 중',
    needEdit: '수정 필요',
  },

  searchInput: {
    placeholder: '에이전트 이름으로 채팅 검색',
  },

  customization: {
    wallpaper: '배경화면',
    avatar: '아바타',
    chat: '채팅',
    messages: {
      agent: '에이전트 메시지',
      you: '내 메시지',
    },
  },

  settings: {
    notifications: '알림',
    about: '앱 정보',
    account: '계정',
    pushNotifications: '푸시 알림',
    termsOfService: '이용약관',
    legalInformation: '법적 정보',
    privacyPolicy: '개인정보 처리방침',
    protectYourData: '데이터 보호 방법',
    getHelp: '도움말',
    theme: '테마',
    changeAppTheme: '앱 테마 변경',
    removeYourAccount: '계정 삭제',
    exitFromAcc: '로그아웃',
    language: '언어',
    changeAppLanguage: '앱 언어 변경',
  },

  theme: {
    system: '시스템 설정',
    dark: '다크',
    light: '라이트',
  },

  subscription: {
    header: '구독',
    month: '({{price}}/월)',
    monthly: '월간',
    annual: '연간',
    save: '{{amount}}% 할인',
    activeSubscriptionStatus: '활성 구독 상태',
    restorePurchase: '구매 복원',
    successfullyRestored: '구매 내역이 성공적으로 복원되었습니다',
    failedRestored: '구매 내역 복원에 실패했습니다',
    benefits: {
      messaging: {
        header: '메시지',
        tooltipText: '무료: 하루 20개 메시지\nPremium: 무제한 메시지',
      },
      chats: {
        header: '채팅',
        tooltipText: '무료: 최대 10개의 활성 채팅\nPremium: 활성 채팅 무제한',
      },
      advertisement: {
        header: '광고 없음',
        tooltipText: 'Premium으로 깔끔하고 광고 없는 경험을 즐기세요',
      },
      premiumAgents: {
        header: 'Premium 에이전트',
        tooltipText: 'Premium 에이전트에 대한 독점 액세스를 잠금 해제하세요',
      },
      addYourAgents: {
        header: '내 에이전트 추가',
        tooltipText: '나만의 맞춤형 에이전트를 생성하고 추가하세요',
      },
      customization: {
        header: '꾸미기',
        tooltipText: 'Premium에서는 채팅 배경과 특별한 아바타 프레임을 사용할 수 있습니다',
      },
    },
  },

  contactUs: {
    header: '문의하기',
    description: '문의 내용을 자세히 알려주시면 최대한 빠르게 도움을 드리겠습니다',
    placeholder: '메시지를 입력하세요...',
  },

  search: {
    placeholder: '이름으로 에이전트 검색...',
    trendingAgents: '인기 에이전트',
  },

  chat: {
    placeholder: '메시지 입력...',
    sameDay: '[오늘]',
    nextDay: '[내일]',
    lastDay: '[어제]',
    remainingMessages_one: '주의: 오늘 사용할 수 있는 무료 메시지가 1개 남았습니다.',
    remainingMessages_other: '오늘 사용할 수 있는 무료 메시지가 {{count}}개 남았습니다. 현명하게 사용하세요!',
  },

  validation: {
    name: '올바른 이름을 입력해 주세요',
    email: '올바른 이메일을 입력해 주세요',
    empty: '필수 입력 항목입니다',
  },

  update: {
    title: '새 버전이 출시되었습니다',
    description: '새로운 버전의 앱을 사용할 수 있습니다. 최신 기능과 개선 사항을 이용하려면 지금 업데이트하세요',
  },

  noConnection: {
    title: '연결이 끊어졌습니다',
    description: '인터넷 연결을 확인한 후 다시 시도해 주세요',
  },

  serverResponses: {
    emailOrNameRequired: '이메일 또는 이름이 올바르지 않습니다',
    messageRequired: '메시지를 입력해 주세요!',
    messageSentSuccess: '메시지가 성공적으로 전송되었습니다',
    rateLimitedContactUs: '요청이 너무 많습니다. {{amount}}초 후에 다시 시도해 주세요',
    serverError: '앗, 문제가 발생했습니다. 잠시 후 다시 시도해 주세요',
    userUpdated: '사용자 정보가 성공적으로 업데이트되었습니다',
    emailRequired: '이메일은 필수입니다',
    noAvatarUploaded: '아바타는 필수입니다',
    avatarUploaded: '아바타가 성공적으로 업로드되었습니다',
    userAlreadyExists: '이미 존재하는 사용자입니다. 로그인해 주세요',
    userNotFound: '사용자를 찾을 수 없습니다. 회원가입해 주세요',
    emailOrCodeRequired: '올바른 이메일 또는 코드를 입력해 주세요',
    codeExpired: '코드가 만료되었습니다. 다시 로그인해 주세요',
    tooManyAttempts: '시도 횟수가 너무 많습니다. 다시 로그인해 주세요',
    wrongCode: '잘못된 코드입니다. 남은 시도 횟수: {{amount}}',
    chatIdsRequired: '채팅 ID를 입력해 주세요',
    chatDeleted_one: '채팅이 삭제되었습니다',
    chatDeleted_other: '채팅이 삭제되었습니다',
    agentRequired: '에이전트 정보가 없거나 올바르지 않습니다',
    agentAlreadyExists: '같은 이름의 에이전트가 이미 존재합니다',
    agentIdRequired: '에이전트 ID는 필수입니다',
    undefined: '앗, 문제가 발생했습니다. 잠시 후 다시 시도해 주세요',
  },
};

export default ko;
