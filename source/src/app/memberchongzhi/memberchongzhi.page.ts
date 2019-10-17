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
  selector: 'app-memberchongzhi',
  templateUrl: './memberchongzhi.page.html',
  styleUrls: ['./memberchongzhi.page.scss'],
  providers:[MemberApi,ProjectApi]
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
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
  }


  onMyShow(){

    

  }

  paydate = "包一年"
  paymoney=998
  d=false
  choose(e){
    console.log(e)

    var current = e.target.parentElement.parentElement
    current.classList.add('member-active')
    this.paydate = e.target.parentElement.childNodes[0].innerText
    var others = current.parentElement.childNodes
    console.log(others)
    console.log(current)
    for(let i=0;i<others.length; i++){
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


  lijizhifu() {
    this.d = false;

    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDay()

    let nowtime = year + '-' + month +'-'+day
    this.router.navigate(['paysuccess'],{
        queryParams: {
          paydate: this.paydate
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