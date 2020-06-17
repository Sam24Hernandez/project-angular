import { NgModule } from '@angular/core';

// Rutas
import { PagesRoutingModule } from './pages.routes';

// Módulo
import { SharedModule } from '../shared/shared.module';

// Componentes
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        SharedModule,
        PagesRoutingModule
    ]
  })
  export class PagesModule { }