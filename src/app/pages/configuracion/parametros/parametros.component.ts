import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuxService } from 'src/app/services/auxiliar.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.scss'],
})
export class ParametrosComponent implements OnInit {
  form:FormGroup;
  default: any;
  parametros: any;
  
  constructor(
    private api:ApiService,
    private aux:AuxService
  ) {
    this.form= new FormGroup({
      _id:new FormControl(null),
      repeticiones:new FormControl(null),
      coef_rvm:new FormControl(null),
      coef_agua:new FormControl(null),
      compre_agua:new FormControl(null),
      incertidumbre_rvm:new FormControl(null),
      incertidumbre_agua:new FormControl(null),
      incertidumbre_compre_agua:new FormControl(null),
      codigos:new FormControl(null),
      excel:new FormControl(null),
      registro:new FormControl(null),
    })
   }  

  ngOnInit() {
    this.getDefault();
  }


  getDefault(){
    this.api.getDefaultParametros().subscribe((resp:any)=>{
      if(resp.ok){
        this.default=resp.data[0];
        this.form.patchValue({_id:this.default._id});
        this.form.patchValue({repeticiones:this.default.repeticiones});
        this.form.patchValue({coef_rvm:this.default.coef_rvm});
        this.form.patchValue({coef_agua:this.default.coef_agua});
        this.form.patchValue({compre_agua:this.default.compre_agua});
        this.form.patchValue({incertidumbre_rvm:this.default.incertidumbre_rvm});
        this.form.patchValue({incertidumbre_agua:this.default.incertidumbre_agua});
        this.form.patchValue({incertidumbre_compre_agua:this.default.incertidumbre_compre_agua});
        this.form.patchValue({codigos:this.default.codigos});
        this.form.patchValue({excel:this.default.excel});
        this.form.patchValue({registro:this.default.registro});   
      }
    })
  }

  update(){  
    this.aux.createLoading().then((x:any)=>{     
      this.api.updateDefaultParametros(this.form.value).subscribe((resp:any)=>{      
        if(resp.ok){
          this.aux.dismissLoading().then((b:any)=>{
            this.aux.createAlert("Exito","Ha sido editado sus parametros definidos");
            this.getDefault();
          })
        }
      });

    }).catch((e:any)=>{
      this.aux.dismissLoading().then((b:any)=>{
        this.aux.createAlert("Error desconocido","Error por favor contacte con soporte");
      })

    })
  }




}
