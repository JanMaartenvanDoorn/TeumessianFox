import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import { UUID } from "angular2-uuid";

import { Alias } from "../Alias";
import { AliasEncryptionConfig } from "../alias-encryption-config";
import { EncryptionService } from "./encryption.service";
import { AliasVerificationService } from "./alias-verification.service";
import { BrowserService } from "./browser.service";

@Injectable({
  providedIn: "root",
})
export class AliasGeneratorService {
  encryptionService = new EncryptionService();
  aliasVerificationService = new AliasVerificationService();
  aliasGenerationConfig = new AliasEncryptionConfig();
  BrowserService = new BrowserService();
  current_url: string = "Error";

  constructor() {}

  ngOnInit(): void {}

  createNewAliassesNerdMode(): Observable<Alias[]> {
    let current_url = this.BrowserService.getUrlActiveTab();
    let ownDomain = this.BrowserService.getDomain();
    let encryptionPrivateKey = this.BrowserService.getEncryptionPrivateKey();

    let aliasses = Promise.all([
      current_url,
      ownDomain,
      encryptionPrivateKey,
    ]).then((results) => {
      let ALIASSES = [];
      ALIASSES.push(this.generateAlias_v2(results[0], results[1], results[2]));
      return ALIASSES;
    });

    return from(aliasses);
  }

  createNewAliasses(): Observable<Alias[]> {
    let current_url = this.BrowserService.getUrlActiveTab();
    let ownDomain = this.BrowserService.getDomain();

    let aliasses = Promise.all([current_url, ownDomain]).then((results) => {
      let ALIASSES = [];
      ALIASSES.push(this.generateAlias_v1(results[0], results[1]));
      return ALIASSES;
    });

    return from(aliasses);
  }

  generateAlias_v1(otherDomain: string = "", ownDomain: string): Alias {
    // This method generates an alias only based on the url of the actve tab and (a part of) a uuid
    let uuid = UUID.UUID();
    let tempArray = otherDomain.split(".");
    let humanReadableId = tempArray[tempArray.length - 2] + "-";
    let lengthUuid =
      this.aliasGenerationConfig.maxLength - humanReadableId.length;

    const generated_alias: Alias = {
      id: UUID.UUID().toString(),
      address:
        humanReadableId + uuid.substring(0, lengthUuid) + "@" + ownDomain,
      generated: new Date().toISOString(),
    };
    return generated_alias;
  }

  generateAlias_v2(
    // This method generates an alias with a generation date and a signature encrypted in the alias.
    otherDomain: string = "https://test.test/",
    ownDomain: string,
    encryptionPrivateKey: string
  ): Alias {
    let tempArray = otherDomain.split(".");

    let humanReadableId = tempArray[tempArray.length - 2] + "-";

    if (humanReadableId === "undefined-") {
      console.error("No valid url!");
      let alias: Alias = {
        id: UUID.UUID().toString(),
        address: "Undefined!",
        generated: new Date("Thu, 1 Jan 1970 00:00:00 UTC").toISOString(), // return start unix time when we cannot extract a generation date
        validated: false,
      };
      return alias;
    }

    let desired_length_random_part =
      this.aliasGenerationConfig.maxLength -
      this.aliasGenerationConfig.encryptedPartAfterEncryption -
      humanReadableId.length; // Number of digits for the date int

    let encrypted = "+";
    let randomPart = this.encryptionService.generate_random_part(
      desired_length_random_part
    );

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    let dateInt = yyyy + mm + dd;
    let toBeHashed = humanReadableId + dateInt + randomPart;
    let hashed = this.encryptionService.hash(toBeHashed);
    let toBeEncrypted =
      dateInt +
      hashed.substring(0, this.aliasGenerationConfig.numberOfHashDigits);

    while (/^[0-9A-Za-z_]+$/.test(encrypted) === false) {
      //there are only alphanumeric characters

      randomPart = this.encryptionService.generate_random_part(
        desired_length_random_part
      );

      today = new Date();

      dd = String(today.getDate()).padStart(2, "0");
      mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      yyyy = today.getFullYear();
      dateInt = yyyy + mm + dd;

      toBeHashed = humanReadableId + dateInt + randomPart;

      hashed = this.encryptionService.hash(toBeHashed);

      toBeEncrypted =
        dateInt +
        hashed.substring(0, this.aliasGenerationConfig.numberOfHashDigits);

      encrypted = this.encryptionService.encrypt(
        toBeEncrypted,
        (humanReadableId + randomPart).substring(
          0,
          this.aliasGenerationConfig.initializationVector
        ),
        encryptionPrivateKey
      );
    }

    let generated_alias: Alias = {
      id: UUID.UUID().toString(),
      address: humanReadableId + randomPart + encrypted + "@" + ownDomain,
      generated: new Date().toISOString(),
    };

    generated_alias = this.aliasVerificationService.extract_and_validate_alias(
      generated_alias.address,
      encryptionPrivateKey
    );

    return generated_alias;
  }
}
