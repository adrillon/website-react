import React, { Component } from "react";
import Head from 'next/head';
import SiteAPI from '../utils/SiteAPI';
import LangAPI from '../utils/LangAPI';
import Layout from '../layouts/Main';
import PostView from '../components/PostView';
import Config from '../config/config.json';

class Post extends Component {
    static async getInitialProps({query, pathname}) {
        let usesDefaultPost = query.slug === undefined;
        let slug = query.slug ? query.slug : Config.defaultPosts[LangAPI.getInstance().getPostTypeByLang(query.posttype, query.lang)][query.lang];
        let post = await SiteAPI.getInstance(query.lang).getPostByTypeAndSlug(query.posttype, slug);

        return {
            lang: query.lang,
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
