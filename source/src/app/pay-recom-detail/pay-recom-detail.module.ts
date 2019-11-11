import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PayRecomDetailPage } from './pay-recom-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PayRecomDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PayRecomDetailPage]
})
export class PayRecomDetailPageModule {}
