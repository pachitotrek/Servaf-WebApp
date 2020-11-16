import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { AmbientalesComponent } from 'src/app/components/ambientales/ambientales.component';
import { PropiedadesComponent } from 'src/app/components/propiedades/propiedades.component';
import { EventosService } from 'src/app/services/eventos.service';
import { AuxService } from 'src/app/services/auxiliar.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalmedidorComponent } from 'src/app/components/modalmedidor/modalmedidor.component';
import { EditarmedidorComponent } from '../editarmedidor/editarmedidor.component';
import { EditarmetrologicasComponent } from '../editarmetrologicas/editarmetrologicas.component';
import { Editarmetrologicas2Component } from '../editarmetrologicas2/editarmetrologicas2.component';

@Component({
  selector: 'app-item',
  templateUrl: './medidor.component.html',
  styleUrls: ['./medidor.component.scss'],
})
export class MedidorComponent implements OnInit {
  id: string;
  item: any;
  cliente: any;
  metologicas: any;
  instrumentos: any;
  entrada: any;
  trabajo: any;
  q1: any;
  q2: any;
  q3: any;
  q4:any;
  ambientales: any;  
  form:FormGroup;
  

  constructor(private api:ApiService,public alertController: AlertController,private route:ActivatedRoute,private router:Router,public modalController: ModalController,private eventos:EventosService,private aux:AuxService) { 
    eventos.getNewupdate().subscribe((x:any)=>{
      this.getMedidor(this.id);   
    });

    this.form=new FormGroup({
        _id:new FormControl(null,Validators.required),
        nuevo:new FormControl(null,Validators.required),
        observacion:new FormControl(null,Validators.required)
    });
  }


  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.getMedidor(this.id);  
    this.form.patchValue({_id:this.id});  
  }  

  ionViewWillEnter() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.getMedidor(this.id);  
    this.form.patchValue({_id:this.id});  
  }


  getMedidor(id){
    this.api.getMedidor(id).subscribe((resp:any)=>{
      if(resp.ok){
        this.item=resp.data[0];
        this.cliente=this.item.cliente;       
        this.metologicas=this.item.metrologicas;
        this.instrumentos=this.item.instrumentos;
        this.entrada=this.item.orden_entrada;
        this.trabajo=this.item.orden_trabajo;
        this.q1=this.item.q1;
        this.q2=this.item.q2;
        this.q3=this.item.q3;
        this.q4=this.item.q4;
        this.ambientales=this.item.ambientales;         
      }
    })
  }

  async editarambientales(datos) {
    const modal = await this.modalController.create({
      component: AmbientalesComponent,
      componentProps:{
        'id':this.id,
        'datos':datos
      }
    });
    return await modal.present();
  }

  async editar(datos,tipo) {
    const modal = await this.modalController.create({
      component: PropiedadesComponent,
      componentProps:{
        'id':this.id,
        'datos':datos,
        'tipo':tipo
      }
    });
    return await modal.present();
  }

  
  generar() {
    this.aux.createLoading().then((x: any) => {
      let a = {
        id: this.trabajo._id
      };

      this.api.terminarorden(a).subscribe((resp: any) => {
        if (resp.ok) {
          this.aux.dismissLoading().then((b: any) => {
            this.aux.createAlert("Exito", "Medidor Actualizado puede descargar el certificado actualizado");
            this.router.navigate(['/trabajo/lista']);
          });
        }
      });
    }).catch((e: any) => {
      this.aux.dismissLoading().then((b: any) => {
        this.aux.createAlert("Error al generar los certificados", "Error por favor revise las condiciones de calibracion");
      })

    })
  }

  async launcheditar(){
    const modal = await this.modalController.create({
      component: EditarmedidorComponent,
      componentProps:{
        'item':this.item
      }
    });
    return await modal.present();
  }

  async launcheditar2(){


      const modal = await this.modalController.create({
        component: Editarmetrologicas2Component,
        componentProps:{
          'item':this.item
        }
      });
      return await modal.present();

   

  }

  async derogar() {
    const alert = await this.alertController.create({
      header: 'Esta Seguro??!',
      message: 'Estas seguro de derogar este certificado!!!',
      mode:'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.form.reset();  
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.crear();
          }
        }
      ]
    });

    await alert.present();
  }

  crear() {
    this.aux.createLoading().then((x: any) => {
      this.api.derogar(this.form.value).subscribe((resp: any) => {
        if (resp.ok) {
          this.aux.dismissLoading().then((b: any) => {
            this.aux.createAlert("Exito", "El Medidor ha sido modificado");
            this.router.navigate(['/trabajo/lista']);    
            this.eventos.newUpdateAlert();           
          })
        }
      });

    }).catch((e: any) => {
      this.aux.dismissLoading().then((b: any) => {
        this.aux.createAlert("Error desconocido", "Error por favor contacte con soporte");
      })

    })
  }








  

}
