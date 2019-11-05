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
  selector: 'app-memberchongzhi',
  templateUrl: './memberchongzhi.page.html',
  styleUrls: ['./memberchongzhi.page.scss'],
  providers:[MemberApi,ProjectApi,CenterApi]
})
export class MemberchongzhiPage extends AppBase {

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

  endmenbertime=null
  huiyuanlist = null
  onMyShow(){

    this.memberApi.info({id:this.user_id}).then((info)=>{
      this.endmenbertime = info.endmenber_time
    })
    
    this.centerApi.huiyuanlist({}).then((huiyuanlist)=>{
      this.huiyuanlist = huiyuanlist.sort(this.compare("seq"))
    })
  }

  compare(pro){
    return function(a,b){
      return a[pro]-b[pro]
    }
  }

  paydate = 0
  paymoney=0
  d=false
  choose(e,item){
    console.log(e)

    var current = e.target.parentElement.parentElement
    if(current.classList.contains('member')){
      console.log('ooooo')
      current.classList.add('member-active')
    }else {
      return
    }
    this.paydate = item.days
    this.paymoney = item.money
    var others = current.parentElement.childNodes
    console.log(others)
    console.log(this.paymoney)
    for(let i=1;i<others.length; i++){
      if(current != others[i]){
        others[i].classList.remove('member-active')
      }
    }


  }

  pay() {
    console.log(this.paydate)
    this.d = true
    // this.router.navigate(['paysuccess'],{
    //   queryParams: {
    //     paydate: this.paydate
    //   }
    // })
  }

  zhifufanshi=0

  zhifu(id){
    this.zhifufanshi = id;

  }

  
  gbzf() {
    this.d = false;
    this.onMyShow();
    // window.location.href = "/order";  //出现短暂白屏
    // this.navigate("/order");
  }

  starttime=null
  endtime=null

  lijizhifu() {
    this.d = false;

    var date1 = new Date();
    var date2 = new Date(date1);
    date2.setDate(date1.getDate() + Number(this.paydate));
     this.starttime = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate() + " " + date1.getHours() + ":" +date1.getMinutes()
     this.endtime =  date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate() + " " + date2.getHours() + ":" +date2.getMinutes()

    if(this.ismember=="是"){
      
      date2.setDate(date2.getDate() + Number(this.paydate));
      this.endtime =  date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate() + " " + date2.getHours() + ":" +date2.getMinutes()

    }


    console.log(this.starttime)
    console.log(this.endtime)


    this.memberApi.updateismember({id:this.user_id,ismember:"Y",startmember_time:this.starttime,endmenber_time:this.endtime}).then((updateismember:any)=>{
      console.log(updateismember,'updateismember')
      if(updateismember.code == '0'){
        this.ismember = '是'
        this.centerApi.memberpayment({member_id:this.user_id,payment_time:this.starttime,price:this.paymoney,endtime:this.endtime}).then((addintegration:any)=>{
          console.log(addintegration,'addintegration')
          if(addintegration.code){
            this.router.navigate(['paysuccess'],{
              queryParams: {
                paydate: this.paydate,
                paymoney: this.paymoney
              }
            })
          }
        })
      }
      
  })

   

    // if (this.zhifufanshi == 0) {
    //   console.log(this.zhifuinfo);
    //   this.wechatApi.prepay({ pay_amount: this.zhifuinfo.pay_amount, orders: this.zhifuinfo.orders }).then((params) => {
    //     console.log(params);
    //     Wechat.sendPaymentRequest(params, () => {
    //       this.navigate("/paysuccess", { backtovideo_id: this.params.video_id, id: params.orderno });
    //     }, () => {
    //       this.navigate("/order");
    //     });
    //   });
    // }

    // if (this.zhifufanshi == 1) {
    //   console.log(this.zhifuinfo);
    //   this.alipayApi.prepa({ pay_amount: this.zhifuinfo.pay_amount, orders: this.zhifuinfo.orders }).then((ret) => {
    //     console.log(ret);
    //     if (ret.code == 0) {
    //       this.alipay.pay(ret.return)
    //         .then(result => {

    //           if (result.resultStatus == "9000") {
    //             this.navigate("/paysuccess", { backtovideo_id: this.params.video_id, id: ret.result });
    //             //window.location.href = "/paysuccess?id=" + ret.result;
    //           }
    //           else {
    //             this.navigate("/order");

    //           }
    //           console.log(result); // Success
    //         })
    //         .catch(error => {
    //           alert("error");
    //           alert(error);
    //           console.log(error); // Failed
    //         });
    //     }
    //   });

    // }
    // if (this.zhifufanshi == 2) {
    //   this.orderApi.pay({ pay_amount: this.zhifuinfo.pay_amount, orders: this.zhifuinfo.orders }).then((info) => {

    //     console.log(info);
    //     this.navigate("/paysuccess", { id: info });
    //     //window.location.href = "/paysuccess?id=" + info;
    //     //  this.navigate("/paysuccess",{id:info});


    //   })
    // }
  }


}