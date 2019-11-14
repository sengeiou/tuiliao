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

    AppBase.LASTTAB=this;
    console.log(this.InstInfo,'tabs')
    this.bb=0
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

  mine(){
    this.bb=0
  }
bb=0;
  openrecom(flag){
    console.log(flag,'recom')
    if(flag=="N"){
      this.confirm2('暂未开放，敬请期待',function(ret){
          
      })
    }else if(flag=="Y"){
      this.navigate('/tabs/tab3')
      this.bb=3
    }
  }

  openfoot(flag){
    console.log(flag,'foot')
    if(flag=="N"){
      this.confirm2('暂未开放，敬请期待',function(ret){
          
      })
      }else if(flag=="Y"){
        this.navigate('/tabs/tab2')
        this.bb=2
      }
  }
  
  opensaima(flag){
    var that = this
    console.log(flag,'saim')
    if(flag=="N"){
        this.confirm2('暂未开放，敬请期待',function(ret){
          
        })
    }else if(flag=="Y"){
      this.navigate('/tabs/tab1')
      this.bb=1
    }
  }


  async confirm2(msg, confirmcallback) {

    const alert = await this.alertCtrl.create({
        header: "提示",
        subHeader: msg,
        buttons: [{
            text: "确认",
            handler: () => {
                confirmcallback(true);
            }
        }]
    });
    alert.present();
}


}
