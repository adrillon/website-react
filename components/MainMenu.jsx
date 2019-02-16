import React, { Component } from 'react'
import { Link } from '../utils/routes';
import { LanguageContext } from '../utils/LanguageContext';

class MainMenu extends Component {
    render() {
        return (
            <LanguageContext.Consumer>
                {value =>
                        <ul>
                            <li>
                                <Link route="postlist" params={{lang: value.lang, posttype: value.strings.posttypes.projects}} >
                                    <a>{value.strings.strings.mainmenu.projects}</a>
                                </Link>
                            </li>
                        </ul>
                }
            </LanguageContext.Consumer>
        )
    }
}

export default MainMenu;
