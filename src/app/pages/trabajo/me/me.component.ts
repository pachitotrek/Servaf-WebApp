import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss'],
})
export class MeComponent implements OnInit {
  @Input() id: any = "";
  @Input() orden: string = "";
  @Input() data: any = [];
  inicial: number = null;
  final: number = null;
  state: boolean = true;
  item: Array<any> = [];
  status:boolean=true;
  

  constructor(private api: ApiService, private lc: LocalStorageService) { }

  ngOnInit() {
    console.log(this.data);
    this.getTrabajo(this.id);
  }

  set() {
    let a = {
      tipo: this.data.tipo,
      orden: this.data.orden,
      repeticion: this.data.repeticion,     
      caudal: this.data.caudal,
      pentrada: this.data.pentrada,
      psalida: this.data.psalida,
      tempagua: this.data.tempagua,
      temprvm: this.data.temprvm,
      volumenrvm: this.data.volumenrvm,
      horas: this.data.horas,
      minutos: this.data.minutos,
      segundos: this.data.segundos,
      inicial:this.inicial,
      final:this.final,
      medidor:this.id
    };

    this.api.set(a).subscribe((resp:any)=>{
      if(resp.ok){
        this.state=false;
      }
    }) 
  }

  edit(){
    this.inicial=null;
    this.final=null;   
    let a={
      tipo: this.data.tipo,
      orden: this.data.orden,
      repeticion: this.data.repeticion,     
      caudal: this.data.caudal,
      pentrada: this.data.pentrada,
      psalida: this.data.psalida,
      tempagua: this.data.tempagua,
      temprvm: this.data.temprvm,
      volumenrvm: this.data.volumenrvm,
      horas: this.data.horas,
      minutos: this.data.minutos,
      segundos: this.data.segundos,
      inicial:this.inicial,
      final:this.final,
      medidor:this.id
    }
    this.api.setedit(a).subscribe((resp:any)=>{
      if(resp.ok){
        
        this.state=true;
      }
    })
  }


  getTrabajo(id) {
    this.api.getMedidor(id).subscribe((resp: any) => {
      console.log(resp);
      if (resp.ok) {
        let s= resp.data;
        if(s.length==0){
          this.status=false;
          
        }else{
          this.item=resp.data[0].datos;
        }      
      }
    });
  }





}
