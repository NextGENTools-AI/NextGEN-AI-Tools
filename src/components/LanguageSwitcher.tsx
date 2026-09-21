import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { supportedLanguages, type SupportedLanguageCode } from '../i18n/i18n';
import { addLocalePrefix, getLanguageLabel, stripLocalePrefix } from '../i18n/languageUtils';

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const currentLanguage = (i18n.language || 'en') as SupportedLanguageCode;

  const options = useMemo(() => supportedLanguages, []);

  const handleLanguageChange = (languageCode: SupportedLanguageCode) => {
    const nextPath = addLocalePrefix(stripLocalePrefix(location.pathname), languageCode);
    void i18n.changeLanguage(languageCode);
    window.localStorage.setItem('preferred-language', languageCode);
    navigate(nextPath, { replace: false });
  };

  return (
    <div className="relative">
      <label className="sr-only" htmlFor="language-switcher">
        {t('nav.language')}
      </label>
      <select
        id="language-switcher"
        value={currentLanguage}
        onChange={(event) => handleLanguageChange(event.target.value as SupportedLanguageCode)}
        className="field cursor-pointer rounded-lg px-3 py-2 text-[13px] font-medium text-dark-100"
      >
        {options.map((language) => (
          <option key={language.code} value={language.code}>
            {language.nativeName}
          </option>
        ))}
      </select>
      <span className="sr-only">{getLanguageLabel(currentLanguage)}</span>
    </div>
  );
}
