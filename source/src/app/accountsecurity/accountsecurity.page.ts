import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-accountsecurity',
  templateUrl: './accountsecurity.page.html',
  styleUrls: ['./accountsecurity.page.scss'],
})
export class AccountsecurityPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }
  mobile_display='';
  onMyLoad(){
    //参数
    this.params;
  }
  onMyShow(){
    // var mobile=this.MemberInfo.mobile;
    // console.log(mobile)
    // var len= mobile.length;
    // var xx= mobile.substring(3,len-4);
    // this.mobile_display = mobile.replace(xx,"****");
  }
  
  upadtemobile(){
    this.navigate("/updatemobile");
  }


  async confirm(msg, confirmcallback) {

    const alert = await this.alertCtrl.create({
        header: "确认解绑",
        subHeader: msg,
        buttons: [{
            text: "取消",
            handler: () => {
                console.log('Disagree clicked');

                confirmcallback(false);
            }
        }, {
            text: "确认",
            handler: () => {
                confirmcallback(true);
            }
        }]
    });
    alert.present();
}

  unbindwx(){

  //    if(this.MemberInfo.appopenid=='')
  //    {
  //      return
  //    }
  //   this.confirm("解绑微信账号将无法继续使用他登录该斑斓账号", (ret) => {
  //     if (ret == true) {
  //        this.updateinfo('appopenid',null);
  //        this.MemberInfo.appopenid="";
  //        this.toast("解绑成功");
  //     }
       
  //   });

  }
}