import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChongzhisuccessPage } from './chongzhisuccess.page';

const routes: Routes = [
  {
    path: '',
    component: ChongzhisuccessPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChongzhisuccessPage]
})
export class ChongzhisuccessPageModule {}
