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
      this.footdetail = []
          if(this.new == '是'){
            // this.footdetail = []
            this.projectApi.footdetail({id: query.id,lang: this.langcode}).then((footdetail:any)=>{
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
                item.com_date = item.com_date.sort(this.compare("seq"))
                return item
              })
            this.shouqi(this.id)
            console.log(this.footdetail)
            })
      
          }else if(this.new == '否'){
            // this.footdetail = []

            this.projectApi.footlist({lang: this.langcode}).then((footlist:any)=>{
              console.log(footlist,'footlist')
              var list =[]
              footlist.filter((item,idx)=>{

                if(item.isnew=='否'){
                  this.projectApi.footdetail({id:item.id,lang:this.langcode}).then((footdetail:any)=>{
                    console.log(footdetail.com_date.length,'length')
                    footdetail.recom_time = this.getchangedate(item.recom_time)
                    footdetail.isshow=true
                    footdetail.show = true
                    if(footdetail.com_date.length>5){
                      footdetail.com_date.splice(5,item.com_date.length-5)
                    }

                    for(let i=0;i<footdetail.com_date.length;i++){
                        footdetail.com_date[i].foot_time = this.getchangedatetime(item.com_date[i].foot_time)
                        footdetail.com_date[i].foot_time2 = this.getchangedatetime(item.com_date[i].foot_time2)
                        
                      }
                      footdetail.com_date = footdetail.com_date.sort(this.compare("seq"))
                      if(this.id!=footdetail.id){
                        footdetail.isshow=false
                        footdetail.show = false
                      }
                    
          
                      list.push(footdetail)
                       this.footdetail = list.sort(this.comparetime("recom_time_timespan"))
                        console.log( list,'list')
                  })

                
                
                }
               
            })
           
            })
      
          }
     
    })

  }

  comparetime(pro){
    // pro = (new Date(pro)).getTime();
    // let times = (new Date(pro)).getTime();
    return function(a,b){
      return b[pro]-a[pro]
    }
  }

compare(pro){
  return function(a,b){
    return a[pro]-b[pro]
  }
}

  shouqi(id){

    console.log(id)

    for(let i=0;i<this.footdetail.length;i++){
     
      if(this.footdetail[i].id == id){
        this.footdetail[i].isshow = !this.footdetail[i].isshow;
        this.footdetail[i].show = !this.footdetail[i].show
      }

    }

  }

}
