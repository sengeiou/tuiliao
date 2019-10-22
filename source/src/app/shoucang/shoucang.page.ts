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
  selector: 'app-shoucang',
  templateUrl: './shoucang.page.html',
  styleUrls: ['./shoucang.page.scss'],
  providers:[MemberApi,ProjectApi,CenterApi]
})
export class ShoucangPage extends AppBase {

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

  recomfavlist=null
  favlist = []
  // user_id=1
  onMyShow(){

    this.centerApi.recomfavlist({userfav_id:this.user_id}).then((recomfavlist:any)=>{
      console.log(recomfavlist)
      this.favlist = []
      this.recomfavlist = recomfavlist.filter(item=>{
        for(let i=0;i<item.recom.length;i++){
           item.recom[i].pub_time = this.getdatemm(item.recom[i].pub_time)
           this.favlist.push(item.recom[i]) 
        }
        
        return item
      })
      console.log( this.recomfavlist,' this.recomfavlist')
    })

  }
  tiaozhuan(itemId,user_id){
    console.log(itemId)

    this.centerApi.purchasedlist({recom_id:user_id,pur_id:this.user_id}).then((purchasedlist:any)=>{
      console.log(purchasedlist)
      if(purchasedlist.length>0){
        for(let i=0;i<purchasedlist.length;i++){
          for(let j=0;j<purchasedlist[i].recom.length;j++){
            if(purchasedlist[i].recom[j].id == itemId){
              this.router.navigate(['pay-recom-detail'],{
                queryParams: {
                  id: itemId
                }
              })
           }else {
            this.router.navigate(['recomdetail'],{
              queryParams: {
                id: itemId
              }
            })
           }
        }
        
        }
      }else {
        this.router.navigate(['recomdetail'],{
          queryParams: {
            id: itemId
          }
        })
      }
     

    })

  }
}