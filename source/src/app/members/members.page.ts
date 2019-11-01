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
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
  providers:[MemberApi,ProjectApi,CenterApi]
})
export class MembersPage extends AppBase {

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

  ismember = 'N'
  photo =''
  username = ''
  integrationlist=null
  endtime = null
  onMyShow(){

    this.memberApi.info({id:this.user_id}).then((memberinfo) => {
      console.log(memberinfo,'4165456')
      this.ismember = memberinfo.ismember
      this.photo = memberinfo.photo
      this.username = memberinfo.name
      this.endtime = this.getdatech(memberinfo.endmenber_time)
  })
  // console.log(this.photo)
    this.centerApi.memberpaymentlist({member_id:this.user_id}).then((integrationlist:any)=>{
        console.log(integrationlist,'integrationlist')
        this.integrationlist = integrationlist.filter(item=>{
          if(item.price>0){
            return item
          }
        })
      
    })
  }
}
