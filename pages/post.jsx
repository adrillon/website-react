import React, { Component } from "react";
import SiteAPI from '../utils/SiteAPI';
import { LanguageContext } from '../utils/LanguageContext';

class Post extends Component {
    static async getInitialProps({query}) {
        let siteapi = new SiteAPI({lang: query.lang});

        return {
            post: await siteapi.getPostByTypeAndSlug(query.posttype, query.slug),
        };
    }

    render() {
        let post = this.props.post;

        return (
            <div>
                <LanguageContext.Consumer>
                    {value =>
                        <div>
                            <h1>{post.title}</h1>
                            <div dangerouslySetInnerHTML={{__html: post.content}} />
                        </div>
                    }
                </LanguageContext.Consumer>
            </div>
        )
    }
}

export default Post;
