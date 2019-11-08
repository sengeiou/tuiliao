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
  selector: 'app-touzi',
  templateUrl: './touzi.page.html',
  styleUrls: ['./touzi.page.scss'],
  providers:[MemberApi,ProjectApi,CenterApi]
})
export class TouziPage extends AppBase {

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

  onMyLoad(){
    //参数
    this.params;
  }

  investmentlist=null;
  onMyShow(){

    this.centerApi.investmentlist({user_id: this.user_id}).then((investmentlist:any)=>{
      console.log(investmentlist,'kjkjk')

      this.investmentlist = investmentlist.filter(item=>{
        if(this.langcode=='tc'){
          item.name = this.Traditionalized(item.name)
          item.content = this.Traditionalized(item.content)
        }else if(this.langcode=='sc'){
          item.name = this.Simplized(item.name)
          item.content = this.Simplized(item.content)
        }
        item.updated_date = this.getchangemonthtime(item.updated_date)
        return item
      })
   
    })

  }

  edit(item){
    console.log(item)
    this.router.navigate(['edittouzi'],{
      queryParams: item
    })
  }

  delete(item){
    this.centerApi.deleteinvest({user_id: this.user_id,id: item.id}).then((deleteinvest:any)=>{
      console.log(deleteinvest)
      if(deleteinvest.code == '0'){
        this.onMyShow();
      }
    })  
  }

}
