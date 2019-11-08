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
  selector: 'app-guanzhudetail',
  templateUrl: './guanzhudetail.page.html',
  styleUrls: ['./guanzhudetail.page.scss'],
  providers:[MemberApi,ProjectApi,CenterApi]
})
export class GuanzhudetailPage extends AppBase {

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

  member_id=''
  recomlist=[]

  member_photo = ""
  member_name = ""
  success = ""
  winningnum = ""
  success_result =""

  onMyShow(){

   

    this.activeRoute.queryParams.subscribe(query=>{

      this.recomlist=[]

      this.member_id = query.user_id
      

      this.projectApi.recomlist({user_id:query.user_id,lang: this.langcode}).then((recomlist:any)=>{
        console.log(recomlist,'recom')
          this.recomlist = recomlist.filter(item=>{
            this.member_photo = item.member_photo
            this.member_name = item.member_name
            this.success = item.success
            this.winningnum = item.winningnum
            this.success_result = item.success_result
            item.pub_time = this.getchangetime(item.pub_time)
            if(item.isnew == '是'){
              return item
            }
          })
         
        console.log(this.recomlist,'recomlist')
       
      })

    })
    

  }
  guanzushow=false
  guanzu(user_id){
    console.log(user_id)
 
    if(this.guanzushow == true) {
      this.centerApi.addfocus({befocus_id: this.member_id, status: 'A',focus_member_id:this.user_id}).then((addfocus:any)=>{
        console.log(addfocus)
      })  
    }else {
     
      this.centerApi.cancelfocus({focus_member_id:this.user_id,befocus_id: this.member_id,status: 'D'}).then((cancelfocus:any)=>{
        if(cancelfocus.code == '0'){
          console.log(cancelfocus)
          // this.guanzushow = !this.guanzushow
          // this.onMyShow()
        }
      })
    }
    this.guanzushow = !this.guanzushow
  }
  
  newRecom(event){
    
    console.log(event)
    event.target.classList.add('new-active')
    event.target.parentElement.childNodes[1].classList.remove('new-active')
    
    this.projectApi.recomlist({user_id:this.member_id,lang: this.langcode}).then((recomlist:any)=>{
      console.log(recomlist,'recom')
      // if(recomlist.list)

        this.recomlist = recomlist.filter(item=>{
          item.pub_time = this.getchangetime(item.pub_time)
          if(item.isnew == '是'){
            return item
          }
        })
       
      console.log(this.recomlist,'recomlist')
     
    })

  }


  oldRecom(event){
    // this.horselist = []
    console.log(event)
    event.target.classList.add('new-active')
    event.target.parentElement.childNodes[0].classList.remove('new-active')

    this.projectApi.recomlist({user_id:this.member_id,lang: this.langcode}).then((recomlist:any)=>{
      console.log(recomlist,'recom')
      // if(recomlist.list)

        this.recomlist = recomlist.filter(item=>{
          item.pub_time = this.getchangetime(item.pub_time)
          if(item.isnew == '否'){
           
            return item
          }
        })
       
      console.log(this.recomlist,'recomlist')
     
    })


  }

  tiaozhuan(item){
    console.log(item)
    if(item.isnew=='是'){

      this.centerApi.purchasedlist({recom_id:item.user_id,pur_id:this.user_id}).then((purchasedlist:any)=>{
        console.log(purchasedlist)
        if(purchasedlist.length>0){
          for(let i=0;i<purchasedlist.length;i++){
            for(let j=0;j<purchasedlist[i].recom.length;j++){
              if(purchasedlist[i].recom[j].id == item.id){
                this.router.navigate(['pay-recom-detail'],{
                  queryParams: {
                    id: item.id
                  }
                })
             }else {
              this.router.navigate(['recomdetail'],{
                queryParams: {
                  id: item.id
                }
              })
             }
          }
          
          }
        }else {
          this.router.navigate(['recomdetail'],{
            queryParams: {
              id: item.id
            }
          })
        }
       
  
      })

    }else {
      this.router.navigate(['recomdetail'],{
        queryParams: {
          id: item.id
        }
      })
    }

   

  }


}
