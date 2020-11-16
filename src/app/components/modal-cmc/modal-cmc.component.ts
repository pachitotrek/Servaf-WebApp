import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AuxService } from 'src/app/services/auxiliar.service';
import { ModalController } from '@ionic/angular';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-modal-cmc',
  templateUrl: './modal-cmc.component.html',
  styleUrls: ['./modal-cmc.component.scss'],
})
export class ModalCMCComponent implements OnInit {
  form:FormGroup;
  @Input() item:any=[];

  
  constructor(private api:ApiService,private aux:AuxService,private modal:ModalController,private eventos:EventosService) { 
    this.form= new FormGroup({
      error:new FormControl(null,Validators.required),
      instrumento:new FormControl(null,Validators.required),
      _id:new FormControl(null,Validators.required)
    })
  }

  ngOnInit() {

    this.form.patchValue(this.item);

 
  }

  crear(){
    this.aux.createLoading().then((x:any)=>{     
      this.api.updatecmc(this.form.value).subscribe((resp:any)=>{      
        if(resp.ok){
          this.aux.dismissLoading().then((b:any)=>{           
            this.aux.createAlert("Exito","Se ha actualizado el CMC");
            this.eventos.newModeloAlert();            
            this.modal.dismiss();
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
