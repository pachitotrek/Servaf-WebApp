import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.page.html',
  styleUrls: ['./manual.page.scss'],
})
export class ManualPage implements OnInit {
  items: any=[];

  constructor(private api:ApiService) { }

  ngOnInit() {
    this.get();
  }

  get(){
    this.api.GetTutoriales().subscribe((resp:any)=>{
      if(resp.ok){
        this.items= resp.data;
      }
    })
  }



}
