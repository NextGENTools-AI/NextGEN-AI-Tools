export const supportedLanguages = [
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'es', label: 'Spanish', nativeName: 'Español' },
  { code: 'fr', label: 'French', nativeName: 'Français' },
  { code: 'de', label: 'German', nativeName: 'Deutsch' },
  { code: 'pt', label: 'Portuguese', nativeName: 'Português' },
  { code: 'ar', label: 'Arabic', nativeName: 'العربية' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ja', label: 'Japanese', nativeName: '日本語' },
  { code: 'zh', label: 'Chinese (Simplified)', nativeName: '中文(简体)' },
  { code: 'ru', label: 'Russian', nativeName: 'Русский' },
] as const;

export type SupportedLanguageCode = (typeof supportedLanguages)[number]['code'];
