import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfiguracionPage } from './configuracion.page';
import { InstrumentosComponent } from './instrumentos/instrumentos.component';
import { ParametrosComponent } from './parametros/parametros.component';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracionPage,children:[
      {
        path:'instrumentos',component:InstrumentosComponent
      },
      {
        path:'parametros',component:ParametrosComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionPageRoutingModule {}
