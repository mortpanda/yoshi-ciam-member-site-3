import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from 'app/landing/landing.component';
import {MyPageComponent} from  'app/my-page/my-page.component';
import {CheckoutComponent} from 'app/checkout/checkout.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  { path: 'mypage', component: MyPageComponent },
  { path: 'checkout', component:CheckoutComponent},
  ];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
