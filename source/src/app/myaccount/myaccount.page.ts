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
  selector: 'app-myaccount',
  templateUrl: './myaccount.page.html',
  styleUrls: ['./myaccount.page.scss'],
  providers:[MemberApi,ProjectApi,CenterApi]
})
export class MyaccountPage extends AppBase {

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
  ballnum = ''
  member_id=''
  integrationlist=null
  c=false
  memberpaymentlist=null
  onMyShow(){

    this.memberApi.info({id:this.user_id}).then((memberinfo) => {
      console.log(memberinfo,'4165456')
      this.ismember = memberinfo.ismember
      this.photo = memberinfo.photo
      this.username = memberinfo.name
      this.ballnum = memberinfo.ballnum
      this.member_id = memberinfo.id
      this.ismember = memberinfo.ismember


      this.memberApi.integrationlist({user_id: this.user_id}).then((integrationlist:any)=>{
        console.log(integrationlist)
        this.integrationlist = integrationlist.filter(item=>{
          item.pay_time = this.getdatemm(item.pay_time)
          if((item.yongjin > 0 && item.zhifu==0 )||(item.yongjin==0 && item.zhifu>0) ){
            return item
          }
        })
      })

      this.centerApi.memberpaymentlist({member_id:this.user_id}).then((memberpaymentlist)=>{
        console.log(memberpaymentlist)
        this.memberpaymentlist = memberpaymentlist.filter(item=>{
          item.chong_time = this.getdatemm(item.chong_time)
          if(item.chongzhi>0){
            return item
          }
        })
        console.log(this.memberpaymentlist)
      })

    })
  }

  isshow=true
  account(e){
    console.log(e)
    this.isshow = true
    e.target.parentElement.classList.add('account-active')
    var others = e.target.parentElement.parentElement.childNodes
    console.log(others)
    for(let i=1;i<others.length;i++){
      others[i].classList.remove('account-active')
    }
    this.onMyShow()
  } 

  chongzhi(e){
    this.integrationlist=null
    this.isshow = false
    e.target.parentElement.classList.add('account-active')
    var others = e.target.parentElement.parentElement.childNodes
    console.log(others)
    for(let i=2;i<others.length;i++){
      others[i].classList.remove('account-active')
    }
    others[0].classList.remove('account-active')

    this.centerApi.memberpaymentlist({member_id:this.user_id}).then((memberpaymentlist)=>{
      console.log(memberpaymentlist)
      this.memberpaymentlist = memberpaymentlist.filter(item=>{
        item.chong_time = this.getdatemm(item.chong_time)
        if(item.chongzhi>0){
          return item
        }
      })
      console.log(this.memberpaymentlist)
    })

  }

  zhifu(e){
    this.isshow = false
    this.memberpaymentlist = null
    e.target.parentElement.classList.add('account-active')
    var others = e.target.parentElement.parentElement.childNodes
    console.log(others)
    for(let i=0;i<others.length-1;i++){
      others[i].classList.remove('account-active')
    }
    
    this.memberApi.integrationlist({user_id: this.user_id}).then((integrationlist:any)=>{
      console.log(integrationlist)
      this.integrationlist = integrationlist.filter(item=>{
        item.pay_time = this.getdatemm(item.pay_time)
        if(item.zhifu>0){
          return item
        }
      })
    })

  }


}