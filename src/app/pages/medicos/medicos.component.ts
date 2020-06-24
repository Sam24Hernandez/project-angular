import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];

  constructor(
    public _medicoService: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos(){
    this._medicoService.cargarMedicos()
            .subscribe(medicos => this.medicos = medicos);
  }

  buscarMedico(termino:string){
    if(termino.length <= 0){
      this.cargarMedicos();
      return;
    }
    this._medicoService.buscarMedicos(termino)
          .subscribe(medicos => this.medicos = medicos);
  }

  borrarMedico(medico: Medico){
    swal({
      title: '¿Está seguro de querer borrar a este médico?',
      text: 'Estás a punto de borrar a ' + medico.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((borrar) => {
        if (borrar) {
          this._medicoService.borrarMedico(medico._id)
            .subscribe( () => this.cargarMedicos());
        }
      })
    }

}
