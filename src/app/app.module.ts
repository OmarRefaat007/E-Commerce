import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthNavbarComponent } from './components/auth-navbar/auth-navbar.component';
import { BlankNavbarComponent } from './components/blank-navbar/blank-navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { DetailsComponent } from './components/details/details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BuyPipe } from './buy.pipe';
import { TermTextPipe } from './term-text.pipe';
import { SearchPipe } from './search.pipe';
import { ToastrModule } from 'ngx-toastr';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { MyHttpInterceptor } from './my-http.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './loading.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ResetCodeComponent } from './components/reset-code/reset-code.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { CategorydetailsComponent } from './components/categorydetails/categorydetails.component';
import { BranddetailsComponent } from './components/branddetails/branddetails.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    CategoriesComponent,
    BrandsComponent,
    AuthLayoutComponent,
    BlankLayoutComponent,
    AuthNavbarComponent,
    BlankNavbarComponent,
    RegisterComponent,
    LoginComponent,
    NotFoundComponent,
    FooterComponent,
    DetailsComponent,
    BuyPipe,
    TermTextPipe,
    SearchPipe,
    CheckoutComponent,
    AllOrdersComponent,
    WishlistComponent,
    ForgotpasswordComponent,
    ResetCodeComponent,
    ResetpasswordComponent,
    CategorydetailsComponent,
    BranddetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      timeOut: 1900,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    { provide:HTTP_INTERCEPTORS , useClass:MyHttpInterceptor , multi:true },
    { provide:HTTP_INTERCEPTORS , useClass:LoadingInterceptor , multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
