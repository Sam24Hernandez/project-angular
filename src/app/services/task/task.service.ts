import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Task } from '../../models/task.model';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  totalTrabajos: number = 0;

  constructor(
    public _http: HttpClient,
    public _usuarioService: UsuarioService,
  ) { }

  cargarTareas() {
    let url = URL_SERVICIOS + '/task';
    return this._http.get(url)
      .pipe(
        map((resp: any) => {
          this.totalTrabajos = resp.total;
          return resp.tasks;
        })
      );

  }

  cargarTarea(id: string) {
    let url = URL_SERVICIOS + '/task/' + id;
    return this._http.get(url)
      .pipe(
        map((resp: any) => resp.task)
      );
  }

  borrarTrabajo(id: string) {
    let url = URL_SERVICIOS + '/task/' + id;
    url += '?token=' + this._usuarioService.token;

    return this._http.delete(url)
      .pipe(
        map(resp => {
          swal('Trabajo Borrado', 'El trabajo ha sido borrado correctamente', 'success');
          return resp;
        })
      );
  }

  guardarTarea(task: Task) {
    let url = URL_SERVICIOS + '/task';
    if (task._id) {
      // actualizando
      url += '/' + task._id;
      url += '?token=' + this._usuarioService.token;

      return this._http.put(url, task)
        .pipe(
          map((resp: any) => {
            swal('Trabajo Editado', 'El trabajo ha sido actualizado', 'success');
            return resp.task;
          })
        );

    } else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this._http.post(url, task)
        .pipe(
          map((resp: any) => {
            swal('Trabajo Creado', task.nombre, 'success');
            return resp.task;
          })
        );
    }
  }
}
