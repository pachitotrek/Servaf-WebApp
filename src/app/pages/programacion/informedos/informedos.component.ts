import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-informedos',
  templateUrl: './informedos.component.html',
  styleUrls: ['./informedos.component.scss'],
})
export class InformedosComponent implements OnInit {
  @ViewChild('print',{static:false}) doc: ElementRef;
  id: string;
  item: any;
  ready:boolean=false;
  imagenes:any=[]; 
  element: HTMLElement;

  constructor(private route:ActivatedRoute,private api:ApiService) {
  
   }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.get(this.id)
  }


  get(id){
    this.api.getMedidor3(id).subscribe(async (resp:any)=>{
      if(resp.ok){
        this.item= await resp.data[0];
        this.imagenes=await this.item.imagenes
        this.ready=true;

        setTimeout(() => {
            this.print();
        }, 1000);
      
      }
    })
  }

  print(){
    window.print();
  }





}
