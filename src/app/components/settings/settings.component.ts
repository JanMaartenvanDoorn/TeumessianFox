import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  FormGroup,
  NgForm,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { BrowserService } from "../../services/browser.service";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})
export class SettingssComponent implements OnInit {
  settingsForm = new FormGroup({
    domain: new FormControl("", [
      Validators.required,
      Validators.pattern(
        /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/
      ),
    ]),
    encryption: new FormControl("", [Validators.pattern(/^[a-zA-Z0-9]{32}$/)]),
  });

  matcher = new MyErrorStateMatcher();
  hide = true;
  valid_input = false;
  post: any = "";
  browserService = new BrowserService();
  domainPlaceholder = "example.com";
  encryptionPrivateKeyPlaceholder = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.updatePlaceholders();
  }

  async checkValid() {
    this.updatePlaceholders();
    this.valid_input = !this.settingsForm.valid;
  }

  async onSubmit(post: string) {
    this.post = post;
    this.browserService.setSetting(post);
    this.updatePlaceholders();
  }

  async updatePlaceholders() {
    this.domainPlaceholder = await this.browserService.getDomain();
    if (this.domainPlaceholder === undefined) {
      this.domainPlaceholder = "example.com";
    }
    this.encryptionPrivateKeyPlaceholder =
      await this.browserService.getEncryptionPrivateKey();
    if (this.encryptionPrivateKeyPlaceholder === undefined) {
      this.encryptionPrivateKeyPlaceholder = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    }
  }

  onClick() {
    this.updatePlaceholders();
  }
}
