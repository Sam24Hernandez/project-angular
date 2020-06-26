import { RouterModule, Routes } from '@angular/router';

// Componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AdminGuard, VerificaTokenGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { TaskComponent } from './dashboard/task/task.component';

const pagesRoutes: Routes = [
    
    { 
        path: 'dashboard',
        component: DashboardComponent, 
        canActivate: [ VerificaTokenGuard ],
        data: { titulo: 'Dashboard' } 
    },
    { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' } },
    { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas' } },
    { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema' } },
    { path: 'profile', component: ProfileComponent, data: { titulo: 'Mi Perfil' } },
    { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Búsqueda' } },
    // Mantenimientos
    {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [AdminGuard],
        data: { titulo: 'Mantenimiento de Usuarios' }
    },
    { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' } },
    { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Médicos' } },
    { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Médico' } },
    { path: 'trabajo/:id', component: TaskComponent, data: { titulo: 'Crear o Editar Trabajo' } },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }

];

export const PagesRoutingModule = RouterModule.forChild(pagesRoutes);