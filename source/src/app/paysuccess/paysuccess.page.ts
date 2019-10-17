import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { ProjectApi } from 'src/providers/project.api';


@Component({
  selector: 'app-paysuccess',
  templateUrl: './paysuccess.page.html',
  styleUrls: ['./paysuccess.page.scss'],
  providers:[MemberApi,ProjectApi]
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

  onMyShow(){

    this.activeRoute.queryParams.subscribe(query=>{
      console.log(query)

      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth()+1
      let day = date.getDay()

      this.nowtime = year + "年" + month +"月"+ day + "日"
      console.log(this.nowtime)
      let days = new Date(year, month, 0).getDate()
      console.log(days)
      if(query.paydate == "包一天") {
        if(days==day){
          month = month+1
          day = 1
          this.nexttime =  year + "年" + month +"月"+ day + "日"
        }else {
          day = day+1
          this.nexttime =  year + "年" + month +"月"+ day + "日"
        }
       
      }

      if(query.paydate == "包一周") {
        if((days-day)<7){
          month = month+1
          day = 7-(days-day)
          this.nexttime =  year + "年" + month +"月"+ day + "日"
        }else {
          day = day+7
          this.nexttime =  year + "年" + month +"月"+ day + "日"
        }
      
      }

      if(query.paydate == "包一月") {
        if(month == 12){
          year = year + 1
          month = 1
          this.nexttime =  year + "年" + month +"月"+ day + "日"
        }else {
          month = month+1
          this.nexttime =  year + "年" + month +"月"+ day + "日"
        }
        
      }

      if(query.paydate == "包一年") {
        year = year+1
        this.nexttime =  year + "年" + month +"月"+ day + "日"
      }

      this.updatememberinfo('id',this.user_id)
      this.updatememberinfo('ismember','Y')
      this.updatememberinfo("startmember_time",this.nowtime)
      this.updatememberinfo("endmenber_time",this.nexttime)
     


    })

  }

  updatememberinfo(type,value){
    let obj={}
    obj[type]=value
    this.memberApi.infoupdate(obj).then((infoupdate:any)=>{
      console.log(infoupdate,'kkkkk')
      this.ismember="是"
    })
  }
}
