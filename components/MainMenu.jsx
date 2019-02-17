import React, { Component } from 'react'
import { Link } from '../utils/routes';
import { LanguageContext } from '../utils/LanguageContext';
import LangAPI from'../utils/LangAPI';

class MainMenu extends Component {
    render() {
        return (
            <LanguageContext.Consumer>
                {value =>
                        <ul>
                            <li>
                                <Link route="postlist" params={{lang: value.lang, posttype: LangAPI.getInstance().getTranslatedPostType('projects', value.lang)}} >
                                    <a>{LangAPI.getInstance().getString(value.lang, 'mainmenu', 'projects')}</a>
                                </Link>
                            </li>
                        </ul>
                }
            </LanguageContext.Consumer>
        )
    }
}

export default MainMenu;
