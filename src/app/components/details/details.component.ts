import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private _ActivatedRoute:ActivatedRoute , private _EcomDataService:EcomDataService , private _CartService:CartService , private _ToastrService:ToastrService){  }


  productDetails:Product = {} as Product;



  productSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay:true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['previous', 'next'],
    items:1,
    nav: false
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


  idProduct:any;



  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
          this.idProduct = params.get('id')

          this._EcomDataService.getProductDetails(this.idProduct).subscribe({
            next:(response)=>{
              this.productDetails = response.data;
              
            }
          })

          
        }
      })
  }

}
