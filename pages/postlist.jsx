import React, { Component } from "react";
import Head from 'next/head';
import { Link } from '../utils/routes';
import SiteAPI from '../utils/SiteAPI';
import LangAPI from '../utils/LangAPI';
import { LanguageContext } from '../utils/LanguageContext';
import Layout from '../layouts/Main.jsx';

class PostList extends Component {
    static async getInitialProps({query}) {
        let siteapi = new SiteAPI({lang: query.lang});

        return {
            lang: query.lang,
            posttype: query.posttype,
            posts: await siteapi.getPostsByPostType(query.posttype),
            alternateLanguages: LangAPI.getInstance().getAllLanguages().map((lang) => ({
                route: 'postlist',
                params: {
                    posttype: LangAPI.getInstance().getPostTypeFromOtherLanguage(query.posttype, query.lang, lang),
                    lang: lang,
                }
            })),
            pageTitle: LangAPI.getInstance().getString(query.lang, "titles", "projects")
        };
    }


    render() {
        return (
            <Layout {...this.props} >
                <Head>
                    <title>{this.props.pageTitle}</title>
                </Head>
                <div>
                    <ul>
                        {this.props.posts.map((post) => (
                            <li key={post.id} >
                                <Link route="post" params={{lang: this.props.lang, posttype: this.props.posttype, slug: post.slug}} >
                                    <a>{post.title}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </Layout>
        )
    }
}

PostList.contextType = LanguageContext;

export default PostList;
