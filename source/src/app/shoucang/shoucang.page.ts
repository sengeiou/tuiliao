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
  selector: 'app-shoucang',
  templateUrl: './shoucang.page.html',
  styleUrls: ['./shoucang.page.scss'],
  providers:[MemberApi,ProjectApi,CenterApi]
})
export class ShoucangPage extends AppBase {

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

  recomfavlist=null
  user_id=1
  onMyShow(){

    this.centerApi.recomfavlist({userfav_id:this.user_id}).then((recomfavlist:any)=>{
      console.log(recomfavlist)
      this.recomfavlist = recomfavlist.filter(item=>{
        
        for(let i=0;i<item.recom.length;i++){
           item.recom[i].pub_time = this.getdatemm(item.recom[i].pub_time)
        }
        return item
      })
    })

  }
  tiaozhuan(itemId){
    console.log(itemId)

    this.router.navigate(['recomdetail'],{
      queryParams:{
        id: itemId
      }
    })

  }
}