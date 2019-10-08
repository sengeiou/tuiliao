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

  onMyShow(){

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

      this.horselist = horselist.filter(item=>{
        item.horse_time = this.getDate(item.horse_time)
        return item.isnew == '是'
      })
      
      console.log(this.horselist,'llll')
    
    })

  }

 

  newRecom(event){
    
    this.horselist = null
    console.log(event)
    event.target.classList.add('new-active')
    event.target.parentElement.childNodes[1].classList.remove('new-active')
    
    this.onMyShow()

  }


  oldRecom(event){
    // this.horselist = []
    console.log(event)
    event.target.classList.add('new-active')
    event.target.parentElement.childNodes[0].classList.remove('new-active')

    this.projectApi.horselist({}).then((horselist:any)=>{
      console.log(horselist)

      this.horselist = horselist.filter(item=>{
        item.horse_time = this.getDate(item.horse_time)
        for(let i=0;i<item.horse.length;i++){

          if(item.horse[i].onenum==item.horse[i].winner || item.horse[i].onenum==item.horse[i].second ||item.horse[i].onenum==item.horse[i].third ){
            item.horse[i].onenumcolor='#E51C23'
          }
          if(item.horse[i].twonum==item.horse[i].winner || item.horse[i].twonum==item.horse[i].second ||item.horse[i].twonum==item.horse[i].third ){
            item.horse[i].twonumcolor='#E51C23'
          }
          if(item.horse[i].threenum==item.horse[i].winner || item.horse[i].threenum==item.horse[i].second ||item.horse[i].threenum==item.horse[i].third ){
            item.horse[i].threenumcolor='#E51C23'
          }
          if(item.horse[i].fournum==item.horse[i].winner || item.horse[i].fournum==item.horse[i].second ||item.horse[i].fournum==item.horse[i].third ){
            item.horse[i].fournumcolor='#E51C23'
          }
          if(item.horse[i].fivenum==item.horse[i].winner || item.horse[i].fivenum==item.horse[i].second ||item.horse[i].fivenum==item.horse[i].third ){
            item.horse[i].fivenumcolor='#E51C23'
          }
          if(item.horse[i].sixnum==item.horse[i].winner || item.horse[i].sixnum==item.horse[i].second ||item.horse[i].sixnum==item.horse[i].third ){
            item.horse[i].sixnumcolor='#E51C23'
          }

          if(item.horse[i].onenum==item.horse[i].fourth ){
            item.horse[i].onenumcolor='#FF9800'
          }
          if(item.horse[i].twonum==item.horse[i].fourth ){
            item.horse[i].twonumcolor='#FF9800'
          }
          if(item.horse[i].threenum==item.horse[i].fourth ){
            item.horse[i].threenumcolor='#FF9800'
          }
          if(item.horse[i].fournum==item.horse[i].fourth ){
            item.horse[i].fournumcolor='#FF9800'
          }
          if(item.horse[i].fivenum==item.horse[i].fourth ){
            item.horse[i].fivenumcolor='#FF9800'
          }
          if(item.horse[i].sixnum==item.horse[i].fourth ){
            item.horse[i].sixnumcolor='#FF9800'
          }

        }
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
