import { Component}from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import * as M from 'materialize-css';

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

  constructor(private taskService: TaskService) {}

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
    const newTask = {
      titulo: this.task.titulo,
      descricao: this.task.descricao,
      prioridade: this.task.prioridade,
      dataEntrega: this.task.dataEntrega,
      categoria: this.task.categoria
    };

    this.taskService.addTask(newTask);

    M.toast({ html: 'Tarefa cadastrada com sucesso! Verifique na tela de listagem.', classes: 'green lighten-2 white-text' });

    this.limparCampos();
  }
  
 

}