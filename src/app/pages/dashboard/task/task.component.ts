import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styles: []
})
export class TaskComponent implements OnInit {

  task: Task = new Task('', '', '', '');

  constructor(
    public _taskService: TaskService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe( params => {

      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarTarea( id );
      }

    });
  }

  ngOnInit() {
  }

  cargarTarea( id: string ) {
    this._taskService.cargarTarea( id )
          .subscribe( task => {
            this.task = task;
          });
  }

  guardarTarea( f: NgForm ) {

    //console.log( f.valid );
    //console.log( f.value );

    if ( f.invalid ) {
      return;
    }

    this._taskService.guardarTarea( this.task )
            .subscribe( task => {

              this.task._id = task._id;

              this.router.navigate(['/dashboard']);

            });

  }  
}
