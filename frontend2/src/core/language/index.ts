import english from "./data/en";
import korean from "./data/ko";

const languagePacks = {
  en: english,
  ko: korean,
};

export type LanguageType = keyof typeof languagePacks;

export const loadLanguage = (l: LanguageType) => languagePacks[l];
