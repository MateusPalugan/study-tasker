import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: Task[] = [];

  constructor() {
    this.loadTasksFromApi();
    this.loadTasksFromLocalStorage();
  }

  loadTasksFromLocalStorage() {
    const tasksString = localStorage.getItem('tasks');
    if (tasksString) {
      this.tasks = JSON.parse(tasksString);
    }
  }

  private saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  //Fazer requisições a API com tratamento da resposta com Promises
  //Cadastrar uma entidade no JSON Server.
  
  async loadTasksFromApi() {
    try {
      const response = await fetch('http://localhost:3000/tasks'); 
      if (response.ok) {
        const tasks = await response.json();
        this.tasks = tasks;
      } else {
        console.error('Erro ao obter tarefas da API:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao obter tarefas da API:', error);
    }
  }

  addTask(task: Task) {
    const taskWithId = { ...task, id: uuidv4() };
    this.tasks.push(taskWithId);
    this.saveTasksToLocalStorage();
    this.createTaskOnApi(taskWithId); // Chama a função para criar a tarefa na API
  }

  async createTaskOnApi(task: Task) {
    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      });

      if (!response.ok) {
        console.error('Erro ao cadastrar tarefa na API:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao cadastrar tarefa na API:', error);
    }
  }

  getTasks() {
    return this.tasks;
  }

  getTasksByTitulo(titulo: string) {
    return this.tasks.filter(task => task.titulo === titulo);
  }

  deleteTask(taskId: string) {
    const index = this.tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.saveTasksToLocalStorage();
      this.deleteTaskOnApi(taskId); // Chama a função para deletar a tarefa da API
    }
  }

  async deleteTaskOnApi(taskId: string) {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        console.error('Erro ao deletar tarefa na API:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao deletar tarefa na API:', error);
    }
  }

  getTaskById(taskId: string): Task | undefined {
    return this.tasks.find(task => task.id === taskId);
  }

  updateTask(task: Task) {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
      this.saveTasksToLocalStorage();
      this.updateTaskOnApi(task); // Chama a função para atualizar a tarefa na API
    }
  }

  async updateTaskOnApi(task: Task) {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      });

      if (!response.ok) {
        console.error('Erro ao atualizar tarefa na API:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao atualizar tarefa na API:', error);
    }
  }
}
