import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { Hospital } from 'src/app/models/hospital.model';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notification
        .subscribe(() => this.cargarHospitales());
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales()
      .subscribe(hospitales => this.hospitales = hospitales);
  }

  guardarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital)
      .subscribe();
  }

  actualizarImagen(hospital: Hospital){
    this._modalUploadService.mostrarModal('hospitales', hospital._id);
  }

  borrarHospital(hospital: Hospital) {


    swal({
      title: '¿Está seguro de querer borrar este hospital?',
      text: 'Estás a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((borrar) => {
        if (borrar) {
          this._hospitalService.borrarHospital(hospital._id)
            .subscribe(borrado => {
              this.cargarHospitales();
            });


        }
      })
  }

  buscarHospital(termino: string) {

    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this._hospitalService.buscarHospital(termino)
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      });
  }

  crearHospital(){
    swal({
      title: 'Crear Hospital',
      text: '¿Cómo se llama el Hospital?',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true,
    })
    .then((valor: string) => {
      if (!valor || valor.length === 0) {
        return;
      }
      this._hospitalService.crearHospital(valor)
          .subscribe( () => this.cargarHospitales());
    });
  }

}
