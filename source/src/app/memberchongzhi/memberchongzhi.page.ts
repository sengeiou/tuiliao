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
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { InAppPurchase } from '@ionic-native/in-app-purchase/ngx';
declare let sgap: any;

@Component({
  selector: 'app-memberchongzhi',
  templateUrl: './memberchongzhi.page.html',
  styleUrls: ['./memberchongzhi.page.scss'],
  providers:[MemberApi,ProjectApi,CenterApi,PayPal,InAppPurchase]
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
    private payPal: PayPal,
    private iap: InAppPurchase
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

  zhifufanshi=2

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

   
    if(this.ismember=="是"){
      console.log(this.endmenbertime,'endmenbertime')

      let date3 = new Date(this.endmenbertime)
      let date4 = new Date(date3)
      date4.setDate(date3.getDate()+Number(this.paydate))

      console.log(date3.getFullYear() + "-" + (date3.getMonth() + 1) + "-" + date3.getDate() + " " + date3.getHours() +  ":"  +date3.getMinutes() +":"+ date3.getSeconds(),'3333')
      console.log(date4.getFullYear() + "-" + (date4.getMonth() + 1) + "-" + date4.getDate() + " " + date4.getHours() +  ":"  +date4.getMinutes() +":"+ date4.getSeconds(),'444')

      this.starttime = date3.getFullYear() + "-" + (date3.getMonth() + 1) + "-" + date3.getDate() + " " + date3.getHours() +  ":"  +date3.getMinutes() +":"+ date3.getSeconds()
      this.endtime = date4.getFullYear() + "-" + (date4.getMonth() + 1) + "-" + date4.getDate() + " " + date4.getHours() +  ":"  +date4.getMinutes()+":"+ date4.getSeconds()

    
    }else {

      var date1 = new Date();
      var date2 = new Date(date1);
      date2.setDate(date1.getDate() + Number(this.paydate));
       this.starttime = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate() + " " + date1.getHours() + ":"  +date1.getMinutes() +":"+ date1.getSeconds()
       this.endtime =  date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate() + " " + date2.getHours() + ":" +date2.getMinutes() +":"+ date1.getSeconds()
      console.log(date1,date2,'uuuuu')

    }


    console.log(this.starttime)
    console.log(this.endtime)


    

   var that = this;

   if(this.zhifufanshi == 0){

  //   sgap.setKey('pk_test_Ldy7TLYtmnsv1VrI4ULriWSd').then(function(output) {
  //     sgap.isReadyToPay().then(function() {
  //       sgap.requestPayment(1000, 'AUD').then(function(token) {
  //         alert(token);
  //       }).catch(function(err) {
  //         alert(err);
  //       });
  //     }).catch(function(err) {
  //       alert(err);
  //     });
  //   }).catch(function(err) {
  //     alert(err);
  //   });

  //   that.memberApi.updateismember({id:that.user_id,ismember:"Y",startmember_time:that.starttime,endmenber_time:that.endtime}).then((updateismember:any)=>{
  //     console.log(updateismember,'updateismember')
  //     if(updateismember.code == '0'){
  //       that.ismember = '是'

  //       that.centerApi.addnotification({user_id: that.user_id,membermoney:that.paymoney,starttime:that.starttime,endtime:that.endtime,status:'A'}).then((addnotification:any)=>{
  //         console.log(addnotification)
  //       })

  //       that.centerApi.addmemberrecord({member_id:that.user_id,payment_time:that.starttime,price:that.paymoney,endtime:that.endtime}).then((addintegration:any)=>{
  //         console.log(addintegration,'addintegration')
  //         if(addintegration.code){
  //           that.router.navigate(['paysuccess'],{
  //             queryParams: {
  //               paydate: that.paydate,
  //               paymoney: that.paymoney,
  //               starttime: that.starttime,
  //               endtime: that.endtime
  //             }
  //           })
  //         }
  //       })
  //     }
      
  // })

  this.iap
  .buy('001')
  .then((data) => {
    alert(data);

       that.memberApi.updateismember({id:that.user_id,ismember:"Y",startmember_time:that.starttime,endmenber_time:that.endtime}).then((updateismember:any)=>{
      console.log(updateismember,'updateismember')
      if(updateismember.code == '0'){
        that.ismember = '是'

        that.centerApi.addnotification({user_id: that.user_id,membermoney:that.paymoney,starttime:that.starttime,endtime:that.endtime,status:'A'}).then((addnotification:any)=>{
          console.log(addnotification)
        })

        that.centerApi.addmemberrecord({member_id:that.user_id,payment_time:that.starttime,price:that.paymoney,endtime:that.endtime}).then((addintegration:any)=>{
          console.log(addintegration,'addintegration')
          if(addintegration.code){
            that.router.navigate(['paysuccess'],{
              queryParams: {
                paydate: that.paydate,
                paymoney: that.paymoney,
                starttime: that.starttime,
                endtime: that.endtime
              }
            })
          }
        })
      }
      
  })
  })
  .catch((err) => {
    alert(err);
  });

   }

      if (this.zhifufanshi == 2) {
          console.log('pppppppp')

          this.payPal.init({
            PayPalEnvironmentProduction: that.InstInfo.pro_id,
            PayPalEnvironmentSandbox: that.InstInfo.san_id
          }).then(() => {
            console.log('aaaaaaaa')
            // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
            this.payPal.prepareToRender('PayPalEnvironmentProduction', new PayPalConfiguration({
              // Only needed if you get an "Internal Service Error" after PayPal login!
              //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
            })).then(() => {
              console.log('yyyyyyyyyy')
              let payment = new PayPalPayment( that.paymoney.toString(),  that.InstInfo.currency_name, 'Description', 'sale');
              this.payPal.renderSinglePaymentUI(payment).then(() => {
                console.log('PayPalPayPalPayPalPayPalPayPal')
                // Successfully paid

                that.memberApi.updateismember({id:that.user_id,ismember:"Y",startmember_time:that.starttime,endmenber_time:that.endtime}).then((updateismember:any)=>{
                  console.log(updateismember,'updateismember')
                  if(updateismember.code == '0'){
                    that.ismember = '是'
            
                    that.centerApi.addnotification({user_id: that.user_id,membermoney:that.paymoney,starttime:that.starttime,endtime:that.endtime,status:'A'}).then((addnotification:any)=>{
                      console.log(addnotification)
                    })
            
                    that.centerApi.addmemberrecord({member_id:that.user_id,payment_time:that.starttime,price:that.paymoney,endtime:that.endtime}).then((addintegration:any)=>{
                      console.log(addintegration,'addintegration')
                      if(addintegration.code){
                        that.router.navigate(['paysuccess'],{
                          queryParams: {
                            paydate: that.paydate,
                            paymoney: that.paymoney,
                            starttime: that.starttime,
                            endtime: that.endtime
                          }
                        })
                      }
                    })
                  }
                  
              })
          
                // Example sandbox response
                //
                // {
                //   "client": {
                //     "environment": "sandbox",
                //     "product_name": "PayPal iOS SDK",
                //     "paypal_sdk_version": "2.16.0",
                //     "platform": "iOS"
                //   },
                //   "response_type": "payment",
                //   "response": {
                //     "id": "PAY-1AB23456CD789012EF34GHIJ",
                //     "state": "approved",
                //     "create_time": "2016-10-03T13:33:33Z",
                //     "intent": "sale"
                //   }
                // }
              }, () => {
                // Error or render dialog closed without being successful
              });
            }, () => {
              // Error in configuration
            });
          }, () => {
            // Error in initialization, maybe PayPal isn't supported or something else
          });
       }
  }


}