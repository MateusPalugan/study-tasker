import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: Task[] = [];

  constructor() {
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

  addTask(task: any) {
    this.tasks.push(task);
    this.saveTasksToLocalStorage();
  }

  getTasks() {
    return this.tasks;
  }

  getTasksByTitulo(titulo: string) {
    return this.tasks.filter(task => task.titulo === titulo);
  }
  
  deleteTask(taskToDelete: any) {
    const index = this.tasks.indexOf(taskToDelete);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.saveTasksToLocalStorage();
    }
  }
}
