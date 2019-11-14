import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides,IonSlide  } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { InstApi } from 'src/providers/inst.api';
import { ProjectApi } from 'src/providers/project.api';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers:[InstApi,ProjectApi]
})
export class Tab2Page extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public instApi:InstApi,
    public projectApi:ProjectApi,
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  @ViewChild('slide01',{static:true}) slides: IonSlides; 
 

  onMyLoad(){
    //参数
    this.params;
    AppBase.LASTTAB=this;
  }

  footlist = null
  teams = []
  rec_time = null
  isshow = false
  imgs = null

  ishuiyuan=false
  aa=1
  onMyShow(){

    // this.autoPlay()
    console.log(this.langcode,'lang')
    this.aa = 1
    this.getmsg();
  

  }

  getmsg(){
    this.isshow=false
    this.imgs=[]
    this.projectApi.footlist({lang: this.langcode}).then((footlist:any)=>{
     
       this.footlist = footlist.filter((item)=>{
         // console.log(item)
         // item.new = 'Y'
         if(item.isnew=='是'){
 
           if(item.com_date.length>5){
             item.com_date.splice(5,item.com_date.length-5)
           }
   
         
           return  item
 
         }
         console.log(this.footlist,'footlist')
       
       })
 
       this.projectApi.lunbolist({name:'足智彩'}).then((lunbolist:any)=>{
         console.log(lunbolist)
         for(let j=0;j<lunbolist.length;j++){
           this.imgs = lunbolist[j].banner
         }
 
         this.autoPlay()
 
         console.log(this.imgs)
       })
       
      
       console.log(this.footlist)
 
     })
  }

  watchthis(list){
    console.log(list)

    if(this.ismember=="否"){
      if(list.isnew=='是'){
        this.ishuiyuan = true
      }else{
        this.router.navigate(['newfootdetail'],{
          queryParams: {
            id:list.id,
            new: list.isnew
          }
        })
      }
    }else{

      this.router.navigate(['newfootdetail'],{
        queryParams: {
          id:list.id,
          new: list.isnew
        }
      })

    }

  

  }

  refuse(){
    this.ishuiyuan = false
  }

  newRecom(a){
   
    if(a==1){
      
      this.aa=1
      this.getmsg()
    }else if(a==2){
      this.aa=2
      this.oldRecom()
    }

  }


  oldRecom(){
    this.isshow = true
    this.teams = []
    this.footlist =null
    console.log(event)
  
    this.projectApi.footlist({lang: this.langcode}).then((footlist:any)=>{
      console.log(footlist)
      // this.footlist = footlist
      
      this.footlist = footlist.filter((item)=>{
      
        if(item.isnew=='否' || item.isnew==''){
          console.log(item)
          if(item.com_date.length>5){
            item.com_date.splice(5,item.com_date.length-5)
          }
  
          // for(let i=0;i<item.com_date.length;i++){
          //   return item.com_date[i].zongresult!='W'
          // }
          return item
        }
        
        
      })


      console.log(this.footlist)
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
