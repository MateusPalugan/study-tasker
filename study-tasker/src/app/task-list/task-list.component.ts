import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit {
  tasks: any[] = []; 

  ngOnInit(): void {
   
    this.tasks = [
      {
        titulo: 'Tarefa 1 exemplo',
        descricao: 'Descrição da Tarefa 1',
        prioridade: 'Alta',
        dataEntrega: '2023-08-09',
        categoria: 'Trabalho'
      },
  
    ];
  }

  pesquisaText = '';

  realizarPesquisa() {
    console.log('Realizando pesquisa:', this.pesquisaText);
    // ainda será implementado
  }
}
