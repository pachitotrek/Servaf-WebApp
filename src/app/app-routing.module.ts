import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./pages/usuarios/usuarios.module').then(m => m.UsuariosPageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./pages/clientes/clientes.module').then(m => m.ClientesPageModule)
  },
  {
    path: 'ordenes',
    loadChildren: () => import('./pages/ordenes/ordenes.module').then(m => m.OrdenesPageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./pages/configuracion/configuracion.module').then(m => m.ConfiguracionPageModule)
  },
  {
    path: 'p',
    loadChildren: () => import('./pages/trabajo/trabajo.module').then(m => m.TrabajoPageModule)
  },
  {
    path: 'instrumentos',
    loadChildren: () => import('./pages/instrumentos/instrumentos.module').then(m => m.InstrumentosPageModule)
  },
  {
    path: 'ensayos',
    loadChildren: () => import('./pages/ensayos/ensayos.module').then(m => m.EnsayosPageModule)
  },
  {
    path: 'ingreso',
    loadChildren: () => import('./pages/ingreso/ingreso.module').then(m => m.IngresoPageModule)
  },
  {
    path: 'trabajo',
    loadChildren: () => import('./pages/programacion/programacion.module').then(m => m.ProgramacionPageModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./pages/usuario/usuario.module').then( m => m.UsuarioPageModule)
  },
  {
    path: 'manual',
    loadChildren: () => import('./pages/manual/manual.module').then( m => m.ManualPageModule)
  },  
  {
    path: 'updatebanco',
    loadChildren: () => import('./pages/updatebanco/updatebanco.module').then( m => m.UpdatebancoPageModule)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
