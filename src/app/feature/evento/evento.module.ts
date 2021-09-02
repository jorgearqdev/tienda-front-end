import { NgModule } from '@angular/core';

import { EventoRoutingModule } from './evento-routing.module';
import { ListarEventoComponent } from './components/listar-evento/listar-evento.component';
import { CrearEventoComponent } from './components/crear-evento/crear-evento.component';
import { EventoComponent } from './components/evento/evento.component';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { EventoService } from './shared/service/evento.service';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    CrearEventoComponent,
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