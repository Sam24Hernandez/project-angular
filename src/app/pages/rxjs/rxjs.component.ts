import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() { 

    this.regresaObservable().pipe(
      retry(2)      
    )
    
    .subscribe(
      numero => console.log('Subs', numero),
      error => console.log('Error en el obs', error),
      () => console.log('El observador termino!')
      
    );

  }

  ngOnInit() {
  }

  regresaObservable():Observable<any>{
    const obs = new Observable((subscribe: Subscriber<any>)=> {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador ++;

        subscribe.next(contador);

        if(contador === 3){
          clearInterval(intervalo);
          subscribe.complete();
        }
        if(contador === 2){
          //clearInterval(intervalo);
          subscribe.error('Auxilio!');
        }
      },1000);
    });
    return obs;
  }

}
