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
import { AliyunApi } from 'src/providers/aliyun.api';

@Component({
  selector: 'app-forgetpwd',
  templateUrl: './forgetpwd.page.html',
  styleUrls: ['./forgetpwd.page.scss'],
  providers:[MemberApi,ProjectApi,CenterApi,AliyunApi]
})
export class ForgetpwdPage extends AppBase {

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
    public aliyunApi:AliyunApi,
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
  }

  istelzhuce = true;

  username = "";
  password = "";
  mobile="";
  email = "";
  code = "";
  diyici = false;
  ismima = true;
  infocus = "";
  show = 1;
  timer = null;
  inverify = false;
  yanzhenma = "";
  yanzhenma2 = "";
  reminder = 0;

  c1 = "";
  c2 = "";
  c3 = "";
  c4 = "";

  memberlist=null
  areacodelist=null
  areacode="852"
  onMyShow(){

      this.memberApi.memberlist({}).then((memberlist:any)=>{
        console.log(memberlist)
        this.memberlist = memberlist
      })

      this.centerApi.areacodelist({}).then((areacodelist)=>{
        console.log(areacodelist)
        this.areacodelist = areacodelist.sort(this.compare("seq"))
      })
    

  }

  compare(pro){
    return function(a,b){
      return a[pro]-b[pro]
    }
  }

  checkcode(arr,str){
    for(let item of arr){
      if(item.mycode==str){
        return true
      }
    }
    return false
  }



  xiayibu(){
      if(this.mobile!=""){
        
          var verifycode =this.yanzhenma;
          var codemobiles = this.areacode + this.mobile
          this.aliyunApi.verifycode({
              mobile: codemobiles,
              verifycode,
              type: "reset"
            }).then(ret => {
              console.log(ret,'ret')
            if (ret.code == 0) {
      
              this.showshow = 2;
            } else {
              this.toast("验证码校验失败，请重新尝试");
            }
          });
        
      }
      if(this.email!=""){

          var verifycode =this.yanzhenma2;
          this.aliyunApi.emailverifycodes({
              email: this.email,
              verifycode,
              type: "reset"
            }).then(ret => {
              console.log(ret,'ret')
            if (ret.code == 0) {
              this.showshow = 2;
            } else {
              this.toast("验证码校验失败，请重新尝试");
            }
          });
        

      }
    
  }

  mima1 = '';
  mima2 = '';
  denglu() {
    var that=this
    console.log(11111);
    if (this.mima1 != this.mima2) {
      this.toast("两次输入的密码不一样");
      return
    }
    if (this.mima1.length < 6) {
      this.toast("密码长度需大于6");
      return
    }
    console.log(this.mima1,'mima')
    if(this.aa==1){
      that.memberApi.forgetpwd({
        mobile: that.mobile,
        password: that.mima1
      }).then(ret => {
        console.log(ret)
        if (ret.code == "0") {
          that.toast("重设成功，请重新登录");
          // this.store("UserToken", ret.return);
          that.navigate('/login')
        } else {
          that.toast(ret.result);
        }
      });
    }
    
    if(this.aa==2){
      that.memberApi.forgetpwd({
        email: that.email,
  
        password: that.mima1
      }).then(ret => {
  
        if (ret.code == "0") {
          that.toast("重设成功，请重新登录");
          that.navigate('/login')
        } else {
          that.toast(ret.result);
        }
      });
    }

  }

  setInVerify() {


    var k = this.timer = setInterval(() => {
      if (this.reminder >= 0) {
        this.reminder--;
      }
      if (this.reminder < 0) {
        clearInterval(k);
      }
  
    }, 1000);
  }
  reminder2=0;
  setInVerify2() {


    var k = this.timer = setInterval(() => {
      if (this.reminder2 >= 0) {
        this.reminder2--;
      }
      if (this.reminder2 < 0) {
        clearInterval(k);
      }
  
    }, 1000);
  }
  aa=1
  showshow=1
  telzhuce(e){
    this.istelzhuce = true
    console.log(e)
    if(e==2){
      this.aa=2
    }else if(e==1){
      this.aa=1;
     this.onMyShow();
    }

  }

  changcode(){
    console.log()
    console.log(this.areacode,'aaa')
    if(this.areacode=="852"){
     
      return  /^(5|6|8|9)\d{7}$/
     
    }else if(this.areacode == "86") {
      
     return  /^[1][3-8]\d{9}$/

    }else if(this.areacode == "853"){
     
      return /^[6]([8|6])\d{5}/

    }
   }

  sendVerifyCode() {

    this.memberApi.checkmoileemail({ mobile: this.mobile}).then(ret => {
      console.log(ret);

      if (ret.code == "0") {
        // this.inverify = true;
        console.log(5555)
        var reg = this.changcode()
        console.log(reg,'reg')
        var codemobile = this.areacode + this.mobile
          if(reg.test(this.mobile)){

            this.aliyunApi.phoneverifycode({
              mobile: codemobile,
              type: "reset"
            }).then(ret => {
              console.log(ret);
              if (ret.code == 0) {
                this.reminder = 60;
                this.show = 1;

                this.c1 = "";
                this.c2 = "";
                this.c3 = "";
                this.c4 = "";
                //this.$refs["inputc1"].focus();

                //var obj = this.ele.nativeElement.querySelector('#inputc1');
                //obj.focus();

                this.toast("验证码已发送，请注意查收");
                this.diyici = true;
                this.setInVerify();
              } else {
                this.toast("验证码发送失败，请稍后重试");
              }
            });

          }else {
            this.toast('手机号码错误，请重新输入！')
          }
      } else {
        this.toast("手机号码没有注册");
      }
    });
  }

  sendVerifyCode2(){
    this.memberApi.checkmoileemail({ email: this.email }).then(ret => {
      console.log(ret);

      if (ret.code == "0") {
        // this.inverify = true;
        this.aliyunApi.emailverifycode({
          email: this.email,
          type: "reset"
        }).then(ret => {
          console.log(ret);
          if (ret.code == 0) {
            this.reminder2 = 60;
            this.show = 1;

            this.c1 = "";
            this.c2 = "";
            this.c3 = "";
            this.c4 = "";
            //this.$refs["inputc1"].focus();

            //var obj = this.ele.nativeElement.querySelector('#inputc1');
            //obj.focus();

            this.toast("验证码已发送，请注意查收");
            this.diyici = true;
            this.setInVerify2();
          } else {
            this.toast("验证码发送失败，请稍后重试");
          }
        });
      } else {
        this.toast("邮箱没有注册");
      }
    });
  }
  

  emailzhuce(e){
    this.istelzhuce = false
    e.target.classList.add('zhuce-active')
    e.target.parentElement.childNodes[0].classList.remove('zhuce-active')
  }

}
