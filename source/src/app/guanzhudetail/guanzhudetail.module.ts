import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GuanzhudetailPage } from './guanzhudetail.page';

const routes: Routes = [
  {
    path: '',
    component: GuanzhudetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GuanzhudetailPage]
})
export class GuanzhudetailPageModule {}
