import { ReadableClubRule, ReadableTownRule } from "../rule/util/format";
export type LanguagePack = {
    meta: {
        name: string;
    };
} & ReadableTownRule & ReadableClubRule;
