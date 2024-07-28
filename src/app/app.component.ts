import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Optional,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { LoggerService } from './logger.service';
import { LocalStorageToken } from './localstorage.token';
import { InitService } from './init.service';
import { ConfigService } from 'src/services/config.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'hinv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  //styles:['h1{color:red}']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'hotelinventary';

  constructor(
    @Optional() private loggerService: LoggerService,
    @Inject(LocalStorageToken) private localStorage: any,
    private initService: InitService,
    private configService: ConfigService,
    private router: Router
  ) {
    console.log(this.initService.config);

  }

  ngAfterViewInit() { }

  @ViewChild('name', { static: true }) name!: ElementRef;

  ngOnInit() {

    // this.router.events.subscribe(
    //   (event) => { console.log(event) });

    this.router.events.pipe(
      filter((event) => event instanceof NavigationStart)
    ).subscribe((event) => {
      console.log('Navigation started');
    });

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event) => {
      console.log('Navigation Completed');
    })
    
    
    this.loggerService?.Log('AppComponent.ngOnInit()');
    //this.name.nativeElement.innerText = 'Hilton Hotel';

    console.log(this.localStorage.setItem('name', 'Hilton Hotel'));
  }
}
