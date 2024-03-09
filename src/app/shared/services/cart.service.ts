import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor( private _HttpClient:HttpClient ) { }
  


  addToCart(productId:string):Observable<any> {
    let bodyObject:object = {"productId": "6428e509dc1175abc65ca07e"}
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart` , 
    { productId: productId }
    )
  }

  getUserCart():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`)
  }

  removeItem(productId:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`)
  }

  updateCount(productId:string , count:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , { count })
  }

  clearCart():Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`)
  }

  cashPayment(cartId:string , userData:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` , {
      shippingAddress : userData
    })
  }

  checkoutOnline(cartId:string , userData:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://OmarRefaat007.github.io/E-Commerce` , 
    {
        shippingAddress:userData
    }
    )
  }
  // onlinePayment():observable<any>{
  //   return  
  // }


}
