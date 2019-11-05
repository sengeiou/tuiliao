import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers:[MemberApi]
})
export class LoginPage extends AppBase {

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

  onMyLoad(){
    //参数
    this.params;
  }

  username = ''
  password=""
  onMyShow(){

    var storename = this.store("lastloginname");
    this.username = storename;

  }

  trylogin(){
    console.log(this.username,this.password)
    this.memberApi.employeelogin({
      name: this.username,
      password: this.password,
    }).then((ret)=>{
      console.log(ret)
      if (ret.code == "0") {
        AppBase.IsLogin=true;
        this.store("lastloginname", this.username);
        this.store("UserToken", ret.return);
        this.store("user_id",ret.result)
        this.toast("登录成功");
        this.backToUrl("/tabs/tab1");
      } else {
        this.toast("用户名或密码不正确");
      }
    })
  }

  zhuce(){
    this.store("isregister", "isregister");
    this.navigate("/register");
  }

  forgetpwd(){
    this.confirm("拨打客服电话",(ret)=>{
      if(ret){
        console.log('hhhhh')
        this.call(this.InstInfo.customerservicemobile)
      }
    })
  }
  call(tel){
    console.log(tel)
    let tel_str = "tel:"+tel;
    document.location.href=tel_str;
  }
}