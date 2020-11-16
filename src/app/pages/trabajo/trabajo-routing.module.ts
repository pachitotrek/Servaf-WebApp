import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrabajoPage } from './trabajo.page';
import { CrearComponent } from './crear/crear.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { InstrumentosComponent } from './instrumentos/instrumentos.component';
import { AddmedidoresComponent } from './addmedidores/addmedidores.component';
import { CalibrarComponent } from './calibrar/calibrar.component';
import { PruebasComponent } from './pruebas/pruebas.component';
import { Q1Component } from './q1/q1.component';
import { Q2Component } from './q2/q2.component';
import { GenerarComponent } from './generar/generar.component';
import { InformesComponent } from './informes/informes.component';

const routes: Routes = [
  {
    path: '',
    component: TrabajoPage,children:[
      {
        path:'crear',component:ConsultarComponent
      },
      {
        path:'open',component:CrearComponent
      },
      {
        path:'instrumentos/:id',component:InstrumentosComponent
      },
      {
        path:'medidores/:id',component:AddmedidoresComponent
      },
      {
        path:'calibrar',component:CalibrarComponent
      },
      {
        path:'pruebas/:id',component:PruebasComponent
      },
      {
        path:'corrida/:id',component:Q1Component
      },
      {
        path:'corridad/:id',component:Q2Component
      },
      {
        path:'generar/:id',component:GenerarComponent
      },
      {
        path:'informes',component:InformesComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrabajoPageRoutingModule {}
