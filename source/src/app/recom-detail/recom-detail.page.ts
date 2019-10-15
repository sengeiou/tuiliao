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
  selector: 'app-recom-detail',
  templateUrl: './recom-detail.page.html',
  styleUrls: ['./recom-detail.page.scss'],
  providers:[MemberApi,ProjectApi,CenterApi]
})
export class RecomDetailPage extends AppBase {

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
  recommenddetail = []
  
  guanzushow=true;
  isshow = true;
  d = false;

  ismember='N'
  username=''
  member_id = ''
  ballnum = 0

  onMyShow(){
    this.activeRoute.queryParams.subscribe(query=>{
      console.log(query)
      this.id = query.id

      this.memberApi.info({member_id:1}).then((memberinfo) => {
        console.log(memberinfo,'4165456')
        this.ismember = memberinfo.ismember
        this.username = memberinfo.name
        this.member_id = memberinfo.id
        this.ballnum = memberinfo.ballnum
      })

      this.projectApi.recommenddetail({id:this.id,user_id: query.user_id}).then((recommenddetail:any)=>{
        console.log(recommenddetail)
        let detaillist = []
        detaillist.push( recommenddetail)

        this.recommenddetail = detaillist.filter(item=>{

          this.centerApi.purchasedlist({recom_id:item.user_id,pur_id:this.member_id}).then((purchasedlist:any)=>{
            console.log(purchasedlist,'2222')
            console.log(purchasedlist.length,'2222')
            if(purchasedlist.length>=1){
              for(let i=0;i<purchasedlist.length;i++){
                for(let j=0;j<purchasedlist[i].recom.length;j++){
                  if(purchasedlist[i].recom[j].id == item.id){
                    this.router.navigate(['pay-recom-detail'],{
                      queryParams: {
                        id: item.id
                      }
                    })
                    }else{
                      item.pub_time = this.getchangetime(item.pub_time)
                      item.end_time = this.getchangedatetime(item.end_time)
                      for(let k=0;k<item.latelycom.length;k++){
                        item.latelycom[k].com_time = this.getchangetime(item.latelycom[k].com_time)
                      }
            
                      this.centerApi.focuslist({focus_member_id: this.member_id,befocus_id: item.user_id}).then((focuslist:any)=>{
                        console.log(focuslist.length)
                        if(focuslist.length == 1){
                          this.guanzushow = false
                        }else {
                          this.guanzushow = true
                        }
                      })
            
                      this.centerApi.recomfavlist({userfav_id: this.member_id,recom_id: item.user_id}).then((recomfavlist:any)=>{
                        console.log(recomfavlist,'aaaa')
                        if(recomfavlist.length==1){
                          this.isshow = false
                        }else {
                          this.isshow = true
                        }
                      })
            
                     
            
                      return item

                    }
                  }
                }
              }else {

                item.pub_time = this.getchangetime(item.pub_time)
                item.end_time = this.getchangedatetime(item.end_time)

                for(let k=0;k<item.latelycom.length;k++){
                  item.latelycom[k].com_time = this.getchangetime(item.latelycom[k].com_time)
                }

                console.log('4444')
                this.centerApi.focuslist({focus_member_id: this.member_id,befocus_id: item.user_id}).then((focuslist:any)=>{
                  console.log(focuslist.length)
                  if(focuslist.length == 1){
                    this.guanzushow = false
                  }else {
                    this.guanzushow = true
                  }
                })

                this.centerApi.recomfavlist({userfav_id: this.member_id,recom_id: item.user_id}).then((recomfavlist:any)=>{
                  console.log(recomfavlist,'aaaa')
                  if(recomfavlist.length==1){
                    this.isshow = false
                  }else {
                    this.isshow = true
                  }
                })
                console.log(item)
               
              }
          })
          return item

          
        })
        console.log(this.recommenddetail,'8888')


        


      })  
     
    })
  }

  // 购买物品信息
  payinfo={user_id: '', money: null,recom_id: ''}

  pay(user_id,itemId,coincount){
    console.log(user_id,'ddd')
    console.log(itemId,'eee')


    this.payinfo.user_id = user_id
    this.payinfo.money = coincount
    this.payinfo.recom_id = itemId

    this.d = true;


    console.log(coincount)

  
  }

  lijizhifu (){
    this.d = false;
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDay()

    let nowtime = year + '-' + month +'-'+day

    this.ballnum = this.ballnum - this.payinfo.money

    if(this.payinfo.money>0){
      this.centerApi.addintegration({user_id:this.member_id,zhifu:this.payinfo.money,pay_time:nowtime,status: 'A'}).then((addintegration:any)=>{
        console.log(addintegration)
        if(addintegration.code == '0'){

          this.centerApi.addpurchase({pur_id:this.member_id,status: 'A',recom_id: this.payinfo.user_id}).then((addpurchase:any)=>{
            console.log(addpurchase)
            if(addpurchase.code == '0'){
            this.router.navigate(['pay-recom-detail'],{
                queryParams: {
                  id: this.payinfo.recom_id
                }
              })
            }
          })

          this.memberApi.editballnum({id:this.member_id,ballnum: this.ballnum}).then((editballnum:any)=>{
            console.log(editballnum,'家私电话')
          })

        }
        
      })
  
    }
    
  }

  gbzf() {
    this.d = false;
    this.onMyShow();
    // window.location.href = "/order";  //出现短暂白屏
    // this.navigate("/order");
  }

  shoucang(user_id){
    console.log(user_id)

    if(this.isshow == true){

      this.centerApi.addrecfav({userfav_id:this.member_id,status: 'A',recom_id: user_id}).then((addrecfav:any)=>{
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
      this.centerApi.addfocus({befocus_id: user_id, status: 'A',focus_member_id:this.member_id}).then((addfocus:any)=>{
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