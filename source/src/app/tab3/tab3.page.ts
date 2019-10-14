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
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers:[MemberApi,ProjectApi]
})
export class Tab3Page extends AppBase {

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
  @ViewChild('slide01',{static:true}) slides: IonSlides; 
  onMyLoad(){
    //参数
    this.params;
  }

  imgs = null
  recomlist = null

  onMyShow(){

    this.projectApi.lunbolist({name:'推介'}).then((lunbolist:any)=>{
      console.log(lunbolist)
      for(let j=0;j<lunbolist.length;j++){
        this.imgs = lunbolist[j].banner
      }

      this.autoPlay()

      console.log(this.imgs)
    })
    

    this.projectApi.recomlist({}).then((recomlist:any)=>{
      console.log(recomlist)
      if(recomlist.length>0){
        this.recomlist = recomlist.filter(item=>{
          item.pub_time_formatting = this.getchangedate(item.pub_time_formatting)
          for(let k=0;k<item.latelycom.length;k++){
            item.latelycom[k].com_time = this.getchangetime(item.latelycom[k].com_time)
          }
          return item
        })
        
      }
     
    })
    

  }

  tiaozhuan(itemID){
    console.log(itemID)

    this.router.navigate(['recomdetail'],{
      queryParams:{
        id:itemID
      }
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
