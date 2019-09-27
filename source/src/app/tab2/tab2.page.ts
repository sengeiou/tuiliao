import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides,IonSlide  } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { InstApi } from 'src/providers/inst.api';
import { ProjectApi } from 'src/providers/project.api';

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

  @ViewChild('slide01',{static:true}) IonSlides; 
 

  onMyLoad(){
    //参数
    this.params;
  }

  footlist = null
  teams = []
  rec_time = null
  isshow = false

  onMyShow(){

    // this.autoPlay()

    this.projectApi.footlist({}).then((footlist:any)=>{
      console.log(footlist)
      // this.footlist = footlist

      let day = new Date()
      let year = day.getFullYear()
      let  month :any = (day.getMonth()+1)
      let date :any = day.getDate()

      month = month < 10 ? '0'+ month : month
      date = date < 10  ? '0'+ date : date
      // this.nowTime = year+ "-" + month + "-" + date;

      // this.rec_time = year+ "-" + month + "-" + date;
      this.rec_time = '2019-09-26'
      this.footlist = footlist.filter((item)=>{
        console.log(item)
        item.new = 'Y'
        if(item.com_date.length>5){
          item.com_date.splice(5,item.com_date.length-5)
        }

        return item.recom_time > this.rec_time
      })

      
     
      console.log(this.footlist)

    })
    

  }

  watchthis(list){
    console.log(list)
    this.router.navigate(['newfootdetail'],{
      queryParams: {
        id:list.id,
        new: list.new
      }
    })
  }

  newRecom(event){
    this.isshow = false
    console.log(event)
    event.target.classList.add('new-active')
    event.target.parentElement.childNodes[1].classList.remove('new-active')
    
    this.onMyShow()

  }

  nowTime = null

  oldRecom(event){
    this.isshow = true
    this.teams = []
    this.footlist = []
    console.log(event)
    event.target.classList.add('new-active')
    event.target.parentElement.childNodes[0].classList.remove('new-active')

    this.projectApi.footlist({}).then((footlist:any)=>{
      console.log(footlist)
      // this.footlist = footlist
      
      let day = new Date()
      let year = day.getFullYear()
      let  month :any = (day.getMonth()+1)
      let date :any = day.getDate()

      month = month < 10 ? '0'+ month : month
      date = date < 10  ? '0'+ date : date
      // this.nowTime = year+ "-" + month + "-" + date;

      // this.nowTime = '2019-09-26's

      this.footlist = footlist.filter((item)=>{
        item.new = 'N'
        console.log(item)
        if(item.com_date.length>5){
          item.com_date.splice(5,item.com_date.length-5)
        }

        
        // for(let k=0;k<item.com_date.length;k++){
        //   if(item.com_date[k].result == 'Y'){
        //     item.com_date[k].result = '命中'
        //   }else if(item.com_date[k].result == 'N'){
        //     item.com_date[k].result = '未中'
        //   }

        //   if(item.com_date[k].result2 == 'Y'){
        //     item.com_date[k].result2 = '命中'
        //   }else if(item.com_date[k].result2 == 'N'){
        //     item.com_date[k].result2 = '未中'
        //   }
        // }


        return item.recom_time <= this.rec_time
      })

      

      // for(let k=0;k<this.teams.length;k++){
      //   if(this.teams[k].result == 'Y'){
      //     this.teams[k].result = '命中'
      //   }else if(this.teams[k].result == 'N'){
      //     this.teams[k].result = '未中'
      //   }
      // }


      console.log(this.footlist)
    })

  }

}
