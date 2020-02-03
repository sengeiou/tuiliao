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
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers:[MemberApi,ProjectApi,CenterApi]
})
export class Tab3Page extends AppBase {

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
  @ViewChild('slide01',{static:true}) slides: IonSlides; 
  onMyLoad(){
    //参数
    this.params;
    this.projectApi.lunbolist({name:'推介'}).then((lunbolist:any)=>{
      console.log(lunbolist)
      for(let j=0;j<lunbolist.length;j++){
        this.imgs = lunbolist[j].banner
      }

      this.autoPlay()

      console.log(this.imgs)
    })
    
  }

  imgs = null
  recomlist = null
  member_id=''
  onMyShow(){
    AppBase.LASTTAB=this;


    this.memberApi.info({id:this.user_id}).then((memberinfo) => {
      console.log(memberinfo,'4165456')
      this.member_id = memberinfo.id
    })

  

    this.projectApi.recomlist({lang: this.langcode}).then((recomlist:any)=>{
      // console.log(recomlist)
      if(recomlist.length>0){
        this.recomlist = recomlist.filter(item=>{

          if(this.langcode=='sc'){
            item.biaoti = this.Simplized(item.biaoti)
            item.success = this.Simplized(item.success)
            item.winningnum = this.Simplized(item.winningnum)
            item.user_id_name = this.Simplized(item.user_id_name)
            item.pub_time_formatting = this.getchangedate(item.pub_time_formatting)
            for(let k=0;k<item.latelycom.length;k++){
              item.latelycom[k].com_time = this.getchangetime(item.latelycom[k].com_time)
            }
            return item

          }else if(this.langcode=='tc'){

            item.biaoti = this.Traditionalized(item.biaoti)
            item.success = this.Traditionalized(item.success)
            item.winningnum = this.Traditionalized(item.winningnum)
            item.user_id_name = this.Traditionalized(item.user_id_name)

            item.pub_time_formatting = this.getchangedate(item.pub_time_formatting)
            for(let k=0;k<item.latelycom.length;k++){
              item.latelycom[k].com_time = this.getchangetime(item.latelycom[k].com_time)
            }
            return item

          }

         

        })
        console.log(this.recomlist,'哈哈哈哈哈哈哈哈哈哈或或或所所所')
      }
     
    })

    console.log(this.Traditionalized('第一场'),'突突突突突突拖拖拖拖')
    console.log(this.Simplized('第一場'),'突突突突突突拖拖拖拖')
    

  }

  tiaozhuan(itemID,user_id,coincount){
    var that = this
    console.log(itemID,user_id,coincount)
    if(coincount>0){
      this.centerApi.purchasedlist({recom_id:user_id,pur_id:this.member_id,rec_id:itemID}).then((purchasedlist:any)=>{
        console.log(purchasedlist,'maimai')
        if(purchasedlist.length>0){
          console.log('eeeee')
          for(let i=0;i<purchasedlist.length;i++){
           
              console.log('买了，无')
              console.log(purchasedlist[i].rec_id,'买了，无',itemID)
              if(purchasedlist[i].rec_id==itemID){
                that.router.navigate(['/pay-recom-detail'],{
                  queryParams: {
                    id: itemID
                  }
                })
              }else {
                that.router.navigate(['/recomdetail'],{
                  queryParams: {
                    id: itemID
                  }
                })
              }

              
          }
        }else {
          console.log('eeeee')
          that.router.navigate(['/recomdetail'],{
            queryParams: {
              id: itemID
            }
          })
        }
       
  
      })
  
    }else {
      that.router.navigate(['/pay-recom-detail'],{
        queryParams: {
          id: itemID,
          coincount: coincount
        }
      })
    }
   
  }

  check(arr,id){
    for(let item of arr){
      if(item.id == id){
        return true
      }
    }
    return false
  }

 
  autoPlay() {
    this.slides.startAutoplay();
  }

  swipeEvent(e){
    this.autoPlay();
  }


  ionViewWillLeave() {
    this.slides.stopAutoplay();
  }

  slideTouchEnd() {
    this.slides.startAutoplay();
  }



}
