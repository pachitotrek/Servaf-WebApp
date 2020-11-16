import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ApiService } from 'src/app/services/api.service';
import { AuxService } from 'src/app/services/auxiliar.service';
import { ModalController } from '@ionic/angular';
import { EventosService } from 'src/app/services/eventos.service';
import { Subscription } from 'rxjs';
import { ModalmodeloComponent } from 'src/app/components/modalmodelo/modalmodelo.component';
import { ModalmarcaComponent } from 'src/app/components/modalmarca/modalmarca.component';
import { ModalincidenciaComponent } from 'src/app/components/modalincidencia/modalincidencia.component';
import { ModalclientesComponent } from 'src/app/components/modalclientes/modalclientes.component';


@Component({
  selector: 'app-editarmedidor',
  templateUrl: './editarmedidor.component.html',
  styleUrls: ['./editarmedidor.component.scss'],
})
export class EditarmedidorComponent implements OnInit {
  @Input() item: any = [];
  form: FormGroup;
  modelos$: Subscription;
  marcas$: Subscription;
  incidencia$: Subscription;
  clase: Array<any> = [
    "A", "B", "C", "D"
  ];
  modelos: Array<any> = [];
  marcas: Array<any> = [];
  incidencias: any = [];
  clientes: any = [];
  normas: any = [];
  norma: any = [];
  ind: any = [
    "Analogico", "Digital", "Mixto"
  ];
  pos: any = [
    "Horizontal", "Vertical", "Cualquiera"
  ];
  rg: any = [
    {
      value: '999.0', titulo: '0 - 999'
    },
    {
      value: '9999.0', titulo: '0 - 9999'
    },
    {
      value: '99999.0', titulo: '0 - 99999'
    },
    {
      value: '999999.0', titulo: '0 - 999999'
    }
  ];
  prf: any = [
    "Velocidad", "Volumetrico", "Electromagnetico"
  ];
  uno: boolean = true;
  dos: boolean = false;
  tres: boolean = false;

  constructor(private api: ApiService, private aux: AuxService, public modalController: ModalController, private eventos: EventosService) {
    this.form = new FormGroup({
      _id: new FormControl(null, Validators.required),
      fabricacion: new FormControl(null, Validators.required),
      marca: new FormControl(null, Validators.required),
      modelo: new FormControl(null, Validators.required),
      serie: new FormControl(null, Validators.required),
      entrada: new FormControl(null, Validators.required),
      incidencias: new FormControl(null),
      cliente: new FormControl(null, Validators.required),
      estado: new FormControl(null, Validators.required)
    });

    this.modelos$ = eventos.getNewModelo().subscribe((x: any) => {
      this.getModelos();
    });

    this.marcas$ = eventos.getNewMarca().subscribe((x: any) => {
      this.getMarcas();
    });


    this.incidencia$ = eventos.getNewIncidencia().subscribe((x: any) => {
      this.getIncidencias();
    });
  }

  ngOnInit() {
    this.run();
    console.log(this.item)   
    this.patch();
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
    console.log(this.form.value);
  }

  patch() {    
    this.form.patchValue({ _id: this.item._id });
    this.form.patchValue({fabricacion:this.item.datos.fabricacion});
    this.form.patchValue({marca:this.item.datos.marca._id});
    this.form.patchValue({modelo:this.item.datos.modelo._id});
    this.form.patchValue({serie:this.item.datos.serie});
    this.form.patchValue({entrada:this.item.datos.lectura});
    this.form.patchValue({incidencias:this.item.incidencias});
    this.form.patchValue({cliente:this.item.cliente});
    this.form.patchValue({estado:this.item.estado});
  }


  async addModelo() {
    const modal = await this.modalController.create({
      component: ModalmodeloComponent
    });
    return await modal.present();
  }

  async addMarca() {
    const modal = await this.modalController.create({
      component: ModalmarcaComponent
    });
    return await modal.present();
  }

  async addIncidencia() {
    const modal = await this.modalController.create({
      component: ModalincidenciaComponent
    });
    return await modal.present();
  }

  async addcliente() {
    const modal = await this.modalController.create({
      component: ModalclientesComponent
    });
    return await modal.present();
  }

  run() {
    this.getMarcas();
    this.getModelos();
    this.getIncidencias();
    this.getNormas();
    this.getClientes();
  }

  getModelos() {
    this.api.getModelo().subscribe((resp: any) => {
      if (resp.ok) {
        this.modelos = resp.data;
      }
    });
  }
  getMarcas() {
    this.api.getMarcas().subscribe((resp: any) => {
      if (resp.ok) {
        this.marcas = resp.data;
      }
    });
  }
  getIncidencias() {
    this.api.getIncidencias().subscribe((resp: any) => {
      if (resp.ok) {
        this.incidencias = resp.data;
      }
    });
  }

  getClientes() {
    this.api.GetClientes().subscribe((resp: any) => {
      if (resp.ok) {
        this.clientes = resp.clientes;
        console.log(this.clientes);
      }
    })
  }
  getNormas() {
    this.api.getNormas().subscribe((resp: any) => {
      if (resp.ok) {
        this.normas = resp.data;
        console.log(this.normas)
      }
    })
  }
  setNorma(item) {

    if (item == "NTC 4064-1 : 2016") {
      this.uno = true;
      this.dos = false;
      this.tres = false;
      this.form.patchValue({ type: 1 });

    } else if (item == "NTC 1063-1 : 2007") {

      this.uno = false;
      this.dos = true;
      this.tres = false;
      this.form.patchValue({ type: 2 });

    } else if (item == "NTC 1063-1 : 1995") {

      this.uno = false;
      this.dos = false;
      this.tres = true;

      this.form.patchValue({ type: 3 });

    }


    this.norma = this.normas.find(e => e.norma == item);
  }

  crear() {
    this.aux.createLoading().then((x: any) => {
      this.api.updateMedidor(this.form.value).subscribe((resp: any) => {
        if (resp.ok) {
          this.aux.dismissLoading().then((b: any) => {
            this.aux.createAlert("Exito", "El Medidor ha sido Actualizado");
            this.eventos.newUpdateAlert();
            this.modalController.dismiss();
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

