# xid-demonstrator

This repository showcases xID example implementations and how they integrate with xID Connect.

More information about the xID Service [here](https://confluence.bankidnorge.no/confluence/pages/viewpage.action?pageId=95097807).

See xID Connect [documentation](https://confluence.bankidnorge.no/confluence/pages/viewpage.action?pageId=96831077)

## Install

First clone this repository and inside the root directory run:

    npm install

This will install necessary dependencies.


## Run

To run the example apps simply run:

    npm start 

You will then be able to access 3 sites on http://localhost:3005:

* Sample Bank: http://localhost:3005/bid-xid_bank.html 
* Sample Webshop:  http://localhost:3005/bid-xid_store.html
* Sample news page:  http://localhost:3005/bid-xid_news.html


### More examples

See also the examples folder under `app/public/examples` which contains various stripped down examples of xID Connect integration.

See overview at: http://localhost:3005/examples/


## Configure

See `config.json` for configurable options. You can add your own `config.dev.json` which will override the default configuration.

1. Update client secret for the various example sites under `xidSecret`.
2. Verify URLs to OAUTH endpoints and xID Connect library.


Note that you need to restart the server after updating the configuration.


## Development


To build JavaScript bundles:

    npm run build


Browser sync is available by running:

    gulp dev
