import { Injectable } from "@angular/core";
import { browser } from "webextension-polyfill-ts";
import { Settings } from "../Settings";

@Injectable({
  providedIn: "root",
})
export class BrowserService {
  // Service that handles all comunication with the browser
  constructor() {}
  getUrlActiveTab(): Promise<string> {
    const url: Promise<string> = browser.tabs
      .query({ active: true, currentWindow: true })
      .then(function (tabs) {
        //'tabs' will be an array with only one element: an Object describing the active tab
        //  in the current window.
        var currentTabUrl = tabs[0].url;
        if (currentTabUrl !== undefined) {
          let this_url = new URL(currentTabUrl);
          return this_url.hostname;
        } else {
          return "Error";
        }
      });
    return url;
  }

  async setSetting(settings: {}): Promise<void> {
    await browser.storage.local.set(settings).then(function () {
      console.log("Saved!");
    });
  }

  async getDomain(): Promise<string> {
    let result: Settings = await browser.storage.local.get("domain");
    return result.domain!;
  }

  async getEncryptionPrivateKey(): Promise<string> {
    let result: Settings = await browser.storage.local.get("encryption");
    return result.encryption!;
  }
}
