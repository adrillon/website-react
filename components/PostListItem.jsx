import React, { Component } from "react";
import { Link } from '../utils/routes';
import { LanguageContext } from '../utils/LanguageContext';
import LangAPI from '../utils/LangAPI';
import '../css/postlist.scss';

class PostListItem extends Component {
    render() {
        let post = this.props.post;
        return (
            <LanguageContext.Consumer>
                {value => 
                    <Link route="post" params={{lang: value.lang, posttype: LangAPI.getInstance().getTranslatedPostType(post.type, value.lang), slug: post.slug}} >
                        <div className={"postlistitem postlistitem-" + post.type} >
                            <h2>
                                <a dangerouslySetInnerHTML={{__html: post.title}} />
                            </h2>
                            <div className="postlistitem-excerpt" dangerouslySetInnerHTML={{__html: post.excerpt}} />
                            <span className="postlist-date" >{LangAPI.getInstance().getString(value.lang, "posts", "postedon")} {post.date.substring(0,10)}</span>
                        </div>
                    </Link>
                }
            </LanguageContext.Consumer>
        )
    }
}

export default PostListItem;
