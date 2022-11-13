import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SettingssComponent } from "./settings.component";

describe("SettingssComponent", () => {
  let component: SettingssComponent;
  let fixture: ComponentFixture<SettingssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingssComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
