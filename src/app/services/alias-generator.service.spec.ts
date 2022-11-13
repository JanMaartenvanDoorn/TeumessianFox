import { TestBed } from "@angular/core/testing";

import { AliasGeneratorService } from "./alias-generator.service";

describe("AliasGeneratorService", () => {
  let service: AliasGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AliasGeneratorService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
