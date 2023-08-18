import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: any[] = [];

  addTask(task: any) {
    this.tasks.push(task);
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
    }
  }
}
