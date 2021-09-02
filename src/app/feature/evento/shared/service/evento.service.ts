import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { ActualizarEstadoEvento } from '../model/actualizarEstadoEvento';
import { Evento } from '../model/evento';


@Injectable()
export class EventoService {

  constructor(protected http: HttpService) { }

  public consultar() {
    return this.http.doGet<Evento[]>(`${environment.endpoint}/evento`, this.http.optsName('consultar evento'));
  }

  public guardar(evento: Evento) {
    return this.http.doPost<Evento, boolean>(`${environment.endpoint}/evento`, evento,
      this.http.optsName('crear evento'));
  }

  public actualizar(evento: Evento) {
    return this.http.doPut<Evento, boolean>(`${environment.endpoint}/evento/${evento.id}`, evento,
      this.http.optsName('actualizar evento'));
  }

  public actualizarEstado(evento: ActualizarEstadoEvento) {
    return this.http.doDelete<boolean>(`${environment.endpoint}/evento/${evento.id}`,
      this.http.optsNameAndBody('toggle estado del evento', evento));
  }
}
