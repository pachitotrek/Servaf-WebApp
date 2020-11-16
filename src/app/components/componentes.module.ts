import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';

import { IonicModule } from '@ionic/angular';
import { PopmenuComponent } from './popmenu/popmenu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicSelectableModule } from 'ionic-selectable';

import { LoadingComponent } from './loading/loading.component';
import { Popmenu2Component } from './popmenu2/popmenu2.component';
import { Popmenu3Component } from './popmenu3/popmenu3.component';
import { Popmenu4Component } from './popmenu4/popmenu4.component';
import { Popmenu5Component } from './popmenu5/popmenu5.component';
import { ModalclientesComponent } from './modalclientes/modalclientes.component';
import { ModalmedidorComponent } from './modalmedidor/modalmedidor.component';
import { ModalmarcaComponent } from './modalmarca/modalmarca.component';
import { ModalmodeloComponent } from './modalmodelo/modalmodelo.component';
import { ModalincidenciaComponent } from './modalincidencia/modalincidencia.component';
import { MeComponent } from '../pages/trabajo/me/me.component';
import { MedidorComponent } from './medidor/medidor.component';
import { SetcalibracionComponent } from './setcalibracion/setcalibracion.component';
import { HistoricalibracionComponent } from './historicalibracion/historicalibracion.component';
import { LoaderimageComponent } from './loaderimage/loaderimage.component';
import { AmbientalesComponent } from './ambientales/ambientales.component';
import { PropiedadesComponent } from './propiedades/propiedades.component';
import { Popmenu6Component } from './popmenu6/popmenu6.component';
import { OtherComponent } from './other/other.component';
import { ModalCMCComponent } from './modal-cmc/modal-cmc.component';
import { ModalCMCNewComponent } from './modal-cmcnew/modal-cmcnew.component';





@NgModule({
  entryComponents:[
    PopmenuComponent,
    Popmenu2Component,
    Popmenu3Component,
    Popmenu4Component,
    Popmenu5Component,
    Popmenu6Component,
    ModalclientesComponent,
    ModalmedidorComponent,
    ModalmarcaComponent,
    ModalmodeloComponent,
    ModalincidenciaComponent,
    SetcalibracionComponent,
    LoaderimageComponent,
    HistoricalibracionComponent,
    AmbientalesComponent,
    PropiedadesComponent,
    OtherComponent,
    ModalCMCComponent,
    ModalCMCNewComponent
  ],
  declarations: [MenuComponent,OtherComponent,ModalCMCComponent,ModalCMCNewComponent,
    ModalmarcaComponent,
    ModalmodeloComponent,MeComponent,LoaderimageComponent,AmbientalesComponent,
    PropiedadesComponent,
    ModalmedidorComponent,ModalclientesComponent,PopmenuComponent,LoadingComponent,Popmenu2Component,Popmenu3Component,
    Popmenu4Component,ModalincidenciaComponent,MedidorComponent,SetcalibracionComponent,HistoricalibracionComponent,
    Popmenu5Component,Popmenu6Component],
  imports: [
    CommonModule,
    FormsModule,  
    IonicSelectableModule,      
    ReactiveFormsModule,
    IonicModule
  ],
  exports:[
    MenuComponent,PopmenuComponent,LoadingComponent,MeComponent,ModalCMCComponent,ModalCMCNewComponent, Popmenu3Component,ModalmarcaComponent,LoaderimageComponent,
    ModalmodeloComponent,AmbientalesComponent,OtherComponent,
    PropiedadesComponent,
    Popmenu4Component,ModalclientesComponent,ModalmedidorComponent,ModalincidenciaComponent,SetcalibracionComponent,HistoricalibracionComponent,
    Popmenu5Component,Popmenu2Component,MedidorComponent,Popmenu6Component  ]

})
export class ComponentesModule { }
