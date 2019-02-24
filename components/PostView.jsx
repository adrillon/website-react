import React, { Component } from "react";
import { LanguageContext } from '../utils/LanguageContext';
import LangAPI from '../utils/LangAPI';
import ResumeView from './ResumeView';
import '../css/post.scss';

class PostView extends Component {
    render() {
        let post = this.props.post;
        switch (post.type) {
            case 'resumes':
                return <ResumeView post={post} />
            default:
            return (
                <div className={"post post-" + post.type} >
                    <h1>{post.title}</h1>
                    {post.homepage ?
                            <LanguageContext.Consumer>
                                {value => 
                                    <a className="project-homepage" href={post.homepage} target="_blank" >{LangAPI.getInstance().getString(value.lang, "projects", "homepage")} {post.homepage}</a>
                                }
                            </LanguageContext.Consumer>
                     : ''}
                    <div className="post-content" dangerouslySetInnerHTML={{__html: post.content}} />
                </div>
            )
        }
    }
}

export default PostView;
