import { UserData } from './../../shared/user-data';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { OrdersService } from 'src/app/shared/orders.service';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AllOrdersComponent {

  constructor(private _OrdersService:OrdersService){  }


  ordersOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayHoverPause:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-chevron-left"></i>', '<i class="fa-solid fa-chevron-right"></i>'],
    items:1,
    nav: true
  }

  userId:string = '';
  UserData:any;

  userOrders:any[] = [] ;
  

  ngOnInit(): void {
    if(localStorage.getItem('eToken') != null ) {
      let encodeToken:any = localStorage.getItem('eToken');
      this.UserData = jwtDecode(encodeToken);
      this.userId = this.UserData.id;
      console.log(this.userId);
      
    }

    this._OrdersService.getUserOrders(this.userId).subscribe({
      next:(response)=>{
        console.log(response);
        
        this.userOrders = response;
        
      }
    })
    
    
  }
}
