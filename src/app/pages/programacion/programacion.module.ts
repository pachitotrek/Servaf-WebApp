import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramacionPageRoutingModule } from './programacion-routing.module';

import { ProgramacionPage } from './programacion.page';
import { ComponentesModule } from 'src/app/components/componentes.module';
import { CrearComponent } from './crear/crear.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { InstrumentosComponent } from './instrumentos/instrumentos.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { CalibrarComponent } from './calibrar/calibrar.component';
import { PruebasComponent } from './pruebas/pruebas.component';
import { Q1Component } from './q1/q1.component';
import { Q2Component } from './q2/q2.component';
import { Q3Component } from './q3/q3.component';
import { InicialesComponent } from './iniciales/iniciales.component';
import { FinalesComponent } from './finales/finales.component';
import { CertificadosComponent } from './certificados/certificados.component';
import { GenerarComponent } from './generar/generar.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { CtrabajoComponent } from './ctrabajo/ctrabajo.component';
import { InformedosComponent } from './informedos/informedos.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { MedidorComponent } from './medidor/medidor.component';
import { ListamedidoresComponent } from './listamedidores/listamedidores.component';
import { EditarmedidorComponent } from './editarmedidor/editarmedidor.component';
import { IonicSelectableModule } from 'ionic-selectable';
import { EditarmetrologicasComponent } from './editarmetrologicas/editarmetrologicas.component';
import { Editarmetrologicas2Component } from './editarmetrologicas2/editarmetrologicas2.component';
import { Title } from '@angular/platform-browser';


@NgModule({
  entryComponents:[
    EditarmedidorComponent,
    EditarmetrologicasComponent,
    Editarmetrologicas2Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ComponentesModule,
    PipesModule,
    IonicSelectableModule,    
    ProgramacionPageRoutingModule
  ],
  providers:[
    Title 
  ],
  declarations: [ProgramacionPage,MedidorComponent,EditarmetrologicasComponent,Editarmetrologicas2Component,EditarmedidorComponent,ListamedidoresComponent,InformedosComponent,CrearComponent,CertificadosComponent,GenerarComponent,ConsultarComponent,CtrabajoComponent,
    InicialesComponent,FinalesComponent,AjustesComponent,InstrumentosComponent,OrdenesComponent,CalibrarComponent,PruebasComponent,Q1Component,Q2Component,Q3Component]
})
export class ProgramacionPageModule {}
