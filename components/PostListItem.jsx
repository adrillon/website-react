import React, { Component } from "react";
import { Link } from '../utils/routes';
import { LanguageContext } from '../utils/LanguageContext';
import LangAPI from '../utils/LangAPI';

class PostListItem extends Component {
    render() {
        let post = this.props.post;
        return (
            <div className={"postlistitem postlistitem-" + post.type} >
                <h2>
                    <LanguageContext.Consumer>
                        {value => 
                            <Link route="post" params={{lang: value.lang, posttype: LangAPI.getInstance().getTranslatedPostType(post.type, value.lang), slug: post.slug}} >
                                <a>{post.title}</a>
                            </Link>
                        }
                    </LanguageContext.Consumer>
                </h2>
                <div className="postlistitem-excerpt" dangerouslySetInnerHTML={{__html: post.excerpt}} />
            </div>
        )
    }
}

export default PostListItem;
