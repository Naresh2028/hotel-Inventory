import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomsComponent } from './rooms/rooms.component';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RoomsListComponent } from './rooms/rooms-list/room-list.component';
import { HeaderComponent } from './header/header.component';
import { ContainerComponent } from './container/container.component';
import { EmployeeComponent } from './employee/employee.component';
import {APP_SERVICE_CONFIG} from "./appConfig/appconfig.service";
import {APP_CONFIG} from "./appConfig/appconfig.service";
import { RequestInterceptor } from './request.interceptor';
import { InitService } from './init.service';

function initFactory(initService:InitService){
return () => initService.init();
}
 
@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent,
    RoomsListComponent,
    HeaderComponent,
    EmployeeComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide:APP_SERVICE_CONFIG,
      useValue : APP_CONFIG
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:RequestInterceptor,
      multi:true
    },
    {
      provide:APP_INITIALIZER,
      useFactory:initFactory,
      deps:[InitService],
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
