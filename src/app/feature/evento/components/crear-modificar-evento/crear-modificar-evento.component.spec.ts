import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { CrearModificarEventoComponent } from './crear-modificar-evento.component';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EventoService } from '@evento/shared/service/evento.service';
import { CoreModule } from '@core/core.module';
import { EventoReferenciaProducto } from '@evento/shared/model/EventoReferenciaProducto';
import { Evento } from '@evento/shared/model/evento';
declare var $: any;

describe('CrearEventoComponent', () => {
  let component: CrearModificarEventoComponent;
  let fixture: ComponentFixture<CrearModificarEventoComponent>;
  let eventoService: EventoService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CrearModificarEventoComponent,],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        CoreModule
      ],
      providers: [EventoService, HttpService, DatePipe],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearModificarEventoComponent);
    component = fixture.componentInstance;
    eventoService = TestBed.inject(EventoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.eventoForm.valid).toBeFalsy();
  });

  it('Registrando evento', () => {
    spyOn(eventoService, 'guardar').and.returnValue(
      of(true)
    );
    expect(component.eventoForm.valid).toBeFalsy();
    component.eventoForm.controls.nombre.setValue('dia test');
    component.eventoForm.controls.fechaInicio.setValue(new Date());
    component.eventoForm.controls.fechaFin.setValue(new Date());
    expect(component.eventoForm.valid).toBeTruthy();

    expect(component.referenciaForm.valid).toBeFalsy();
    component.referenciaForm.controls.referencia.setValue('tv-test');
    component.referenciaForm.controls.precioAntiguo.setValue(10000);
    component.referenciaForm.controls.precioNuevo.setValue(9000);
    expect(component.referenciaForm.valid).toBeTruthy();

    component.listadoReferencias.push(component.referenciaForm.value);

    component.guardar();

    expect(null).toEqual(component.eventoForm.value.nombre);
  });

  it('Registrando evento ya creado', () => {
    spyOn(eventoService, 'guardar').and.returnValue(
      throwError(
        new HttpErrorResponse({
          error: {
            message: 'Ya existen eventos dentro de las fechas seleccionadas',
            localizedKey: 'Error'
          },
          status: 400
        })
      )
    );

    expect(component.eventoForm.valid).toBeFalsy();
    component.eventoForm.controls.nombre.setValue('dia test');
    component.eventoForm.controls.fechaInicio.setValue(new Date());
    component.eventoForm.controls.fechaFin.setValue(new Date());
    expect(component.eventoForm.valid).toBeTruthy();

    expect(component.referenciaForm.valid).toBeFalsy();
    component.referenciaForm.controls.referencia.setValue('tv-test');
    component.referenciaForm.controls.precioAntiguo.setValue(10000);
    component.referenciaForm.controls.precioNuevo.setValue(9000);
    expect(component.referenciaForm.valid).toBeTruthy();

    component.listadoReferencias.push(component.referenciaForm.value);

    component.guardar();

    expect('dia test').toEqual(component.eventoForm.value.nombre);
  });

  it('Actualizando evento', () => {
    spyOn(eventoService, 'actualizar').and.returnValue(
      of(true)
    );

    const evento = new Evento(1, "Día x", "2021-08-21 14:45:31", "2021-08-23 14:45:31", "N", [new EventoReferenciaProducto(1, 1, "tv01", 10000, 9000)]);

    component.evento = evento;

    component.listadoReferencias = component.evento.eventoReferenciaProductos;
    component.llenarCampoActualizar();

    expect(component.eventoForm.valid).toBeTruthy();

    component.guardar();

    expect(null).toEqual(component.eventoForm.value.nombre);
  });
});
