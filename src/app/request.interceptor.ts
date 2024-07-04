import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('interceptor initiallized', request);


    if (request.method === 'POST') {
      const newRequest = request.clone({
        headers: new HttpHeaders({ token: '21654561suiheu' })
      });
      return next.handle(newRequest);
    }
    return next.handle(request);
  }
}
