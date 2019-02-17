import React from 'react'
import App, { Container } from 'next/app'
import { OptionsContext } from '../utils/OptionsContext';
import SiteAPI from '../utils/SiteAPI';

class MyApp extends App {
    static async getInitialProps({ Component, ctx, query }) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        pageProps.siteOptions = await SiteAPI.getInstance().getOptions();

        return { pageProps }
    }

    render () {
        const { Component, pageProps } = this.props;

        return (
            <OptionsContext.Provider value={pageProps.siteOptions} >
                <Container>
                    <Component {...pageProps} />
                </Container>
            </OptionsContext.Provider>
        )
    }
}

export default MyApp
