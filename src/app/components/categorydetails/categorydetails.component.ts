import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';

@Component({
  selector: 'app-categorydetails',
  templateUrl: './categorydetails.component.html',
  styleUrls: ['./categorydetails.component.css']
})
export class CategorydetailsComponent implements OnInit {

  constructor( private _EcomDataService:EcomDataService , private _ActivatedRoute:ActivatedRoute , private _CartService:CartService , private _ToastrService:ToastrService ){  }

  categoryDetails:Product[] = [];
  categoryInfo:any;
  categoryName:string = ''
  searchTerm:string = ''
  wishListDetails:Product[]=[]
  wishlistProductId:string = ''




  wishListProperty():void {
    this.categoryDetails.map((obj) => {
      obj.wishlist = false;
  })
  console.log(this.categoryDetails);
  
  }

  wishListRemoveProperty():void {
    this.categoryDetails.map((obj) => {
      if (obj.wishlist === true) {
          obj.wishlist = false
      }
  });
  }


  

  


  addProductToWishlist(productId:string):void {
    let body = {
      "productId": productId
  }
    this._EcomDataService.addToWishlist(body).subscribe({
      next:(response)=>{
        console.log(response);
        this.wishListProperty();
        this.getUserWishList();
      }
    })
  }


  getUserWishList():void{
    this._EcomDataService.getWishList().subscribe({
      next:(response)=>{
        this.wishListDetails = response.data
        if(this.wishListDetails.length > 0) {
          this.compare()
        }
      }
    })
  }


  removeFromWishlist(productId:any):void{
    let body = productId
    this._EcomDataService.removeWishList(body).subscribe({
      next:(response)=>{
        console.log(response);
        this.wishListRemoveProperty();
        this.wishListDetails = response.data
        this.getUserWishList();
        if(this.wishListDetails.length > 0) {
          this.compare()
        }
      }
    })
  }


  compare():void {
    console.log(this.categoryDetails.length);
    
    for (let i = 0; i < this.categoryDetails.length; i++) {
      for (let x = 0; x < this.wishListDetails.length; x++) {
        if (this.categoryDetails[i]._id == this.wishListDetails[x]._id) {
          this.categoryDetails[i].wishlist = true;
          
        }
        else{
          
        }
      }
      
    }
  }




  addProductToCart(id:string):void{
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        console.log(response);
        this._ToastrService.success(response.message)
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }




  ngOnInit(): void {
    
    this.categoryInfo = history.state
    this.categoryName = this.categoryInfo.body.categoryName
    
        this._EcomDataService.getCategoryDetail(this.categoryInfo.body.categoryId).subscribe({
      next:(response)=>{
        this.categoryDetails = response.data;
        console.log(this.categoryDetails);
        this.getUserWishList()
      }
    })
  }
}
