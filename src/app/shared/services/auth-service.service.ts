import { UserData } from './../user-data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginData } from '../login-data';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor( private _HttpClient:HttpClient , private _Router:Router ) { }

  UserData:any;


  signOut(){
    localStorage.removeItem('eToken');
    this._Router.navigate(['/login'])
  }


  setRegister(userData:UserData):Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , userData ) 
  }


  setLogin(loginData:LoginData):Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , loginData ) 
  }

  forgotPassword(email:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` , {
      email : email
  })
  }

  resetCode(resetCode:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` , {
      resetCode
    })
  }

  resetPassword(confirmUserData:any):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,confirmUserData)
  }

  saveUserData():void {
    if ( localStorage.getItem('eToken') != null ) {
      let encodeToken:any = localStorage.getItem('eToken');
      this.UserData = jwtDecode(encodeToken);
      console.log(this.UserData);
    }
  }

}
