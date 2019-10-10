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
  selector: 'app-pay-recom-detail',
  templateUrl: './pay-recom-detail.page.html',
  styleUrls: ['./pay-recom-detail.page.scss'],
  providers:[MemberApi,ProjectApi,CenterApi]

})
export class PayRecomDetailPage extends AppBase {

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
    
  id = '';
  isshow = true
  guanzushow = true
  recommenddetail = []
  user_id = 1
  onMyShow(){
    this.activeRoute.queryParams.subscribe(query=>{
      console.log(query)
      this.id = query.id
      this.recommenddetail = []

      this.projectApi.recommenddetail({id:this.id}).then((recommenddetail:any)=>{
        console.log(recommenddetail)
        this.recommenddetail.push( recommenddetail)

        this.recommenddetail = this.recommenddetail.filter(item=>{

          item.pub_time = this.getchangetime(item.pub_time)
          item.end_time = this.getchangedatetime(item.end_time)
          for(let k=0;k<item.latelycom.length;k++){
            item.latelycom[k].com_time = this.getchangetime(item.latelycom[k].com_time)
          }


          this.centerApi.focuslist({focus_member_id: this.user_id,befocus_id: item.user_id}).then((focuslist:any)=>{
            console.log(focuslist.length)
            if(focuslist.length == 1){
              this.guanzushow = false
            }else {
              this.guanzushow = true
            }
          })

          this.centerApi.recomfavlist({userfav_id: this.user_id,recom_id: item.user_id}).then((recomfavlist:any)=>{
            console.log(recomfavlist,'aaaa')
            if(recomfavlist.length==1){
              this.isshow = false
            }else {
              this.isshow = true
            }
          })

          return item
        })
        console.log(this.recommenddetail)
      })  
     
    })
  }

  fanhui(){
    this.router.navigate(['tabs/tab3'])
  }

  shoucang(user_id){
    console.log(user_id)

    if(this.isshow == true){

      this.centerApi.addrecfav({userfav_id:this.user_id,status: 'A',recom_id: user_id}).then((addrecfav:any)=>{
        console.log(addrecfav)
      })

    }else {

      this.centerApi.deletefav({status: 'D',recom_id: user_id,}).then((deletefav:any)=>{
        console.log(deletefav)
      })

    }
   

    this.isshow = !this.isshow;


  }
  
  
  guanzu(user_id){
    console.log(user_id)
 
    if(this.guanzushow == true) {
      this.centerApi.addfocus({befocus_id: user_id, status: 'A',focus_member_id:this.user_id}).then((addfocus:any)=>{
        console.log(addfocus)
      })  
    }else {
      this.centerApi.cancelfocus({befocus_id: user_id,status: 'D'}).then((cancelfocus:any)=>{
        console.log(cancelfocus)
      })
    }
    this.guanzushow = !this.guanzushow
  }
}