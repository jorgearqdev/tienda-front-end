import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ListarEventoComponent } from './listar-evento.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from 'src/app/core/services/http.service';
import { Evento } from '@evento/shared/model/evento';
import { EventoReferenciaProducto } from '@evento/shared/model/EventoReferenciaProducto';
import { EventoService } from '@evento/shared/service/evento.service';

describe('ListarEventoComponent', () => {
  let component: ListarEventoComponent;
  let fixture: ComponentFixture<ListarEventoComponent>;
  let eventoService: EventoService;
  const listaEventos = [
    new Evento(1, "Día x", "2021-08-21 14:45:31", "2021-08-23 14:45:31", "N", [new EventoReferenciaProducto(1, 1, "tv01", 10000, 9000)])
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListarEventoComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [EventoService, HttpService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarEventoComponent);
    component = fixture.componentInstance;
    eventoService = TestBed.inject(EventoService);
    spyOn(eventoService, 'consultar').and.returnValue(
      of(listaEventos)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.listaEventos.subscribe(resultado => {
      expect(1).toBe(resultado.length);
    });
  });

});
