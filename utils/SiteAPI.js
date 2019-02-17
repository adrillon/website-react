import WPAPI from 'wpapi';
import Config from '../config/config.json';
import Langs from '../config/langs.json';
import LangAPI from './LangAPI';

class SiteAPI {
    static getInstance(lang = Config.lang) {
        if (SiteAPI.instance && SiteAPI.instance.getLang() != lang) {
            SiteAPI.instance.setLang(lang);
        } else if (! SiteAPI.instance) {
            SiteAPI.instance = new SiteAPI({lang: lang});
        }
        return SiteAPI.instance;
    }

    constructor({lang}) {
        this.setLang(lang ? lang : undefined);
    }

    setLang(lang = Config.lang) {
        this._lang = lang;
        this._baseURL = LangAPI.getInstance().getLangBaseURL(lang);
        this._baseEndpoint = this._baseURL + '/wp-json';
        this.wpapi = new WPAPI({
            endpoint: this._baseEndpoint,
            routes: require('../config/routes.' + this._lang + '.json')
        });
    }

    getLang() {
        return this._lang;
    }

    async getOptions() {
        if (! this.siteOptions) {
            this.siteOptions = await this.wpapi.options().get();
        }
        return this.siteOptions;
    }

    async getPostsByPostType(posttype, lang = this.getLang()) {
        let postType = LangAPI.getInstance().getPostTypeByLang(posttype, lang);
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
        let postType = LangAPI.getInstance().getPostTypeByLang(posttype, lang);
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
        let sanitized = {
            id: wpData.id,
            title: wpData.title.rendered,
            type: wpData.type,
            slug: wpData.slug,
            content: wpData.content ? wpData.content.rendered : null,
            excerpt: wpData.excerpt ? wpData.excerpt.rendered : null,
            translations: wpData.translations
        };

        switch (sanitized.type) {
            case 'projects':
                return this._sanitizeWpProject(wpData, sanitized);
            default:
                return sanitized;
        }
    }

    _sanitizeWpProject(wpData, sanitized) {
        return {
            ...sanitized,
            homepage: wpData.cmb2.project.project_links[0].homepage
        }
    }
}

export default SiteAPI;
