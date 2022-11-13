import { Injectable } from "@angular/core";
import * as CryptoJS from "crypto-js";

@Injectable({
  providedIn: "root",
})
export class EncryptionService {
  // Service with all encryption functionality
  ALLOWED_CHARACTERS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";

  constructor() {}

  hash(toBeHashed: string): string {
    let hash = CryptoJS.SHA256(toBeHashed);
    return hash.toString();
  }

  parse_key(key: string) {
    return CryptoJS.enc.Utf8.parse(key);
  }

  generate_random_part(desired_length: number): string {
    let result = "";
    let charactersLength = this.ALLOWED_CHARACTERS.length;
    let array = new Uint32Array(desired_length);
    self.crypto.getRandomValues(array); //Math.random() is not secure
    for (let i = 0; i < array.length; i++) {
      result += this.ALLOWED_CHARACTERS.charAt(
        Math.floor((array[i] / Math.pow(2, 32)) * charactersLength)
      );
    }
    return result;
  }

  rtrim(x: string, characters: string): string {
    let start = 0;
    let end = x.length - 1;
    while (characters.indexOf(x[end]) >= 0) {
      end -= 1;
    }
    return x.substring(0, end + 1);
  }

  encrypt(toBeEncrypted: string, iv: string, key: string): string {
    let parsed_key = this.parse_key(key);
    let encrypted_bytes = CryptoJS.AES.encrypt(toBeEncrypted, parsed_key, {
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding,
    }).toString();

    let ciphertext = CryptoJS.enc.Utf8.stringify(
      CryptoJS.enc.Utf8.parse(encrypted_bytes)
    );

    // Remove trailing padding
    ciphertext = this.rtrim(ciphertext, "=");

    return ciphertext;
  }

  decrypt(toBeDecrypted: string, iv: string, key: string): string {
    let parsed_key = this.parse_key(key);
    let ciphertext = CryptoJS.enc.Utf8.parse(toBeDecrypted).toString(
      CryptoJS.enc.Utf8
    );
    let decrypted = CryptoJS.AES.decrypt(ciphertext, parsed_key, {
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
