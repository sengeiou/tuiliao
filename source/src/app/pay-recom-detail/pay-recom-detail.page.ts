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
  coincount=null
  // user_id = 1
  onMyShow(){
    this.activeRoute.queryParams.subscribe(query=>{
      console.log(query)
      this.id = query.id
      this.coincount= query.coincount
      this.recommenddetail = []

      this.projectApi.recommenddetail({id:this.id,lang: this.langcode}).then((recommenddetail:any)=>{
        console.log(recommenddetail)
        this.recommenddetail.push( recommenddetail)

        this.recommenddetail = this.recommenddetail.filter(item=>{


          if(this.langcode=='sc'){
            
            item.biaoti = this.Simplized(item.biaoti)
            item.success = this.Simplized(item.success)
            item.winningnum = this.Simplized(item.winningnum)
            item.user_id_name = this.Simplized(item.user_id_name)

          }else if(this.langcode=='tc'){

            item.biaoti = this.Traditionalized(item.biaoti)
            item.success = this.Traditionalized(item.success)
            item.winningnum = this.Traditionalized(item.winningnum)
            item.user_id_name = this.Traditionalized(item.user_id_name)

          }

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

          this.centerApi.recomfavlist({userfav_id: this.user_id,recom_id: item.user_id,rec_id:item.id}).then((recomfavlist:any)=>{
            console.log(recomfavlist,'aaaa')
            console.log(recomfavlist.length,'aaaa')
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

  shoucang(list){
    console.log(list)

    if(this.isshow == true){

      this.centerApi.addrecfav({userfav_id:this.user_id,status: 'A',recom_id: list.user_id,rec_id:list.id}).then((addrecfav:any)=>{
        console.log(addrecfav)
      })

    }else {

      this.centerApi.deletefav({recom_id: list.user_id,userfav_id:this.user_id,rec_id:list.id}).then((deletefav:any)=>{
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
      this.centerApi.cancelfocus({befocus_id: user_id,focus_member_id:this.user_id}).then((cancelfocus:any)=>{
        console.log(cancelfocus)
      })
    }
    this.guanzushow = !this.guanzushow
  }
}