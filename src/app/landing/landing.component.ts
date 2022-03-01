import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {WidgetModalComponent} from 'app/login-modals/widget-modal/widget-modal.component';
import {SdkModalComponent} from 'app/login-modals/sdk-modal/sdk-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {OktaWidgetService} from 'app/shared/okta/okta-widget.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LandingComponent implements OnInit {

  constructor(
    public _matdialog: MatDialog,
    public OktaWidgetService:OktaWidgetService,
  ) { }

  sdkLogin(){
    const WidgetDialogConfig = new MatDialogConfig();
    WidgetDialogConfig.disableClose = false;
    WidgetDialogConfig.id = "sdk-modal-component";
    // WidgetDialogConfig.height = "600px";
    // WidgetDialogConfig.width = "450px";
    const modalDialog = this._matdialog.open(SdkModalComponent, WidgetDialogConfig);
  }

  widgetLogin() {
    
    ///////////////////////////////////////////////////////
    this.OktaWidgetService.mfaMode = 'login';
    ///////////////////////////////////////////////////////
    
    const WidgetDialogConfig = new MatDialogConfig();
    WidgetDialogConfig.disableClose = false;
    WidgetDialogConfig.id = "widget-modal-component";
    // WidgetDialogConfig.height = "600px";
    // WidgetDialogConfig.width = "450px";
    const modalDialog = this._matdialog.open(WidgetModalComponent, WidgetDialogConfig);
}

  ngOnInit(): void {
  }




}
