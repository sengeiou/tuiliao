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
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers:[MemberApi,ProjectApi,CenterApi]
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
    public centerApi:CenterApi,
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
  member_id=''
  onMyShow(){


    this.memberApi.info({id:this.user_id}).then((memberinfo) => {
      console.log(memberinfo,'4165456')
      this.member_id = memberinfo.id
    })

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

  tiaozhuan(itemID,user_id){
    console.log(itemID,user_id)

    this.centerApi.purchasedlist({recom_id:user_id,pur_id:this.member_id}).then((purchasedlist:any)=>{
      console.log(purchasedlist)
      if(purchasedlist.length>0){
        for(let i=0;i<purchasedlist.length;i++){
          for(let j=0;j<purchasedlist[i].recom.length;j++){
            if(purchasedlist[i].recom[j].id == itemID){
              this.router.navigate(['pay-recom-detail'],{
                queryParams: {
                  id: itemID
                }
              })
           }else {
            this.router.navigate(['recomdetail'],{
              queryParams: {
                id: itemID
              }
            })
           }
        }
        
        }
      }else {
        this.router.navigate(['recomdetail'],{
          queryParams: {
            id: itemID
          }
        })
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
