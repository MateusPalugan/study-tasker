import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent {
  pesquisaText: string = ''; 
  constructor(private router: Router) {}
  
  pesquisarTarefa() {
  
    this.router.navigate(['/lista-tarefas', this.pesquisaText]);
    this.pesquisaText = '';
  }
}
