import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Evento } from '@producto/shared/model/evento.js';
import { EventoReferenciaProducto } from '@producto/shared/model/eventoReferenciaProducto';
import { EventoService } from '@producto/shared/service/evento.service';
import { catchError, map } from 'rxjs/operators';
import $ from '../../../../../assets/js/jquery-3.6.0.js'
declare var $: any;

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 3;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 120;
const LONGITUD_MAXIMA_PERMITIDA_NUMERICO = 2147483647;
const LONGITUD_MINIMA_PERMITIDA_NUMERICO = 1;

const ADVERTENCIA_PRECIO_NUEVO_MAYOR = "El precio nuevo no puede ser mayor o igual al antiguo precio"
const ADVERTENCIA_REFERENCIA_EXISTENTE = "La referencia ya está en la lista"

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css']
})
export class CrearEventoComponent implements OnInit {
  eventoForm: FormGroup;
  referenciaForm: FormGroup;

  evento: Evento;

  constructor(protected eventoService: EventoService, public datepipe: DatePipe) { }

  public listadoReferencias: EventoReferenciaProducto[];

  ngOnInit() {
    debugger;
    this.listadoReferencias = [];
    this.construirFormularioEvento();
    this.construirFormularioReferencia();
    
    this.evento = window.history.state;

    if (this.evento && this.evento.id) {
      this.listadoReferencias = this.evento.eventoReferenciaProductos;
      this.llenarCampoActualizar();
    }

  }

  llenarCampoActualizar() {
    this.eventoForm.controls.nombre.setValue(this.evento.nombre);
    this.eventoForm.controls.fechaInicio.setValue(this.datepipe.transform(this.evento.fechaInicio, 'yyyy-MM-ddThh:mm'));
    this.eventoForm.controls.fechaFin.setValue(this.datepipe.transform(this.evento.fechaFin, 'yyyy-MM-ddThh:mm'));
  }

  guardar() {
    let eventoFormVal: Evento = this.eventoForm.value;
    eventoFormVal.eventoReferenciaProductos = this.listadoReferencias;
    eventoFormVal.fechaInicio = this.datepipe.transform(eventoFormVal.fechaInicio, 'yyyy-MM-dd hh:mm:ss');
    eventoFormVal.fechaFin = this.datepipe.transform(eventoFormVal.fechaFin, 'yyyy-MM-dd hh:mm:ss');
    let request;

    if (this.evento && this.evento.id) {
      eventoFormVal.id = this.evento.id;
      request = this.eventoService.actualizar(eventoFormVal);
    } else {
      request = this.eventoService.guardar(eventoFormVal);
    }    

    request.pipe(
      map(() => {
        this.listadoReferencias = [];
        this.eventoForm.reset();
        this.evento = null;
      }),
      catchError((e: any) => {
        $("#advertencia").text(e.error.mensaje);
        $('#liveToast').toast('show');
        return null;
      }),
    ).subscribe();
  }

  agregarReferencia() {
    if (this.validateFormReferencia() || !this.referenciaForm.valid) {
      this.listadoReferencias.push(this.referenciaForm.value);
      $("#exampleModal").modal("hide");
      this.referenciaForm.reset();
    }
  }

  validateFormReferencia(): boolean {

    let advertencia: string;

    let formulario = this.referenciaForm.value;

    if (this.listadoReferencias.some(refrencia => refrencia.referencia === formulario.referencia)) {
      advertencia = ADVERTENCIA_REFERENCIA_EXISTENTE;
    }

    if (formulario.precioAntiguo <= formulario.precioNuevo) {
      advertencia = ADVERTENCIA_PRECIO_NUEVO_MAYOR;
    }

    if (advertencia) {
      $("#advertencia").text(advertencia);
      $('#liveToast').toast('show');
      return false;
    }
    return true;
  }

  private construirFormularioEvento() {
    this.eventoForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
      Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]),
      fechaInicio: new FormControl('', [Validators.required]),
      fechaFin: new FormControl('', [Validators.required])
    });
  }

  private construirFormularioReferencia() {
    this.referenciaForm = new FormGroup({
      referencia: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
      Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]),
      precioAntiguo: new FormControl('', [Validators.required, Validators.min(LONGITUD_MINIMA_PERMITIDA_NUMERICO), Validators.max(LONGITUD_MAXIMA_PERMITIDA_NUMERICO)]),
      precioNuevo: new FormControl('', [Validators.required, Validators.min(LONGITUD_MINIMA_PERMITIDA_NUMERICO), Validators.max(LONGITUD_MAXIMA_PERMITIDA_NUMERICO)])
    });
  }

}
