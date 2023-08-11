import { TaskListComponent } from './task-list/task-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskFormComponent } from './task-form/task-form.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'cadastro-tarefas', component: TaskFormComponent } ,
  { path: 'lista-tarefas', component: TaskListComponent } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
