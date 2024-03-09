import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  constructor( private _EcomDataService:EcomDataService , private _Router:Router ){  }

  brands:any;




  ngOnInit(): void {
      this._EcomDataService.getAllBrands().subscribe({
        next:(response)=>{
          this.brands = response.data
          console.log(this.brands);
          
          
        }
      })
  }


  brandDetails(brandId:string , brandName:string):void {
    let body = {
      "brandId":brandId ,
      "brandName":brandName
    }
    this._Router.navigate(['/branddetails'],{state: {body}})
  }





}
