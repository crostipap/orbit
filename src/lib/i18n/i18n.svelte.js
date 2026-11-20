// Current language + translate function.
// `t()` reads the reactive `locale`, so any template that calls it updates
// automatically when the language changes.
import { translations, DEFAULT_LOCALE } from './translations.js';

const STORAGE_KEY = 'calendar-app:locale';

function readSavedLocale() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && translations[saved]) return saved;
  } catch {
  }
  return DEFAULT_LOCALE;
}

class I18n {
  locale = $state(readSavedLocale());

  constructor() {
    document.documentElement.lang = this.locale;
  }

  t(key, params = {}) {
    const template = translations[this.locale]?.[key] ?? translations[DEFAULT_LOCALE][key] ?? key;
    return template.replace(/\{(\w+)\}/g, (_, name) => params[name] ?? `{${name}}`);
  }

  setLocale(code) {
    if (!translations[code]) return;
    this.locale = code;
    document.documentElement.lang = code;
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
    }
  }
}

export const i18n = new I18n();
export const t = (key, params) => i18n.t(key, params);
