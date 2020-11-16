import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuxService } from 'src/app/services/auxiliar.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-historicalibracion',
  templateUrl: './historicalibracion.component.html',
  styleUrls: ['./historicalibracion.component.scss'],
})
export class HistoricalibracionComponent implements OnInit {
  @Input() id:string="";
  items: any=[];

  constructor(private api:ApiService,private aux:AuxService,private modalcontroller:ModalController) { }

  ngOnInit() {
    this.getCalibracion(this.id);
  }

  getCalibracion(id){
    this.api.getCalibraciones(id).subscribe((resp:any)=>{
      if(resp.ok){
        this.items=resp.data;        
      }
    })
  }


  delete(id){ 
    this.aux.createLoading().then((x:any)=>{     
      this.api.deletehistoricocalibracion(id).subscribe((resp:any)=>{      
        if(resp.ok){
          this.aux.dismissLoading().then((b:any)=>{           
            this.aux.createAlert("Exito","Ha eliminado un registro");
            this.getCalibracion(this.id)
            this.modalcontroller.dismiss();
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
