import React, { Component } from "react";
import Sheet from './Sheet';
import '../css/sheet.scss';

class StackOfPaper extends Component {
    render() {
        return (
            <div id="stackofpaper" >
                <Sheet />
                <Sheet />
                <Sheet>{this.props.children}</Sheet>
            </div>
        )
    }
}

export default StackOfPaper;
