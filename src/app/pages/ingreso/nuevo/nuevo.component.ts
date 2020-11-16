import { Component, OnInit } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Subscription, from } from 'rxjs';
import { EventosService } from 'src/app/services/eventos.service';
import { ApiService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular';
import { ModalmedidorComponent } from 'src/app/components/modalmedidor/modalmedidor.component';
import { AuxService } from 'src/app/services/auxiliar.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalclientesComponent } from 'src/app/components/modalclientes/modalclientes.component';


@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss'],
})
export class NuevoComponent implements OnInit {
  subscripcion:Subscription;
  clientes:any=[];
  medidores: Array<any>=[];
  possible:any = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;'[]\=-)(*&^%$#@!~`";
  lengthOfCode = 15;
  usuario: any=[];
  fecha:any="";
  form:FormGroup;
  incidencia$: Subscription;


  constructor(private eventos:EventosService,private api:ApiService,private modalController:ModalController,private aux:AuxService,private lc:LocalStorageService) {
    this.subscripcion= eventos.getNewMedidor().subscribe((x:any)=>{
      this.getMedidores();
    });

    
    this.incidencia$ = eventos.getNewClient().subscribe((x: any) => {
      this.getClientes();
    });



    this.form=new FormGroup({
      cliente:new FormControl(null,Validators.required)
    });
   }

  ngOnInit() {
    this.getMedidores();
    this.setuser();
    this.fecha=Date.now();
    this.getClientes();
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }

  async launch(){
    const modal = await this.modalController.create({
      component: ModalmedidorComponent,
      cssClass:'large'
    });
    return await modal.present();
  }

  getClientes(){
    this.api.GetClientes().subscribe((resp:any)=>{
        if(resp.ok){
          this.clientes=resp.clientes;      
        }
    })
  }

  getMedidores(){
    this.api.getMedidoresOpen().subscribe((resp:any)=>{
        if(resp.ok){
          this.medidores=resp.data;                 
        }
    })
  }

  setuser(){
    this.lc.cargarStorage('usuario').then((data:any)=>{
      this.usuario=data;
    })
  }

  async addcliente() {
    const modal = await this.modalController.create({
      component: ModalclientesComponent
    });
    return await modal.present();
  }


  close() {
    this.aux.createLoading().then((x: any) => {
      let a={
        a:'ok',
        medidores:this.medidores,
        usuario:this.usuario._id,
        cliente:this.form.value.cliente._id
      };
 
      this.api.cerrarIngreso(a).subscribe((resp: any) => {
        if (resp.ok) {
          this.aux.dismissLoading().then((b: any) => {
            this.aux.createAlert("Exito", "La Orden ha sido agregada");
            this.eventos.newMedidorlert();
            this.getMedidores();
            this.form.reset();
          })

        }
      });
    }).catch((e: any) => {
      this.aux.dismissLoading().then((b: any) => {
        this.aux.createAlert("Error desconocido", "Error por favor contacte con soporte");
      })

    })
  }

  delete(id){
    this.aux.createLoading().then((x: any) => {   
      this.api.DeleteMedidor(id).subscribe((resp: any) => {
        if (resp.ok) {
          this.aux.dismissLoading().then((b: any) => {
            this.aux.createAlert("Exito", "El Medidor ha sido Eliminado");
            this.eventos.newMedidorlert();
            this.getMedidores();
          })
        }
      });
    }).catch((e: any) => {
      this.aux.dismissLoading().then((b: any) => {
        this.aux.createAlert("Error desconocido", "Error por favor contacte con soporte");
      })

    })
  }

  makeRandom(lengthOfCode: number, possible: string) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }

}
