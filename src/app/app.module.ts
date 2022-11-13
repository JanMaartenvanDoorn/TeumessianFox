import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularMaterialModule } from "./angular-material.module";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatCardModule } from "@angular/material/card";

import { AppComponent } from "./app.component";
import { GenerateAliasButtonComponent } from "./components/generate-alias-button/generate-alias-button.component";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import { AliasComponent } from "./components/alias/alias.component";
import { GeneratorComponent } from "./components/generator/generator.component";
import { SettingssComponent } from "./components/settings/settings.component";

@NgModule({
  declarations: [
    AppComponent,
    GenerateAliasButtonComponent,
    AliasComponent,
    GeneratorComponent,
    SettingssComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
