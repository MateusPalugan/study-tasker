import { Component, OnInit  } from '@angular/core';
import { TaskService } from '../task.service';
import * as M from 'materialize-css';
import { Task } from '../task.model'; 

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  ngOnInit() {
    this.taskService.loadTasksFromLocalStorage(); 
  }

  task: Task = {
    titulo: '',
    descricao: '',
    prioridade: '',
    dataEntrega: '',
    categoria: ''
  };

  errors: Record<string, string> = {};

  constructor(private taskService: TaskService) {}

  limparCampos() {
    this.task = {
      titulo: '',
      descricao: '',
      prioridade: '',
      dataEntrega: '',
      categoria: ''
    };
    this.errors = {};
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

  validateTitulo() {
    if (!this.task.titulo) {
      this.errors['titulo'] = 'Título é obrigatório';
    } else {
      this.errors['titulo'] = '';
    }
  }

  validateDescricao() {
    if (!this.task.descricao) {
      this.errors['descricao'] = 'Descrição é obrigatória';
    } else {
      this.errors['descricao'] = '';
    }
  }

  validatePrioridade() {
    if (!this.task.prioridade.match(/^[A-Za-z\s]+$/)) {
      this.errors['prioridade'] = 'Prioridade deve conter apenas letras e espaços';
    } else {
      this.errors['prioridade'] = '';
    }
  }

  validateDataEntrega() {
    if (!this.task.dataEntrega.match(/^\d{4}-\d{2}-\d{2}$/)) {
      this.errors['dataEntrega'] = 'Data de Entrega deve estar no formato yyyy-mm-dd';
    } else {
      this.errors['dataEntrega'] = '';
    }
  }

  validateCategoria() {
    if (!this.task.categoria.match(/^[A-Za-z\s]+$/)) {
      this.errors['categoria'] = 'Categoria deve conter apenas letras e espaços';
    } else {
      this.errors['categoria'] = '';
    }
  }

  hasErrors(): boolean {
    return Object.values(this.errors).some(error => error !== '');
  }


  onSubmit() {
    this.validateTitulo();
    this.validateDescricao();
    this.validatePrioridade();
    this.validateDataEntrega();
    this.validateCategoria();
  
    if (!this.hasErrors()) {
      const newTask = {
        titulo: this.task.titulo,
        descricao: this.task.descricao,
        prioridade: this.task.prioridade,
        dataEntrega: this.task.dataEntrega,
        categoria: this.task.categoria
      };
  
      this.taskService.addTask(newTask);
  
      M.toast({
        html: 'Tarefa cadastrada com sucesso! Verifique na tela de listagem.',
        classes: 'green lighten-2 white-text'
      });
  
      this.limparCampos();
    } else {
      M.toast({
        html: 'Por favor, corrija os erros no formulário antes de enviar.',
        classes: 'red lighten-2 white-text'
      });
    }
  }
}
