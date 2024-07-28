import { AppNav2Component } from './../app-nav2/app-nav2.component';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContainerComponent } from './container/container.component';
import { EmployeeComponent } from './employee/employee.component';
import { APP_SERVICE_CONFIG } from "./appConfig/appconfig.service";
import { APP_CONFIG } from "./appConfig/appconfig.service";
import { RequestInterceptor } from './request.interceptor';
import { InitService } from './init.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { NotfoundComponent } from './notfound/notfound.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './Login/login/login.component';
import { HoverDirective } from './hover.directive';
import { EmailvalidatorDirective } from './emailvalidators/emailvalidator.directive';
import { HeaderModule } from 'src/app/header/header.module';
import { RouteConfigToken } from 'src/services/routeConfig.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommentModule } from 'src/comment/comment.module';
import { GlobalErrorService } from './GlobalError/global-error.service';



function initFactory(initService: InitService) {
  return () => initService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    ContainerComponent,
    AppNav2Component,
    NotfoundComponent,
    LoginComponent,
    HoverDirective,
    EmailvalidatorDirective
  ],
  imports: [
    BrowserModule,
    // RoomsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    HeaderModule,
    MatSnackBarModule,
    CommentModule
  ],
  providers: [
    {
      provide: APP_SERVICE_CONFIG,
      useValue: APP_CONFIG
    }, {
      provide: RouteConfigToken,
      useValue: { title: 'Home' }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initFactory,
      deps: [InitService],
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
