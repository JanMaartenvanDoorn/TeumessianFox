# Alias Generator Webextension

**THIS EXTENSION IS STILL A WORK IN PROGRESS!**

This is a browser webextension that allows to generate email adress aliasses for specific online accounts. Using these aliasses will reduce the risk of hacks in case of a dataleak for one of your online accounts.

This extension not only allows you to generate random aliasses but also has specific functionality to hide information in generated aliasses themselves. For example: the date of generation and a signature. This will allow you to check when you made the alias in case of a leak and to check whether you generated the alias yourself. This information can be automatically verified with [Lealaps](https://github.com/Marmalade8478/Laelaps).

## Install

Clone repository and make sure you have [nodeJS](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed

In the root folder run:

`npm install .`

## Compile/Run

To compile the extension run: (uppon editing the extension will be automatically recompiled)

`npm run watch`

To run the mock server for the aliasses REST endpoint run:

`npm run server`

Load the extension in your favorite browser by loading the _./dist/manifest.json_ file. More info [here](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/) (Firefox) and [here](https://developer.chrome.com/docs/extensions/mv3/getstarted/) (Chrome)

### Develop

Install pretier:
`npm i -g prettier` (may require root privileges)

Run pretier (in the root of the project):
`prettier --write .`

## To Do

The extension in its current state is for demonstration purposes only and still a lot has to be done to make it ready for production purposes. Some features that will probably improve the overall experience:

- Add unit tests
- Add proper way of storing the private key for encryption (is currently stored in extension storage)
- Open for more suggestions/improvements!
