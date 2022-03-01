import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {CartService} from 'app/swag-store/cart-service/cart.service';
import {SwagsStock, swags} from 'app/swag-store/swag-products/swags';

@Component({
  selector: 'app-swag-store',
  templateUrl: './swag-store.component.html',
  styleUrls: ['./swag-store.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SwagStoreComponent implements OnInit {

  swags = swags;
  constructor(
    private cartService: CartService,

  ) { }
  addToCart(swags: SwagsStock) {
    this.cartService.addToCart(swags);
    //window.alert('Your product has been added to the cart!');
  }
  ngOnInit(): void {
  }

}
