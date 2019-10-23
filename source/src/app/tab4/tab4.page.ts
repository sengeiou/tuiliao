import { Component, ViewChild,ChangeDetectorRef } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { ProjectApi } from 'src/providers/project.api';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  providers:[MemberApi,ProjectApi]
})
export class Tab4Page extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi,
    public projectApi:ProjectApi,
    public cd: ChangeDetectorRef
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
    this.info={};
  }

  onMyLoad(){
    //参数
    this.params;
  }

  // 会员

  info=null;
  
  onMyShow(){
    // if(this.memberInfo!=null){
    //   this.info=this.memberInfo
    //   console.log(this.info.photo,'kkkkk')
    // }
    AppBase.LASTTAB=this;
  }
}
