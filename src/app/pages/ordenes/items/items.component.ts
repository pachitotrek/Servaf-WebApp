import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalmedidorComponent } from 'src/app/components/modalmedidor/modalmedidor.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventosService } from 'src/app/services/eventos.service';
import { Subscription } from 'rxjs';
import { AuxService } from 'src/app/services/auxiliar.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  id:string="";
  medidores:any=[];
  medidor$:Subscription;

  constructor(public modalController: ModalController,private route:ActivatedRoute,private api:ApiService,private eventos:EventosService,private aux:AuxService,private router:Router) { 
    this.medidor$= eventos.getNewMedidor().subscribe((x:any)=>{
      // this.getMedidores(this.id);
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.queryParamMap.get("id");
    // this.getMedidores(this.id);
  }

  async add() {
    const modal = await this.modalController.create({
      component: ModalmedidorComponent,
      componentProps:{
        "id":this.id
      }
    });
    return await modal.present();
  }


  // getMedidores(id){
  //   this.api.getMedidoresOrden(id).subscribe((resp:any)=>{
  //     if(resp.ok){
  //       this.medidores=resp.data;
  //       console.log(this.medidores);
  //     }
  //   })
  // }

  // delete(item){
  //   this.aux.createLoading().then((x:any)=>{     
  //     this.api.DeleteMedidoresOrden(item).subscribe((resp:any)=>{      
  //       if(resp.ok){
  //         this.aux.dismissLoading().then((b:any)=>{           
  //           this.aux.createAlert("Exito","Medidor Eliminado");
  //           this.getMedidores(this.id);           
  //         })
  //       }
  //     });

  //   }).catch((e:any)=>{
  //     this.aux.dismissLoading().then((b:any)=>{
  //       this.aux.createAlert("Error desconocido","Error por favor contacte con soporte");
  //     })

  //   })
  // }

  continue(){
    this.router.navigate(['/ordenes/review'],{queryParams:{id:this.id}});
  }


}
