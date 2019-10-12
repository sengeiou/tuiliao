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

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  providers:[MemberApi,ProjectApi,AliyunApi]
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
  onMyShow(){

    

  }

  xiayibu(){

    this.memberApi.adduser({
      mobile: this.mobile,
      user_name: this.username,
      password: this.password,
      code: this.code,
      status: 'A'
    }).then(ret => {
      if (ret.code == "0") {
        this.toast("绑定成功");
        this.store("UserToken", ret.return);
        this.backToUrl("/login");
      } else {
        this.toast(ret.result);
      }
    });

  }

  check1(){

  }

  
  check2(){
    if(this.username = ''){
      this.toast('用户名不能为空')
    }
    
  }

  
  check3(){
    
  }

  
  check4(){
    
  }

  
  check5(){
    
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

    // 验证码
    var verifycode =this.yanzhenma;
    this.aliyunApi.verifycode({
      mobile: this.mobile,
      verifycode,
      type: "register"
    }).then(ret => {
      if (ret.code == 0) {
      this.show = 2;
    } else {
     
      this.toast("验证码校验失败，请重新尝试");
    }
  });


  }


  sendVerifyCode() {

    this.memberApi.checkcanreg({ mobile: this.mobile }).then(ret => {
      console.log(ret);

      if (ret.code == "0") {
        // this.inverify = true;
        this.aliyunApi.sendverifycode({
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
      } else {
        this.toast("手机号码已经被使用");
      }
    });
  }

  

  emailzhuce(e){
    this.istelzhuce = false
    e.target.classList.add('zhuce-active')
    e.target.parentElement.childNodes[0].classList.remove('zhuce-active')
  }

}
