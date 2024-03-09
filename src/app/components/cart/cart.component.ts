import { Data, cartDetails } from './../../shared/cart-details';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor( private _CartService:CartService ) {}

  cartDetails:Data = {} as Data;
  
  deleteItem(id:string):void{
    this._CartService.removeItem(id).subscribe({
      next:(response)=>{
        this.cartDetails = response.data
      },
      error:(err)=>{
        console.log(err)
      }

    })
  }

  updateCounter(id:string , count:number):void {
    if(count >= 1) {
    this._CartService.updateCount(id , count).subscribe({
      next:(response)=>{
          this.cartDetails = response.data;
          console.log(response);
        }
        
      })
    }
  }

  deleteCart():void {
    this._CartService.clearCart().subscribe({
      next:(response)=>{
        
        if(response.message == 'success') {
          this.cartDetails = {} as Data;
        }
        
      },
      error:(err)=>{

      }
    })
  }

  // cash(id:string , details:string , phone:number , city:string):void {
  //   this._CartService.cashPayment(id,details,phone,city)
  // }

  ngOnInit(): void {
      this._CartService.getUserCart().subscribe({
        next:(response)=>{
          console.log(response.data);
          
          this.cartDetails = response.data;
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
  }

}
