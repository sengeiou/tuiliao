import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'newfootdetail', loadChildren: './new-foot-detail/new-foot-detail.module#NewFootDetailPageModule' },
  { path: 'recomdetail', loadChildren: './recom-detail/recom-detail.module#RecomDetailPageModule' },
  { path: 'pay-recom-detail', loadChildren: './pay-recom-detail/pay-recom-detail.module#PayRecomDetailPageModule' },
  { path: 'yigou', loadChildren: './yigou/yigou.module#YigouPageModule' },
  { path: 'guanzhu', loadChildren: './guanzhu/guanzhu.module#GuanzhuPageModule' },
  { path: 'shoucang', loadChildren: './shoucang/shoucang.module#ShoucangPageModule' },
  { path: 'touzi', loadChildren: './touzi/touzi.module#TouziPageModule' },
  { path: 'edittouzi', loadChildren: './edittouzi/edittouzi.module#EdittouziPageModule' },
  { path: 'myaccount', loadChildren: './myaccount/myaccount.module#MyaccountPageModule' },
  { path: 'chongzhi', loadChildren: './chongzhi/chongzhi.module#ChongzhiPageModule' },
  { path: 'fankui', loadChildren: './fankui/fankui.module#FankuiPageModule' },
  { path: 'message', loadChildren: './message/message.module#MessagePageModule' },
  { path: 'mykehu', loadChildren: './mykehu/mykehu.module#MykehuPageModule' },
  { path: 'members', loadChildren: './members/members.module#MembersPageModule' },
  { path: 'setting', loadChildren: './setting/setting.module#SettingPageModule' },
  { path: 'abouttuiliao', loadChildren: './abouttuiliao/abouttuiliao.module#AbouttuiliaoPageModule' },
  { path: 'universal', loadChildren: './universal/universal.module#UniversalPageModule' },
  { path: 'accountsecurity', loadChildren: './accountsecurity/accountsecurity.module#AccountsecurityPageModule' },
  { path: 'menberinfo', loadChildren: './menberinfo/menberinfo.module#MenberinfoPageModule' },
  { path: 'memberchongzhi', loadChildren: './memberchongzhi/memberchongzhi.module#MemberchongzhiPageModule' },
  { path: 'paysuccess', loadChildren: './paysuccess/paysuccess.module#PaysuccessPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'chongzhisuccess', loadChildren: './chongzhisuccess/chongzhisuccess.module#ChongzhisuccessPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
