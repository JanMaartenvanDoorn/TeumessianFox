// Alias data model
export interface Alias {
  id: string; // UUID to make every alias unique
  address: string; // The alias itself
  generated: string; // Generation date
  validated?: boolean; // Result of validation: True for passed validation, False otherwise
}
