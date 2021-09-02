import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { EventoService } from '@evento/shared/service/evento.service';
import { Evento } from '@evento/shared/model/evento';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActualizarEstadoEvento } from '@evento/shared/model/actualizarEstadoEvento';

@Component({
  selector: 'app-listar-evento',
  templateUrl: './listar-evento.component.html',
  styleUrls: ['./listar-evento.component.css']
})
export class ListarEventoComponent implements OnInit {
  public listaEventos: Observable<Evento[]>;

  constructor(protected eventoService: EventoService, private router: Router) { }

  actualizarEstado(evento: Evento) {

    let actualizarEstadoEvento = new ActualizarEstadoEvento(evento.id, evento.suspendido);

    this.eventoService.actualizarEstado(actualizarEstadoEvento).pipe(
      map(() => { this.listaEventos = this.eventoService.consultar(); }),
      catchError(() => {
        return null;
      }),
    ).subscribe();
  }

  ngOnInit() {
    this.listaEventos = this.eventoService.consultar();
  }

  irActualizar(evento: Evento) {
    this.router.navigateByUrl('/crear-modificar', { state: evento });
  }

}
