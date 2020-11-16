import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnsayosPageRoutingModule } from './ensayos-routing.module';

import { EnsayosPage } from './ensayos.page';
import { ComponentesModule } from 'src/app/components/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentesModule,
    EnsayosPageRoutingModule
  ],
  declarations: [EnsayosPage]
})
export class EnsayosPageModule {}
