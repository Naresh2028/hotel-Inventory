import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit {

  isLoggedIn : boolean = false;

  isAdmin:boolean=false;

  constructor() { }

  ngOnInit(){
    this.isLoggedIn = false;
  }

  login(email:string,password:string){
    if(email === 'admin@gmail.com' && password === 'Admin'){
      this.isLoggedIn = true;
      this.isAdmin = true;
    }
    if(email ==='user@gmail.com' && password === 'Admin'){
      this.isLoggedIn=true;
      this.isAdmin=false;
    }
    return this.isLoggedIn;
  }

  
}
