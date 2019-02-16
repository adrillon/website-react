import React, { Component } from "react";

class PostView extends Component {
    render() {
        let post = this.props.post;
        return (
            <div className={"post post-" + post.type} >
                <h1>{post.title}</h1>
                <div className="post-content" dangerouslySetInnerHTML={{__html: post.content}} />
            </div>
        )
    }
}

export default PostView;
