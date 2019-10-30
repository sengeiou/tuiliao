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
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
  providers:[MemberApi,ProjectApi]
})
export class SettingPage extends AppBase {

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

  accountsecurity(){
    this.navigate("/accountsecurity");

  }
  messagesetting(){
    this.navigate("/messagesetting");

  }
  privacy(){
    this.navigate("/privacy"); 
  }
  universal(){
    this.navigate("/universal"); 
  }
  // aboutbanlan(){
  //   this.navigate("/aboutbanlan"); 
  // }
  // rate(){
  //   this.appRate.preferences.storeAppURL = {
  //     ios: this.InstInfo.appleappid
  //   }
  //   this.appRate.preferences.simpleMode=true;
    
  //   this.appRate.navigateToAppStore();
  // }


}