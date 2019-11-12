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
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.page.html',
  styleUrls: ['./updatepassword.page.scss'],
  providers:[MemberApi,ProjectApi]
})
export class UpdatepasswordPage extends AppBase {

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

  name=''
  oldpassword=''
  password=''
  password1=''
  password2=''
  onMyShow(){

    this.memberApi.info({id:this.user_id}).then((info)=>{
      this.name = info.name
      this.oldpassword = info.password
    })

  }
  checkold(){
    console.log(this.password)
    if(this.password!=""){
      this.memberApi.editpassword({id:this.user_id,password:this.password}).then((editpassword:any)=>{
        console.log(editpassword)
        if(editpassword){

        }else if(editpassword==undefined){
          this.toast('旧密码不正确！')
        }
      })
    }else {
      this.toast('请输入旧密码！')
    }
  }

  save(){
    var that = this
    if(this.password1==this.password2){
      this.memberApi.editpassword({id:this.user_id,password:this.password}).then((editpassword:any)=>{
        console.log(editpassword)
        if(editpassword){
          that.memberApi.updatepwd({id:this.user_id,password:this.password1}).then((updatepwd:any)=>{
            console.log(updatepwd)
            if(updatepwd.code=="0"){
              that.navigate('/login')
            }else {
              that.toast('修改失败！')
            }
          })
        }else if(editpassword==undefined){
          this.toast('旧密码不正确！')
        }
      })
      
    }else {
      this.toast('两个密码不相同！')
    }
  }

}
