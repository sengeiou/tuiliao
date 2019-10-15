import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { ProjectApi } from 'src/providers/project.api';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-menberinfo',
  templateUrl: './menberinfo.page.html',
  styleUrls: ['./menberinfo.page.scss'],
  providers:[MemberApi,ProjectApi]
})
export class MenberinfoPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    // public camera: Camera,
    // public transfer: FileTransfer,
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
  onMyShow(){

    this.memberApi.info({member_id:1}).then((memberinfo) => {
      console.log(memberinfo,'4165456')
      this.ismember = memberinfo.ismember
      this.photo = memberinfo.photo
      this.username = memberinfo.name
      this.mobile = memberinfo.mobile
      this.email = memberinfo.email
  })
  console.log(this.photo)
}

save(){
  console.log(this.username,this.photo)

 

}

async selectPhoto() {
//   const actionSheet = await this.actionSheetController.create({
//     header: "选择头像",
//     buttons: [
//       {
//         text: "立即自拍",
//         handler: () => {
//           let options: CameraOptions = {
//             quality: 75,
//             targetWidth: 200,
//             targetHeight: 200,
//             allowEdit: true,
//             destinationType: this.camera.DestinationType.FILE_URI,
//             sourceType: this.camera.PictureSourceType.CAMERA,
//             encodingType: this.camera.EncodingType.JPEG
//           };
//           this.camera.getPicture(options).then((imagepath) => {
//             this.uploadFile(this.transfer, imagepath, "member").then(photo => {

//               this.memberApi.infoupdate({ photo: photo }, false).then(data => {
//                 if (data.code == "0") {
//                   this.MemberInfo.photo = String(photo);
//                 }
//               });

//             });
//           }, (err) => {
//             // Handle error
//           });
//         }
//       }, 
//       {
//         text: "从相册选择",
//         handler: () => {
//           let options: CameraOptions = {
//             quality: 75,
//             targetWidth: 200,
//             targetHeight: 200,
//             allowEdit: true,
//             destinationType: this.camera.DestinationType.FILE_URI,
//             sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
//             encodingType: this.camera.EncodingType.JPEG,
//             mediaType: this.camera.MediaType.PICTURE
//           };

//           this.camera.getPicture(options).then((imagepath) => {
//             this.uploadFile(this.transfer, imagepath, "member").then(photo => {
//               //alert(photo);
//               this.memberApi.infoupdate({ photo: photo }, false).then(data => {
//                 if (data.code == "0") {
//                   this.MemberInfo.photo = String(photo);
//                 }
//               });
//             });
//           }, (err) => {
//             // Handle error
//           });
//         }
//       }
//     ]
//   });
//   await actionSheet.present();
}

}
