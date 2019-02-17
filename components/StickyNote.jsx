import React, { Component } from "react";
import '../css/stickynote.scss';

class StickyNote extends Component {
    render() {
        let rotation = (Math.floor(Math.random() * 10)) - 5;
        let style = {
            transform: "rotate(" + rotation + "deg)"
        };

        return (
            <div className="stickynote" id={this.props.id} style={style} >
                {this.props.children ? <div className="stickynote-content" >{this.props.children}</div> : ''}
            </div>
        )
    }
}

export default StickyNote;

