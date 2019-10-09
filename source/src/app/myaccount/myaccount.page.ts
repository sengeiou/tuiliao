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
  selector: 'app-myaccount',
  templateUrl: './myaccount.page.html',
  styleUrls: ['./myaccount.page.scss'],
  providers:[MemberApi,ProjectApi]
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
  } 

  chongzhi(e){
    this.isshow = false
    e.target.parentElement.classList.add('account-active')
    var others = e.target.parentElement.parentElement.childNodes
    console.log(others)
    for(let i=2;i<others.length;i++){
      others[i].classList.remove('account-active')
    }
    others[0].classList.remove('account-active')
  }

  zhifu(e){
    this.isshow = false
    e.target.parentElement.classList.add('account-active')
    var others = e.target.parentElement.parentElement.childNodes
    console.log(others)
    for(let i=0;i<others.length-1;i++){
      others[i].classList.remove('account-active')
    }
  }

}