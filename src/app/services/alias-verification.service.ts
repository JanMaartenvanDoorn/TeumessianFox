import { Injectable } from "@angular/core";
import { UUID } from "angular2-uuid";
import { EncryptionService } from "./encryption.service";
import { Alias } from "../Alias";
import { AliasEncryptionConfig } from "../alias-encryption-config";

@Injectable({
  providedIn: "root",
})
export class AliasVerificationService {
  // Service that houses all validation functionality for v2 aliasses
  encryptionService = new EncryptionService();
  aliasGenerationConfig = new AliasEncryptionConfig();

  check_email_address_format(alias: string): boolean {
    // Note that this check is not good enough to fully validate the email address.
    // It will however filter out most crap
    const mailFormatRegex = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");

    return mailFormatRegex.test(alias);
  }

  extract_and_validate_alias(
    aliasAdress: string,
    encryptionPrivateKey: string
  ): Alias {
    let tempArray = aliasAdress.split("@");
    let encrypted = tempArray[0];

    let toDecrypt = encrypted.substring(
      encrypted.length - this.aliasGenerationConfig.encryptedPartAfterEncryption
    );

    let decrypted = this.encryptionService.decrypt(
      toDecrypt,
      aliasAdress.substring(0, this.aliasGenerationConfig.initializationVector),
      encryptionPrivateKey
    );

    let check_hash = decrypted.substring(
      decrypted.length - this.aliasGenerationConfig.numberOfHashDigits
    );

    let date_int = decrypted.substring(
      0,
      this.aliasGenerationConfig.encryptedPartBeforeEncryption -
        this.aliasGenerationConfig.numberOfHashDigits
    );

    let to_be_hashed =
      encrypted
        .substring(
          0,
          encrypted.length -
            this.aliasGenerationConfig.encryptedPartAfterEncryption
        )
        .split("-")[0] +
      "-" +
      date_int +
      encrypted
        .substring(
          0,
          encrypted.length -
            this.aliasGenerationConfig.encryptedPartAfterEncryption
        )
        .split("-")[1];

    let hashed = this.encryptionService
      .hash(to_be_hashed)
      .substring(0, this.aliasGenerationConfig.numberOfHashDigits);

    if (check_hash === hashed) {
      // Convert dateint to Date object for eay handling
      let year = Number(date_int.substring(0, 4));
      let month = Number(date_int.substring(4, 6));
      let day = Number(date_int.substring(6, 8));
      let date = new Date(year, month - 1, day).toISOString();

      let alias: Alias = {
        id: UUID.UUID().toString(),
        address: aliasAdress,
        generated: date,
        validated: true,
      };

      if (this.check_email_address_format(aliasAdress)) {
        console.log(
          aliasAdress + " Validated with creation date: " + date + "!"
        );
        return alias;
      } else {
        console.error(aliasAdress + " Not a valid email address!");
        let alias: Alias = {
          id: UUID.UUID().toString(),
          address: aliasAdress,
          generated: new Date("Thu, 1 Jan 1970 00:00:00 UTC").toISOString(), // return start unix time when we cannot extract a generation date
          validated: false,
        };

        return alias;
      }
    } else {
      console.warn(aliasAdress + " Not validated!");
      let alias: Alias = {
        id: UUID.UUID().toString(),
        address: aliasAdress,
        generated: new Date("Thu, 1 Jan 1970 00:00:00 UTC").toISOString(), // return start unix time when we cannot extract a generation date
        validated: false,
      };

      return alias;
    }
  }

  constructor() {}
}
