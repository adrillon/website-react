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
            case 'resumes':
                post = await this.wpapi.resumes().slug(slug);
                break;
            default:
            case 'projects':
                post = await this.wpapi.projects().slug(slug);
                break;
        }
        post = post[0];
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
            case 'resumes':
                return this._sanitizeWpResume(wpData, sanitized);
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

    _sanitizeWpResume(wpData, sanitized) {
        let resume = wpData.cmb2.resume;
        resume.resume_info = resume.resume_info[0];
        resume.diplomas = resume.diplomas ? resume.diplomas.sort((a,b) => {
            if (a.end_year < b.end_year) return 1;
            if (a.end_year > b.end_year) return -1;
            return 0;
        }) : [];
        resume.certifications = resume.certifications ? resume.certifications.sort((a,b) => {
            if (a.year < b.year) return 1;
            if (a.year > b.year) return -1;
            return 0;
        }) : [];
        resume.jobs = resume.jobs ? resume.jobs.reverse() : [];
        resume.skills = resume.skills || [];

        return {
            ...sanitized,
            resume
        }
    }
}

export default SiteAPI;
