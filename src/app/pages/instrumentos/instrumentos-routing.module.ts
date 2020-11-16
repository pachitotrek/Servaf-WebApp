import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstrumentosPage } from './instrumentos.page';
import { CrearComponent } from './crear/crear.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { ItemComponent } from './item/item.component';
import { SetComponent } from './set/set.component';

const routes: Routes = [
  {
    path: '',
    component: InstrumentosPage,children:[
      {
        path:'crear',component:CrearComponent
      },
      {
        path:'consultar',component:ConsultarComponent
      },
      {
        path:'item/:id',component:ItemComponent
      },
      {
        path:'set',component:SetComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstrumentosPageRoutingModule {}
