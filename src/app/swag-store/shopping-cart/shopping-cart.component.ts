import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { CartService } from 'app/swag-store/cart-service/cart.service';
import { OktaConfigService } from 'app/shared/okta/okta-config.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmptyCartNotificationComponent } from 'app/empty-cart-notification/empty-cart-notification.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShoppingCartComponent implements OnInit {
  durationInSeconds = 5;
  swagProduct = this.CartService.getItems();

  constructor(
    public CartService: CartService,
    public OktaConfigService: OktaConfigService,
    private _snackBar: MatSnackBar,
    private EmptyCartNotificationComponent: EmptyCartNotificationComponent,
  ) { }

  ngOnInit(): void {
  }

  async goToCheckout() {
    switch (this.CartService.swagItems.length) {
      case 0: {
        localStorage.removeItem('okta_shopping');
        this.openSnackBar();
        await window.location.replace(this.OktaConfigService.strRedirectURL);
        break;
      }
      default: {
        console.log('Storing the shopping items to local storage....');
        console.log(this.CartService.swagItems);
        localStorage.setItem('okta_shopping', JSON.stringify(this.CartService.swagItems));
        localStorage.setItem('okta_shopping_total', JSON.stringify(this.CartService.numPrice ));
        window.location.replace(this.OktaConfigService.strPostLogoutURL + '/checkout')
        break;
      }
    }
  }

  openSnackBar() {
    this._snackBar.openFromComponent(EmptyCartNotificationComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

}
