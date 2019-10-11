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
    this.router.navigate(['paysuccess'],{
      queryParams: {
        paydate: this.paydate
      }
    })
  }

}