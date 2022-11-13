import { TestBed } from "@angular/core/testing";

import { AliasVerificationService } from "./alias-verification.service";

describe("AliasVerificationService", () => {
  let service: AliasVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AliasVerificationService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
