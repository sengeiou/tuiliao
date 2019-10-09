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
import { networkInterfaces } from 'os';


@Component({
  selector: 'app-edittouzi',
  templateUrl: './edittouzi.page.html',
  styleUrls: ['./edittouzi.page.scss'],
  providers:[MemberApi,ProjectApi,CenterApi]
})
export class EdittouziPage  extends AppBase {

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

content=''
biaoti=''
id = ''
  onMyShow(){

    this.activeRoute.queryParams.subscribe(query=>{
      console.log(query)
      this.content = query.content
      this.biaoti = query.name
      this.id = query.id
    })

    console.log(this.id)

  }

  save(){

    if(this.id!='' && this.id !=undefined){

      this.centerApi.editinvest({id: this.id, user_id: 1,content: this.content,name: this.biaoti,status: 'A'}).then((editinvest:any)=>{
        if(editinvest.code=='0'){
          this.back()
        }
      })

    }else if(this.id==undefined || this.id == ''){

      this.centerApi.saveinvest({user_id: 1,content: this.content,name: this.biaoti,status: 'A'}).then((saveinvest:any)=>{
        console.log(saveinvest)
        if(saveinvest.code == '0'){
          this.back()
        }
      })
  
    }
  
  }
}
