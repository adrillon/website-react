import React from 'react'
import App, { Container } from 'next/app'
import { LanguageContext } from '../utils/LanguageContext';
import Config from '../config/config.json';
import Layout from '../layouts/Main.jsx';

export default class MyApp extends App {
    static async getInitialProps({ Component, router, ctx, query }) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return { pageProps }
    }

    render () {
        let { Component, pageProps } = this.props;

        let lang = this.props.router.query.lang || Config.lang;
        let langContext = {
            lang: lang,
            strings: require('../langs/' + lang + '.json')
        };

        return (
            <Container>
                <LanguageContext.Provider value={langContext} >
                    <Layout {...pageProps} >
                        <Component {...pageProps} />
                    </Layout>
                </LanguageContext.Provider>
            </Container>
        )
    }
}
