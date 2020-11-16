import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ComponentesModule } from '../components/componentes.module';
import { PopmenuComponent } from '../components/popmenu/popmenu.component';
import { Popmenu2Component } from '../components/popmenu2/popmenu2.component';

@NgModule({
  entryComponents:[
  PopmenuComponent,
  Popmenu2Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentesModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
