import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrabajoPageRoutingModule } from './trabajo-routing.module';
import {NgxPrintModule} from 'ngx-print';

import { TrabajoPage } from './trabajo.page';
import { ComponentesModule } from 'src/app/components/componentes.module';
import { CrearComponent } from './crear/crear.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { InstrumentosComponent } from './instrumentos/instrumentos.component';
import { AddmedidoresComponent } from './addmedidores/addmedidores.component';
import { CalibrarComponent } from './calibrar/calibrar.component';
import { PruebasComponent } from './pruebas/pruebas.component';
import { MeComponent } from './me/me.component';
import { Q1Component } from './q1/q1.component';
import { Q2Component } from './q2/q2.component';
import { GenerarComponent } from './generar/generar.component';
import { InformesComponent } from './informes/informes.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentesModule,
    NgxPrintModule,
    TrabajoPageRoutingModule
  ],
  declarations: [TrabajoPage,InformesComponent,Q1Component,Q2Component,GenerarComponent,CrearComponent,ConsultarComponent,InstrumentosComponent,AddmedidoresComponent,CalibrarComponent,PruebasComponent]
})
export class TrabajoPageModule {}
