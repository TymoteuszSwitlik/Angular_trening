import {Component, input, output} from '@angular/core';
import {Todo} from '../../Model/todo.type';
import {HighlightCompletedTodo} from '../../directives/highlight-completed-todo';
import {UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [HighlightCompletedTodo, UpperCasePipe],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.scss'
})
export class TodoItem {
  todo = input.required<Todo>();
  todoToggled = output<Todo>();
  todoDeleted = output<Todo>();

  todoClicked() {
    this.todoToggled.emit(this.todo())
  }

  deleteClicked() {
    this.todoDeleted.emit(this.todo())
  }

}
