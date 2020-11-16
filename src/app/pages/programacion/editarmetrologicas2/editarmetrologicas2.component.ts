import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AuxService } from 'src/app/services/auxiliar.service';
import { ModalController } from '@ionic/angular';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-editarmetrologicas2',
  templateUrl: './editarmetrologicas2.component.html',
  styleUrls: ['./editarmetrologicas2.component.scss'],
})
export class Editarmetrologicas2Component implements OnInit {
  form:FormGroup;
  @Input() item: any = [];  
  uno: boolean;
  dos: boolean;
  tres: boolean;
  state:boolean=false;
  normas: any = [];
  norma:any = [];
  clase:Array<any>=[
    "A","B","C","D"
  ];
  ind: any = [
    "Analogico", "Digital", "Mixto"
  ];
  pos: any = [
    "Horizontal", "Vertical", "Cualquiera"
  ];
  rg: any = [
    {
      value:'999.0',titulo:'0 - 999'
    },
    {
      value:'9999.0',titulo:'0 - 9999'
    },
    {
      value:'99999.0',titulo:'0 - 99999'
    },
    {
      value:'999999.0',titulo:'0 - 999999'
    }  
  ];
  prf: any = [
    "Velocidad", "Volumetrico", "Electromagnetico"
  ];



  
  constructor(private api: ApiService, private aux: AuxService, public modalController: ModalController, private eventos: EventosService) {
    this.form= new FormGroup({     
      _id:new FormControl(null,Validators.required),
      norma:new FormControl(null,Validators.required),
      q3:new FormControl(null,Validators.required),
      precision:new FormControl(null),
      pmaxp:new FormControl(null),
      pperdida:new FormControl(null),
      q3q1:new FormControl(null),
      q2q1:new FormControl(1.6),
      clasetemp:new FormControl(null),
      aguasarriba:new FormControl(null),
      aguasabajo:new FormControl(null),
      tipo:new FormControl(null),
      principio:new FormControl(null),
      posicion:new FormControl(null),
      diametro:new FormControl(null),
      rango:new FormControl(null),
      escala:new FormControl(null),
      identificador:new FormControl(null),
      pnominal:new FormControl(null),
      clase:new FormControl(null),
      type:new FormControl(null,Validators.required)      
    });
   }

  ngOnInit() {
    this.getNormas();  
    this.form.patchValue({_id:this.item._id});   
    console.log(this.item);
  }

  getNormas() {
    this.api.getNormas().subscribe((resp: any) => {
      if (resp.ok) {
        this.normas = resp.data;
        this.setNorma(this.item.metrologicas.norma);      
      }
    })
  }

  

  setNorma(it) {  
    if(it=="NTC 4064-1 : 2016"){
      this.uno=true;
      this.dos=false;
      this.tres=false;    
 
      let q3q1= this.item.metrologicas.q3/this.item.metrologicas.q1;

      this.form.patchValue({type:1});
      this.form.patchValue({norma:this.item.metrologicas.norma});
      this.form.patchValue({q3:this.item.metrologicas.q3});
      this.form.patchValue({precision:this.item.metrologicas.precision});
      this.form.patchValue({pmaxp:this.item.metrologicas.pmaxp});
      this.form.patchValue({pperdida:this.item.metrologicas.pperdida});
      this.form.patchValue({q3q1:q3q1});     
      this.form.patchValue({clasetemp:this.item.metrologicas.clasetemp});
      this.form.patchValue({aguasarriba:this.item.metrologicas.aguasarriba});
      this.form.patchValue({aguasabajo:this.item.metrologicas.aguasabajo});
      this.form.patchValue({tipo:this.item.metrologicas.tipo});
      this.form.patchValue({principio:this.item.metrologicas.principio});
      this.form.patchValue({posicion:this.item.metrologicas.posicion});
      this.form.patchValue({diametro:this.item.metrologicas.diametro});
      this.form.patchValue({rango:this.item.metrologicas.rango});
      this.form.patchValue({escala:this.item.metrologicas.escala});
    }else if(it == "NTC 1063-1 : 2007"){
      this.uno=false;
      this.dos=true;
      this.tres=false;
  
      let q3q1= this.item.metrologicas.q3/this.item.metrologicas.q1;
      this.form.patchValue({type:2});
      this.form.patchValue({norma:this.item.metrologicas.norma});
      this.form.patchValue({q3:this.item.metrologicas.q3});
      this.form.patchValue({precision:this.item.metrologicas.precision});
      this.form.patchValue({pmaxp:this.item.metrologicas.pmaxp});
      this.form.patchValue({pperdida:this.item.metrologicas.pperdida});
      this.form.patchValue({q3q1:q3q1});    
      this.form.patchValue({clasetemp:this.item.metrologicas.clasetemp});
      this.form.patchValue({aguasarriba:this.item.metrologicas.aguasarriba});
      this.form.patchValue({aguasabajo:this.item.metrologicas.aguasabajo});
      this.form.patchValue({tipo:this.item.metrologicas.tipo});
      this.form.patchValue({principio:this.item.metrologicas.principio});
      this.form.patchValue({posicion:this.item.metrologicas.posicion});
      this.form.patchValue({diametro:this.item.metrologicas.diametro});
      this.form.patchValue({rango:this.item.metrologicas.rango});
      this.form.patchValue({escala:this.item.metrologicas.escala});



    }else if(it == "NTC 1063-1 : 1995"){

      this.uno=false;
      this.dos=false;
      this.tres=true;

      this.form.patchValue({type:3});   
      this.form.patchValue({norma:this.item.metrologicas.norma});
      this.form.patchValue({q3:this.item.metrologicas.q3});
      this.form.patchValue({precision:this.item.metrologicas.precision});
      this.form.patchValue({pmaxp:this.item.metrologicas.pmaxp});
      this.form.patchValue({pperdida:this.item.metrologicas.pperdida});     
      this.form.patchValue({clasetemp:this.item.metrologicas.clasetemp});
      this.form.patchValue({tipo:this.item.metrologicas.tipo});
      this.form.patchValue({principio:this.item.metrologicas.principio});
      this.form.patchValue({posicion:this.item.metrologicas.posicion});
      this.form.patchValue({diametro:this.item.metrologicas.diametro});
      this.form.patchValue({clase:this.item.metrologicas.clase});
      this.form.patchValue({escala:this.item.metrologicas.escala});  
      this.form.patchValue({pnominal:this.item.metrologicas.pnominal});  
      this.form.patchValue({identificador:this.item.metrologicas.identificador});  
      this.form.patchValue({rango:this.item.metrologicas.rango});  
    }

    this.norma = this.normas.find(e => e.norma == it);

    this.state=true;


  }


  crear() {
    this.aux.createLoading().then((x: any) => {
      this.api.updateMedidor2(this.form.value).subscribe((resp: any) => {
        if (resp.ok) {
          this.aux.dismissLoading().then((b: any) => {
            this.aux.createAlert("Exito", "El Medidor ha sido actualizado");
            this.modalController.dismiss();
            this.eventos.newUpdateAlert();           
          })
        }
      });

    }).catch((e: any) => {
      this.aux.dismissLoading().then((b: any) => {
        this.aux.createAlert("Error desconocido", "Error por favor contacte con soporte");
      })

    })
  }









}
