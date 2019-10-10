import { ApiConfig } from "./api.config";
import { AppUtil } from "./app.util";
import { NavController, ModalController, ToastController, NavParams, AlertController }
    from "@ionic/angular";
import { InstApi } from "../providers/inst.api";
import { MemberApi } from "../providers/member.api";
import { WechatApi } from "../providers/wechat.api";
import { AppComponent } from "./app.component";
import { ReturnStatement } from "@angular/compiler";
import { ViewController } from '@ionic/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { OnInit } from '@angular/core';

declare let wx: any;

export class AppBase implements OnInit {
    public needlogin = false;

    public static TABName = "";
    public static LASTTAB = null;
    public static CurrentRoute: Router = null;
    public static CurrentNav: NavController = null;

    public static myapp: AppComponent = null;
    public static instapi: InstApi = null;
    public static memberapi: MemberApi = null;
    public static wechatApi: WechatApi = null;
    public static UNICODE = "tuiliao";

    public statusBarStyle = "X";//{DARK}
    public uploadpath: string = ApiConfig.getUploadPath();
    public util = AppUtil;
    public static Resources = null;
    public res = null;
    public static InstInfo = null;
    public static MemberInfo = null;
    public InstInfo = {  h5sharelogo: "", h5sharetitle: "", h5sharedesc: "", tel: "", h5appid: "", kf: "", openning: "", successtips: "", orderneedknow: "", name: "", logo: "", memberlogo: "", undershipping: 0, shippingfee: 0, about1: "", about2: "", about3: "", about4: "", about5: "" };
    public MemberInfo = { id:0, avatarUrl: "", nickName: "", h5openid: "", unionid: "" };
    public static MYBABY = [];
    public mybaby = [];
    public options = null;
    public params: Params = null;

    public formdata=null;

    public keyt = "memberinfo99";
    public stat = "stat9";

    public heading = "推料";

    public firseonshow = true;
    public scrolltop = 0;
    public headerscroptshow = 0;
    public static is_mongceng = false;
    public static IsLogin = false;

    static Current = null;
    currentpage = "";

    static STATICRAND = "";


    public constructor(
        public router: Router,
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public activeRoute: ActivatedRoute) {

        this.activeRoute.queryParams.subscribe((params: Params) => {
            console.log(params);
            this.params = params;
        });
        this.res = [];
        var stat = window.sessionStorage.getItem(this.stat);
        if (stat == null) {
            stat = parseInt((Math.random() * 99999.9).toString()).toString();
            window.sessionStorage.setItem(this.stat, stat);
        }
        AppBase.STATICRAND = stat;

        var memberinfo = window.localStorage.getItem(this.keyt);

        if (memberinfo != null) {
            AppBase.MemberInfo = JSON.parse(memberinfo);
        }
        console.log("rdw", AppBase.MemberInfo);

        this.formdata={};
    }
    setStatusBar() {
        //  this.statusBar.styleLightContent();
    }
    ngOnInit() {

        ApiConfig.SetUnicode(AppBase.UNICODE);
        this.getResources();
        this.getInstInfo();
        this.onMyLoad();
        this.setStatusBar();
    }
    onMyLoad() {
    }
    getInstInfo() {
        if (AppBase.InstInfo == null) {
            AppBase.instapi.info({}, false).then((instinfo) => {
                AppBase.InstInfo = instinfo;
                this.InstInfo = instinfo;
                console.log(instinfo);
                console.log("aaabbbccc", AppBase.STATICRAND);
                
            });
        } else {
            this.InstInfo = AppBase.InstInfo;
            // this.setWechatShare();
        }
    }
    getMemberInfo() {

        AppBase.memberapi.info({}).then((memberinfo) => {
            if (memberinfo == null || memberinfo.mobile == undefined || memberinfo.mobile == "") {
                //alert("?");
                memberinfo = null;
            }
            this.MemberInfo = memberinfo;

        });
    }
    shouye() {




        this.navigate("/tabs/tab1");



    }
    getResources() {
        if (AppBase.Resources == null) {
            AppBase.instapi.resources({}, false).then((res) => {
                AppBase.Resources = res;
                this.res = res;
            });
        } else {
            this.res = AppBase.Resources;
        }
    }
    ionViewDidEnter() {
        
        this.onMyShow();


    }

    onMyShow() {

    }
    onPullRefresh(ref) {
        this.onMyShow();
        ref.complete();
    }
    doRefresh(ref) {
        this.onPullRefresh(ref);
        // setTimeout(() => {
        //     ref.complete();
        // }, 1000);
    }
    onLoadMoreRefresh(ref) {
        ref.complete();
    }
    doInfinite(infiniteScroll) {
        this.onLoadMoreRefresh(infiniteScroll);
        // setTimeout(() => {
        //   infiniteScroll.complete();
        // }, 1000);
    }
    isbacking = false;
    back() {
        if (this.isbacking == true) {
            return;
        }
        this.isbacking = true;
        //alert(this.Params.fromtab);
        if (history.length < 2) {
            this.navCtrl.navigateBack('tabs/tab1');
            return;
        }
        if (this.params.fromtab != undefined) {
            this.navCtrl.navigateBack('tabs/' + this.params.fromtab);
        } else {
            this.navCtrl.back();
        }
    }
    backToUrl(url) {
        this.navCtrl.navigateBack(url);
    }
    close(data) {
        this.modalCtrl.dismiss(data);
    }
    returnData(data) {
        this.modalCtrl.dismiss(data);
    }
    windowslocation(url) {
        window.location.href = url;
    }
    navigate(pagename, param = {}, checkLogin = false) {
        if (checkLogin == true) {
            if (this.MemberInfo == null) {
                this.navigate("login");
                return;
            }
        }
        this.router.navigate([pagename], { queryParams: param });

    }
    async showModal(pageobj, param = {}, callback = null) {
        var modal = await this.modalCtrl.create({
            component: pageobj,
            componentProps: param
        });
        await modal.onDidDismiss().then((data) => {
            if (callback != null) {
                callback(data);
            }
        });
        await modal.present();
    }

