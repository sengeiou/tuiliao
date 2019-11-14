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
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
  providers:[MemberApi,ProjectApi,CenterApi]
})
export class MessagePage extends AppBase {

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

  messagelist=[]
  notificationlist=[]
  messagelists = []
  onMyShow(){
    AppBase.LASTTAB=this;
    console.log(this.memberInfo,'kkkkkk')
    // this.getmsg()
    this.getmymsg();

  }

  getmymsg(){
    var that = this
    this.memberApi.usermsg({id:this.user_id}).then((usermsg)=>{
      console.log(usermsg,'getmymsg')
      this.messagelists = usermsg.filter(item=>{
        let date = new Date(item.msgtime)
        item.times = date.getTime();  
        
        
        if(item.systype!=""){
          that.centerApi.mokuai({id:item.systype}).then((mokuai:any)=>{
            console.log(mokuai,'mokuai')
            if(mokuai){
              item.systype_name = mokuai.name
            }
          })
        }else if(item.systype==""){
          item.isshow==false
        }
        return item
      })
      this.messagelists =this.messagelists.sort(this.compare('times'))
    })
  }

  getmsg(){
    this.centerApi.messagelist({}).then((messagelist:any)=>{
      console.log(messagelist)
      this.messagelist = messagelist.filter(item=>{
        let date = new Date(item.msgtime)
        item.times = date.getTime(); 
        if(this.langcode=='tc'){
          item.content = this.Traditionalized(item.content)
        }else if(this.langcode=='sc'){
          item.content = this.Simplized(item.content)
        }
        item.isshow = true
        // item.msgtime = this.getdate(item.msgtime)
        return item
      })

      this.centerApi.notificationlist({user_id:this.user_id}).then((notificationlist)=>{
        console.log(notificationlist)
        this.notificationlist = notificationlist.filter(item=>{
          // item.msgtime = this.getdate(item.msgtime)
          let date = new Date(item.msgtime)
          item.times = date.getTime();  
          item.isshow = false
          if(item.paycoins>0){
            this.memberApi.userinfo({id:item.recom_user}).then((info)=>{
              console.log(info,'info')
              item.recommend_user_id = info.login_id
            })
            
          }
          return item
        })
        this.messagelists = this.messagelist.concat(this.notificationlist)
        this.messagelists = this.messagelists.sort(this.compare('times'))
        console.log(this.messagelists,'msg')
      })
     
           
    })
  }

  compare(pro){
    return function(a,b){
      return b[pro]-a[pro]
    }
  }

  isRead(ID){
    console.log(ID)
  
    this.centerApi.editisread({id:ID,isread:'Y'}).then((editisread)=>{
        console.log(editisread)
    })
  }

  detail(item){
    console.log(item)
    if(item.systype_name=="赛马"){
      this.isRead(item.id)
      this.navigate('/tabs/tab1')
    }else if(item.systype_name=='足智彩') {
      this.isRead(item.id)
      this.navigate('/tabs/tab2')
    }else if(item.systype_name=="推介"){
      this.isRead(item.id)
      this.navigate('/tabs/tab3')
    }else if(item.systype_name=="系统"){
      this.isRead(item.id)
      this.getmymsg();
    }else if(item.paycoins>0){
      this.isRead(item.id)
      this.navigate('/pay-recom-detail',{
        id:item.rec_id
      })
    }else if(item.ballcoins>0){
      this.isRead(item.id)
      this.navigate('/chongzhi')
    }else if(item.membermoney>0){
      this.isRead(item.id)
      this.navigate('/members')
    }
  }

  fanhui(){

    this.centerApi.yanzheng({user_id:this.user_id}).then((yanzheng:any)=>{
      console.log(yanzheng,'nnnn')
      if(yanzheng.code=='0'){
        this.router.navigate(['/tabs/tab4'],{queryParams:{
          notread:'Y'
        }})
        // this.notread='Y'
      }else {
        this.router.navigate(['/tabs/tab4'],{queryParams:{
          notread:'N'
        }})
        // this.notread='N'
      }
      
  })

   
  }
  
}
