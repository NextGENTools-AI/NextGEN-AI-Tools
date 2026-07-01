import { supportedLanguages, type SupportedLanguageCode } from './i18n';

const localePrefixPattern = /^\/(en|es|fr|de|pt|ar|hi|ja|zh|ru)(?=\/|$)/;

export function getInitialLanguage(): SupportedLanguageCode {
  if (typeof window === 'undefined') return 'en';

  const path = window.location.pathname;
  const match = path.match(localePrefixPattern);
  if (match?.[1]) {
    return match[1] as SupportedLanguageCode;
  }

  const stored = window.localStorage.getItem('preferred-language');
  if (stored && supportedLanguages.some((language) => language.code === stored)) {
    return stored as SupportedLanguageCode;
  }

  return 'en';
}

export function stripLocalePrefix(pathname: string): string {
  return pathname.replace(localePrefixPattern, '') || '/';
}

export function addLocalePrefix(pathname: string, languageCode: SupportedLanguageCode): string {
  const normalizedPath = pathname === '/' ? '' : pathname;
  if (languageCode === 'en') {
    return normalizedPath || '/';
  }
  return `/${languageCode}${normalizedPath || ''}`;
}

export function getLanguageLabel(code: SupportedLanguageCode) {
  return supportedLanguages.find((language) => language.code === code)?.nativeName ?? code;
}
