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

@Component({
  selector: 'app-chongzhi',
  templateUrl: './chongzhi.page.html',
  styleUrls: ['./chongzhi.page.scss'],
  providers:[MemberApi,ProjectApi,CenterApi,AlipayApi,PayPal ]
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
    private payPal: PayPal
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
        this.ballcoinlist = ballcoinlist.sort(this.compare("seq"))
        
    })


  
  }


 

  compare(pro){
    return function(a,b){
      return a[pro]-b[pro]
    }
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
    var others = current.parentElement.childNodes
    console.log(others)
    console.log(current)
    for(let i=2;i<others.length-1; i++){
      if(current != others[i]){
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

  pay(){
    console.log(this.paymoney,this.ballnum2)
    this.d = true
  }
 
  zhifufanshi = 2;
  zhifuinfo = null;
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
    console.log( typeof this.paymoney,'3333')
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDay()
    let hh = date.getHours()
    let mm = date.getMinutes()

    let nowtime = year + '-' + month +'-'+day+" "+hh+":"+mm

    
    console.log(this.zhifufanshi,'this.zhifufanshi')
    if (this.zhifufanshi == 2) {
      console.log('pppppppp')

      this.payPal.init({
        PayPalEnvironmentProduction: 'ASQTy5LpV5C-5MyA7UDcBl2RJouuE7tpr-ClZ6Pj5ajJyPz5aDC3IL9zhagRSNwknX83TroXIFtItrpq',
        PayPalEnvironmentSandbox: 'Af0-D6daL8_ke1pqrGxlCt3mXh7md506DCOgra9m90uNKNexjAHq4FLL0giwCOhYx3eBy71tCcJV_6Yb'
      }).then(() => {
        console.log('aaaaaaaa')
        // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
        this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
          // Only needed if you get an "Internal Service Error" after PayPal login!
          //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
        })).then(() => {
          console.log('yyyyyyyyyy')
          let payment = new PayPalPayment('0.01', 'USD', 'Description', 'sale');
          this.payPal.renderSinglePaymentUI(payment).then(() => {
            console.log('PayPalPayPalPayPalPayPalPayPal')
            // Successfully paid


            this.centerApi.memberpayment({member_id:this.member_id,chongzhi:this.ballnum2,chong_time:nowtime,money:this.paymoney,status: 'A'}).then((addintegration:any)=>{
              console.log(addintegration)
              if(addintegration.code=='0'){
                this.centerApi.addnotification({user_id: this.member_id,chongmoney:this.paymoney,ballcoins:this.ballnum2,status:'A'}).then((addnotification:any)=>{
                  console.log(addnotification)
                })
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