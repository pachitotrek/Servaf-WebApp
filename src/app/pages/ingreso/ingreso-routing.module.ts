import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresoPage } from './ingreso.page';
import { InicioComponent } from './inicio/inicio.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { InformeComponent } from './informe/informe.component';

const routes: Routes = [
  {
    path: '',
    component: IngresoPage,children:[
      {
        path:'',component:NuevoComponent
      },
      {
        path:'nuevo',component:NuevoComponent
      },
      {
        path:'consultar',component:InicioComponent
      },
      {
        path:'informe/:id',component:InformeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresoPageRoutingModule {}
