import React, { Component } from "react";
import '../css/sheet.scss';

class Sheet extends Component {
    render() {
        let style = {
            transform: this.props.children ? false : "rotate(" + ( (Math.random() * 2) - 1 ) + "deg)",
        };

        return (
            <div className={"sheet " + (this.props.children ? "sheet-main" : "")} style={style} >
                {this.props.children ?
                    <div className="sheet-content">{this.props.children}</div>
                : '' }
            </div>
        )
    }
}

export default Sheet;
