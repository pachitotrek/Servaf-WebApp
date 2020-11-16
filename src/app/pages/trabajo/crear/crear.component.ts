import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
// import { IonicSelectableComponent } from 'ionic-selectable';

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
  ports: Port[];
  port: Port;
  form:FormGroup;
  bancos:any=[];
  id: string;
  datos:any=[];
  q2q1:number=null;

  ind: any = [
    "Analogico","Digital","Mixto"
  ];
  pos:any=[
    "Horizontal","Vertical","Cualquiera"
  ];
  rg:any=[
    "0 - 999","0 - 9999","0 - 99999","0 - 999999"
  ];
  prf:any=[
    "Velocidad","Volumetrico","Electromagnetico"
  ]
  isItemAvailable: boolean = false;
  q3q1: number;
  default: any=[];
  usuarios: any=[];


  constructor(private api:ApiService,private route:ActivatedRoute,private router:Router,private us:UserService,private ls:LocalStorageService) {
    this.form= new FormGroup({
      orden:new FormControl(null,Validators.required),
      ordenante:new FormControl(null),
      encargado:new FormControl(null,Validators.required),
      entrada:new FormControl(null,Validators.required),
      fecha_programacion:new FormControl(null,Validators.required),
      hora_programacion:new FormControl(null,Validators.required),   
      ensayo:new FormControl(null,Validators.required),
      banco:new FormControl(null,Validators.required),
      duracion:new FormControl(null,Validators.required),
      repeticiones:new FormControl(null,Validators.required),
      coef_rvm:new FormControl(null,Validators.required),
      coef_agua:new FormControl(null,Validators.required),
      compre_agua:new FormControl(null,Validators.required),
      incertidumbre_rvm:new FormControl(null,Validators.required),
      incertidumbre_agua:new FormControl(null,Validators.required),
      incertidumbre_compre_agua:new FormControl(null,Validators.required)      
    });




    this.ports = [
      { id: 1, name: 'Tokai' },
      { id: 2, name: 'Vladivostok' },
      { id: 3, name: 'Navlakhi' }
    ];
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id"); 
    this.getBancos();
    this.getDatos(this.id);
    this.getDefault();
    this.getConsecutivo();
    this.getUsuarios();
    this.setUser();
   }


  getBancos(){
    this.api.getBancos().subscribe((resp:any)=>{
      if(resp.ok){
        this.bancos=resp.data;
      }
    });
  }

  getDatos(id){
    this.api.OpenOrden(id).subscribe((resp:any)=>{
      if(resp.ok){
        this.datos=resp.data[0];
        this.form.patchValue({entrada:this.datos._id});
        this.q2q1= this.datos.q2 / this.datos.q1 ;
        this.q3q1 = this.datos.q3/ this.datos.q1;
      }
    });
  }

  getConsecutivo(){
    this.api.Consecutivo().subscribe((resp:any)=>{
      if(resp.ok){
        let consecutivo= resp.data[0].orden + 1;
        this.form.patchValue({orden:consecutivo});
      }
    });
  }

  getDefault(){
    this.api.getDefaultParametros().subscribe((resp:any)=>{
      if(resp.ok){
        this.default=resp.data[0];        
        this.form.patchValue({repeticiones:this.default.repeticiones});
        this.form.patchValue({coef_rvm:this.default.coef_rvm});
        this.form.patchValue({coef_agua:this.default.coef_agua});
        this.form.patchValue({compre_agua:this.default.compre_agua});
        this.form.patchValue({incertidumbre_rvm:this.default.incertidumbre_rvm});
        this.form.patchValue({incertidumbre_agua:this.default.incertidumbre_agua});
        this.form.patchValue({incertidumbre_compre_agua:this.default.incertidumbre_compre_agua});     
      }
    })
  }

  getUsuarios(){
    this.us.GetUsers().subscribe((resp:any)=>{
      if(resp.ok){
        this.usuarios=resp.usuarios;
        console.log(this.usuarios);       
      }
    });
  }

  save(){
    this.api.crearOrdenTrabajo(this.form.value).subscribe((resp:any)=>{
      if(resp.ok){
        let id= resp.data._id;
        console.log(id);
        this.router.navigate([`/trabajo/instrumentos/${id}`]);
      }
    });
  }

  setUser(){
    this.ls.cargarStorage('usuario').then((data:any)=>{
      this.form.patchValue({ordenante:data._id});
    });
  }





  // portChange(event: {
  //   component: IonicSelectableComponent,
  //   value: any
  // }) {
  //   console.log('port:', event.value);
  // }


}
