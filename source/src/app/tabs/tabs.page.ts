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
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  providers:[MemberApi,ProjectApi]
})
export class TabsPage extends AppBase {

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

  hidetab=false;
xz=1;
count=0;
static Instance:TabsPage=null;
currentpage="";
  ionViewDidEnter() {
    TabsPage.Instance=this;
    if (AppBase.LASTTAB != null) {
      
      AppBase.LASTTAB.ionViewDidEnter();
     
    }


  }

  gotoTab4() {
    //this.
    if (AppBase.IsLogin == true) {
      this.router.navigateByUrl("/tabs/tab3");
      this.xz=2;
      console.log(this.xz);
    } else {
      this.router.navigate(["login"], { queryParams: {} });
    }

  }
  gotoTab1(){
  

  
      this.xz=1;
      console.log(this.xz);
  

  }
  gotoTab5() {
    //this.
    if (AppBase.IsLogin == true) {
      this.router.navigateByUrl("/tabs/tab4");
      this.xz=3;
      console.log(this.xz);
    } else {
      this.router.navigate(["login"], { queryParams: {} });
    }
  }

}
