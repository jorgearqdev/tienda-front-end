import { Component, OnInit } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';


@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})


export class EventoComponent implements OnInit {

  constructor() {

  }

  public actions: MenuItem[] = [
    { url: './listar', nombre: 'Listar eventos' },
    { url: './crear-modificar', nombre: 'Crear evento' }
  ];


  ngOnInit() {
  }

}
