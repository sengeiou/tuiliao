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
  selector: 'app-guanzhu',
  templateUrl: './guanzhu.page.html',
  styleUrls: ['./guanzhu.page.scss'],
  providers:[MemberApi,ProjectApi,CenterApi]
})
export class GuanzhuPage extends AppBase {

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

  focuslist=null
  // user_id = 1
  onMyShow(){

    this.centerApi.focuslist({focus_member_id:this.user_id}).then((focuslist:any)=>{
      console.log(focuslist)
      this.focuslist = focuslist
    })

  }
  guanzushow = false
  guanzu(item){

    console.log(item)

    this.centerApi.cancelfocus({befocus_id: item.befocus_id,status: 'D'}).then((cancelfocus:any)=>{
      if(cancelfocus.code == '0'){
        // this.guanzushow = !this.guanzushow
        this.onMyShow()
      }
    })

  }

  focusper(itemId){
    console.log(itemId)
    this.router.navigate(['recomdetail'],{
      queryParams:{
        id: itemId
      }
    })

  }
}
