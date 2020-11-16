import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramacionPage } from './programacion.page';
import { CrearComponent } from './crear/crear.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { InstrumentosComponent } from './instrumentos/instrumentos.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { PruebasComponent } from './pruebas/pruebas.component';
import { Q1Component } from './q1/q1.component';
import { Q2Component } from './q2/q2.component';
import { Q3Component } from './q3/q3.component';
import { InicialesComponent } from './iniciales/iniciales.component';
import { FinalesComponent } from './finales/finales.component';
import { CertificadosComponent } from './certificados/certificados.component';
import { CalibrarComponent } from './calibrar/calibrar.component';
import { GenerarComponent } from './generar/generar.component';
import { CtrabajoComponent } from './ctrabajo/ctrabajo.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { InformedosComponent } from './informedos/informedos.component';
import { ListamedidoresComponent } from './listamedidores/listamedidores.component';
import { MedidorComponent } from './medidor/medidor.component';

const routes: Routes = [
  {
    path: '',
    component: ProgramacionPage,children:[
      {
        path:'',component:CrearComponent
      },
      {
        path:'generales',component:AjustesComponent
      },
      {
        path:'instrumentos/:id',component:InstrumentosComponent
      },
      {
        path:'ordenes',component:OrdenesComponent
      },
      {
        path:'pruebas/:id',component:PruebasComponent
      },
      {
        path:'q1/:id',component:Q1Component
      },
      {
        path:'q2/:id',component:Q2Component
      },
      {
        path:'q3/:id',component:Q3Component
      },
      {
        path:'iniciales/:id',component:InicialesComponent
      },
      {
        path:'finales/:id',component:FinalesComponent
      },
      {
        path:'q3/:id',component:Q3Component
      },
      {
        path:'ordenes',component:OrdenesComponent
      },
      {
        path:'certificados/:id',component:CalibrarComponent
      },
      {
        path:'generar/:id',component:GenerarComponent
      },
      {
        path:'informe/:id',component:InformedosComponent
      },
      {
        path:'generartrabajo/:id',component:CtrabajoComponent
      },
      {
        path:'finalizadas',component:CertificadosComponent
      },
      {
        path:'consultar',component:ConsultarComponent
      },
      {
        path:'lista',component:ListamedidoresComponent
      },
      {
        path:'medidor/:id',component:MedidorComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramacionPageRoutingModule {}
