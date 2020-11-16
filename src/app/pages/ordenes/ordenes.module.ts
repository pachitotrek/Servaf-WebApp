import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdenesPageRoutingModule } from './ordenes-routing.module';

import { OrdenesPage } from './ordenes.page';
import { ComponentesModule } from 'src/app/components/componentes.module';
import { CrearComponent } from './crear/crear.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { IonicSelectableModule } from 'ionic-selectable';
import { ItemsComponent } from './items/items.component';
import { ReviewComponent } from './review/review.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    ComponentesModule,
    OrdenesPageRoutingModule
  ],
  declarations: [OrdenesPage,CrearComponent,ConsultarComponent,ItemsComponent,ReviewComponent]
})
export class OrdenesPageModule {}
