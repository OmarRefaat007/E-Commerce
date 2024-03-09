import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './core/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ResetCodeComponent } from './components/reset-code/reset-code.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { CategorydetailsComponent } from './components/categorydetails/categorydetails.component';
import { BranddetailsComponent } from './components/branddetails/branddetails.component';

const routes: Routes = [

  { path:'' ,canActivate:[authGuard]  , component:BlankLayoutComponent , children: [
    { path:'' , redirectTo:'home' , pathMatch:'full' },
    { path:'home' , component:HomeComponent },
    { path:'cart' , component:CartComponent },
    { path:'wishlist' , component:WishlistComponent },
    { path:'products' , component:ProductsComponent },
    { path:'checkout/:id' , component:CheckoutComponent },
    { path:'allorders' , component:AllOrdersComponent },
    { path:'details/:id' , component:DetailsComponent },
    { path:'categories' , component:CategoriesComponent },
    { path:'categorydetails' , component:CategorydetailsComponent },
    { path:'brands' , component:BrandsComponent },
    { path:'branddetails' , component:BranddetailsComponent }
  ] },

  { path:'' , component:AuthLayoutComponent , children: [
    { path:'register' , component:RegisterComponent },
    { path:'login' , component:LoginComponent },
    { path:'forgotpassword' , component:ForgotpasswordComponent },
    { path:'resetcode' , component:ResetCodeComponent },
    { path:'resetpassword' , component:ResetpasswordComponent }
  ] },

  { path:'**' , component:NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
