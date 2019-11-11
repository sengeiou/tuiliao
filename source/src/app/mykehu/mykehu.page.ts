import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { ProjectApi } from 'src/providers/project.api';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { CenterApi } from 'src/providers/center.api';


@Component({
  selector: 'app-mykehu',
  templateUrl: './mykehu.page.html',
  styleUrls: ['./mykehu.page.scss'],
  providers:[MemberApi,ProjectApi,Clipboard,CenterApi]
})
export class MykehuPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi,
    public projectApi:ProjectApi,
    private clipboard: Clipboard,
    private centerApi: CenterApi,
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
  }

 // 会员
 ismember = 'N'
 photo =''
 username = ''
 ballnum = 0
 mycode=''
 member_id=''
 integrationlist=''
 onMyShow(){
   this.memberApi.info({id:this.user_id}).then((memberinfo:any) => {
     console.log(memberinfo,'4165456')
     this.ismember = memberinfo.ismember
     this.photo = memberinfo.photo
     this.username = memberinfo.name
     this.ballnum = memberinfo.ballnum
     this.mycode = memberinfo.mycode
     this.member_id = memberinfo.id

     this.centerApi.commissionlist({user_id: this.member_id}).then((integrationlist:any)=>{
      console.log(integrationlist)
      if(integrationlist){
        this.integrationlist = integrationlist.filter(item=>{
          // item.chong_time = this.getchangedatetime(item.chong_time)
          item.yongjin_time = this.getchangedatetime(item.yongjin_time)
          if(this.langcode=='tc'){
            item.yongjin_name = this.Traditionalized(item.yongjin_name)
          }else if(this.langcode=='sc'){
            item.yongjin_name = this.Simplized(item.yongjin_name)
          }
          
            return item
        
        })
        console.log(this.integrationlist,'111')
      }
     

    })

 })

 }

 fanhui(){
   this.centerApi.updatecomread({user_id:this.user_id,isread:'Y'}).then((updatecomread)=>{
    console.log(updatecomread)
    if(updatecomread){
      this.back()
    }
   })
 }

 copy(mycode){
  this.clipboard.copy(mycode);
  this.toast('已复制')
 }
}
