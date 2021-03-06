import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CustomPipesModule } from '../../shared/pipe/custom-pipe.module';

import { PreferredComponent } from './preferred.component';



@NgModule({
  declarations: [PreferredComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: PreferredComponent
      }
    ]),
    CustomPipesModule.forRoot()
  ]
})
export class PreferredModule { }
