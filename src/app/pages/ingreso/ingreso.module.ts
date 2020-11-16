import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresoPageRoutingModule } from './ingreso-routing.module';

import { IngresoPage } from './ingreso.page';
import { ComponentesModule } from 'src/app/components/componentes.module';
import { InicioComponent } from './inicio/inicio.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { IonicSelectableModule } from 'ionic-selectable';
import { InformeComponent } from './informe/informe.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentesModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    IngresoPageRoutingModule
  ],
  declarations: [IngresoPage,InicioComponent,NuevoComponent,InformeComponent]
})
export class IngresoPageModule {}
