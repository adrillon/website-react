import React, { Component } from "react";
import Head from 'next/head';
import SiteAPI from '../utils/SiteAPI';
import LangAPI from '../utils/LangAPI';
import Layout from '../layouts/Main';
import PostView from '../components/PostView';
import Config from '../config/config.json';

class Post extends Component {
    static async getInitialProps({query, pathname}) {
        let usesDefaultType = query.posttype === undefined;
        let usesDefaultPost = query.slug === undefined;
        let chosenLang = query.lang || SiteAPI.getInstance().getLang();
        let posttype = query.posttype ? query.posttype : Config.indexPosts[chosenLang].posttype;

        let slug = null;
        if (usesDefaultType) {
            slug = Config.indexPosts[chosenLang].slug;
        } else if (query.slug) {
            slug = query.slug;
        } else {
            slug = Config.defaultPosts[LangAPI.getInstance().getPostTypeByLang(posttype, chosenLang)][chosenLang];
        }

        let post = await SiteAPI.getInstance(chosenLang).getPostByTypeAndSlug(posttype, slug);

        return {
            lang: chosenLang,
            currentRoute: pathname,
            post: post,
            alternateLanguages: Object.keys(post.translations).map((lang) => {
                let params = {
                    posttype: LangAPI.getInstance().getTranslatedPostType(post.type, lang),
                    lang: lang,
                };

                if (! usesDefaultPost) {
                    params.slug = post.translations[lang].slug;
                }

                return {
                    route: usesDefaultPost ? 'defaultpost' : 'post',
                    params
                };
            }),
        };
    }

    render() {
        let post = this.props.post;

        return (
            <Layout {...this.props} >
                <Head>
                    <title>{post.title}</title>
                </Head>
                <PostView post={post} />
            </Layout>
        )
    }
}

export default Post;
