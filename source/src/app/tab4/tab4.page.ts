import { Component, ViewChild,ChangeDetectorRef } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { ProjectApi } from 'src/providers/project.api';
import { CenterApi } from 'src/providers/center.api';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  providers:[MemberApi,ProjectApi,CenterApi]
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
    public centerApi:CenterApi,
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
    this.getmsgread()
    AppBase.LASTTAB=this;
  }

  notread="Y"
  notificationlist=null
  getmsgread(){
      console.log(this.notread,'user_id')
      this.centerApi.notificationlist({user_id:this.user_id}).then((notificationlist:any)=>{
          console.log(notificationlist)
          this.notificationlist = notificationlist.filter(item=>{
              if(this.isread(item)){
                  this.notread="N"
              }
          })
      })
  }


  isread(item){
    if(item.isread=="N"){
      return true
    }else {
      return false
    }

  }

}
