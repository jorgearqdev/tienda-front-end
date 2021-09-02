import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearModificarEventoComponent } from './components/crear-modificar-evento/crear-modificar-evento.component';
import { ListarEventoComponent } from './components/listar-evento/listar-evento.component';
import { EventoComponent } from './components/evento/evento.component';


const routes: Routes = [
  {
    path: '',
    component: EventoComponent,
    children: [
      {
        path: 'crear-modificar',
        component: CrearModificarEventoComponent
      },
      {
        path: 'listar',
        component: ListarEventoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventoRoutingModule { }
