import React, { Component } from "react";
import LangAPI from '../utils/LangAPI';
import Layout from '../layouts/Main.jsx';

class Index extends Component {
    static async getInitialProps({query}) {
        return {
            lang: query.lang,
            alternateLanguages: LangAPI.getInstance().getAllLanguages().map((lang) => ({
                route: 'index',
                params: {
                    lang: lang,
                }
            }))
        };
    }
    
    render() {
        return (
            <Layout {...this.props} >
                <div></div>
            </Layout>
        )
    }
}

export default Index;
