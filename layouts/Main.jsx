import React, { Component } from 'react'
import Head from 'next/head';
import MainMenu from '../components/MainMenu';
import Config from '../config/config.json';
import { LanguageContext } from '../utils/LanguageContext';
import '../css/main.scss';

class Layout extends Component {
    render() {
        let lang = this.props.lang ? this.props.lang : Config.lang;
        let languageContext = {
            lang: lang,
            alternateLanguages: this.props.alternateLanguages,
        };

        return (
            <>
                <Head>
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous" />
                    <title>{Config.title}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                </Head>
                <LanguageContext.Provider value={languageContext} >
                    <MainMenu />
                    <div id="content-container" >
                        <main id="main-content" >
                            {this.props.children}
                        </main>
                    </div>
                </LanguageContext.Provider>
            </>
        )
    }
}

export default Layout;

