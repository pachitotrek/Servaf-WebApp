import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuxService } from 'src/app/services/auxiliar.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.scss'],
})
export class PruebasComponent implements OnInit {
  form: FormGroup;
  id: string;
  pruebas:Array<any>=[];
  complete:boolean=false;
  usuario: any;

  constructor(private router: Router, private route: ActivatedRoute, public alertController: AlertController, private api: ApiService,
     private aux: AuxService,private lc:LocalStorageService) {
    this.form = new FormGroup({
      tipo: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.setuser();
    // this.getOrden(this.id);
  }

  ionViewWillEnter() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.getOrden(this.id);
  }

  ionViewDidLeave() {
    this.pruebas=[];
  }

  getOrden(id){
    this.api.getOrdenTrabajo(id).subscribe(async (resp:any)=>{
        if(resp.ok){
          let b=resp.data[0].pruebas;
          await b.forEach(e => {
              if(e.status){
                this.pruebas.push({
                   tipo:e.tipo  
                });
              }
          });

          if(this.pruebas.length==0){
            this.complete=true;
          }         
        }
    });
  }



  nav() {
    let a = this.form.value;
    this.pruebas=[];
    this.router.navigate([`/trabajo/iniciales/${this.id}`], { queryParams: { tipo: a.tipo, numero: 1 } });
  }

  setuser(){
    this.lc.cargarStorage('usuario').then((data:any)=>{
      this.usuario=data;
    })
  }


  close() {
    this.aux.createLoading().then((x: any) => {
      let a = {
        id: this.id,
        usuario:this.usuario._id
      };
      this.api.terminarorden(a).subscribe((resp: any) => {
        if (resp.ok) {
          this.aux.dismissLoading().then((b: any) => {
            this.aux.createAlert("Exito", "Orden Cerrada puede descargar los certificados");
            this.router.navigate(['/trabajo/ordenes']);
          });
        }
      });
    }).catch((e: any) => {
      console.log(e)
      this.aux.dismissLoading().then((b: any) => {
        this.aux.createAlert("Error al generar los certificados", "Error por favor revise las condiciones de calibracion");
      })

    })
  }

  async cerrar() {
    const alert = await this.alertController.create({
      header: 'Cerrar Orden!',
      mode: 'ios',
      message: 'Desea usted cerrar esta orden ?. Recuerde si ya termino todas las pruebas de Aceptar !!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.close();
          }
        }
      ]
    });

    await alert.present();
  }


}
