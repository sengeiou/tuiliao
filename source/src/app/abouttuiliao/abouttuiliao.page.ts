import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { ProjectApi } from 'src/providers/project.api';
import { Clipboard } from '@ionic-native/clipboard/ngx';


@Component({
  selector: 'app-abouttuiliao',
  templateUrl: './abouttuiliao.page.html',
  styleUrls: ['./abouttuiliao.page.scss'],
  providers:[MemberApi,ProjectApi,Clipboard]
})
export class AbouttuiliaoPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi,
    public projectApi:ProjectApi,
    private clipboard: Clipboard,
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
  }


  onMyShow(){

    

  }

  copy(email) {
    console.log(email)
    this.clipboard.copy(email);
    this.toast('已复制')
  }

  call(tel){
    console.log(tel)
    let tel_str = "tel:"+tel;
    document.location.href=tel_str;
  }
}
