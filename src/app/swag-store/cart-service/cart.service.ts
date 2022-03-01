import { Injectable } from '@angular/core';
import { SwagsStock } from 'app/swag-store/swag-products/swags';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  swagItems: SwagsStock[] = [];
  numPrice = 0;
  itemCount= 0;

  constructor() { }

  addToCart(swags: SwagsStock){
    this.swagItems.push(swags);
    this.numPrice = 0;
    this.itemCount = 0;
    for (var i = 0; i < this.swagItems.length; i++) {
      this.numPrice = this.numPrice + this.swagItems[i].price;
    }
    this.itemCount = this.swagItems.length;
    console.log("Current Toal : " + this.numPrice)
    console.log('Number of items : ' + this.itemCount);   
  }

  clearCart(){
    this.swagItems = [];
    this.itemCount = 0;
    this.numPrice = 0;
    console.log('Cart cleared number of items in cart : ' + this.itemCount);   
    localStorage.removeItem('okta_shopping');
  }

  getItems() {
    return this.swagItems;
  }

}
