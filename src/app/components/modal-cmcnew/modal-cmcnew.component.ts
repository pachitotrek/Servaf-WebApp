import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AuxService } from 'src/app/services/auxiliar.service';
import { ModalController } from '@ionic/angular';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-modal-cmcnew',
  templateUrl: './modal-cmcnew.component.html',
  styleUrls: ['./modal-cmcnew.component.scss'],
})
export class ModalCMCNewComponent implements OnInit {
  form:FormGroup;
  items: any;
  
  constructor(private api:ApiService,private aux:AuxService,private modal:ModalController,private eventos:EventosService) { 
    this.form= new FormGroup({
      error:new FormControl(null,Validators.required),
      instrumento:new FormControl(null,Validators.required)
    })
  }

  ngOnInit() {
    this.get();
  }

  get(){
    this.api.getvolumen().subscribe((resp:any)=>{
      if(resp.ok){
        this.items=resp.data;        
      }
    })
  }

  crear(){
    this.aux.createLoading().then((x:any)=>{     
      this.api.crearcmc(this.form.value).subscribe((resp:any)=>{      
        if(resp.ok){
          this.aux.dismissLoading().then((b:any)=>{           
            this.aux.createAlert("Exito","Se ha creado el CMC");
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
