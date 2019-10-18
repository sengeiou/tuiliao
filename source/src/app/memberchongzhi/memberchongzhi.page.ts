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
  onMyShow(){

    this.memberApi.info({id:this.user_id}).then((info)=>{
      this.endmenbertime = info.endmenber_time
    })
    

  }

  paydate = "包一年"
  paymoney=998
  d=false
  choose(e){
    console.log(e)

    var current = e.target.parentElement.parentElement
    current.classList.add('member-active')
    this.paydate = e.target.parentElement.childNodes[0].innerText
    this.paymoney = e.target.parentElement.childNodes[1].innerText.replace('￥','')
    var others = current.parentElement.childNodes
    console.log(others)
    console.log(this.paymoney)
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

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let hh = date.getHours();
    let mm = date.getMinutes();

    console.log(year,month,day,hh,mm)


    let days = new Date(year, month, 0).getDate()
     
    this.starttime =  year + "-" + month +"-"+ day +" "+hh+":"+mm
    console.log(this.starttime,'fjfhfhfjh')

    if(this.ismember=="是"){
      console.log(this.endmenbertime,'到期时间')
      year = Number(this.endmenbertime.slice(0,4)) 
      month = Number(this.endmenbertime.slice(5,7)) 
      day = Number(this.endmenbertime.slice(8,10)) 
      hh= Number(this.endmenbertime.slice(10,13)) 
      mm= Number(this.endmenbertime.slice(14,16)) 
    }

    console.log(year,month,day,hh,mm,'啦啦啦啦啦')

    if(this.paydate == "包一天") {
      if(days==day){
        month = month+1
        day = 1
        this.endtime =  year + "-" + month +"-"+ day +" "+hh+":"+mm
      }else {
        day = day+1
        this.endtime =  year + "-" + month +"-"+ day  +" "+hh+":"+mm
      }
     
    }

    if(this.paydate == "包一周") {
      if((days-day)<7){
        month = month+1
        day = 7-(days-day)
        this.endtime =  year + "-" + month +"-"+ day  +" "+hh+":"+mm
      }else {
        day = day+7
        this.endtime =  year + "-" + month +"月-"+ day +" "+hh+":"+mm
      }
    
    }

    if(this.paydate == "包一月") {
      if(month == 12){
        year = year + 1
        month = 1
        this.endtime =  year + "-" + month +"-"+ day  +" "+hh+":"+mm
      }else {
        month = month+1
        this.endtime =  year + "-" + month +"-"+ day  +" "+hh+":"+mm
      }
      
    }

    if(this.paydate == "包一年") {
      year = year+1
      this.endtime =  year + "-" + month +"-"+ day +" "+hh+":"+mm
    }

    console.log(this.starttime)
    console.log(this.endtime)


    this.memberApi.updateismember({id:this.user_id,ismember:"Y",startmember_time:this.starttime,endmenber_time:this.endtime}).then((updateismember:any)=>{
      console.log(updateismember,'updateismember')
      if(updateismember.code == '0'){
        this.ismember = '是'
        this.centerApi.addintegration({user_id:this.user_id,startmember_time:this.starttime,endmenber_time:this.endtime,paymember:this.paymoney,status:'A'}).then((addintegration:any)=>{
          console.log(addintegration,'addintegration')
        })

        this.router.navigate(['paysuccess'],{
          queryParams: {
            paydate: this.paydate,
            paymoney: this.paymoney
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