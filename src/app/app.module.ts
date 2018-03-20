import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes} from "@angular/router";
import { AuthguardGuard } from "./authguard.guard";
import { CvFormComponent } from './cv-form/cv-form.component';
import { UserService } from "./user.service";
import { HttpModule } from '@angular/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { DashBoardSettingsComponent } from './dash-board-settings/dash-board-settings.component';
import {SettingServiceService} from "./dash-board-settings/service/setting-service.service";
import {HttpClientModule} from "@angular/common/http";
import { SelectCountryComponent } from './select-country/select-country.component';
import { TitleSettingsComponent } from './title-settings/title-settings.component';
import {TitleSettingsService} from "./title-settings/service/title-settings.service";
import {CvService} from "./cv-form/service/cv.service";




const appRoutes:Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthguardGuard],
    component: DashboardComponent
  },
  {
    path: 'dashboard-settings',
    component: DashBoardSettingsComponent
  },
  {
    path: 'cv-form',
    component: CvFormComponent
  },
  { component: DashBoardSettingsComponent, path: "", pathMatch: "full" },
  { component: LoginComponent, path: "**" }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    DashboardComponent,
    CvFormComponent,
    DashBoardSettingsComponent,
    SelectCountryComponent,
    TitleSettingsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    Ng2SearchPipeModule,
    FormsModule,
    Ng2OrderModule,
    HttpClientModule
  ],
  providers: [CvService, SettingServiceService, TitleSettingsService, AuthguardGuard, UserService, HttpModule],
  bootstrap: [AppComponent]
})
export class AppModule {


}
