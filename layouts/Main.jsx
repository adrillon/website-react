import React, { Component } from 'react'
import Head from 'next/head';
import MainMenu from '../components/MainMenu';
import LanguageSelector from '../components/LanguageSelector';
import Config from '../config/config.json';
import { LanguageContext } from '../utils/LanguageContext';
import StickyNote from '../components/StickyNote';
import StackOfPaper from '../components/StackOfPaper';
import ContactLinksList from '../components/ContactLinksList';
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
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous" />
                </Head>
                <nav>
                    <LanguageContext.Provider value={languageContext} >
                        <StickyNote id="stickynote-left" >
                            <MainMenu />
                            <LanguageSelector />
                        </StickyNote>
                        <StickyNote id="stickynote-right" >
                            <ContactLinksList />
                        </StickyNote>
                    </LanguageContext.Provider>
                </nav>
                <main>
                    <StackOfPaper>
                        <LanguageContext.Provider value={languageContext} >
                            {this.props.children}
                        </LanguageContext.Provider>
                    </StackOfPaper>
                </main>
            </>
        )
    }
}

export default Layout;

