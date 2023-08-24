import { Component, OnInit  } from '@angular/core';
import { TaskService } from '../task.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent  implements OnInit{
  tasks: any[] = [];


  constructor(private router: Router, private taskService: TaskService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Verifica se existe um parâmetro na rota
    this.route.params.subscribe(params => {
      if (params['titulo']) {
        const tituloParam = params['titulo'];
        this.tasks = this.taskService.getTasksByTitulo(tituloParam);
      } else {
        this.tasks = this.taskService.getTasks(); 
      }
    });
    this.loadTasks(); 
  }

  loadTasks() {
    this.tasks = this.taskService.getTasks();
  }

  deleteTask(taskToDelete: any) {
    this.taskService.deleteTask(taskToDelete);
    this.loadTasks();
  }

  
}
