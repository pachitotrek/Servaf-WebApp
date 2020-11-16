import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenesPage } from './ordenes.page';
import { CrearComponent } from './crear/crear.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { ItemsComponent } from './items/items.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  {
    path: '',
    component: OrdenesPage,children:[
      {
        path:'crear',component:CrearComponent
      },
      {
        path:'medidores',component:ItemsComponent
      },
      {
        path:'review',component:ReviewComponent
      },
      {
        path:'consultar',component:ConsultarComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenesPageRoutingModule {}
