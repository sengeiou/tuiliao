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
  selector: 'app-recom-detail',
  templateUrl: './recom-detail.page.html',
  styleUrls: ['./recom-detail.page.scss'],
  providers:[MemberApi,ProjectApi]
})
export class RecomDetailPage extends AppBase {

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
    
  id = '';
  recommenddetail = []
  onMyShow(){
    this.activeRoute.queryParams.subscribe(query=>{
      console.log(query)
      this.id = query.id

      this.projectApi.recommenddetail({id:this.id}).then((recommenddetail:any)=>{
        console.log(recommenddetail)
        this.recommenddetail.push( recommenddetail)

        this.recommenddetail = this.recommenddetail.filter(item=>{

          item.pub_time = this.getchangetime(item.pub_time)
          item.end_time = this.getchangedatetime(item.end_time)
          for(let k=0;k<item.latelycom.length;k++){
            item.latelycom[k].com_time = this.getchangetime(item.latelycom[k].com_time)
          }
          return item
        })
        console.log(this.recommenddetail)
      })  
     
    })
  }

  pay(list){
    console.log(list)
    this.router.navigate(['pay-recom-detail'],{
      queryParams: {
        id: list.id
      }
    })
  }

  isshow = true;
  shoucang(){
    this.isshow = !this.isshow;
  }
  guanzushow=true;
  guanzu(){
    this.guanzushow = !this.guanzushow
  }

}