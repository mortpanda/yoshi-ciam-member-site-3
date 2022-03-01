import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { OktaAuth } from "@okta/okta-auth-js";
import { BehaviorSubject } from "rxjs";
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import { OktaConfigService } from 'app/shared/okta/okta-config.service';


@Injectable({
  providedIn: 'root'
})
export class OktaAuthenticationService {
  strStateToken
  public isAuthenticated = new BehaviorSubject<boolean>(false);
  
  private authClient = new OktaAuth({
    issuer: this.OktaConfigService.strIssuer,
    clientId: this.OktaConfigService.strClientID,
  });

  
  constructor(
    private OktaConfigService:OktaConfigService
  ) { }

  async checkAuthenticated() {
    const authenticated = await this.authClient.session.exists();
    this.isAuthenticated.next(authenticated);
    return authenticated;
  }

  async login(username: string, password: string) {

    const transaction = await this.authClient.signIn({ username, password });

    var element = document.getElementById("loginpage");
    element.parentNode.removeChild(element);

    this.strStateToken = transaction.data.stateToken;
    console.log(JSON.stringify(this.strStateToken));
    //Uses the state token to perform MFA authentication using a newly created widget
    const OktaClientID = this.OktaConfigService.strClientID;
    const OktaBaseURI = this.OktaConfigService.strBaseURI;
    const OktaLang = this.OktaConfigService.strLang;
    const OktaRedirect = this.OktaConfigService.strRedirectURL;
    const OktaBrand = this.OktaConfigService.strBrand;
    const OktaPostlogoutURI = this.OktaConfigService.strPostLogoutURL;
    const OktaIssuer = this.OktaConfigService.strIssuer;
    const OktaScope = this.OktaConfigService.strScope;
    const OktaResType = this.OktaConfigService.strResponseType;
    const OktaResMode = this.OktaConfigService.strResponseMode;
    const OktaPkce = this.OktaConfigService.strPkce;
    const OktaPrompt = this.OktaConfigService.strPrompt;
    var oktaSignIn = new OktaSignIn({
      clientId: OktaClientID,
      baseUrl: OktaBaseURI,
      language: OktaLang,
      redirectUri: OktaRedirect,
      colors: {
        brand: OktaBrand,
      },
      stateToken: this.strStateToken,
      postLogoutRedirectUri: OktaPostlogoutURI,
      authParams: {
        issuer: OktaIssuer,
        responseMode: OktaResMode,
        responseType: OktaResType,
        scopes: OktaScope,
        pkce: OktaPkce,
        prompt: OktaPrompt
      },
    });

    oktaSignIn.authClient.token.getUserInfo().then(function (user) {
      console.log("Hello, " + user.email + "! You are *still* logged in! :)");
      //document.getElementById("logout").style.display = 'block';
    }, function (error) {
      oktaSignIn.showSignInToGetTokens({
        el: '#okta-widget-container'
      }).then(function (tokens) {
        oktaSignIn.authClient.tokenManager.setTokens(tokens);
        oktaSignIn.remove();

        const idToken = tokens.idToken;
        const accessToken = tokens.accessToken;
        console.log("Hello, " + idToken.claims.email + "! You just logged in! :)");

        return oktaSignIn.authClient.token.getUserInfo(accessToken, idToken)
          .then(function (user) {
            // user has details about the user            
            //window.location.replace(window.location.origin);
            window.location.replace(OktaRedirect);
            //console.log('Logged in time now : ' + loggedinTime)
            //window.location.replace(this.OktaConfig.strRedirectURL);
          })
          .catch(function (err) {
            // handle OAuthError or AuthSdkError (AuthSdkError will be thrown if app is in OAuthCallback state)
          });
        
      }).catch(function (err) {
        console.error(err);
      });

    });
  }

  // OktaLogout(bar?: string) {

  //   this.authClient.tokenManager.clear();
  //   this.authClient.signOut({ postLogoutRedirectUri: this.OktaConfigService.strPostLogoutURL, idToken: this.idToken });
  //   location.reload();
  //}

}
