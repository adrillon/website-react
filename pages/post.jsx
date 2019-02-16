import React, { Component } from "react";
import SiteAPI from '../utils/SiteAPI';
import LangAPI from '../utils/LangAPI';
import { LanguageContext } from '../utils/LanguageContext';
import Layout from '../layouts/Main.jsx';

class Post extends Component {
    static async getInitialProps({query, pathname}) {
        let siteapi = new SiteAPI({lang: query.lang});
        let post = await siteapi.getPostByTypeAndSlug(query.posttype, query.slug);

        return {
            lang: query.lang,
            currentRoute: pathname,
            post: post,
            alternateLanguages: Object.keys(post.translations).map((lang) => ({
                route: 'post',
                params: {
                    posttype: LangAPI.getInstance().getTranslatedPostType(post.type, lang),
                    lang: lang,
                    slug: post.translations[lang].slug
                }
            }))
        };
    }

    render() {
        let post = this.props.post;

        return (
            <Layout {...this.props} >
                <div>
                    <h1>{post.title}</h1>
                    <div dangerouslySetInnerHTML={{__html: post.content}} />
                </div>
            </Layout>
        )
    }
}

Post.contextType = LanguageContext;

export default Post;
