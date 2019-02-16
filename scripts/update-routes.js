/**
 * This script updates routing information for WPAPI.
 */

const superagent = require('superagent');
const fs = require('fs');
const config = require('../config/config.json');

async function updateRoutes() {
    let sites = await superagent.get(config.endpoints.lang);
    let langs = {};
    for (let site of sites.body) {
        langs[site.lang] = site.url;

        let wpjson = await superagent.get(site.url + '/wp-json');
        fs.writeFile('config/routes.' + site.lang + '.json', JSON.stringify(wpjson.body.routes), () => {});
    }

    fs.writeFile('config/langs.json', JSON.stringify(langs), () => {});
}

updateRoutes();
