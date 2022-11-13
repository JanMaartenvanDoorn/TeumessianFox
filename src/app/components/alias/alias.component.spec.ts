import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AliasComponent } from "./alias.component";

describe("AliasComponent", () => {
  let component: AliasComponent;
  let fixture: ComponentFixture<AliasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AliasComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AliasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
