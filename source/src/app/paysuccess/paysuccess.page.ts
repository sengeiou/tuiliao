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

      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth()+1;
      let day = date.getDate();

      this.paydate = query.paydate

      this.nowtime = year + "年" + month +"月"+ day + "日"
      console.log(this.nowtime)
      let days = new Date(year, month, 0).getDate()
      console.log(days)
      var date2 = new Date(date);
      date2.setDate(date.getDate() + Number(this.paydate));
      this.nexttime = date2.getFullYear() + "年" + (date2.getMonth() + 1) + "月" + date2.getDate() +"日"

  })
}

}
