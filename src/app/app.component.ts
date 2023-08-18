import { Component } from '@angular/core';
import * as M from 'materialize-css'
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Por favor, navegue utilizando o menu no canto superior esquerdo';
  desc ='Cadastro, Consulta e Delete funcionando através de array';

  showWelcomeModal = true;

  closeWelcomeModal() {
    this.showWelcomeModal = false;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});
