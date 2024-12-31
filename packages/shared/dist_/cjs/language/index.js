"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadLanguage = void 0;
const en_1 = __importDefault(require("./data/en"));
const ko_1 = __importDefault(require("./data/ko"));
const languagePacks = {
    en: en_1.default,
    ko: ko_1.default,
};
const loadLanguage = (l) => languagePacks[l];
exports.loadLanguage = loadLanguage;
