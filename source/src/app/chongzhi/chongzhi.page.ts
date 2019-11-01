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
  selector: 'app-chongzhi',
  templateUrl: './chongzhi.page.html',
  styleUrls: ['./chongzhi.page.scss'],
  providers:[MemberApi,ProjectApi,CenterApi]
})
export class ChongzhiPage extends AppBase {

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

  ismember = 'N'
  photo =''
  username = ''
  ballnum = 0
  member_id=''
  ballcoinlist=null
  onMyShow(){

    this.memberApi.info({id:this.user_id}).then((memberinfo) => {
      console.log(memberinfo,'4165456')
      this.ismember = memberinfo.ismember
      this.photo = memberinfo.photo
      this.username = memberinfo.name
      this.ballnum = memberinfo.ballnum
      this.member_id = memberinfo.id
  })

  this.centerApi.ballcoinlist({}).then((ballcoinlist)=>{
      console.log(ballcoinlist)
      this.ballcoinlist = ballcoinlist.reverse() 
  })

  }
  paymoney = 0;
  ballnum2 = 0;
  d=false;
  choose(e,item){
    console.log(e)
    console.log(item)
    
    var current = e.target.parentElement.parentElement
    if(current.classList.contains('money')){
      console.log('ooooo')
      current.classList.add('money-active')
    }else {
      return
    }
    
    this.paymoney = item.money
    this.ballnum2 = item.ballnum
    var others = current.parentElement.parentElement.childNodes
    console.log(others)
    console.log(current)
    for(let i=1;i<others.length; i++){
      if(current != others[i].childNodes[0]){
        others[i].childNodes[0].classList.remove('money-active')
      }
    }


  }

  gbzf() {
    this.d = false;
    this.onMyShow();
    // window.location.href = "/order";  //出现短暂白屏
    // this.navigate("/order");
  }

  pay(){
    console.log(this.paymoney,this.ballnum2)
    this.d = true
  }
  zhifufanshi=0

  zhifu(id){
    this.zhifufanshi = id;

  }


  lijizhifu() {
    this.d = false;

    this.ballnum = Number(this.ballnum) + Number(this.ballnum2)
    console.log(typeof this.ballnum,'222')
    console.log(this.ballnum,'3333')
    console.log( typeof this.ballnum2,'222')
    console.log( typeof this.paymoney,'3333')
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDay()
    let hh = date.getHours()
    let mm = date.getMinutes()

    let nowtime = year + '-' + month +'-'+day+" "+hh+":"+mm


    if(this.paymoney>0){
      this.centerApi.memberpayment({member_id:this.member_id,chongzhi:this.ballnum2,chong_time:nowtime,status: 'A'}).then((addintegration:any)=>{
        console.log(addintegration)
        if(addintegration.code=='0'){
          this.memberApi.editballnum({id:this.member_id,ballnum: this.ballnum}).then((editballnum:any)=>{
            console.log(editballnum,'家私电话')
            if(editballnum.code=='0'){
              this.router.navigate(['chongzhisuccess'],{
                queryParams: {
                  money: this.paymoney,
                  ballnum: this.ballnum2
                }
              })
            }
          })
        }
      })
    }

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