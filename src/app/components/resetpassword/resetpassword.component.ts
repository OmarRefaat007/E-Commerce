import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit{

  constructor( private _FormBuilder:FormBuilder , private _AuthServiceService:AuthServiceService , private _Router:Router ){  }

  userEmail:any = '';


  ngOnInit(): void {
      this.userEmail = localStorage.getItem('email')
      console.log(this.userEmail);
      this.resetPasswordForm.get('email')?.setValue(this.userEmail)
  }

  

  resetPasswordForm:FormGroup = this._FormBuilder.group({
    email:[{value: '', disabled: true} , [Validators.required , Validators.email]],
    newPassword:['' , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]]
  })


  handleForm():void {
    let body = 
    {
      "email": this.resetPasswordForm.get("email")?.value,
      "newPassword": this.resetPasswordForm.get("newPassword")?.value
  }
  
    this._AuthServiceService.resetPassword(body).subscribe({
      next:(response)=>{
        console.log(response);
        
        if(response.token != null) {
          localStorage.removeItem('email')
          this._Router.navigate(['/home'])
        }
      },
      error:(err)=>{
        console.log(this.resetPasswordForm.value);
        
      }
    })
  }

}
