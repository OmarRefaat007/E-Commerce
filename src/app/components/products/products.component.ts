import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  searchTerm:string = '';
  wishListDetails:Product[]=[]
  wishlistProductId:string = ''

  constructor(private _EcomDataService:EcomDataService , private _CartService:CartService , private _ToastrService:ToastrService){  }



  wishListProperty():void {
    this.products.map((obj) => {
      obj.wishlist = false;
  })
  console.log(this.products);
  
  }

  wishListRemoveProperty():void {
    this.products.map((obj) => {
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
    console.log(this.products.length);
    
    for (let i = 0; i < this.products.length; i++) {
      for (let x = 0; x < this.wishListDetails.length; x++) {
        if (this.products[i]._id == this.wishListDetails[x]._id) {
          this.products[i].wishlist = true;
          
        }
        else{
          
        }
      }
      
    }
  }




  pageSize:number = 0;
  currentPage:number = 0;
  total:number = 0;


 ngOnInit(): void {
  this._EcomDataService.getAllProducts().subscribe({
    next:(response)=> {
      this.products = response.data;
      this.pageSize = response.metadata.limit;
      this.currentPage = response.metadata.currentPage;
      this.total = response.results;
      this.getUserWishList()
    }
  })
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

pageChanged(event:any):void {
  this._EcomDataService.getAllProducts(event).subscribe({
    next:(response)=> {
      this.products = response.data;
      this.pageSize = response.metadata.limit;
      this.currentPage = response.metadata.currentPage;
      this.total = response.results;
    }
  })

  
}



}
