import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor( private _AuthServiceService:AuthServiceService , private _Router:Router , private _FormBuilder:FormBuilder ){ }


  ngOnInit(): void {
    localStorage.removeItem('email')
  }


  msgError:string = ''

  isLoading:boolean = false;

  registerSubscribe:Subscription = new Subscription;

  loginForm:FormGroup = this._FormBuilder.group({
    email:[null , [Validators.required , Validators.email]],
    password:[null , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]]
  })

  handleForm():void{
    if(this.loginForm.valid) {

      this.isLoading = true;

      this.registerSubscribe = this._AuthServiceService.setLogin(this.loginForm.value).subscribe({
        next:(response)=>{
          if(response.message=="success") {

            localStorage.setItem('eToken' , response.token)
            this._AuthServiceService.saveUserData();
            this.isLoading = false;
            this._Router.navigate(['/home'])
          }
        },
        error:(err:HttpErrorResponse)=>{
          this.isLoading = false;
          this.msgError = err.error.message
        }
      })
    }
    else {
      this.loginForm.markAllAsTouched()
    }
  }

  ngOnDestroy(): void {
    this.registerSubscribe.unsubscribe()
  }

}
