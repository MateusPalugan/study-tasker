import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  task = {
    titulo: '',
    descricao: '',
    prioridade: '',
    dataEntrega: '',
    categoria: ''
  };

  constructor(private router: Router) {}

  limparCampos() {
    this.task = {
      titulo: '',
      descricao: '',
      prioridade: '',
      dataEntrega: '',
      categoria: ''
    };
  }

  cadastrarTarefa() {
    // será implementado
    console.log('Tarefa cadastrada:', this.task);
    // Redirecionar para outra página após o cadastro
    this.router.navigate(['/']);
  }
}