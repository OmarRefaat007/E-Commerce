import { Component, OnInit } from '@angular/core';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor( private _EcomDataService:EcomDataService ){  }


  wishlistProducts:any;



  deleteItem(id:string):void{
    this._EcomDataService.removeWishList(id).subscribe({
      next:(response)=>{
        console.log(response);
        
        this.getWishlist();
      },
      error:(err)=>{
        console.log(err)
      }

    })
  }


  getWishlist():void {
    this._EcomDataService.getWishList().subscribe({
      next:(response)=>{
        console.log(response.data);
        
        this.wishlistProducts = response.data
      }
    })
  }


  ngOnInit(): void {
    this.getWishlist()
  }

}
