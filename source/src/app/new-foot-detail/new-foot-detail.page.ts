import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ProjectApi } from 'src/providers/project.api';

@Component({
  selector: 'app-new-foot-detail',
  templateUrl: './new-foot-detail.page.html',
  styleUrls: ['./new-foot-detail.page.scss'],
  providers:[MemberApi,ProjectApi]
})
export class NewFootDetailPage  extends AppBase {

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

  id='';
  footdetail=[];
  foottime=null;
  new = ''

  onMyShow(){

    this.activeRoute.queryParams.subscribe(query=>{
      console.log(query)
      this.id = query.id
      this.new = query.new
      if(this.new == '是'){
        this.projectApi.footdetail({id: query.id}).then((footdetail:any)=>{
          console.log(footdetail,'oooo')
          this.footdetail.push( footdetail)
  
          this.footdetail = this.footdetail.filter((item)=>{
            item.recom_time = this.getchangedate(item.recom_time)
            console.log(item)
            if(item.com_date.length>5){
              item.com_date.splice(5,item.com_date.length-5)
            }

            for(let i=0;i<item.com_date.length;i++){
              item.com_date[i].foot_time = this.getchangedatetime(item.com_date[i].foot_time)
              item.com_date[i].foot_time2 = this.getchangedatetime(item.com_date[i].foot_time2)
            }
            return item
          })
         this.shouqi(this.id)
        console.log(this.footdetail)
        })
  
      }else if(this.new == '否'){
        this.projectApi.footdetail({id :this.id}).then((footdetail:any)=>{
          console.log(footdetail,'oooo')
          this.footdetail.push( footdetail)
  
          this.footdetail = this.footdetail.filter((item)=>{
            item.recom_time = this.getchangedate(item.recom_time)
            item.isshow=false
            item.show = false
            console.log(item)
            if(item.com_date.length>5){
              item.com_date.splice(5,item.com_date.length-5)
            }

            for(let i=0;i<item.com_date.length;i++){
              item.com_date[i].foot_time = this.getchangedatetime(item.com_date[i].foot_time)
              item.com_date[i].foot_time2 = this.getchangedatetime(item.com_date[i].foot_time2)
              return item.com_date[i].zongresult!='W'
            }

          return item
        })
        
        this.projectApi.footlist({}).then((footlist:any)=>{
         

          this.footdetail = footlist.filter((item,idx)=>{

            item.recom_time = this.getchangedate(item.recom_time)

            item.isshow=false
            item.show = false
            if(item.com_date.length>5){
              item.com_date.splice(5,item.com_date.length-5)
            }
    
            for(let i=0;i<item.com_date.length;i++){
              item.com_date[i].foot_time = this.getchangedatetime(item.com_date[i].foot_time)
              item.com_date[i].foot_time2 = this.getchangedatetime(item.com_date[i].foot_time2)
              return item.com_date[i].zongresult!='W'
            }
    
          })

          this.shouqi(this.id)
          
          console.log(footlist)
        })

        console.log(this.footdetail)
        })
  
      }
     
    })

  }



  shouqi(id){

    console.log(id)

    for(let i=0;i<this.footdetail.length;i++){
     
      if(this.footdetail[i].id == id){
        this.footdetail[i].isshow = !this.footdetail[i].isshow;
        this.footdetail[i].show = !this.footdetail[i].show
      }

    }
    console.log(this.footdetail)


  }

}
