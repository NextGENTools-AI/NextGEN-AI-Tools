import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

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

const baseTranslations = {
  nav: {
    tools: 'Tools',
    bestTools: 'Best Tools',
    compare: 'Compare',
    prompts: 'Prompts',
    blog: 'Blog',
    toolFinder: 'Tool Finder',
    submitTool: 'Submit Tool',
    exploreTools: 'Explore Tools',
    language: 'Language',
  },
  common: {
    loading: 'Loading…',
    notFound: 'Page not found',
  },
};

const resources = Object.fromEntries(
  supportedLanguages.map((language) => [language.code, { translation: baseTranslations }]),
) as Record<SupportedLanguageCode, { translation: typeof baseTranslations }>;

void i18next.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: supportedLanguages.map((language) => language.code),
  interpolation: {
    escapeValue: false,
  },
  ns: ['translation'],
  defaultNS: 'translation',
  react: {
    useSuspense: false,
  },
});

export default i18next;
