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
    
    AppBase.LASTTAB=this;

    console.log('0000000000000000');
     
   this.getmsgread();

    this.getkehu();
    this.notread="Y"
    this.conread="Y"

    setInterval(() => {
        
      this.getmsgread();

      this.getkehu();
      console.log('好几个')
    }, 3000);

  }


  notread="Y"
  nonum=""
  notificationlist=[]
  getmsgread(){
      console.log(this.notread,'user_id')
      console.log(this.user_id,'user_id')
     //var api=AppBase.centerApi;
     this.centerApi.yanzheng({user_id:this.user_id}).then((yanzheng:any)=>{
          console.log(yanzheng,'nnnn')
          if(yanzheng.code=='0'){
            this.notread='Y'
          }else {
            this.nonum=yanzheng.code
            this.notread='N'
          }
          
      })
  }
  conread='Y'
  connum=""
  commissionlist=null
  getkehu(){
      this.centerApi.commissionlist({user_id:this.user_id}).then((commissionlist:any)=>{
          console.log(commissionlist,'嘻嘻')
          if(commissionlist){
              this.commissionlist = commissionlist.filter(item=>{
                  if(this.isread(item)){
                      this.conread="N"
                  }
              })
          }
          
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
