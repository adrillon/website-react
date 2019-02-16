import React, { Component } from 'react'
import MainMenu from '../components/MainMenu';
import LanguageSelector from '../components/LanguageSelector';
import Config from '../config/config.json';
import { LanguageContext } from '../utils/LanguageContext';

class Layout extends Component {
    render() {
        let lang = this.props.lang ? this.props.lang : Config.lang;
        let languageContext = {
            lang: lang,
            strings: require('../langs/' + lang + '.json'),
            alternateLanguages: this.props.alternateLanguages,
        };

        return (
            <>
                <nav>
                    <LanguageContext.Provider value={languageContext} >
                        <MainMenu />
                        <LanguageSelector />
                    </LanguageContext.Provider>
                </nav>
                <main>
                    <LanguageContext.Provider value={languageContext} >
                        {this.props.children}
                    </LanguageContext.Provider>
                </main>
            </>
        )
    }
}

export default Layout;

