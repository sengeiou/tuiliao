import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { ProjectApi } from 'src/providers/project.api';
import { CenterApi } from 'src/providers/center.api';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { InAppPurchase } from '@ionic-native/in-app-purchase/ngx';
declare let sgap: any;
@Component({
  selector: 'app-chongzhi',
  templateUrl: './chongzhi.page.html',
  styleUrls: ['./chongzhi.page.scss'],
  providers: [MemberApi, ProjectApi, CenterApi, PayPal, InAppPurchase]
})
export class ChongzhiPage extends AppBase {

  constructor(public router: Router,

    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public projectApi: ProjectApi,
    public centerApi: CenterApi,
    private payPal: PayPal,
    private iap: InAppPurchase
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }

  onMyLoad() {
    //参数
    this.params;
  }

  ismember = 'N'
  photo = ''
  username = ''
  ballnum = 0
  member_id = ''
  ballcoinlist = null
  onMyShow() {

    this.memberApi.info({ id: this.user_id }).then((memberinfo) => {
      console.log(memberinfo, '4165456')
      this.ismember = memberinfo.ismember
      this.photo = memberinfo.photo
      this.username = memberinfo.name
      this.ballnum = memberinfo.ballnum
      this.member_id = memberinfo.id
    })

    this.centerApi.ballcoinlist({}).then((ballcoinlist) => {
      console.log(ballcoinlist)
      this.ballcoinlist = ballcoinlist.sort(this.compare("seq"))

    })

    this.iap.restorePurchases().then((list)=>{
      console.log("restorePurchases",list);
      for(var data of list){
        this.iap.consume(data.productType,data.receipt,data.signature);
      }
    });

  }




  compare(pro) {
    return function (a, b) {
      return a[pro] - b[pro]
    }
  }

  googlepayid="";
  paymoney = 0;
  ballnum2 = 0;
  d = false;


  choose(e, item) {
    console.log(e)
    console.log(item)

    var current = e.target.parentElement.parentElement
    if (current.classList.contains('money')) {
      console.log('ooooo')
      current.classList.add('money-active')
    } else {
      return
    }

    this.paymoney = item.money
    this.ballnum2 = item.ballnum
    this.googlepayid=item.googlepayid;
    var others = current.parentElement.childNodes
    console.log(others)
    console.log(current)
    for (let i = 2; i < others.length - 1; i++) {
      if (current != others[i]) {
        others[i].classList.remove('money-active')
      }
    }


  }

  gbzf() {
    this.d = false;
    this.onMyShow();
    // window.location.href = "/order";  //出现短暂白屏
    // this.navigate("/order");
  }

  pay() {
    console.log(this.paymoney, this.ballnum2)
    this.d = true
  }

  zhifufanshi = 2;
  zhifuinfo = null;
  zhifu(id) {
    this.zhifufanshi = id;

  }
  async confirm2(msg, confirmcallback) {

    const alert = await this.alertCtrl.create({
        header: "提示",
        subHeader: msg,
        buttons: [{
            text: "确认",
            handler: () => {
                confirmcallback(true);
            }
        }]
    });
    alert.present();
}

