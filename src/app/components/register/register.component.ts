import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {

  constructor( private _AuthServiceService:AuthServiceService , private _Router:Router , private _FormBuilder:FormBuilder ){ }


  msgError:string = ''

  isLoading:boolean = false;

  registerSubscribe:Subscription = new Subscription;

  registerForm:FormGroup = this._FormBuilder.group({
    name:['' , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]],
    email:['' , [Validators.required , Validators.email]],
    password:['' , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]],
    rePassword:[''],
    phone:['' , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]]
  }   ,  {validators:[this.confirmPassword]} as FormControlOptions )


  confirmPassword(group:FormGroup):void{
    let password = group.get('password')
    let rePassword = group.get('rePassword')

    if(rePassword?.value=='') {
      rePassword?.setErrors({required:true})
    }
    else if (password?.value != rePassword?.value){
      rePassword?.setErrors( {missMatch:true} )
    }

    


  }



  handleForm():void{
    if(this.registerForm.valid) {

      this.isLoading = true;

      this.registerSubscribe = this._AuthServiceService.setRegister(this.registerForm.value).subscribe({
        next:(response)=>{
          if(response.message=="success") {
          this.isLoading = false;
            this._Router.navigate(['/login'])
          }
        },
        error:(err:HttpErrorResponse)=>{
          this.isLoading = false;
          this.msgError = err.error.message
        }
      })
    }
    else {
      this.registerForm.markAllAsTouched()
    }
  }

  ngOnDestroy(): void {
    this.registerSubscribe.unsubscribe()
  }

}
