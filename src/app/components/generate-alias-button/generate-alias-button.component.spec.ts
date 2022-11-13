import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GenerateAliasButtonComponent } from "./generate-alias-button.component";

describe("GenerateAliasButtonComponent", () => {
  let component: GenerateAliasButtonComponent;
  let fixture: ComponentFixture<GenerateAliasButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateAliasButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateAliasButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
