import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import swal from 'sweetalert';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService
  ) {}

  canActivate(){
    if(this._usuarioService.usuario.role === 'ROLE_ADMIN'){
      return true;
    }else{
      swal("Bloqueado", "¡No puedes acceder a esta ruta!", "warning");
      this._usuarioService.logout();
      return false;
    }
  }
  
}
