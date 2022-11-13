import { browser } from "webextension-polyfill-ts";

var domain = document.URL;

browser.runtime.sendMessage({ url: domain });

console.log("Hello from content script! " + domain);
