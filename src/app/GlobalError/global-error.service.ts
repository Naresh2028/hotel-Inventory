import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorService implements ErrorHandler{

  constructor() { }

  handleError(error: any){
    console.log(error);
  }
}
