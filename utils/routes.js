const routes = require('next-routes')

module.exports = routes()
    .add('home', '/:lang', '/post')
    .add('postlist', '/:lang/:posttype')
    .add('post', '/:lang/:posttype/:slug')
    .add('defaultpost', '/:lang/:posttype', '/post')
