import { Injectable, signal } from '@angular/core';

export type TodoStatus = 'waiting' | 'in progress' | 'done';

export interface Todo {
  id: number;
  name: string;
  content: string;
  status: TodoStatus;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos = signal<Todo[]>([
    { id: 1, name: 'manger', content: 'Description', status: 'waiting' },
    { id: 2, name: 'etudier', content: 'Description', status: 'in progress' },
    { id: 3, name: 'marcher', content: 'Description', status: 'done' },
  ]);

  addTodo(todo: Todo): void {
    this.todos.update(todos => [...todos, todo]);
  }

  changeStatus(id: number, newStatus: TodoStatus): void {
    this.todos.update(todos => 
      todos.map(todo => todo.id === id ? { ...todo, status: newStatus } : todo)
    );
  }
}
