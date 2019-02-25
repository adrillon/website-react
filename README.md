# Resume

This repository contains the source code for the React/Next.js frontend I use for [my resume](https://drillon-ala.in).

## How to install

1. Set up [the Wordpress backend](https://gitlab.com/adrillon/website-wordpress)
2. Copy `config/config.sample.json` as `config/config.json` and edit the values accordingly
3. Run `npm run routes` to download routing and language configuration from Wordpress
4. `npm run dev` or `NODE_ENV=production npm run dist`
