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
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
