import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AbouttuiliaoPage } from './abouttuiliao.page';

const routes: Routes = [
  {
    path: '',
    component: AbouttuiliaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AbouttuiliaoPage]
})
export class AbouttuiliaoPageModule {}
