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
  selector: 'app-guanzhu',
  templateUrl: './guanzhu.page.html',
  styleUrls: ['./guanzhu.page.scss'],
  providers:[MemberApi,ProjectApi,CenterApi]
})
export class GuanzhuPage extends AppBase {

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

  focuslist=null
  // user_id = 1
  recom_user_id = ''
  onMyShow(){

    this.centerApi.focuslist({focus_member_id:this.user_id}).then((focuslist:any)=>{
      console.log(focuslist)
      this.focuslist = focuslist.filter(item=>{
        console.log(item.befocus.length,'item.befocus.length')

        this.memberApi.info({id:item.befocus_id}).then((info)=>{
          console.log(info,'info')

          if(this.langcode=='tc'){
            item.befocus_id_name = this.Traditionalized(info.name)
          }else if(this.langcode=='sc'){
            item.befocus_id_name = this.Simplized(info.name)
          }

          // item.befocus_id_name = info.name
          item.befocus_id_photo = info.photo
       })

       this.projectApi.recomlist({user_id:item.befocus_id}).then((recomlist:any)=>{
         console.log(recomlist,'reclist')
          for(let i=0;i<recomlist.length;i++){
            if(recomlist[i].isnew == '是'){
              item.isnew = true
            }
          }
       })

        if(item.befocus.length>1){
          item.befocus.splice(0,item.befocus.length-1)
          return item
        }else {
          return item

        }
      })
      console.log()
    })

  }

  guanzushow = false
  guanzu(item){

    console.log(item)

    this.centerApi.cancelfocus({befocus_id: item.befocus_id,status: 'D'}).then((cancelfocus:any)=>{
      if(cancelfocus.code == '0'){
        // this.guanzushow = !this.guanzushow
        this.onMyShow()
      }
    })

  }

  focusper(itemId){
    console.log(itemId)
    this.router.navigate(['guanzhudetail'],{
      queryParams:{
        user_id: itemId
      }
    })

  }
}
