import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { CrearEventoComponent } from './crear-evento.component';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EventoService } from '@producto/shared/service/evento.service';
import { CoreModule } from '@core/core.module';
declare var $: any;

describe('CrearEventoComponent', () => {
  let component: CrearEventoComponent;
  let fixture: ComponentFixture<CrearEventoComponent>;
  let eventoService: EventoService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearEventoComponent,  ],
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
    fixture = TestBed.createComponent(CrearEventoComponent);
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

    component.crear();

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

    component.crear();

    expect('dia test').toEqual(component.eventoForm.value.nombre);
  });
});
