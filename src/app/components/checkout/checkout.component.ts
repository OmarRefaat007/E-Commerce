import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private _FormBuilder:FormBuilder , private _ActivatedRoute:ActivatedRoute , private _CartService:CartService , private _Router:Router){  }

  body:any;


  checkout:FormGroup = this._FormBuilder.group({
    details:[''],
    phone:[''],
    city:[''],
    isOnline:['']
  })

  cartId:any = ''

  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
          this.cartId = params.get('id')
        }
      })
  }



  handleForm():void {
    this.body = {
      "details": this.checkout.get('details')?.value,
      "phone" :this.checkout.get('phone')?.value,
      "city":this.checkout.get('city')?.value
    }
    if (this.checkout.get('isOnline')?.value == 'visa'){
      this._CartService.checkoutOnline(this.cartId,this.body).subscribe({
        next:(response)=>{
          if (response.status == "success") {
            window.open(response.session.url , '_self')
          }
        }
      
          // else if (this.checkout.get('isOnline')?.value == 'cash') {
            
          //   this._Router.navigate(['/allorders'])
          // }
    })
  }
  else if(this.checkout.get('isOnline')?.value == 'cash'){
    this._CartService.cashPayment(this.cartId,this.body).subscribe({
      next:(response)=>{
        console.log(response);
        this._Router.navigate(['/allorders'])
      }
    })
  }
}
}
