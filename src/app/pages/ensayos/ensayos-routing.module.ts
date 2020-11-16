import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnsayosPage } from './ensayos.page';

const routes: Routes = [
  {
    path: '',
    component: EnsayosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnsayosPageRoutingModule {}
