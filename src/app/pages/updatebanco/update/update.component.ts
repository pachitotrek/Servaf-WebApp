import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuxService } from 'src/app/services/auxiliar.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventosService } from 'src/app/services/eventos.service';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  form:FormGroup;
  @Input()item :any=[];

  constructor(private api: ApiService,private aux:AuxService,private eventos:EventosService,private modalController:ModalController) {
    this.form = new FormGroup({
      _id:new FormControl(null,Validators.required),
      numero:new FormControl(null,Validators.required),
      identificacion:new FormControl(null,Validators.required),
      tipo:new FormControl(null,Validators.required),
      automatico:new FormControl(null),
      lineas:new FormControl(null,Validators.required),
      medidores:new FormControl(null,Validators.required),
      descripcion:new FormControl(null,Validators.required),
      status:new FormControl(null,Validators.required)
    });
   }

  ngOnInit() {   
    this.set();
  }

  crear(){
    this.aux.createLoading().then((x:any)=>{     
      this.api.updateBanco(this.form.value).subscribe((resp:any)=>{    
        if(resp.ok){
          this.aux.dismissLoading().then((b:any)=>{
            this.aux.createAlert("Exito","El Banco de Ensayos ha sido actualizado");           
            this.form.reset();
            this.eventos.newUpdateAlert();
            this.modalController.dismiss();
          })
        }
      });

    }).catch((e:any)=>{
      this.aux.dismissLoading().then((b:any)=>{
        this.aux.createAlert("Error desconocido","Error por favor contacte con soporte");
      })

    })
  }

  set(){
    this.form.setValue(this.item)
  }

}
