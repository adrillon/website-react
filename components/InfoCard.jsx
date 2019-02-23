import React, { Component } from 'react'
import Config from '../config/config.json';

class InfoCard extends Component {
    render() {
        return (
            <div id="infocard" >
                <h1>{Config.title}</h1>
            </div>
        )
    }
}

export default InfoCard;
