import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { EventosService } from 'src/app/services/eventos.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styleUrls: ['./propiedades.component.scss'],
})
export class PropiedadesComponent implements OnInit {
  form:FormGroup;
  @Input() id:any;
  @Input() datos:any=[];
  @Input() tipo:any;


  constructor(private api:ApiService,private eventos:EventosService,public modalController: ModalController) {
    this.form= new FormGroup({
      _id:new FormControl(null,Validators.required),
      caudal:new FormControl(null,Validators.required),
      pentrada:new FormControl(null,Validators.required),
      psalida:new FormControl(null,Validators.required),
      tempagua:new FormControl(null,Validators.required),
      temprvm:new FormControl(null,Validators.required),
      volumenrvm:new FormControl(null,Validators.required),
      time:new FormControl(null,Validators.required),
      inicial:new FormControl(null,Validators.required),
      final:new FormControl(null,Validators.required),
      repeticion:new FormControl(null,Validators.required)
    });
   }


   ngOnInit() {
    this.set();
    console.log(this.id);
  }


  set(){
    this.form.setValue(this.datos);
  }

  update(){
    let a ={
      datos:this.form.value,
      id:this.id,
      tipo:this.tipo
    }

    this.api.updatePropiedadesPruebas(a).subscribe((resp:any)=>{
      if(resp.ok){
        this.eventos.newUpdateAlert();
        this.modalController.dismiss();
      }
    })
  }

  delete(){
    let a ={
      tipo:this.tipo,
      repeticion:this.form.value._id,
      medidor:this.id
    }

    this.api.deletecalibracionresultado(a).subscribe((resp:any)=>{
      if(resp.ok){
        this.eventos.newUpdateAlert();
        this.modalController.dismiss();
      }
    })
  }

}
