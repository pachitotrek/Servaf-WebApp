import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstrumentosPageRoutingModule } from './instrumentos-routing.module';

import { InstrumentosPage } from './instrumentos.page';
import { CrearComponent } from './crear/crear.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { ComponentesModule } from 'src/app/components/componentes.module';
import { ItemComponent } from './item/item.component';
import { SetComponent } from './set/set.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentesModule,
    InstrumentosPageRoutingModule
  ],
  declarations: [InstrumentosPage,CrearComponent,ConsultarComponent,ItemComponent,SetComponent]
})
export class InstrumentosPageModule {}
