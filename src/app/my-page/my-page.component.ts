import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { OktaGetUserService } from 'app/shared/okta/okta-get-user.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetGeolocationService } from 'app/shared/geolocation/geolocation.service';
import { GetWeatherService } from 'app/shared/weather/get-weather.service'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OktaUpdateUserService } from 'app/shared/okta/okta-update-user.service';
import { OktaConfigService } from 'app/shared/okta/okta-config.service';
import { OktaWidgetService } from 'app/shared/okta/okta-widget.service';
import { WidgetModalComponent } from 'app/login-modals/widget-modal/widget-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  OktaAuth,
  OktaAuthOptions,
  TokenManager,
  AccessToken,
  IDToken,
  UserClaims,
  TokenParams
} from '@okta/okta-auth-js'
import { OktaSDKAuthService } from 'app/shared/okta/okta-auth.service';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MyPageComponent implements OnInit {
  public authService = new OktaAuth(this.OktaSDKAuthService.config);
  bolWorkforce;
  bolCIAM;
  arrUserInformation;
  strUserSession;


  constructor(
    public OktaGetUserService: OktaGetUserService,
    fb: FormBuilder,
    public GetGeolocationService: GetGeolocationService,
    public GetWeatherService: GetWeatherService,
    public OktaUpdateUserService: OktaUpdateUserService,
    public OktaConfigService: OktaConfigService,
    public OktaWidgetService: OktaWidgetService,
    public WidgetModalComponent: WidgetModalComponent,
    public _matdialog: MatDialog,
    private OktaSDKAuthService: OktaSDKAuthService,
  ) { }

  async UpdateUC() {
    ///////////////////////////////////////////////////////
    this.OktaWidgetService.mfaMode = 'mfaUC';
    ///////////////////////////////////////////////////////
    var strProfile;
    strProfile = {
      profile:
      {
        ciam: this.bolCIAM,
        workforce: this.bolWorkforce,
      }
    };
    // Launch MFA
    localStorage.setItem('okta_uc', JSON.stringify(strProfile));
    const dialogUC = new MatDialogConfig();
    dialogUC.disableClose = true;
    dialogUC.id = "WidgetComponent";
    dialogUC.height = "auto";
    dialogUC.width = "auto";
    const modalDialog = this._matdialog.open(WidgetModalComponent, dialogUC);
  }

  async UpdateAddress() {
    ///////////////////////////////////////////////////////
    this.OktaWidgetService.mfaMode = 'mfaAddress';
    ///////////////////////////////////////////////////////
    var colAddress;
    colAddress = {
      profile:
      {
        streetAddress: this.myNewAddress,
        city: this.myNewCity,
        zipCode: this.myNewZip,
        state: this.myNewRegion,
      }
    };
    localStorage.setItem('okta_user_address', JSON.stringify(colAddress));
    // Launch MFA
    const dialogUC = new MatDialogConfig();
    dialogUC.disableClose = true;
    dialogUC.id = "WidgetComponent";
    dialogUC.height = "auto";
    dialogUC.width = "auto";
    const modalDialog = this._matdialog.open(WidgetModalComponent, dialogUC);
  }



  myNewAddress;
  addressUpdated(event) {
    console.log("New address is : ", event.target.value);
    this.myNewAddress = event.target.value;

  }

  myNewRegion;
  regionUpdated(event) {
    console.log("New region is : ", event.target.value);
    this.myNewRegion = event.target.value;
  }

  myNewCity;
  cityUpdated(event) {
    console.log("New city is : ", event.target.value);
    this.myNewCity = event.target.value;
  }

  myNewZip;
  zipUpdated(event) {
    console.log("New zip is : ", event.target.value);
    this.myNewZip = event.target.value;
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
        await this.OktaGetUserService.GetUserInfo();
        await this.GetGeolocationService.GetGeo();

    }
  }

  WFChecked: boolean;
  workforceonChange(item) {
    this.bolWorkforce = item.checked;
    console.log('Workforce was set to : ' + this.bolWorkforce);
  }

  ciamChecked: boolean;
  ciamonChange(item) {
    this.bolCIAM = item.checked;
    console.log('CIAM was set to : ' + this.bolCIAM);
  }



}
