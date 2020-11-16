import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ApiService } from 'src/app/services/api.service';
import { AuxService } from 'src/app/services/auxiliar.service';
import { ModalController } from '@ionic/angular';
import { ModalmodeloComponent } from '../modalmodelo/modalmodelo.component';
import { ModalmarcaComponent } from '../modalmarca/modalmarca.component';
import { EventosService } from 'src/app/services/eventos.service';
import { Subscription } from 'rxjs';
import { ModalincidenciaComponent } from '../modalincidencia/modalincidencia.component';
import { ModalclientesComponent } from '../modalclientes/modalclientes.component';
import { OtherComponent } from '../other/other.component';

@Component({
  selector: 'app-modalmedidor',
  templateUrl: './modalmedidor.component.html',
  styleUrls: ['./modalmedidor.component.scss'],
})
export class ModalmedidorComponent implements OnInit {
  @Input() id: string;
  form: FormGroup;
  modelos$: Subscription;
  marcas$: Subscription;
  incidencia$: Subscription;
  clase:Array<any>=[
    "A","B","C","D"
  ];
  modelos: Array<any> = [];
  marcas: Array<any> = [];
  incidencias: any = [];
  clientes: any = [];
  normas: any = [];
  norma:any = [];
  ind: any = [
    "Analogico", "Digital", "Mixto"
  ];
  pos: any = [
    "Horizontal", "Vertical", "Cualquiera"
  ];
  rg: any = [
    {
      value:'999.0',titulo:'0 - 999'
    },
    {
      value:'9999.0',titulo:'0 - 9999'
    },
    {
      value:'99999.0',titulo:'0 - 99999'
    },
    {
      value:'999999.0',titulo:'0 - 999999'
    }  
  ];
  prf: any = [
    "Velocidad", "Volumetrico", "Electromagnetico"
  ];

  uno:boolean=true;
  dos:boolean=false;
  tres:boolean=false;
  other: any;

  flag:boolean=true;




  constructor(private api: ApiService, private aux: AuxService, public modalController: ModalController, private eventos: EventosService) {
    this.form = new FormGroup({      
      fabricacion: new FormControl(null, Validators.required),
      marca: new FormControl(null, Validators.required),
      modelo: new FormControl(null, Validators.required),
      serie: new FormControl(null, Validators.required),
      entrada: new FormControl(null, Validators.required),
      incidencias: new FormControl(null),      
      norma: new FormControl(null, Validators.required),
      q3: new FormControl(null, Validators.required),
      precision: new FormControl(null),
      pmaxp: new FormControl(null),
      pperdida: new FormControl(null),
      q3q1: new FormControl(null),
      q2q1: new FormControl(null),
      clasetemp: new FormControl(null),
      aguasarriba: new FormControl(null),
      aguasabajo: new FormControl(null),
      tipo: new FormControl(null, Validators.required),
      principio: new FormControl(null, Validators.required),
      posicion: new FormControl(null, Validators.required),
      diametro: new FormControl(null, Validators.required),
      rango: new FormControl(null, Validators.required),
      escala: new FormControl(null, Validators.required),
      estado:new FormControl(null,Validators.required),
      identificador: new FormControl(null),
      clase: new FormControl(null),
      pnominal: new FormControl(10),
      type:new FormControl(null,Validators.required)
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

    this.incidencia$ = eventos.getNewupdate().subscribe((x: any) => {
      this.getOthers();
    });


  }

  ngOnInit() {
    this.run();
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
    console.log(this.form.value);
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

  run(){
    this.getMarcas();
    this.getModelos();
    this.getIncidencias();
    this.getNormas();
    this.getClientes();
    this.getOthers();
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
      }
    })
  }
  getNormas() {
    this.api.getNormas().subscribe((resp: any) => {
      if (resp.ok) {
        this.normas = resp.data;
       
      }
    })
  }
  getOthers() {
    this.api.GetOthers().subscribe((resp: any) => {
      if (resp.ok) {
        this.other = resp.data;        
      }
    })
  }

  nuevo(event){    
    if(event=="Otro"){
      this.flag=false;
    }
  }

  clear(){
    if(this.flag){
      this.flag=false;
      this.form.value.q3q1=null;
    }else{
      this.flag=true;
      this.form.value.q3q1=null;
    }
  }

  async checkother(event){
    if(event==1){     
      const modal = await this.modalController.create({
        component: OtherComponent
      });
      return await modal.present();

    }
  }
  setNorma(item) {  

    if(item=="NTC 4064-1 : 2016"){
      this.uno=true;
      this.dos=false;
      this.tres=false;
      this.form.patchValue({type:1});

    }else if(item == "NTC 1063-1 : 2007"){

      this.uno=false;
      this.dos=true;
      this.tres=false;
      this.form.patchValue({type:2});

    }else if(item == "NTC 1063-1 : 1995"){

      this.uno=false;
      this.dos=false;
      this.tres=true;

      this.form.patchValue({type:3});

    }


    this.norma = this.normas.find(e => e.norma == item);
  }

  crear() {
    this.aux.createLoading().then((x: any) => {
      let q3= this.form.value.q3*1000;
      this.form.value.q3=q3;
      this.api.crearMedidor(this.form.value).subscribe((resp: any) => {
        if (resp.ok) {
          this.aux.dismissLoading().then((b: any) => {
            this.aux.createAlert("Exito", "El Medidor ha sido agregado");
            this.eventos.newMedidorlert();           
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
