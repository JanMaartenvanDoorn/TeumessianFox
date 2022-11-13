// Some general configuration for the alias encryption service
export class AliasEncryptionConfig {
  initializationVector: number = 16; // Initialisation vector length
  maxLength: number = 40; // Maximum length of an alias
  encryptedPartBeforeEncryption: number = 16; // Maximum string length of the encrypted part before encryption
  encryptedPartAfterEncryption: number = 22; // Maximum string length of the encrypted part after encryption (this is a fixed value and results from the previous value)
  numberOfHashDigits: number = 8; // As the hash string is rather long we only take a few digits/characters.
}
