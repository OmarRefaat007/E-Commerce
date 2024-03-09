import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor( private _EcomDataService:EcomDataService , private _Router:Router ){  }

  categories:any;

  ngOnInit(): void {
      this._EcomDataService.getAllCategories().subscribe({
        next:(response)=>{
          this.categories = response.data
          console.log(this.categories);
          
        }
      })
  }


  categoryDetails(categoryId:string , categoryName:string):void {
    let body = {
      "categoryId":categoryId ,
      "categoryName":categoryName
    }
    this._Router.navigate(['/categorydetails'],{state: {body}})
  }



}
