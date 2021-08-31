import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearEventoComponent } from './components/crear-evento/crear-evento.component';
import { ListarEventoComponent } from './components/listar-evento/listar-evento.component';
import { EventoComponent } from './components/evento/evento.component';


const routes: Routes = [
  {
    path: '',
    component: EventoComponent,
    children: [
      {
        path: 'crear',
        component: CrearEventoComponent
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
export class ProductoRoutingModule { }
