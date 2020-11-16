import { Component, OnInit } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular';
import { ModalclientesComponent } from 'src/app/components/modalclientes/modalclientes.component';
import { EventosService } from 'src/app/services/eventos.service';
import { Subscription } from 'rxjs';
import { AuxService } from 'src/app/services/auxiliar.service';
import { Router } from '@angular/router';

class Port {
  public id: number;
  public name: string;
}

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss'],
})
export class CrearComponent implements OnInit {
  subscripcion:Subscription;
  form:FormGroup;
  ports: Port[];
  port: Port; 

  aguasarriba:any=[
    "U0","U3","U5","U15",'U0S',"U3S","U5S","U10S"
  ];
  aguasabajo:any=[
    "D0","D3","D5","D0S","D3S"
  ];

  q2q1=1.6;
  ind: any = [
    "Analogico", "Digital", "Mixto"
  ];
  pos: any = [
    "Horizontal", "Vertical", "Cualquiera"
  ];
  rg: any = [
    "0 - 999", "0 - 9999", "0 - 99999", "0 - 999999"
  ];
  prf: any = [
    "Velocidad", "Volumetrico", "Electromagnetico"
  ]
  isItemAvailable: boolean = false;

  clientes:any=[];
  normas:any=[];
  norma:any=[];
  orden:any=[];


  constructor(private api:ApiService,private modal:ModalController,private eventos:EventosService,private aux:AuxService,private router:Router) {

    this.subscripcion= eventos.getNewClient().subscribe((x:any)=>{
      this.getClientes();
    })

    this.form= new FormGroup({
      orden:new FormControl(null,Validators.required),
      cliente:new FormControl(null,Validators.required),
      norma:new FormControl(null,Validators.required),
      q3:new FormControl(null,Validators.required),
      precision:new FormControl(null,Validators.required),
      pmaxp:new FormControl(null,Validators.required),
      pperdida:new FormControl(null,Validators.required),
      q3q1:new FormControl(null,Validators.required),
      q2q1:new FormControl(null,Validators.required),
      clasetemp:new FormControl(null,Validators.required),
      aguasarriba:new FormControl(null,Validators.required),
      aguasabajo:new FormControl(null,Validators.required),
      tipo:new FormControl(null,Validators.required),
      principio:new FormControl(null,Validators.required),
      posicion:new FormControl(null,Validators.required),
      diametro:new FormControl(null,Validators.required),
      rango:new FormControl(null,Validators.required),
      escala:new FormControl(null,Validators.required)    
    });


    this.ports = [
      { id: 1, name: 'Tokai' },
      { id: 2, name: 'Vladivostok' },
      { id: 3, name: 'Navlakhi' }
    ];
  }

  ngOnInit() {
    this.getConsecutivo();
    this.getClientes();
    this.getNormas();
   }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }

  save(){
    this.aux.createLoading().then((x:any)=>{     
      this.api.crearOrden(this.form.value).subscribe((resp:any)=>{      
        if(resp.ok){
          this.aux.dismissLoading().then((b:any)=>{           
            this.orden=resp.data;           
            this.router.navigate(['/ordenes/medidores'],{queryParams:{id:this.orden._id}});
          })
        }
      });

    }).catch((e:any)=>{
      this.aux.dismissLoading().then((b:any)=>{
        this.aux.createAlert("Error desconocido","Error por favor contacte con soporte");
      })

    })

  }

  getConsecutivo(){
    this.api.Consecutivo().subscribe((resp:any)=>{
      if(resp.ok){
        let consecutivo= resp.data[0].orden + 1;
        this.form.patchValue({orden:consecutivo});
      }
    });
  }

  getClientes(){
    this.api.GetClientes().subscribe((resp:any)=>{
        if(resp.ok){
          this.clientes=resp.clientes;         
        }
    })
  }

  getNormas(){
    this.api.getNormas().subscribe((resp:any)=>{
        if(resp.ok){
          this.normas=resp.data;            
        }
    })
  }

  setNorma(item){
    this.norma = this.normas.find(e=>e.norma==item); 
  }

  async addcliente(){      
      const modal = await this.modal.create({
        component: ModalclientesComponent
      });
      return await modal.present();    
  }

  




}
