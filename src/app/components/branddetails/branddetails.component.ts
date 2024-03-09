import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';

@Component({
  selector: 'app-branddetails',
  templateUrl: './branddetails.component.html',
  styleUrls: ['./branddetails.component.css']
})
export class BranddetailsComponent {
  constructor( private _EcomDataService:EcomDataService , private _ActivatedRoute:ActivatedRoute , private _CartService:CartService , private _ToastrService:ToastrService ){  }

  brandDetails:Product[] = [];
  brandInfo:any;
  brandName:string = ''
  searchTerm:string = ''
  wishListDetails:Product[]=[]
  wishlistProductId:string = ''





  wishListProperty():void {
    this.brandDetails.map((obj) => {
      obj.wishlist = false;
  })
  console.log(this.brandDetails);
  
  }

  wishListRemoveProperty():void {
    this.brandDetails.map((obj) => {
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
    console.log(this.brandDetails.length);
    
    for (let i = 0; i < this.brandDetails.length; i++) {
      for (let x = 0; x < this.wishListDetails.length; x++) {
        if (this.brandDetails[i]._id == this.wishListDetails[x]._id) {
          this.brandDetails[i].wishlist = true;
          
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
    
    this.brandInfo = history.state
    this.brandName = this.brandInfo.body.brandName
    
            this._EcomDataService.getBrandDetail(this.brandInfo.body.brandId).subscribe({
              next:(response)=>{
                this.brandDetails = response.data;
                console.log(this.brandDetails);
                this.getUserWishList()
              }
        })
      }

}
