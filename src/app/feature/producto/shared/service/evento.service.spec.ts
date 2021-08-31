import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EventoService } from './evento.service';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { Evento } from '../model/evento';
import { HttpResponse } from '@angular/common/http';
import { EventoReferenciaProducto } from '../model/eventoReferenciaProducto';

describe('EventoService', () => {
  let httpMock: HttpTestingController;
  let service: EventoService;
  const apiEndpointEvento = `${environment.endpoint}/evento`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventoService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(EventoService);
  });

  it('should be created', () => {
    const eventoService: EventoService = TestBed.inject(EventoService);
    expect(eventoService).toBeTruthy();
  });

  it('deberia listar eventos', () => {
    const dummyEvento = [
      new Evento(1, "Día x", "2021-08-21 14:45:31", "2021-08-23 14:45:31", "N", [new EventoReferenciaProducto(1, 1, "tv01", 10000, 9000)])
    ];
    service.consultar().subscribe(eventos => {
      expect(eventos.length).toBe(1);
      expect(eventos).toEqual(dummyEvento);
    });
    const req = httpMock.expectOne(apiEndpointEvento);
    expect(req.request.method).toBe('GET');
    req.flush(dummyEvento);
  });

  it('deberia crear un evento', () => {
    const dummyEvento =
      new Evento(null, "Día x", "2021-08-21 14:45:31", "2021-08-23 14:45:31", "N", [new EventoReferenciaProducto(null, null, "tv01", 10000, 9000)]);
    service.guardar(dummyEvento).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointEvento);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({ body: true }));
  });

  it('deberia suspender el estado de un evento', () => {
    const dummyEvento = {id: 1, suspendido: 'N'};
    service.toggleEstado(dummyEvento).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointEvento}/1`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });
});
