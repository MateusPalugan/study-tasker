import { Component } from '@angular/core';
import * as M from 'materialize-css'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Por favor, selecione no canto superior esquerdo as opções e assim visualizar as telas ';
  desc ='Telas e Botões ilustrativos - ainda serão implementados as funcionalidades';
}

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});
