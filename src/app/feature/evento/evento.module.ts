import { NgModule } from '@angular/core';

import { EventoRoutingModule } from './evento-routing.module';
import { ListarEventoComponent } from './components/listar-evento/listar-evento.component';
import { CrearModificarEventoComponent } from './components/crear-modificar-evento/crear-modificar-evento.component';
import { EventoComponent } from './components/evento/evento.component';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { EventoService } from './shared/service/evento.service';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    CrearModificarEventoComponent,
    ListarEventoComponent,
    EventoComponent
  ],
  imports: [
    EventoRoutingModule,
    SharedModule,
    CoreModule
  ],
  providers: [EventoService, DatePipe, History]
})
export class EventoModule { }
