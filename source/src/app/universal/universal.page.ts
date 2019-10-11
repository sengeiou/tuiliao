
import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-universal',
  templateUrl: './universal.page.html',
  styleUrls: ['./universal.page.scss'],
})
export class UniversalPage extends AppBase {

  clearpg=0.0;

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
  }
  done=false;
  onMyShow(){
    this.done=true;
  }
  startclear(){
    this.clearpg=1;
    var vk=setInterval(()=>{
      var k=(Math.random()*10)%10;
      this.clearpg-=0.01;
      console.log(this.clearpg);
      if(this.clearpg<=0){
        
        clearInterval(vk);
      }
    },100);
  }
}
