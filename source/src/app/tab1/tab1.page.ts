import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { ProjectApi } from 'src/providers/project.api';
import { AdMobPro } from '@ionic-native/admob-pro/ngx';
import { AdMobFree, AdMobFreeBannerConfig,AdMobFreeInterstitialConfig } from '@ionic-native/admob-free/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers:[MemberApi,ProjectApi]
})
export class Tab1Page extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi,
    public projectApi:ProjectApi,
    private admob: AdMobPro,
    private admobFree: AdMobFree
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
    this.getmsg();
    setTimeout(()=>{
      this.showad();
    },5000);
  }

  showad(){
    // alert(1);

    // this.admob.prepareInterstitial({adId: "ca-app-pub-3420076049296599/3391594024"})
    // .then(() => { 
    //   alert(2);
    //   this.admob.showInterstitial(); 
    //   alert(3);
    // });

    const bannerConfig: AdMobFreeInterstitialConfig = {
      // add your config here
      // for the sake of this example we will just use the test config
      //id:"ca-app-pub-3420076049296599/3391594024",
      isTesting:false,
      autoShow: true
     };
     this.admobFree.banner.config(bannerConfig);
     
     this.admobFree.banner.prepare()
       .then(() => {
         // banner Ad is ready
         // if we set autoShow to false, then we will need to call the show method here
       })
       .catch(e => console.log(e));
  }

  @ViewChild('slide01',{static:true}) slides: IonSlides; 

 imgs = null;
 horselist = null;
check='a'
aa=1
  onMyShow(){
    AppBase.LASTTAB=this;
   // event.target.classList.add('new-active');
    this.aa = 1
    this.getmsg()
    console.log(this.horselist,'horselist');

  
  }

  getmsg(){
    this.projectApi.lunbolist({name:'赛马'}).then((lunbolist:any)=>{
      console.log(lunbolist)
      for(let j=0;j<lunbolist.length;j++){
        this.imgs = lunbolist[j].banner
      }

      this.autoPlay()

      console.log(this.imgs)
    })


    this.projectApi.horselist({orderby:'r_main.horse_time desc'}).then((horselist:any)=>{
      console.log(horselist)
      if(horselist){
        this.horselist = horselist.filter(item=>{
          item.horse_time = this.getDate(item.horse_time)
          if(item.horse.length>10){
            item.horse.splice(10,item.horse.length-10)
          }
        
          return item.isnew == '是'
        })
        
        console.log(this.horselist,'llll')
      }
      
    
    })
  }

 

  newRecom(a){
    console.log(a,'a')
    if(a==1){
      this.aa=1
      this.getmsg()
    }else if(a==2){
      this.aa=2
      this.oldRecom()
    }

  }


  oldRecom(){
    var that = this;
    this.projectApi.horselist({orderby:'r_main.horse_time desc'}).then((horselist:any)=>{
      console.log(horselist)

      this.horselist = horselist.filter(item=>{
        item.horse_time = this.getDate(item.horse_time)

        if(item.horse.length>10){
          item.horse.splice(10,item.horse.length-10)
        }
        // var allrate=0
        for(let i=0;i<item.horse.length;i++){

          if(item.horse[i].onenum==item.horse[i].winner || item.horse[i].onenum==item.horse[i].second ||item.horse[i].onenum==item.horse[i].third ){
            item.horse[i].onenumcolor=that.InstInfo.threecolor;
          }
          if(item.horse[i].twonum==item.horse[i].winner || item.horse[i].twonum==item.horse[i].second ||item.horse[i].twonum==item.horse[i].third ){
            item.horse[i].twonumcolor=that.InstInfo.threecolor;
          }
          if(item.horse[i].threenum==item.horse[i].winner || item.horse[i].threenum==item.horse[i].second ||item.horse[i].threenum==item.horse[i].third ){
            item.horse[i].threenumcolor=that.InstInfo.threecolor;
          }
          if(item.horse[i].fournum==item.horse[i].winner || item.horse[i].fournum==item.horse[i].second ||item.horse[i].fournum==item.horse[i].third ){
            item.horse[i].fournumcolor=that.InstInfo.threecolor;
          }
          if(item.horse[i].fivenum==item.horse[i].winner || item.horse[i].fivenum==item.horse[i].second ||item.horse[i].fivenum==item.horse[i].third ){
            item.horse[i].fivenumcolor=that.InstInfo.threecolor;
          }
          if(item.horse[i].sixnum==item.horse[i].winner || item.horse[i].sixnum==item.horse[i].second ||item.horse[i].sixnum==item.horse[i].third ){
            item.horse[i].sixnumcolor=that.InstInfo.threecolor;
          }

          if(item.horse[i].onenum==item.horse[i].fourth ){
            item.horse[i].onenumcolor=that.InstInfo.fourcolor;
          }
          if(item.horse[i].twonum==item.horse[i].fourth ){
            item.horse[i].twonumcolor=that.InstInfo.fourcolor;
          }
          if(item.horse[i].threenum==item.horse[i].fourth ){
            item.horse[i].threenumcolor=that.InstInfo.fourcolor;
          }
          if(item.horse[i].fournum==item.horse[i].fourth ){
            item.horse[i].fournumcolor=that.InstInfo.fourcolor;
          }
          if(item.horse[i].fivenum==item.horse[i].fourth ){
            item.horse[i].fivenumcolor=that.InstInfo.fourcolor;
          }
          if(item.horse[i].sixnum==item.horse[i].fourth ){
            item.horse[i].sixnumcolor=that.InstInfo.fourcolor;
          }
          
          // allrate += Number(item.horse[i].hitrate) 
        }
        // item.overallhitrate=allrate/item.horse.length
        // console.log(allrate,'kkkkkk')
        return item.isnew == '否'
      })
      
      console.log(this.horselist,'llll')
    
    })
  }

  autoPlay() {
    this.slides.startAutoplay();
  }

  swipeEvent(e){
    this.autoPlay();
  }


  ionViewWillLeave() {
    this.slides.stopAutoplay();
  }

  slideTouchEnd() {
    this.slides.startAutoplay();
  }

}
