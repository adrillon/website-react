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
        return (
            <Container>
                <LanguageContext.Provider value={lang} >
                    <Layout {...pageProps} >
                        <Component {...pageProps} />
                    </Layout>
                </LanguageContext.Provider>
            </Container>
        )
    }
}
