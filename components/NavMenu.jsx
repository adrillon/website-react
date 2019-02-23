import React, { Component } from 'react'
import { Link } from '../utils/routes';
import { LanguageContext } from '../utils/LanguageContext';
import LangAPI from'../utils/LangAPI';
import Config from '../config/config.json';

class NavMenu extends Component {
    render() {
        return (
            <LanguageContext.Consumer>
                {value =>
                        <ul id="navmenu" >
                            <li>
                                <Link route="defaultpost" params={{lang: value.lang, posttype: LangAPI.getInstance().getTranslatedPostType('resumes', value.lang) }} >
                                    <a>{LangAPI.getInstance().getString(value.lang, 'mainmenu', 'resume')}</a>
                                </Link>
                            </li>
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

export default NavMenu;
