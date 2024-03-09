import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor( private _FormBuilder:FormBuilder , private _AuthServiceService:AuthServiceService , private _Router:Router ) {  }

  ngOnInit(): void {
    localStorage.removeItem('email')
  }

  forgotPasswordForm:FormGroup = this._FormBuilder.group({
    email:['' , [Validators.required , Validators.email]]
  })


  handleForm():void{    
    this._AuthServiceService.forgotPassword(this.forgotPasswordForm.get('email')?.value).subscribe({
      next:(response)=>{
        if(response.statusMsg == 'success') {
          localStorage.setItem('email' , this.forgotPasswordForm.get('email')?.value)
          this._Router.navigate(['/resetcode'])
        }
      }
    })
  }

}
