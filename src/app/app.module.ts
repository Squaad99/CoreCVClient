import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes} from "@angular/router";
import { CvFormComponent } from './cv-form/cv-form.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { DashBoardSettingsComponent } from './dash-board-settings/dash-board-settings.component';
import {SettingServiceService} from "./dash-board-settings/service/setting-service.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { SelectCountryComponent } from './select-country/select-country.component';
import { TitleSettingsComponent } from './title-settings/title-settings.component';
import {TitleSettingsService} from "./title-settings/service/title-settings.service";
import {CvService} from "./cv-form/service/cv.service";
import {DashboardService} from "./dashboard/service/dashboard.service";
import { InputCounterModule } from 'ng4-input-counter';
import { AdvanceSearchComponent } from './advance-search/advance-search.component';
import {AuthService} from "./login/service/auth.service";
import {UserService} from "./login/service/user.service";
import {AuthenticationInterceptor} from "./sercurity/authentication.interceptor";
import {AuthenticationGuard} from "./sercurity/authentication.guard";
import { UserSettingComponent } from './user-setting/user-setting.component';
import {UserSettingService} from "./user-setting/service/user-setting.service";
import { TablePipe } from './advance-search/table.pipe';


const appRoutes:Routes = [
  { path: 'AuthenticationPage', component:LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticationGuard]},
  { path: 'advance-search', component: AdvanceSearchComponent, canActivate: [AuthenticationGuard] },
  { path: 'dashboard-settings', component: DashBoardSettingsComponent, canActivate: [AuthenticationGuard] },
  { path: 'cv-form', component: CvFormComponent},
  { component: LoginComponent, path: "", pathMatch: "full" },
  { component: LoginComponent, path: "**" }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    CvFormComponent,
    DashBoardSettingsComponent,
    SelectCountryComponent,
    TitleSettingsComponent,
    AdvanceSearchComponent,
    UserSettingComponent,
    TablePipe
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    Ng2SearchPipeModule,
    FormsModule,
    Ng2OrderModule,
    HttpClientModule,
    InputCounterModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
  },
    CvService,
    SettingServiceService,
    TitleSettingsService,
    UserService, SelectCountryComponent,DashboardService, AuthService, AuthenticationGuard, UserSettingService],
  bootstrap: [AppComponent],
  exports: [
    TablePipe
  ]
})
export class AppModule {


}
