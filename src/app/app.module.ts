import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import * as fr from '@angular/common/locales/fr';

import { AppComponent } from './app.component';
import { OnePieceComponent } from './one-piece/one-piece.component';
import { NavireComponent } from './navire/navire.component';
import { WaterComponent } from './water/water.component';
import { NameValidator } from './directive/name-validator.directive';
import { PosteValidator } from './directive/poste-validator.directive';
import { AbilitiesValidator } from './directive/abilitie-validator.directive';
import { WeaponsValidator } from './directive/weapon-validator.directive';
import { CrewComponent } from './crew/crew.component';
import { ShipValidatorDirective } from './directive/ship-validator.directive';

import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { IconsModule } from '@progress/kendo-angular-icons';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { WindowModule, DialogModule, DialogsModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';
import { MembersComponent } from './members/members-grid.component';
import { AppRoutingModule } from './app-routing.module';
import { MembersFormComponent } from './members-form/members-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import '@progress/kendo-angular-intl/locales/fr/all';
import { CrewFormComponent } from './crew-form/crew-form.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { MemberMaxValidatorDirective } from './directive/member-max-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    OnePieceComponent,
    NavireComponent,
    WaterComponent,
    MembersComponent,
    MembersFormComponent,
    NameValidator,
    PosteValidator,
    AbilitiesValidator,
    WeaponsValidator,
    CrewComponent,
    CrewFormComponent,
    ShipValidatorDirective,
    MemberMaxValidatorDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    InputsModule,
    LabelModule,
    IconsModule,
    ButtonsModule,
    DropDownsModule,
    ToolBarModule,
    WindowModule,
    DialogModule,
    DialogsModule,
    GridModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SimpleNotificationsModule.forRoot(),
    HttpClientModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
