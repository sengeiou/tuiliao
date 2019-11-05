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
  selector: 'app-paysuccess',
  templateUrl: './paysuccess.page.html',
  styleUrls: ['./paysuccess.page.scss'],
  providers:[MemberApi,ProjectApi,CenterApi]
})
export class PaysuccessPage extends AppBase {

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

  nowtime = ''
  nexttime=''
  paydate = ''
  onMyShow(){

    this.activeRoute.queryParams.subscribe(query=>{
      console.log(query)
    
        this.nowtime = this.getchinesetime(query.starttime)
        this.nexttime = this.getchinesetime(query.endtime)
     

  })
}

getchinesetime(date) {
  let date1 = date.slice(0,4);
  let date2 = date.slice(5,7);
  let date3 = date.slice(8,10);
  return date1+"年"+date2+"月"+date3+"日"
}

}
