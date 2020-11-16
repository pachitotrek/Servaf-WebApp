import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatebancoPageRoutingModule } from './updatebanco-routing.module';

import { UpdatebancoPage } from './updatebanco.page';
import { ComponentesModule } from 'src/app/components/componentes.module';
import { UpdateComponent } from './update/update.component';

@NgModule({
  entryComponents:[
    UpdateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentesModule,
    ReactiveFormsModule,
    IonicModule,
    UpdatebancoPageRoutingModule
  ],
  declarations: [UpdatebancoPage,UpdateComponent]
})
export class UpdatebancoPageModule {}
