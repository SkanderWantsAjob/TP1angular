import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Todo, TodoService, TodoStatus } from 'src/app/services/todo.service';



@Component({
  selector: 'app-new-todo-element',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-todo-element.component.html',
  styleUrl: './new-todo-element.component.css'
})
export class NewTodoElementComponent {
  @Input() todo!: Todo;

  constructor(private service: TodoService) {}

  changeStatus(newStatus: TodoStatus): void {
    this.service.changeStatus(this.todo.id, newStatus);
  }
}
