export interface Language {
  createdAt: string;
  key: string;
  value: string;
  label: string;
  status: boolean;
  updatedAt: string;
  _id: any;
}

export const data: Language[] = [
  {
    createdAt: '2021-04-06T17:01:55.000Z',
    key: 'vi',
    label: 'Japanese',
    status: true,
    value: 'ja',
    updatedAt: '2021-04-06T17:01:55.000Z',
    _id: '606c7d13d2b4a40015a4c9a6',
  },
  {
    createdAt: '2021-04-06T17:01:55.000Z',
    key: 'en',
    label: 'English',
    value: 'en',
    status: true,
    updatedAt: '2021-04-06T17:01:55.000Z',
    _id: '606c7d13d2b4a40015a4c9a7',
  },
];

export interface LabelValue {
  label: string;
  value: string;
}

export const defaultLanguages: LabelValue[] = [
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'sq',
    label: 'Albanian',
  },
  {
    value: 'ar',
    label: 'Arabic',
  },
  {
    value: 'az',
    label: 'Azerbaijani',
  },
  {
    value: 'bn',
    label: 'Bengali',
  },
  {
    value: 'bg',
    label: 'Bulgarian',
  },
  {
    value: 'ca',
    label: 'Catalan',
  },
  {
    value: 'zh',
    label: 'Chinese',
  },
  {
    value: 'zt',
    label: 'Chinese (traditional)',
  },
  {
    value: 'cs',
    label: 'Czech',
  },
  {
    value: 'da',
    label: 'Danish',
  },
  {
    value: 'nl',
    label: 'Dutch',
  },
  {
    value: 'eo',
    label: 'Esperanto',
  },
  {
    value: 'et',
    label: 'Estonian',
  },
  {
    value: 'fi',
    label: 'Finnish',
  },
  {
    value: 'fr',
    label: 'French',
  },
  {
    value: 'de',
    label: 'German',
  },
  {
    value: 'el',
    label: 'Greek',
  },
  {
    value: 'he',
    label: 'Hebrew',
  },
  {
    value: 'hi',
    label: 'Hindi',
  },
  {
    value: 'hu',
    label: 'Hungarian',
  },
  {
    value: 'id',
    label: 'Indonesian',
  },
  {
    value: 'ga',
    label: 'Irish',
  },
  {
    value: 'it',
    label: 'Italian',
  },
  {
    value: 'ja',
    label: 'Japanese',
  },
  {
    value: 'ko',
    label: 'Korean',
  },
  {
    value: 'lv',
    label: 'Latvian',
  },
  {
    value: 'lt',
    label: 'Lithuanian',
  },
  {
    value: 'ms',
    label: 'Malay',
  },
  {
    value: 'nb',
    label: 'Norwegian',
  },
  {
    value: 'fa',
    label: 'Persian',
  },
  {
    value: 'pl',
    label: 'Polish',
  },
  {
    value: 'pt',
    label: 'Portuguese',
  },
  {
    value: 'ro',
    label: 'Romanian',
  },
  {
    value: 'ru',
    label: 'Russian',
  },
  {
    value: 'sr',
    label: 'Serbian',
  },
  {
    value: 'sk',
    label: 'Slovak',
  },
  {
    value: 'sl',
    label: 'Slovenian',
  },
  {
    value: 'es',
    label: 'Spanish',
  },
  {
    value: 'sv',
    label: 'Swedish',
  },
  {
    value: 'tl',
    label: 'Tagalog',
  },
  {
    value: 'th',
    label: 'Thai',
  },
  {
    value: 'tr',
    label: 'Turkish',
  },
  {
    value: 'uk',
    label: 'Ukrainian',
  },
  {
    value: 'ur',
    label: 'Urdu',
  },
  {
    value: 'vi',
    label: 'Vietnamese',
  },
];
