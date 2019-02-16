import Config from '../config/config.json';
import Langs from '../config/langs.json';

class LangAPI {
    constructor() {
        this.langs = {};

        Object.keys(Langs).map((lang) => {
            this.langs[lang] = require('../langs/' + lang + '.json');
        });
    }

    static getInstance() {
        if (! LangAPI.instance) {
            LangAPI.instance = new LangAPI();
        }

        return LangAPI.instance;
    }

    getTranslatedPostType(postType, lang) {
        return this.langs[lang].posttypes[postType];
    }

    getPostTypeByLang(translatedPostType, lang) {
        // match a translated post type name with its English name
        let translatedPostTypes = this.langs[lang].posttypes;
        return Object.keys(translatedPostTypes).find((key) => translatedPostTypes[key] == translatedPostType);
    }

    getPostTypeFromOtherLanguage(translatedPostType, sourceLang, destLang) {
        return this.getTranslatedPostType(this.getPostTypeByLang(translatedPostType, sourceLang), destLang);
    }

    getAllLanguages() {
        return Object.keys(Langs);
    }

    getLangBaseURL(lang) {
        return Langs[lang];
    }
}

export default LangAPI;

