import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-finales',
  templateUrl: './finales.component.html',
  styleUrls: ['./finales.component.scss'],
})
export class FinalesComponent implements OnInit {
  form: FormGroup;
  id: string;
  tipo: string;
  repeticion: any;
  rp: any;
  datos: any;

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) {
    this.form = new FormGroup({
      medidores: new FormControl(null, Validators.required),
      orden: new FormControl(null, Validators.required),
      temp: new FormControl(null, Validators.required),
      humedad: new FormControl(null, Validators.required),
      prueba:new FormControl(null,Validators.required)   
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.tipo = this.route.snapshot.queryParamMap.get("tipo");
    this.repeticion = this.route.snapshot.queryParamMap.get("numero");
    this.repeticion = parseInt(this.repeticion);
    this.rp = this.repeticion;
    this.getTrabajo(this.id);
  }

  getTrabajo(id) {
    this.api.getOrdenTrabajo(id).subscribe((resp: any) => {
      if (resp.ok) {
        this.datos = resp.data[0];
        this.form.patchValue({ medidores: this.datos.medidores });
        this.form.patchValue({ orden: this.id });
        this.form.patchValue({prueba:this.tipo})   
      }
    });
  }

  save() {
    this.api.updateTest(this.id, this.tipo).subscribe((resp: any) => {
      if (resp.ok) {
        this.api.condiciones(this.form.value).subscribe((resp: any) => {
          if (resp.ok) {
            this.router.navigate([`/trabajo/pruebas/${this.id}`]);
          }
        });
      }
    })
  }






}
