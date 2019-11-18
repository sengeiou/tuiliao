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
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
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
    console.log(this.horselist,'horselist')
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


    this.projectApi.horselist({}).then((horselist:any)=>{
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

    this.projectApi.horselist({}).then((horselist:any)=>{
      console.log(horselist)

      this.horselist = horselist.filter(item=>{
        item.horse_time = this.getDate(item.horse_time)

        if(item.horse.length>10){
          item.horse.splice(10,item.horse.length-10)
        }
        // var allrate=0
        for(let i=0;i<item.horse.length;i++){

          if(item.horse[i].onenum==item.horse[i].winner || item.horse[i].onenum==item.horse[i].second ||item.horse[i].onenum==item.horse[i].third ){
            item.horse[i].onenumcolor='red'
          }
          if(item.horse[i].twonum==item.horse[i].winner || item.horse[i].twonum==item.horse[i].second ||item.horse[i].twonum==item.horse[i].third ){
            item.horse[i].twonumcolor='red'
          }
          if(item.horse[i].threenum==item.horse[i].winner || item.horse[i].threenum==item.horse[i].second ||item.horse[i].threenum==item.horse[i].third ){
            item.horse[i].threenumcolor='red'
          }
          if(item.horse[i].fournum==item.horse[i].winner || item.horse[i].fournum==item.horse[i].second ||item.horse[i].fournum==item.horse[i].third ){
            item.horse[i].fournumcolor='red'
          }
          if(item.horse[i].fivenum==item.horse[i].winner || item.horse[i].fivenum==item.horse[i].second ||item.horse[i].fivenum==item.horse[i].third ){
            item.horse[i].fivenumcolor='red'
          }
          if(item.horse[i].sixnum==item.horse[i].winner || item.horse[i].sixnum==item.horse[i].second ||item.horse[i].sixnum==item.horse[i].third ){
            item.horse[i].sixnumcolor='red'
          }

          if(item.horse[i].onenum==item.horse[i].fourth ){
            item.horse[i].onenumcolor='black'
          }
          if(item.horse[i].twonum==item.horse[i].fourth ){
            item.horse[i].twonumcolor='black'
          }
          if(item.horse[i].threenum==item.horse[i].fourth ){
            item.horse[i].threenumcolor='black'
          }
          if(item.horse[i].fournum==item.horse[i].fourth ){
            item.horse[i].fournumcolor='black'
          }
          if(item.horse[i].fivenum==item.horse[i].fourth ){
            item.horse[i].fivenumcolor='black'
          }
          if(item.horse[i].sixnum==item.horse[i].fourth ){
            item.horse[i].sixnumcolor='black'
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
