import WPAPI from 'wpapi';
import Config from '../config/config.json';
import Langs from '../config/langs.json';

class SiteAPI {
    constructor({lang}) {
        this.setLang(lang);
    }

    setLang(lang = Config.lang) {
        this._lang = lang;
        this._baseURL = Langs[lang];
        this._baseEndpoint = this._baseURL + '/wp-json';
        this.wpapi = new WPAPI({
            endpoint: this._baseEndpoint,
            routes: require('../config/routes.' + this._lang + '.json')
        });
    }

    getLang() {
        return this._lang;
    }

    _getPostTypeByLang(translatedPostType, lang) {
        // match a translated post type name with its English name
        let translatedPostTypes = require('../langs/' + lang + '.json').posttypes;
        return Object.keys(translatedPostTypes).find((key) => translatedPostTypes[key] == translatedPostType);
    }

    async getPostsByPostType(posttype, lang = this.getLang()) {
        let postType = this._getPostTypeByLang(posttype, lang);
        let posts = [];
        switch (postType) {
            default:
            case 'projects':
                posts = await this.getProjects();
                break;
        }

        return posts;
    }

    async getProjects() {
        let wpData = await this.wpapi.projects().get();
        return this._sanitizeWpPostList(wpData);
    }

    async getPostByTypeAndSlug(posttype, slug, lang = this.getLang()) {
        let postType = this._getPostTypeByLang(posttype, lang);
        let post = {};
        switch (postType) {
            default:
            case 'projects':
                post = await this.wpapi.projects().slug(slug);
                post = post[0];
                break;
        }
        return this._sanitizeWpPostData(post);
    }

    _sanitizeWpPostList(wpData) {
        let sanitized = [];
        for(let post of wpData) {
            if (typeof post == 'object' && post.title) {
                sanitized.push(this._sanitizeWpPostData(post));
            }
        }
        return sanitized;
    }

    _sanitizeWpPostData(wpData) {
        return {
            id: wpData.id,
            title: wpData.title.rendered,
            type: wpData.type,
            slug: wpData.slug,
            content: wpData.content ? wpData.content.rendered : null,
            excerpt: wpData.excerpt ? wpData.excerpt.rendered : null,
        };
    }
}

export default SiteAPI;
