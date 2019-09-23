import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppBase } from './AppBase';
import { InstApi } from 'src/providers/inst.api';
import { WechatApi } from 'src/providers/wechat.api';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers:[InstApi,MemberApi,WechatApi]
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    public instApi:InstApi,
    public memberApi:MemberApi,
    public wechatApi:WechatApi
  ) {
    this.initializeApp();
    AppBase.instapi = this.instApi;
    AppBase.memberapi=this.memberApi;
    AppBase.wechatApi=this.wechatApi
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();

      
    });
  }
}
