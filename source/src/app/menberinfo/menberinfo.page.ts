import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { ProjectApi } from 'src/providers/project.api';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-menberinfo',
  templateUrl: './menberinfo.page.html',
  styleUrls: ['./menberinfo.page.scss'],
  providers:[MemberApi,ProjectApi,Camera, FileTransfer]
})
export class MenberinfoPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public camera: Camera,
    public transfer: FileTransfer,
    public memberApi:MemberApi,
    public projectApi:ProjectApi,
    public actionSheetController: ActionSheetController,
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
  }



  ismember = 'N'
  username = ''
  photo = ''
  mobile=''
  email=''
  id=''

  oldname=''
  oldmobile=''
  oldemail=''
  oldphoto=''
  onMyShow(){

      for(let i=0;i<this.memberInfo.length;i++){
        this.ismember = this.memberInfo[i].ismember
        this.photo = this.memberInfo[i].photo
        this.oldphoto = this.memberInfo[i].photo
        this.username = this.memberInfo[i].name
        this.oldname = this.memberInfo[i].name
        this.mobile = this.memberInfo[i].mobile
        this.oldmobile = this.memberInfo[i].mobile
        this.email = this.memberInfo[i].email
        this.oldemail = this.memberInfo[i].email
        this.id = this.memberInfo[i].id
      }

  console.log(this.photo)
}

save(){
  let json={
    id: this.id,
    name: this.oldname,
    mobile:this.oldmobile,
    email:this.oldemail,
    photo:this.photo
  }
  console.log(this.username,this.photo)
  if(this.username!=this.oldname){
    json.name = this.username
    this.updatememinfo("name",this.username)
    // this.navigate('/tabs/tab4')
  }
  if(this.mobile!=this.oldmobile){
    json.mobile = this.mobile
    this.updatememinfo("mobile",this.mobile)
    // this.navigate('/tabs/tab4')
  }
  if(this.email!=this.oldemail){
    json.email = this.email
    this.updatememinfo("email",this.email)
    // this.navigate('/tabs/tab4')
  }
  if(this.photo!=this.oldphoto){
    json.photo = this.photo
    this.updatememinfo("photo",this.photo)
    
  }
 

}

updatememinfo(type,value){
  let obj={id:this.id}
  obj[type]=value
  console.log(type,value)
  this.memberApi.infoupdate(obj).then((infoupdate)=>{
    console.log(infoupdate)
    if(infoupdate.code=='0'){
      this.store("lastloginname", this.username);
      this.back();
    }else {
      if(infoupdate.result.indexOf('name')!=-1){
        this.toast('修改失败，用户名已被使用！')
      }
      if(infoupdate.result.indexOf('mobile')!=-1){
        this.toast('修改失败，手机号码已被使用！')
      }
      if(infoupdate.result.indexOf('email')!=-1){
        this.toast('修改失败，邮箱已被使用！')
      }
    }
  })
}

async selectPhoto() {
  const actionSheet = await this.actionSheetController.create({
    header: "选择头像",
    buttons: [
      {
        text: "立即自拍",
        handler: () => {
          let options: CameraOptions = {
            quality: 75,
            targetWidth: 200,
            targetHeight: 200,
            allowEdit: true,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.CAMERA,
            encodingType: this.camera.EncodingType.JPEG
          };
          this.camera.getPicture(options).then((imagepath) => {
            this.uploadFile(this.transfer, imagepath, "member").then(photo => {

              this.memberApi.infoupdate({ photo: photo }, false).then(data => {
                if (data.code == "0") {
                  this.MemberInfo.photo = String(photo);
                }
              });

            });
          }, (err) => {
            // Handle error
          });
        }
      }, 
      {
        text: "从相册选择",
        handler: () => {
          let options: CameraOptions = {
            quality: 75,
            targetWidth: 200,
            targetHeight: 200,
            allowEdit: true,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          };

          this.camera.getPicture(options).then((imagepath) => {
            this.uploadFile(this.transfer, imagepath, "member").then(photo => {
              //alert(photo);
              this.memberApi.infoupdate({ photo: photo }, false).then(data => {
                if (data.code == "0") {
                  this.MemberInfo.photo = String(photo);
                }
              });
            });
          }, (err) => {
            // Handle error
          });
        }
      }
    ]
  });
  await actionSheet.present();
}

}
