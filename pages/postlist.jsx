import React, { Component } from "react";
import Head from 'next/head';
import SiteAPI from '../utils/SiteAPI';
import LangAPI from '../utils/LangAPI';
import Layout from '../layouts/Main.jsx';
import Config from '../config/config.json';
import PostListItem from '../components/PostListItem';

class PostList extends Component {
    static async getInitialProps({query}) {
        return {
            lang: query.lang,
            posttype: query.posttype,
            posts: await SiteAPI.getInstance(query.lang).getPostsByPostType(query.posttype),
            alternateLanguages: LangAPI.getInstance().getAllLanguages().map((lang) => ({
                route: 'postlist',
                params: {
                    posttype: LangAPI.getInstance().getPostTypeFromOtherLanguage(query.posttype, query.lang, lang),
                    lang: lang,
                }
            })),
            pageTitle: LangAPI.getInstance().getString(query.lang, "titles", query.posttype)
        };
    }


    render() {
        return (
            <Layout {...this.props} >
                <Head>
                    <title>{this.props.pageTitle} - {Config.title}</title>
                </Head>
                <div>
                    {this.props.posts.map((post) => (
                        <PostListItem key={post.id} post={post} />
                    ))}
                </div>
            </Layout>
        )
    }
}

export default PostList;
