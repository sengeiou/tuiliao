import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MemberchongzhiPage } from './memberchongzhi.page';

const routes: Routes = [
  {
    path: '',
    component: MemberchongzhiPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MemberchongzhiPage]
})
export class MemberchongzhiPageModule {}
