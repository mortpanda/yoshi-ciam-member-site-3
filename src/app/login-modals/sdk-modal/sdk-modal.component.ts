import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OktaAuthenticationService } from 'app/shared/okta/okta-authentication.service';
import {OktaConfigService} from 'app/shared/okta/okta-config.service';
import {OktaWidgetService} from 'app/shared/okta/okta-widget.service';

@Component({
  selector: 'app-sdk-modal',
  templateUrl: './sdk-modal.component.html',
  styleUrls: ['./sdk-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SdkModalComponent implements OnInit {
  loginform: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  
  constructor(
    private OktaConfigService:OktaConfigService,
    private OktaAuthenticationService:OktaAuthenticationService,
    private OktaWidgetService:OktaWidgetService,
    private fb: FormBuilder,
  ) { }

  async ngOnInit(){
    this.OktaWidgetService.CloseWidget();
    this.loginform = this.fb.group({
      username: ["", Validators.email],
      password: ["", Validators.required]
    });
    if (await this.OktaAuthenticationService.checkAuthenticated()) {
      await console.log("logged in, redirecting you to the home page");
      window.location.replace(this.OktaConfigService.strRedirectURL);

    }
  }

  async onSubmit() {
    
    console.log("event fired");
    console.log("loginInvalid", this.loginInvalid);
    console.log("formSubmitAttempt", this.formSubmitAttempt);
    console.log("returnUrl", this.OktaConfigService.strRedirectURL);

    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.loginform.valid) {
    try {
    var username = this.loginform.get("username").value;
    var password = this.loginform.get("password").value;
    //document.getElementById("okta_japan").remove();
    await this.OktaAuthenticationService.login(username, password);


    } catch (err) {
    //alert(this.authService.strstateToken)     
    console.log(err) 
    this.loginInvalid = true;
    }
    } else 
    {
      this.formSubmitAttempt = true;
      //console.log("username", username);
      //console.log("password", password);
    }
  }

}
