import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
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

  onMyLoad(){
    //参数
    this.params;
  }

  footlist = null
  teams = []
  rec_time = ''
  isshow = false
  onMyShow(){

    this.projectApi.footlist({}).then((footlist:any)=>{
      console.log(footlist)
      this.footlist = footlist
      var reco_time = ''
      for(let i=0;i<this.footlist.length;i++){
        
        if(this.footlist[i].recom_time > reco_time){
          reco_time = this.footlist[i].recom_time
        }
      }

      this.footlist = this.footlist.filter((item)=>{
        return reco_time == item.recom_time
      })

        let index = reco_time.indexOf(' ')
        
        this.rec_time = reco_time.slice(0,index)

    })
    

  }

  watchthis(list){
    console.log(list)
  }

  newRecom(event){
    this.isshow = false
    console.log(event)
    event.target.classList.add('new-active')
    event.target.parentElement.parentElement.childNodes[1].childNodes[0].classList.remove('new-active')
    
    this.onMyShow()

  }

  nowTime = null

  oldRecom(event){
    this.isshow = true
    this.rec_time = ''
    this.footlist = []
    console.log(event)
    event.target.classList.add('new-active')
    event.target.parentElement.parentElement.childNodes[0].childNodes[0].classList.remove('new-active')

    this.projectApi.footlist({}).then((footlist:any)=>{
      console.log(footlist)
      // this.footlist = footlist
      
      let day = new Date()
      let year = day.getFullYear()
      let  month :any = (day.getMonth()+1)
      let date :any = day.getDate()

      month = month < 10 ? '0'+ month : month
      date = date < 10  ? '0'+ date : date
      this.nowTime = year+ "-" + month + "-" + date;

      console.log(this.nowTime)
      for(let i=0;i<footlist.length;i++){
        
        let index = footlist[i].recom_time.indexOf(' ')
        if(index != -1){
          footlist[i].recom_time = footlist[i].recom_time.slice(0,index)
        }else {
          footlist[i].recom_time = footlist[i].recom_time
        }

        if(footlist[i].recom_time <= this.nowTime){

          this.footlist.push(footlist[i])
          for(let j=0;j<footlist[i].com_time.length;j++){
            this.teams.push(footlist[i].com_time[j])
          }

        }

      }

      for(let k=0;k<this.teams.length;k++){
        if(this.teams[k].result == 'Y'){
          this.teams[k].result = '命中'
        }else if(this.teams[k].result == 'N'){
          this.teams[k].result = '未中'
        }
      }


      console.log(this.footlist)
      console.log(this.teams)
    })

  }

}
