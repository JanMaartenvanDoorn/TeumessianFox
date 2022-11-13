import { browser } from "webextension-polyfill-ts";

console.log(document.URL);

// browser.runtime.onInstalled.addListener(() => {
//     browser.webNavigation.onCompleted.addListener(() => {
//       browser.tabs.query({ active: true, currentWindow: true }, ([{ id }]) => {
//         if (id) {
//           browser.pageAction.show(id);
//         }
//       });
//     }, { url: [{ urlMatches: 'google.com' }] });
//   });
