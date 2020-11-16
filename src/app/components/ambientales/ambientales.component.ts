import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-ambientales',
  templateUrl: './ambientales.component.html',
  styleUrls: ['./ambientales.component.scss'],
})
export class AmbientalesComponent implements OnInit {
  form:FormGroup;
  @Input() id:any;
  @Input() datos:any=[];

  constructor(private api:ApiService,public modalController: ModalController,private eventos:EventosService) {
    this.form= new FormGroup({
      _id:new FormControl(null,Validators.required),
      humedad:new FormControl(null,Validators.required),
      temp_ambiente:new FormControl(null,Validators.required)
    })
   }

  ngOnInit() {
    this.set();
  }

  set(){
    this.form.setValue(this.datos);
  }


  update(){
    let a ={
      datos:this.form.value,
      id:this.id
    }

    this.api.updateAmbientales(a).subscribe((resp:any)=>{
      if(resp.ok){
        this.eventos.newUpdateAlert();
        this.modalController.dismiss();
      }
    })
  }

}
