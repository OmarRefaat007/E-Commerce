import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-reset-code',
  templateUrl: './reset-code.component.html',
  styleUrls: ['./reset-code.component.css']
})
export class ResetCodeComponent {

  constructor(private _FormBuilder:FormBuilder , private _AuthServiceService:AuthServiceService , private _Router:Router){  }


  resetCodeForm:FormGroup = this._FormBuilder.group({
    resetCode:['' , [Validators.required]]
  })




  handleForm():void{    
    console.log(this.resetCodeForm.value.resetCode);
    
    this._AuthServiceService.resetCode(this.resetCodeForm.value.resetCode).subscribe({
      next:(response)=>{
        console.log(response);
        
        if(response.status == 'Success') {
          this._Router.navigate(['/resetpassword'])
        }
      }
    })
  }



}
