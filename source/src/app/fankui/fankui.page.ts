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
  selector: 'app-fankui',
  templateUrl: './fankui.page.html',
  styleUrls: ['./fankui.page.scss'],
  providers:[MemberApi,ProjectApi,CenterApi]
})
export class FankuiPage extends AppBase {

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


  onMyShow(){

    

  }
  content = ''
  send(){
    let date = new Date()
    let feedbacktime = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
    console.log(feedbacktime)

    if(this.content!=""){
      this.centerApi.savefankui({user_id: this.user_id,content: this.content,fee_time: feedbacktime,status: 'A'}).then((savefankui:any)=>{
        console.log(savefankui)
        if(savefankui.code == '0'){
          this.content = ''
          this.toast("留言成功");
        }
      })
    }
    
  }
}
