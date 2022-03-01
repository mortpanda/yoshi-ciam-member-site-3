import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { OktaAuth } from "@okta/okta-auth-js";
import { BehaviorSubject } from "rxjs";
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import { OktaConfigService } from "./okta-config.service";
import { OktaSDKAuthService } from "./okta-auth.service";
import {OktaGetTokenService} from './okta-get-token.service';

@Injectable({
  providedIn: 'root'
})
export class OktaWidgetService {

  private authClient = new OktaAuth({
    issuer: this.OktaConfigService.strIssuer,
    clientId: this.OktaConfigService.strClientID,
  });
  public isAuthenticated = new BehaviorSubject<boolean>(false);
  public strstateToken;
  public oktaSignIn;
  public idToken;
  public LogoutURI = this.OktaConfigService.strPostLogoutURL;
  public strMFAStatus;

  constructor(
    private router: Router,
    private OktaConfigService: OktaConfigService,
    private OktaSDKAuthService: OktaSDKAuthService,
    private OktaGetTokenService:OktaGetTokenService,
  ) { }

  public authService = new OktaAuth(this.OktaSDKAuthService.config);
  mfaMode;

  async checkAuthenticated() {
    const authenticated = await this.authClient.session.exists();
    this.isAuthenticated.next(authenticated);
    return authenticated;
  }


  
  async login(strState, redirecturi) {
    const strRedirURI = this.OktaConfigService.strRedirectURL;
    var mfaDone: boolean;

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
    const OktaWidgetLogo = this.OktaConfigService.strLogo;

    var oktaSignIn = new OktaSignIn({
      logo: OktaWidgetLogo,
      clientId: OktaClientID,
      baseUrl: OktaBaseURI,
      language: OktaLang,
      redirectUri: OktaRedirect,
      // redirectUri: redirecturi,
      colors: {
        brand: OktaBrand,
      },
      stateToken: strState,
      postLogoutRedirectUri: OktaPostlogoutURI,
      authParams: {
        issuer: OktaIssuer,
        responseMode: OktaResMode,
        responseType: OktaResType,
        scopes: OktaScope,
        pkce: false,
      }
    });
    console.log(OktaScope)
    await oktaSignIn.showSignInToGetTokens({
      //await oktaSignIn.showSignInToGetTokens({
      el: '#okta-signin-container'
    }).then(function (tokens) {
      oktaSignIn.authClient.tokenManager.setTokens(tokens);
      oktaSignIn.remove();
      const idToken = tokens.idToken;
      console.log("Hello, " + idToken.claims.email + "! You just logged in! :)");  
      switch (redirecturi){
        case strRedirURI:{
          window.location.replace(redirecturi);
          break;
        }
        case "mfaonly":{
         // Set MFA Status 
          mfaDone = true;   
          break;
        }
      }
      return true;

    }).catch(function (err) {
      console.error(err);
      // Set MFA Status 
      mfaDone = false;
      return false;
    });
    //console.log('MFA Status : ' + myMFADone)
    this.strMFAStatus = mfaDone;
    // console.log('MFA Status : ' + this.strMFAStatus)
  }



  CloseWidget() {
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
    // const OktaWidgetLogo = this.OktaConfigService.strLogo;
    var oktaSignIn = new OktaSignIn({
      clientId: OktaClientID,
      baseUrl: OktaBaseURI,
      language: OktaLang,
      redirectUri: OktaRedirect,
      colors: {
        brand: OktaBrand,
      },
      postLogoutRedirectUri: OktaPostlogoutURI,
      authParams: {
        issuer: OktaIssuer,
        responseMode: 'fragment',
        responseType: OktaResType,
        scopes: OktaScope,
        pkce: false,
        prompt: OktaResMode
      },
    });
    oktaSignIn.remove();

  }

}

