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
  selector: 'app-recom-detail',
  templateUrl: './recom-detail.page.html',
  styleUrls: ['./recom-detail.page.scss'],
  providers:[MemberApi,ProjectApi,CenterApi]
})
export class RecomDetailPage extends AppBase {

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
    
  id = '';
  recommenddetail = []
  
  guanzushow=true;
  isshow = true;
  d = false;

  // ismember='N'
  username=''
  member_id = ''
  ballnum = 0
  code=''
  list_id=''

  onMyShow(){
    this.activeRoute.queryParams.subscribe(query=>{
      console.log(query)
      this.id = query.id

      this.memberApi.info({id:this.user_id}).then((memberinfo) => {
        console.log(memberinfo,'4165456')
        // this.ismember = memberinfo.ismember
        this.username = memberinfo.name
        this.member_id = memberinfo.id
        this.ballnum = memberinfo.ballnum
        this.code = memberinfo.code
      })

      this.projectApi.recommenddetail({id:this.id,user_id: query.user_id,lang: this.langcode}).then((recommenddetail:any)=>{
        console.log(recommenddetail)
        let detaillist = []
        detaillist.push( recommenddetail)

        this.recommenddetail = detaillist.filter(item=>{
          this.list_id = item.id

          this.centerApi.focuslist({focus_member_id: this.member_id,befocus_id: item.user_id}).then((focuslist:any)=>{
            console.log(focuslist.length)
            if(focuslist.length == 1){
              this.guanzushow = false
            }else {
              this.guanzushow = true
            }
          })

          this.centerApi.recomfavlist({userfav_id: this.member_id,recom_id: item.user_id,rec_id:item.id}).then((recomfavlist:any)=>{
            console.log(recomfavlist,'aaaa')
            console.log(recomfavlist.length,'aaaa')
            // for(let i=0;i<recomfavlist.length;i++){
            //     if(item.id == recomfavlist[i].rec_id){
            //       this.isshow = true
            //     }else {
            //       this.isshow = false
            //     }
            // }
            if(recomfavlist.length==1){
              this.isshow = false
            }else {
              this.isshow = true
            }
           
          })

          if(this.langcode=='sc'){
            
            item.biaoti = this.Simplized(item.biaoti)
            item.success = this.Simplized(item.success)
            item.winningnum = this.Simplized(item.winningnum)
            item.user_id_name = this.Simplized(item.user_id_name)

          }else if(this.langcode=='tc'){

            item.biaoti = this.Traditionalized(item.biaoti)
            item.success = this.Traditionalized(item.success)
            item.winningnum = this.Traditionalized(item.winningnum)
            item.user_id_name = this.Traditionalized(item.user_id_name)

          }
          
            item.pub_time = this.getchangetime(item.pub_time)
            item.end_time = this.getchangedatetime(item.end_time)
            for(let k=0;k<item.latelycom.length;k++){
              item.latelycom[k].com_time = this.getchangetime(item.latelycom[k].com_time)
            }
  
           
  
            
  
            return item

          
          })

              
        console.log(this.recommenddetail,'8888')

      })  
     
    })
  }

  // 购买物品信息
  payinfo={user_id: '', money: null,recom_id: ''}

  pay(user_id,itemId,coincount){
    console.log(user_id,'ddd')
    console.log(itemId,'eee')


    this.payinfo.user_id = user_id
    this.payinfo.money = coincount
    this.payinfo.recom_id = itemId

    this.d = true;


    console.log(coincount)

  
  }

  lijizhifu (){
    this.d = false;
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDay()

    let nowtime = year + '-' + month +'-'+day

    console.log(this.ballnum,'ballnum')
    console.log(this.payinfo.money,'this.payinfo.money')
    console.log(this.payinfo.money<this.ballnum)
    if(Number(this.payinfo.money) < this.ballnum){
      this.ballnum = this.ballnum - this.payinfo.money

      let yongjin =  this.payinfo.money * 0.1;
    
      console.log(yongjin)
      console.log(this.code,'code')
      if(this.code!=''){
        this.memberApi.memberlist({}).then((memberlist:any)=>{
          for(let i=0;i<memberlist.length;i++){
            if(memberlist[i].mycode == this.code){
              console.log(memberlist[i].mycode,'mycode')
              this.centerApi.addintegration({user_id:memberlist[i].id,yongjin:yongjin,yongjin_name:this.username,yongjin_time:nowtime,status: 'A'}).then((addintegration:any)=>{
                console.log(addintegration,'8989898989898')
              })
            }
          }
        })
      }
      

      this.centerApi.addintegration({user_id:this.member_id,zhifu:this.payinfo.money,pay_time:nowtime,status: 'A'}).then((addintegration:any)=>{
        console.log(addintegration)
        if(addintegration.code == '0'){

          this.centerApi.addpurchase({pur_id:this.member_id,status: 'A',recom_id: this.payinfo.user_id,rec_id:this.list_id}).then((addpurchase:any)=>{
            console.log(addpurchase)
            if(addpurchase.code == '0'){
            this.router.navigate(['pay-recom-detail'],{
                queryParams: {
                  id: this.payinfo.recom_id
                }
              })
            }
          })

          this.memberApi.editballnum({id:this.member_id,ballnum: this.ballnum}).then((editballnum:any)=>{
            console.log(editballnum,'家私电话')
          })

        }
        
      })
  
    }else {

      this.gotcharge('你的球币不够，请充值')

    }
    
  }

  async gotcharge(msg) {

    const alert = await this.alertCtrl.create({
        header: "提示",
        subHeader: msg,
        buttons: [{
            text: "取消",
            handler: () => {
                console.log('Disagree clicked');

                // this.back()
            }
        }, {
            text: "去充值",
            handler: () => {
                // confirmcallback(true);
                this.navigate('chongzhi')
            }
        }]
    });
    alert.present();
}

  gbzf() {
    this.d = false;
    this.onMyShow();
    // window.location.href = "/order";  //出现短暂白屏
    // this.navigate("/order");
  }

  shoucang(list){
    console.log(list,'list')

    if(this.isshow == true){

      this.centerApi.addrecfav({userfav_id:this.member_id,status: 'A',recom_id: list.user_id,rec_id:list.id}).then((addrecfav:any)=>{
        console.log(addrecfav)
      })

    }else {

      this.centerApi.deletefav({status: 'D',userfav_id:this.member_id,recom_id: list.user_id,rec_id:list.id}).then((deletefav:any)=>{
        console.log(deletefav)
      })

    }
   

    this.isshow = !this.isshow;


  }
  
  
  guanzu(user_id){
    console.log(user_id)
 
    if(this.guanzushow == true) {
      this.centerApi.addfocus({befocus_id: user_id, status: 'A',focus_member_id:this.member_id}).then((addfocus:any)=>{
        console.log(addfocus)
      })  
    }else {
      this.centerApi.cancelfocus({befocus_id: user_id,status: 'D'}).then((cancelfocus:any)=>{
        console.log(cancelfocus)
      })
    }
    this.guanzushow = !this.guanzushow
  }
  

}