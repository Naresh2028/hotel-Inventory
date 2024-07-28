import { Inject, Injectable } from '@angular/core';
import { RouteConfig } from './routeConfig';
import { RouteConfigToken } from './routeConfig.service';

@Injectable({
  providedIn: 'any'
})
export class ConfigService {

  constructor(@Inject(RouteConfigToken) private configTokem:RouteConfig) {
    console.log('configService initialized..');
    console.log(this.configTokem);
  }
}
