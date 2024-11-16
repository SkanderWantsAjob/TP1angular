import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo, TodoService } from 'src/app/services/todo.service';
import { NewTodoElementComponent } from '../new-todo-element/new-todo-element.component';

@Component({
  selector: 'app-new-todo',
  standalone: true,
  imports: [CommonModule, NewTodoElementComponent, FormsModule],
  templateUrl: './new-todo.component.html',
  styleUrl: './new-todo.component.css'
})
export class NewTodoComponent {
  todos = this.service.todos;
  selectedTodo!: Todo;
  newTodo: Todo = { id: 0, name: '', content: '', status: 'waiting' }

  constructor(private service: TodoService) {}

  selectTodo(todo: Todo): void {
    this.selectedTodo = todo;
}
 filteredTodos(status:string) {
  return this.todos().filter(todo => todo.status === status);
}
addTodo():void{
  this.newTodo.id = this.todos().length + 1;
  this.service.addTodo(this.newTodo);
  this.newTodo = { id: 0, name: '', content: '', status: 'waiting' }
}
}
