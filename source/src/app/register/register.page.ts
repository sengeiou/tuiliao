import { Component, ViewChild ,ElementRef} from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { ProjectApi } from 'src/providers/project.api';
import { AliyunApi } from 'src/providers/aliyun.api';
import { CenterApi } from 'src/providers/center.api';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  providers:[MemberApi,ProjectApi,AliyunApi,CenterApi]
})
export class RegisterPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public ele: ElementRef,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi,
    public projectApi:ProjectApi,
    public aliyunApi:AliyunApi,
    public centerApi:CenterApi,
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      this.isLoginPage=true;
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
  onMyShow(){

      this.memberApi.memberlist({}).then((memberlist:any)=>{
        console.log(memberlist)
        this.memberlist = memberlist
      })
    

  }

  xiayibu(){
    if(this.username!=""){
      // this.checkcanregs("name",this.username)
     console.log('dddd')
     if(this.password.length>=6){
        if(this.mobile!=""){
          

            var verifycode =this.yanzhenma;
            this.aliyunApi.verifycode({
                mobile: this.mobile,
                verifycode,
                type: "register"
              }).then(ret => {
                console.log(ret,'ret')
              if (ret.code == 0) {
        
                // this.checkcanregs("mobile",this.mobile)
                this.checkcanregs("name",this.username)
                this.show = 2;
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
              type: "register"
            }).then(ret => {
              console.log(ret,'ret')
            if (ret.code == 0) {
              // this.checkcanregs("email",this.email)
              this.checkcanregs("name",this.username)
              this.show = 2;
            } else {
              this.toast("验证码校验失败，请重新尝试");
            }
          });
        }
     }else {
       this.toast("密码少于6位，请重新输入密码")
     }
     
    }else{
      this.toast("用户名为空，请重新填写！")
    }

    

  }


  checkcanregs(type,value){
    let obj={}
    obj[type]=value
    this.memberApi.checkcanreg(obj).then((checkcanreg)=>{
      console.log(checkcanreg,'checkcanreg')
      if(checkcanreg.code=='0'){

        this.memberApi.adduser({
          mobile: this.mobile,
          name: this.username,
          password: this.password,
          code: this.code,
          status: 'A'
        }).then(ret => {
          if (ret.code == "0"){
            this.toast("注册成功");
            this.store("UserToken", ret.return);
            this.backToUrl("/login");
          } else {
            this.toast(ret.result);
          }
        });
        
      }else{
        this.toast(checkcanreg.result);
      }
    })
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

  telzhuce(e){
    this.istelzhuce = true
    console.log(e)
    e.target.classList.add('zhuce-active')
    e.target.parentElement.childNodes[1].classList.remove('zhuce-active')


  }


  sendVerifyCode() {

    this.memberApi.checkcanreg({ mobile: this.mobile}).then(ret => {
      console.log(ret);

      if (ret.code == "0") {
        // this.inverify = true;
        let reg =/^(13[0-9]\d{8}|15[0-35-9]\d{8}|18[0-9]\{8}|14[57]\d{8})$/
          if(reg.test(this.mobile)){

            this.aliyunApi.phoneverifycode({
              mobile: this.mobile,
              type: "register"
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
        this.toast("手机号码已经被使用");
      }
    });
  }

  sendVerifyCode2(){
    this.memberApi.checkcanreg({ email: this.email }).then(ret => {
      console.log(ret);

      if (ret.code == "0") {
        // this.inverify = true;
        this.aliyunApi.emailverifycode({
          email: this.email,
          type: "register"
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
      } else {
        this.toast("邮箱已经被使用");
      }
    });
  }
  

  emailzhuce(e){
    this.istelzhuce = false
    e.target.classList.add('zhuce-active')
    e.target.parentElement.childNodes[0].classList.remove('zhuce-active')
  }

}