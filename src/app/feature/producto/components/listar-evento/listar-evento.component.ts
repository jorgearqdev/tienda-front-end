import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { EventoService } from '@producto/shared/service/evento.service';
import { Evento } from '@producto/shared/model/evento';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-evento',
  templateUrl: './listar-evento.component.html',
  styleUrls: ['./listar-evento.component.css']
})
export class ListarEventoComponent implements OnInit {
  public listaEventos: Observable<Evento[]>;

  constructor(protected eventoService: EventoService, private router: Router) { }

  toggleEstado(evento: Evento) {
    let toggle = {
      id: evento.id,
      suspendido: evento.suspendido
    }

    this.eventoService.toggleEstado(toggle).pipe(
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
    this.router.navigateByUrl('/crear', { state: evento });
  }

}
