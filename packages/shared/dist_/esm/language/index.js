import english from "./data/en";
import korean from "./data/ko";
const languagePacks = {
    en: english,
    ko: korean,
};
export const loadLanguage = (l) => languagePacks[l];
