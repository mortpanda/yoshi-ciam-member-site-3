import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OktaGetUserService } from 'app/shared/okta/okta-get-user.service';
import { OktaSDKAuthService } from 'app/shared/okta/okta-auth.service';
import {
  OktaAuth,
  OktaAuthOptions,
  TokenManager,
  AccessToken,
  IDToken,
  UserClaims,
  TokenParams
} from '@okta/okta-auth-js';
import { WidgetModalComponent } from 'app/login-modals/widget-modal/widget-modal.component';
import { OktaWidgetService } from 'app/shared/okta/okta-widget.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CheckoutComponent implements OnInit {
  strUserSession;
  public authService = new OktaAuth(this.OktaSDKAuthService.config);
  smallScreen: boolean;

  arrShoppingItems = [];
  totalPrice;

  // セレクトタグのフォームの部品となる「月」の配列
  public monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // セレクトタグのフォームの部品となる「年」の配列
  public yearList = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031];
  public paymentForm: FormGroup;

  title = 'materialApp';
  public NameFormGroup: FormGroup;
  public lastnameFormGroup: FormGroup;
  public formGroup: FormGroup;

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  constructor(
    private OktaGetUserService: OktaGetUserService,
    private OktaSDKAuthService: OktaSDKAuthService,
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    public WidgetModalComponent: WidgetModalComponent,
    public OktaWidgetService: OktaWidgetService,
    public _matdialog: MatDialog,

  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });

    this.paymentForm = this._formBuilder.group({
      'cardNumber': ['', [Validators.required]],
      'expiration_month': ['', [Validators.required]],
      'expiration_year': ['', [Validators.required]]
    })

    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          fullNameFormCtrl: ['', Validators.required],
          emailFormCtrl: ['', Validators.required],
          streetAddressFormCtrl: ['', Validators.required],
          localityFormCtrl: ['', Validators.required],
          regionFormCtrl: ['', Validators.required],
          postcodeFormCtrl: ['', Validators.required],
        }),
      ])
    });
  }





  async ngOnInit() {

    this.strUserSession = await this.authService.session.exists()
      .then(function (exists) {
        if (exists) {
          // logged in
          //console.log('Session to Okta : ' + exists);

          return exists
        } else {
          // not logged in
          //console.log(exists);
          return exists
        }
      });
    switch (this.strUserSession == true) {
      case false:
        this.OktaSDKAuthService.OktaSDKAuthClient.signOut();
      case true:
        await this.GetShoppingItems();
        await this.OktaGetUserService.GetUserInfo();
        this.formGroup = await this._formBuilder.group({
          formArray: this._formBuilder.array([
            this._formBuilder.group({
              fullNameFormCtrl: this.OktaGetUserService.strFullName,
              emailFormCtrl: this.OktaGetUserService.strThisUser,
              streetAddressFormCtrl: this.OktaGetUserService.strStreeAddress,
              localityFormCtrl: this.OktaGetUserService.strLocality,
              regionFormCtrl: this.OktaGetUserService.strRegion,
              postcodeFormCtrl: this.OktaGetUserService.strPostCode,
            })
          ])
        });

        break;
    }
    console.log(this.formGroup.value.formArray[0])
  }
  GetShoppingItems() {
    this.arrShoppingItems = JSON.parse(localStorage.getItem('okta_shopping'));
    this.totalPrice = JSON.parse(localStorage.getItem('okta_shopping_total'));
  }

  async Checkout() {
    ///////////////////////////////////////////////////////
    this.OktaWidgetService.mfaMode = 'mfacheckout';
    ///////////////////////////////////////////////////////

    // localStorage.setItem('okta_user_address', JSON.stringify(colAddress));
    // Launch MFA
    const dialogUC = new MatDialogConfig();
    dialogUC.disableClose = true;
    dialogUC.id = "WidgetComponent";
    dialogUC.height = "auto";
    dialogUC.width = "auto";
    const modalDialog = this._matdialog.open(WidgetModalComponent, dialogUC);
  }

}
