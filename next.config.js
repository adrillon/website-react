const withSass = require('@zeit/next-sass')
const superagent = require('superagent');

module.exports = withSass({
    exportPathMap: async function() {
        // dynamically generate all possibles URLs

        let langs = require('./config/langs.json');
        let config = require('./config/config.json');
        let paths = {
            '/': {page: '/'}
        };

        for (let lang of Object.keys(langs)) {
            let langConfig = require('./langs/' + lang + '.json');

            // language-specific home page
            paths['/' + lang] = {
                page: '/post', 
                query: {
                    lang: lang
                }
            };

            for (let wpType of config.slugs) {
                // language-specific default posts
                let translatedType = langConfig.posttypes[wpType];
                paths['/' + lang + '/' + translatedType] = {
                    page: '/post',
                    query: {
                        lang: lang,
                        posttype: translatedType
                    }
                };

                // language-specific post lists
                if (config.defaultPosts[wpType] === undefined) {
                    let translatedType = langConfig.posttypes[wpType];
                    paths['/' + lang + '/' + translatedType] = {
                        page: '/postlist',
                        query: {
                            lang: lang,
                            posttype: translatedType
                        }
                    };
                }
                
                // posts
                // TODO: handle pagination in case lots of posts are created
                let postList = (await superagent.get(langs[lang] + '/wp-json/wp/v2/' + wpType)).body;
                for (let post of postList) {
                    paths['/' + lang + '/' + translatedType + '/' + post.slug] = {
                        page: '/post',
                        query: {
                            lang: lang,
                            posttype: translatedType,
                            slug: post.slug
                        }
                    };
                }
            };
        };

        return paths;
    }
});