    showContent(title, key) {
        this.navigate("content", { title, key });
        //this.showModal("ContentPage", { title, key });
    }

    decode(val) {
        return AppUtil.HtmlDecode(val);
    }
    contentToLine(str) {
        if (str == null) {
            return "";
        }
        return str.split("\n");
    }

    tel(tel) {
        window.location.href = "tel:" + tel;
    }
    async toast(msg) {
        if (msg == "") {
            return;
        }
        console.log(((msg.length / 3) + 1) * 1000);
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: ((msg.length / 3) + 1) * 500
        });
        toast.present();
    }
    async showAlert(msg) {

        const alert = await this.alertCtrl.create({
            header: "提示",
            subHeader: msg,
            buttons: ["知道了"]
        });
        alert.present();
    }
    async showConfirm(msg, confirmcallback) {

        const alert = await this.alertCtrl.create({
            header: "提示",
            subHeader: msg,
            buttons: [{
                text: "取消",
                handler: () => {
                    console.log('Disagree clicked');

                    confirmcallback(false);
                }
            }, {
                text: "好的",
                handler: () => {
                    confirmcallback(true);
                }
            }]
        });
        alert.present();
    }
    async checkLogin(callback) {

    }

    async showActionSheet(actionSheetController, header, buttons) {
        const actionSheet = await actionSheetController.create({
            header: header,
            buttons: buttons
        });
        await actionSheet.present();
    }
    hasLogin() {
        return this.MemberInfo != null;
    }
    logout() {

        // window.localStorage.removeItem("UserToken");
        // this.MemberInfo = null;

            this.confirm("确定登出账号么？", (ret) => {
                if (ret) {
                    AppBase.IsLogin = false;
                    window.localStorage.removeItem("UserToken");
                    this.MemberInfo = null;
                    this.back();
                }
            })

    }
    store(name, value = null) {
        if (value == null) {
            return window.localStorage.getItem(name);
        } else {
            window.localStorage.setItem(name, value);
            return "";
        }
    }

    async confirm(msg, confirmcallback) {

        const alert = await this.alertCtrl.create({
            header: "提示",
            subHeader: msg,
            buttons: [{
                text: "取消",
                handler: () => {
                    console.log('Disagree clicked');

                    confirmcallback(false);
                }
            }, {
                text: "确认",
                handler: () => {
                    confirmcallback(true);
                }
            }]
        });
        alert.present();
    }

    splitRow(content) {
        return content.split("\n");
    }

    getMemberPhoto(photo: string) {
        if (photo == null || photo == undefined || photo.trim() == "") {
            return this.uploadpath + "inst/" + this.InstInfo.logo;
        } else {
            return this.uploadpath + "member/" + photo;
        }
    }

    logScrollStart() {
        console.log("logScrollStart");
    }
    logScrolling(e) {
        console.log(e);
        this.scrolltop = e.detail.scrollTop;
    }
    logScrollEnd() {
        console.log("logScrollEnd");
    }
    gotoDiv(id) {
        var target = document.querySelector('#' + id);
        target.scrollIntoView();
    }

    tryLogin() {
        this.showModal("LoginPage", {});
    }



    backHome() {
        this.navCtrl.navigateBack('tabs/home');
        return;
    }
    uploadImage(module,aa){

    }
    backtotop(){
        //var bid=
    }

    // yyyy/mm/dd hh:mm:ss
    getchangedate(date){
        return date.replace(/-/g,'/')
    }
    // yyyy/mm/dd
    getdate(date){
        date = date.slice(0,date.length-9)
        return date.replace(/-/g,'/')
    }

     // yyyy/mm/dd hh:mm
     getdatemm(date){
        date = date.slice(0,date.length-3)
        return date.replace(/-/g,'/')
    }

    // yy/mm/dd hh:mm 
    getchangedatetime(date){
        date = date.slice(2,date.length-3)
        return date.replace(/-/g,'/')
    }

    // mm/dd hh:mm
    getchangetime(date){
        date = date.slice(5,date.length-3)
        return date.replace(/-/g,'/')
    }

    getchangemonthtime(date){
        date = date.slice(5,date.length-3)
        return date
    }
    
    // dd-mm-yyyy
    getDate(date){
        let arr = date.split('-')
        let newArr = []
        for(let i=0;i<arr.length;i++){
            newArr[arr.length-i] = arr[i]
        }

        return newArr.join("-").replace("-",'')
    }

    
}