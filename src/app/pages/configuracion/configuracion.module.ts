import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiguracionPageRoutingModule } from './configuracion-routing.module';

import { ConfiguracionPage } from './configuracion.page';
import { ComponentesModule } from 'src/app/components/componentes.module';
import { InstrumentosComponent } from './instrumentos/instrumentos.component';
import { ParametrosComponent } from './parametros/parametros.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentesModule,
    ConfiguracionPageRoutingModule
  ],
  declarations: [ConfiguracionPage,InstrumentosComponent,ParametrosComponent]
})
export class ConfiguracionPageModule {}
