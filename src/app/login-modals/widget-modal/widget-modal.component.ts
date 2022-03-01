import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { OktaWidgetService } from 'app/shared/okta/okta-widget.service';
import { OktaAuthenticationService } from 'app/shared/okta/okta-authentication.service';
import { OktaConfigService } from 'app/shared/okta/okta-config.service';
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
} from '@okta/okta-auth-js'
import { OktaUpdateUserService } from 'app/shared/okta/okta-update-user.service';
// import {MyPageComponent} from 'app/my-page/my-page.component';

@Component({
  selector: 'app-widget-modal',
  templateUrl: './widget-modal.component.html',
  styleUrls: ['./widget-modal.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class WidgetModalComponent implements OnInit {
  public authService = new OktaAuth(this.OktaSDKAuthService.config);
  constructor(
    private OktaWidgetService: OktaWidgetService,
    private OktaAuthenticationService: OktaAuthenticationService,
    private OktaConfigService: OktaConfigService,
    private OktaGetUserService: OktaGetUserService,
    private OktaSDKAuthService: OktaSDKAuthService,
    private OktaUpdateUserService: OktaUpdateUserService,
    // private MyPageComponent:MyPageComponent,
  ) { }

  async ngOnInit() {

    this.OktaWidgetService.CloseWidget();
    console.log(this.OktaWidgetService.mfaMode)

    switch (this.OktaWidgetService.mfaMode) {
      case 'mfacheckout': {
        ///////////////////////////////////////////////////
        await this.OktaGetUserService.GetUserInfo();
        const username = this.OktaGetUserService.strThisUser;
        const transaction = await this.authService.signIn({ username });
        const strstateToken = transaction.data.stateToken;
        await this.OktaWidgetService.login(strstateToken, 'mfaonly');
        console.log('mfa only');
        console.log('MFA Status : ' + this.OktaWidgetService.strMFAStatus)
        ///////////////////////////////////////////////////
        switch (this.OktaWidgetService.strMFAStatus) {
          case true: {
            // var oktaUC;
            // oktaUC = [];
            // oktaUC = localStorage.getItem('okta_uc');
            // //console.log(JSON.parse(oktaUC));
            // localStorage.removeItem('okta_uc');

            await this.OktaGetUserService.GetUserInfo();
            await console.log(this.OktaGetUserService.strThisSession.tokens.accessToken.accessToken);
            await console.log(this.OktaGetUserService.strThisSession.tokens.idToken.claims.sub);
            // await this.OktaUpdateUserService.PostUserInfo(this.OktaConfigService.strBaseURI + this.OktaConfigService.strMeEP, this.OktaGetUserService.strThisSession.tokens.accessToken.accessToken, JSON.parse(oktaUC));
            window.location.replace(this.OktaConfigService.strRedirectURL);
            break;
          }
          case false: {
            break;
          }
          default: {
            break;
          }
        }

        break;
      }

      case 'mfaUC': {
        ///////////////////////////////////////////////////
        await this.OktaGetUserService.GetUserInfo();
        const username = this.OktaGetUserService.strThisUser;
        const transaction = await this.authService.signIn({ username });
        const strstateToken = transaction.data.stateToken;
        await this.OktaWidgetService.login(strstateToken, 'mfaonly');
        console.log('mfa only');
        console.log('MFA Status : ' + this.OktaWidgetService.strMFAStatus)
        ///////////////////////////////////////////////////
        switch (this.OktaWidgetService.strMFAStatus) {
          case true: {
            var oktaUC;
            oktaUC = [];
            oktaUC = localStorage.getItem('okta_uc');
            //console.log(JSON.parse(oktaUC));
            localStorage.removeItem('okta_uc');

            await this.OktaGetUserService.GetUserInfo();
            await console.log(this.OktaGetUserService.strThisSession.tokens.accessToken.accessToken);
            await console.log(this.OktaGetUserService.strThisSession.tokens.idToken.claims.sub);
            await this.OktaUpdateUserService.PostUserInfo(this.OktaConfigService.strBaseURI + this.OktaConfigService.strMeEP, this.OktaGetUserService.strThisSession.tokens.accessToken.accessToken, JSON.parse(oktaUC));
            window.location.replace(this.OktaConfigService.strRedirectURL);
            break;
          }
          case false: {
            break;
          }
          default: {
            break;
          }
        }

        break;
      }
      case 'mfaAddress': {
        ///////////////////////////////////////////////////
        await this.OktaGetUserService.GetUserInfo();
        const username = this.OktaGetUserService.strThisUser;
        const transaction = await this.authService.signIn({ username });
        const strstateToken = transaction.data.stateToken;
        await this.OktaWidgetService.login(strstateToken, 'mfaonly');
        console.log('mfa only');
        console.log('MFA Status : ' + this.OktaWidgetService.strMFAStatus)
        ///////////////////////////////////////////////////
        switch (this.OktaWidgetService.strMFAStatus) {
          case true: {
            var oktaUserAddress;
            oktaUserAddress = [];
            oktaUserAddress = localStorage.getItem('okta_user_address');
            console.log(JSON.parse(oktaUserAddress));
            localStorage.removeItem('okta_user_address');

            await this.OktaGetUserService.GetUserInfo();
            await console.log(this.OktaGetUserService.strThisSession.tokens.accessToken.accessToken);
            await console.log(this.OktaGetUserService.strThisSession.tokens.idToken.claims.sub);
            await this.OktaUpdateUserService.PostUserInfo(this.OktaConfigService.strBaseURI + this.OktaConfigService.strMeEP, this.OktaGetUserService.strThisSession.tokens.accessToken.accessToken, JSON.parse(oktaUserAddress));
            window.location.replace(this.OktaConfigService.strRedirectURL);
            break;
          }
          case false: {
            break;
          }
          default: {
            break;
          }
        }
        break;
      }
      case 'login': {
        if (await this.OktaAuthenticationService.checkAuthenticated()) {
          await console.log("logged in, redirecting you to the home page");
          window.location.replace(this.OktaConfigService.strRedirectURL);
        }
        else {
          this.OktaWidgetService.login('', this.OktaConfigService.strRedirectURL);
        }
        break;
      }
    }

  }

}
