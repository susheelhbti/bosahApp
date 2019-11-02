import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FlatSearchFormPage } from './flat-search-form.page';

const routes: Routes = [
  {
    path: '',
    component: FlatSearchFormPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FlatSearchFormPage]
})
export class FlatSearchFormPageModule {}
