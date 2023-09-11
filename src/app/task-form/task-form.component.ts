import { Component, OnInit, AfterViewInit   } from '@angular/core';
import { TaskService } from '../task.service';
import * as M from 'materialize-css';
import { Task } from '../task.model'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit , AfterViewInit {

  ngAfterViewInit() {
    M.updateTextFields();
  }

  
  ngOnInit() {

  
    this.route.params.subscribe(params => {
      const taskId = params['id'];
      if (taskId) {
        const task = this.taskService.getTaskById(taskId);
        if (task) {
          this.task = task;
        } else {
          M.toast({
            html: 'Tarefa não encontrada!',
            classes: 'red lighten-2 white-text'
          });
        }
      }
    });
  }

  task: Task = {
    titulo: '',
    descricao: '',
    prioridade: '',
    dataEntrega: '',
    categoria: ''
  };

  errors: Record<string, string> = {};

  constructor(private taskService: TaskService, private route: ActivatedRoute) {}

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
    //Validar campos do formulário com Expressões Regulares e apresentar os erros.
    this.validateTitulo();
    this.validateDescricao();
    this.validatePrioridade();
    this.validateDataEntrega();
    this.validateCategoria();
  
    if (!this.hasErrors()) {
      if (this.task.id) {
        // Atualizar tarefa existente
        this.taskService.updateTask(this.task);
        M.toast({
          html: 'Tarefa atualizada com sucesso!',
          classes: 'green lighten-2 white-text'
        });
      } else {
        // Cadastrar nova tarefa
        this.taskService.addTask(this.task);
        M.toast({
          html: 'Tarefa cadastrada com sucesso! Verifique na tela de listagem.',
          classes: 'green lighten-2 white-text'
        });
      }
      this.limparCampos();
    } else {
      M.toast({
        html: 'Por favor, corrija os erros no formulário antes de enviar.',
        classes: 'red lighten-2 white-text'
      });
    }
  }
}
