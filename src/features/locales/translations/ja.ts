import { Translations } from '../types.ts';

const ja: Translations = {
  common: {
    dateOfBirth: '生年月日',
    avatar: 'アバター',
    interests: '興味',
    day: '日',
    month: '月',
    year: '年',
    settings: '設定',
    subscription: 'サブスクリプション',
    email: 'メールアドレス',
    name: '名前',
    yourName: 'あなたの名前',
    alphabetically: 'アルファベット順',
    popularity: '人気順',
    dateAdded: '追加日順',
    enabled: '有効',
    disabled: '無効',
    contactUs: 'お問い合わせ',
    noResults: '結果が見つかりません',
    error: 'エラー',
    success: '成功',
    info: '情報',
    warning: '警告',
    pinnedWarning:
      'ピン留めできるチャットの上限に達しました。チャットのピン留めを解除するか、サブスクリプションプランをアップグレードしてください',
    customization: 'カスタマイズ',
  },

  empty: {
    agentSearch: {
      title: 'ここはゴーストタウン…',
      subtitle:
        'どこを探しても、そのエージェントは見つかりませんでした。もっと遠くまでドラゴンを探しに行くべきかもしれません？',
    },
    chatSearch: {
      title: '一致する結果がありません',
      subtitle: '検索結果はありませんでした。新しい会話を始めてみませんか？',
    },
    tagSearch: {
      title: 'タグ？どのタグ？',
      subtitle: 'そのキーワードに心当たりがありません。スペルを確認するか、別のキーワードを試してください',
    },
    selectedTags: {
      title: 'タグが選択されていません。タグを選択してください',
    },
    allAgentsList: {
      title: '調合失敗！',
      subtitle:
        'フィルターの材料が多すぎて、ポーションが煙になってしまいました。もっとシンプルな組み合わせにして、エージェントを呼び戻しましょう',
    },
    myAgentsList: {
      title: 'パーティーメンバーがまだいません',
      subtitle: '一人で行くのは危険です！最初のエージェントを仲間にして、冒険を始めましょう',
    },
  },

  tabBar: {
    home: 'ホーム',
    chat: 'チャット',
    profile: 'プロフィール',
  },

  languages: {
    uk: 'ウクライナ語',
    en: '英語',
    ja: '日本語',
    ko: '韓国語',
  },

  image: {
    pickerSizeError: 'ファイルが大きすぎてアップロードできません（最大5MB）',
  },

  actions: {
    apply: '適用',
    clear: 'クリア',
    select: '選択',
    subscribe: '登録',
    send: '送信',
    delete: '削除',
    cancel: 'キャンセル',
    continue: '続ける',
    logout: 'ログアウト',
    create: '作成',
    update: '更新',
    share: '共有',
    retry: '再試行',
  },

  share: {
    chat_message: '{{agentName}}とのチャットをチェックしてみよう！😱\nここからチャットできます：',
    subject: 'FableTalkAI：インタラクティブストーリー',
  },

  bottomWindows: {
    permissionDenied: {
      title: 'アクセスが許可されていません',
      subtitle: 'この機能を使用するには、設定で写真へのアクセスを許可してください',
    },
    deleteAccount: {
      title: 'アカウントを削除',
      subtitle: '本当にアカウントを削除しますか？',
    },
    logout: {
      title: 'アカウントからログアウト',
      subtitle: '本当にログアウトしますか？',
    },
    searchFilter: {
      sort: '並べ替え',
      filter: 'フィルター',
      tags: 'タグ',
      selectedTags: '選択したタグ',
    },
    deleteChat: {
      title_one: 'チャットを削除',
      title_other: 'チャットを削除',
      subtitle_one: 'このチャットを削除してもよろしいですか？',
      subtitle_other: 'これらのチャットを削除してもよろしいですか？',
    },
    tagsSelector: {
      tags: 'タグ',
      selectedTags: '選択したタグ',
    },
  },

  modal: {
    premium: {
      title: {
        limitExceeded: 'メッセージ上限に達しました',
        openPremiumAgent: 'このエージェントはPremiumで利用できます',
        messagePremiumAgent: 'Premiumエージェントとのチャットは制限されています',
        activeChatsLimit: 'アクティブなチャットの上限に達しました',
        createAgentLimit: 'Premiumでエージェントを作成',
        customization: 'Premiumでカスタマイズ',
      },
      description:
        'もっと多く、もっと速く作成したいですか？Premiumなら広告をスキップして、すぐに楽しめます。準備はいいですか？',
      adsDescription: 'または短い動画広告を見て、今すぐ追加で5メッセージを獲得 🚀',
      premiumButton: 'Premiumに登録',
      adsButton: '広告を見る',
      successToast: 'ボーナスメッセージ5件を獲得しました！',
    },
  },

  auth: {
    splashText: 'さあ、\nチャットを始めよう',
    signInButton: 'ログイン',
    signUpButton: '登録',
    agreement: 'FableTalkAIに登録することで、以下に同意したものとみなされます',
    termsOfService: ' 利用規約',
    and: ' および ',
    privacyPolicy: 'プライバシーポリシー',
    signIn: {
      header: 'ログイン',
      subheader: '続行するにはログインしてください',
      belowButton: 'アカウントをお持ちでないですか？ ',
    },
    signUp: {
      header: '登録',
      subheader: 'ログインするには登録してください',
      belowButton: 'すでにアカウントをお持ちですか？ ',
    },
    verify: {
      header: '認証',
      subheader: 'メールで届いたコードを入力してください',
    },
    continueWith: 'または次の方法で続ける',
  },

  onboarding: {
    initialText: 'さまざまなエージェントとのコミュニケーションを始めましょう',
    description: {
      name: '名前を入力してください',
      dateOfBirth: '生年月日を選択してください',
      avatar: 'アバターをアップロード（任意）*',
      interests: 'タグを2つ選択してください',
    },
  },

  createAgent: {
    createHeader: 'エージェントを作成',
    updateHeader: 'エージェントを更新',
    agentCreatedSuccessfully: 'エージェントが正常に作成され、審査に送信されました！',
    agentUpdatedSuccessfully: 'エージェントが正常に更新され、審査に送信されました！',
    agentCreateLimit:
      '少し待ってください！保留中のエージェントの審査が完了するまで、新しいエージェントは作成できません',
    avatar: {
      error: 'アバターは必須です',
    },
    name: {
      label: '名前',
      placeholder: 'エージェント名を入力',
      minError: '最低1文字必要です',
      maxError: '最大30文字までです',
    },
    subtitle: {
      label: 'サブタイトル',
      placeholder: '短い説明を入力',
      minError: '最低50文字必要です',
    },
    description: {
      label: '説明',
      placeholder:
        'エージェントについて説明してください\n例：革のコートを着た、皮肉屋でコーヒー好きのサイバーパンク探偵...',
      minError: '最低250文字必要です',
    },
    tags: {
      label: 'タグ',
      subtitle: '選択済み',
      placeholder: 'タグを追加 +',
      minError: '最低2つのタグを追加してください',
      maxError: '最大12個のタグまでです',
    },
  },

  home: {
    all: 'すべて',
    my: 'マイ',
    onModeration: '審査中',
    needEdit: '編集が必要',
  },

  searchInput: {
    placeholder: 'エージェント名でチャットを検索',
  },

  customization: {
    wallpaper: '壁紙',
    avatar: 'アバター',
    chat: 'チャット',
    messages: {
      agent: 'エージェントのメッセージ',
      you: 'あなたのメッセージ',
    },
  },

  settings: {
    notifications: '通知',
    about: 'アプリについて',
    account: 'アカウント',
    pushNotifications: 'プッシュ通知',
    termsOfService: '利用規約',
    legalInformation: '法的情報',
    privacyPolicy: 'プライバシーポリシー',
    protectYourData: 'データの保護について',
    getHelp: 'ヘルプ',
    theme: 'テーマ',
    changeAppTheme: 'アプリのテーマを変更',
    removeYourAccount: 'アカウントを削除',
    exitFromAcc: 'アカウントからログアウト',
    language: '言語',
    changeAppLanguage: 'アプリの言語を変更',
  },

  theme: {
    system: 'システム設定',
    dark: 'ダーク',
    light: 'ライト',
  },

  subscription: {
    header: 'サブスクリプション',
    month: '（{{price}}／月）',
    monthly: '月額',
    annual: '年額',
    save: '{{amount}}%お得',
    activeSubscriptionStatus: 'サブスクリプションのステータス',
    restorePurchase: '購入を復元',
    successfullyRestored: '購入を正常に復元しました',
    failedRestored: '購入の復元に失敗しました',
    benefits: {
      messaging: {
        header: 'メッセージ',
        tooltipText: '無料：1日20メッセージ\nPremium：メッセージ無制限',
      },
      chats: {
        header: 'チャット',
        tooltipText: '無料：最大10件のアクティブなチャット\nPremium：アクティブなチャット無制限',
      },
      advertisement: {
        header: '広告なし',
        tooltipText: 'Premiumで広告なしの快適な体験を楽しめます',
      },
      premiumAgents: {
        header: 'Premiumエージェント',
        tooltipText: 'Premiumエージェントへの限定アクセスを解放',
      },
      addYourAgents: {
        header: '自分のエージェントを追加',
        tooltipText: '自分だけのカスタムエージェントを作成・追加',
      },
      customization: {
        header: 'カスタマイズ',
        tooltipText: 'Premiumでチャット背景とユニークなアバターフレームが利用可能',
      },
    },
  },

  contactUs: {
    header: 'お問い合わせ',
    description: 'お問い合わせ内容の詳細をお知らせください。できる限り早く対応いたします',
    placeholder: 'メッセージを入力...',
  },

  search: {
    placeholder: '名前でエージェントを検索...',
    trendingAgents: '話題のエージェント',
  },

  chat: {
    placeholder: 'メッセージを入力...',
    sameDay: '[今日]',
    nextDay: '[明日]',
    lastDay: '[昨日]',
    remainingMessages_one: '注意：今日利用できる無料メッセージはあと1件です。',
    remainingMessages_other: '今日利用できる無料メッセージはあと{{count}}件です。有効に使いましょう！',
  },

  validation: {
    name: '有効な名前を入力してください',
    email: '有効なメールアドレスを入力してください',
    empty: '必須項目です',
  },

  update: {
    title: '新しいバージョンがあります',
    description: 'アプリの新しいバージョンが利用可能です。最新機能と改善を利用するには今すぐ更新してください',
  },

  noConnection: {
    title: '接続が切断されました',
    description: 'インターネット接続を確認して、もう一度お試しください',
  },

  serverResponses: {
    emailOrNameRequired: 'メールアドレスまたは名前が正しくありません',
    messageRequired: 'メッセージを入力してください！',
    messageSentSuccess: 'メッセージを送信しました',
    rateLimitedContactUs: 'リクエストが多すぎます。{{amount}}秒お待ちください',
    serverError: 'おっと、問題が発生しました。しばらくしてからもう一度お試しください',
    userUpdated: 'ユーザー情報を更新しました',
    emailRequired: 'メールアドレスは必須です',
    noAvatarUploaded: 'アバターは必須です',
    avatarUploaded: 'アバターをアップロードしました',
    userAlreadyExists: 'このユーザーはすでに存在します。ログインしてください',
    userNotFound: 'ユーザーが見つかりません。登録してください',
    emailOrCodeRequired: '有効なメールアドレスまたはコードを入力してください',
    codeExpired: 'コードの有効期限が切れました。もう一度ログインしてください',
    tooManyAttempts: '試行回数が多すぎます。もう一度ログインしてください',
    wrongCode: 'コードが正しくありません。残り試行回数：{{amount}}',
    chatIdsRequired: 'チャットIDを指定してください',
    chatDeleted_one: 'チャットを削除しました',
    chatDeleted_other: 'チャットを削除しました',
    agentRequired: 'エージェント情報が不足しているか、無効です',
    agentAlreadyExists: 'この名前のエージェントはすでに存在します',
    agentIdRequired: 'エージェントIDは必須です',
    undefined: 'おっと、問題が発生しました。しばらくしてからもう一度お試しください',
  },
};

export default ja;
