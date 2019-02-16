import React, { Component } from "react";
import { Link } from '../utils/routes';
import SiteAPI from '../utils/SiteAPI';
import { LanguageContext } from '../utils/LanguageContext';

class PostList extends Component {
    static async getInitialProps({query}) {
        let siteapi = new SiteAPI({lang: query.lang});

        return {
            posttype: query.posttype,
            posts: await siteapi.getPostsByPostType(query.posttype),
        };
    }

    render() {
        return (
            <div>
                <LanguageContext.Consumer>
                    {value => 
                        <ul>
                            {this.props.posts.map((post) => (
                                <li key={post.id} >
                                    <Link route="post" params={{lang: value.lang, posttype: this.props.posttype, slug: post.slug}} >
                                        <a>{post.title}</a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    }
                </LanguageContext.Consumer>
            </div>
        )
    }
}

export default PostList;
