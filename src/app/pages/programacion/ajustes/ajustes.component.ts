import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AuxService } from 'src/app/services/auxiliar.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss'],
})
export class AjustesComponent implements OnInit {
  form: FormGroup;
  bancos: Array<any>=[];
  default: any=[];
  usuarios: Array<any>=[];
  medidores:Array<any>=[];

  constructor(private api:ApiService,private route:ActivatedRoute,private router:Router,private us:UserService,private ls:LocalStorageService,private aux:AuxService) {
   this.form= new FormGroup({
      orden:new FormControl(null,Validators.required),
      ordenante:new FormControl(null,Validators.required),
      encargado:new FormControl(null,Validators.required),
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
      incertidumbre_compre_agua:new FormControl(null,Validators.required),
      medidores:new FormControl(null,Validators.required)      
    })
  }

  ngOnInit() {
    this.run();
  }

  run(){
    this.getBancos();
    this.getDefault();
    this.getUsuarios();
    this.getConsecutivo();
    this.setMedidores();
  }

  getBancos(){
    this.api.getBancos().subscribe((resp:any)=>{
      if(resp.ok){
        this.bancos=resp.data;
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

  save() {
    this.aux.createLoading().then((x: any) => {
      this.api.crearOrdenTrabajo(this.form.value).subscribe((resp: any) => {
        if (resp.ok) {
          this.aux.dismissLoading().then((b: any) => {
            this.aux.createAlert("Exito", "La Orden ha sido agregada");  
            this.ls.eliminarStorage('medidores');          
            let id =resp.data._id;
            this.router.navigate([`/trabajo/instrumentos/${id}`]);
            // this.router.navigate(['/trabajo/instrumentos'],{queryParams:{id:resp.data_id}});
          });
        }
      });
    }).catch((e: any) => {
      this.aux.dismissLoading().then((b: any) => {
        this.aux.createAlert("Error desconocido", "Error por favor contacte con soporte");
      })

    })
  }

  
  getUsuarios(){
    this.us.GetUsers().subscribe((resp:any)=>{
      if(resp.ok){
        this.usuarios=resp.usuarios;         
      }
    });
  }


  setMedidores(){
    this.ls.cargarStorage('medidores').then((data:any)=>{
      this.form.patchValue({medidores:data});     
    });
  }

  getConsecutivo(){
    this.api.Consecutivo().subscribe((resp:any)=>{
      if(resp.ok){        
        let consecutivo= resp.numero;
        this.form.patchValue({orden:consecutivo});
      }
    });
  }




}