  lijizhifu() {
    this.d = false;
    var that = this
    this.ballnum = Number(this.ballnum) + Number(this.ballnum2)
    console.log(typeof this.ballnum, '222')
    console.log(this.ballnum, '3333')
    console.log(typeof this.ballnum2, '222')
    console.log(typeof this.paymoney, '3333')
    console.log(typeof this.paymoney, '3333')
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDay()
    let hh = date.getHours()
    let mm = date.getMinutes()

    let nowtime = year + '-' + month + '-' + day + " " + hh + ":" + mm

    if(this.paymoney<=0){
      this.confirm2('您沒有選擇充值的數額',function(ret){
        
      })
      return
    }


    console.log(that.InstInfo.currency_name, 'this.InstInfo')
    if (this.zhifufanshi == 0) {

      // sgap.setKey('pk_test_Ldy7TLYtmnsv1VrI4ULriWSd').then(function(output) {
      //   sgap.isReadyToPay().then(function() {
      //     sgap.requestPayment(that.paymoney, that.InstInfo.currency_name).then(function(token) {
      //       // alert(token);


      //       that.centerApi.memberpayment({member_id:that.member_id,chongzhi:that.ballnum2,money:that.paymoney,status: 'A'}).then((addintegration:any)=>{
      //         console.log(addintegration)
      //         if(addintegration.code=='0'){
      //           that.centerApi.addnotification({user_id: that.member_id,chongmoney:that.paymoney,ballcoins:that.ballnum2,status:'A'}).then((addnotification:any)=>{
      //             console.log(addnotification)
      //           })
      //           that.memberApi.editballnum({id:that.member_id,ballnum: that.ballnum}).then((editballnum:any)=>{
      //             console.log(editballnum,'家私电话')
      //             if(editballnum.code=='0'){
      //               that.router.navigate(['chongzhisuccess'],{
      //                 queryParams: {
      //                   money: that.paymoney,
      //                   ballnum: that.ballnum2
      //                 }
      //               })
      //             }
      //           })
      //         }
      //       })

      //     }).catch(function(err) {
      //       alert(err);
      //     });
      //   }).catch(function(err) {
      //     alert(err);
      //   });
      // }).catch(function(err) {
      //   alert(err);
      // });

      // this.iap
      // .getProducts(['001'])
      // .then((products) => {
      //   console.log(products);
      //    //  [{ productId: 'com.yourapp.prod1', 'title': '...', description: '...', price: '...' }, ...]
      // })
      // .catch((err) => {
      //   console.log(err);
      // });

      //alert(this.googlepayid);

      

      this.iap
        .getProducts([this.googlepayid])
        .then((products) => {
          //alert(JSON.stringify(products));
          console.log("getProducts",products);

          this.iap
            .buy(this.googlepayid)
            .then((data) => {
              //alert("入001");

              //alert(JSON.stringify(data));

              this.iap.consume(data.productType,data.receipt,data.signature);

              that.centerApi.memberpayment({ member_id: that.member_id, chongzhi: that.ballnum2, money: that.paymoney, status: 'A' }).then((addintegration: any) => {
                console.log(addintegration)
                if (addintegration.code == '0') {
                  that.centerApi.addnotification({ user_id: that.member_id, chongmoney: that.paymoney, ballcoins: that.ballnum2, status: 'A' }).then((addnotification: any) => {
                    console.log(addnotification)
                  })
                  that.memberApi.editballnum({ id: that.member_id, ballnum: that.ballnum }).then((editballnum: any) => {
                    console.log(editballnum, '家私电话')
                    if (editballnum.code == '0') {
                      that.router.navigate(['chongzhisuccess'], {
                        queryParams: {
                          money: that.paymoney,
                          ballnum: that.ballnum2
                        }
                      })
                    }
                  })
                }
              })
            })
            .catch((err) => {
              console.log(err);
              this.toast("支付失败");
            });
        })
        .catch((err) => {
          console.log(err);
        });

      console.log(this.zhifufanshi, '1111111')


    }
    if (this.zhifufanshi == 1) {



            that.centerApi.memberpayment({member_id:that.member_id,chongzhi:that.ballnum2,money:that.paymoney,status: 'A'}).then((addintegration:any)=>{
              console.log(addintegration)
              if(addintegration.code=='0'){
                that.centerApi.addnotification({user_id: that.member_id,chongmoney:that.paymoney,ballcoins:that.ballnum2,status:'A'}).then((addnotification:any)=>{
                  console.log(addnotification)
                })
                that.memberApi.editballnum({id:that.member_id,ballnum: that.ballnum}).then((editballnum:any)=>{
                  console.log(editballnum,'家私电话')
                  if(editballnum.code=='0'){
                    that.router.navigate(['chongzhisuccess'],{
                      queryParams: {
                        money: that.paymoney,
                        ballnum: that.ballnum2
                      }
                    })
                  }
                })
              }
            })

      


      

    }
    if (this.zhifufanshi == 2) {
      console.log(that.InstInfo.currency_name, 'pppppppp')
      // alert('paypal');
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
          let payment = new PayPalPayment(that.paymoney.toString(), that.InstInfo.currency_name, 'Description', 'sale');
          this.payPal.renderSinglePaymentUI(payment).then(() => {
            console.log('PayPalPayPalPayPalPayPalPayPal')
            // Successfully paid


            that.centerApi.memberpayment({ member_id: that.member_id, chongzhi: that.ballnum2, money: that.paymoney, status: 'A' }).then((addintegration: any) => {
              console.log(addintegration)
              if (addintegration.code == '0') {
                that.centerApi.addnotification({ user_id: that.member_id, chongmoney: that.paymoney, ballcoins: that.ballnum2, status: 'A' }).then((addnotification: any) => {
                  console.log(addnotification)
                })
                that.memberApi.editballnum({ id: that.member_id, ballnum: that.ballnum }).then((editballnum: any) => {
                  console.log(editballnum, '家私电话')
                  if (editballnum.code == '0') {
                    that.router.navigate(['chongzhisuccess'], {
                      queryParams: {
                        money: that.paymoney,
                        ballnum: that.ballnum2
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