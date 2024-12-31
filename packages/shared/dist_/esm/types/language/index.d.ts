declare const languagePacks: {
    en: import("./type").LanguagePack;
    ko: import("./type").LanguagePack;
};
export type LanguageType = keyof typeof languagePacks;
export declare const loadLanguage: (l: LanguageType) => import("./type").LanguagePack;
export {};
