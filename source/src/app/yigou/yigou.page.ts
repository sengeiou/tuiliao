import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { ProjectApi } from 'src/providers/project.api';
import { CenterApi } from 'src/providers/center.api';

@Component({
  selector: 'app-yigou',
  templateUrl: './yigou.page.html',
  styleUrls: ['./yigou.page.scss'],
  providers:[MemberApi,ProjectApi,CenterApi]
})
export class YigouPage extends AppBase {

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
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
  }

  // user_id = ''
  purchasedlist = null
  onMyShow(){

    // this.user_id = this.memberInfo.id

    this.centerApi.purchasedlist({pur_id:this.user_id}).then((purchasedlist:any)=>{
      console.log(purchasedlist)
      if(purchasedlist.length>0){
        this.purchasedlist = purchasedlist.filter(item=>{

          this.memberApi.info({id:item.recom_id}).then((info)=>{
            console.log(info,'info')
            item.befocus_id_name = info.name
            item.befocus_id_photo = info.photo
         })

          for(let i=0;i<item.recom.length;i++){
            item.recom[i].pub_time = this.getdatemm(item.recom[i].pub_time)
          }
          return item
        })
      }
      
    })
  }

  tiaozhuan(id) {
    this.router.navigate(['pay-recom-detail'],{
      queryParams:{
        id: id
      }
    })
  }
}