import {Component, inject, OnInit, signal} from '@angular/core';
import {TodosService} from '../services/todos.service';
import {Todo} from '../Model/todo.type'
import {catchError} from 'rxjs';
import {TodoItem} from '../components/todo-item/todo-item';
import {FormsModule} from '@angular/forms';
import {FilterTodosPipe} from '../pipes/filter-todos-pipe';
import {DragDropModule, CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [TodoItem, FormsModule, FilterTodosPipe, DragDropModule],
  templateUrl: './todos.html',
  styleUrl: './todos.scss'
})
export class Todos implements OnInit {
  todoService = inject(TodosService);
  todoItems = signal<Array<Todo>>([]);
  searchTerm = signal('');
  newTodoTitle = signal('');


  ngOnInit(): void{
    this.todoService
      .getTodos()
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe((todos) => {
        this.todoItems.set(todos);
      });
  }

  updateTodoItem(todoItem: Todo): void {
    this.todoItems.update((todos) =>{
      return todos.map(todo => {
        if (todo.id == todoItem.id) {
          return {
            ...todo,
            completed: !todo.completed
          }
        }
        return todo;
      })
    })
  }

  addNewTodo(): void {
    const title = this.newTodoTitle().trim();
    if (!title) return;

    const newTodo: Todo = {
      user_id : 1,
      title : title,
      completed: false,
      id: Date.now()
    }

    this.todoItems.update(todos => [...todos, newTodo]);
    this.newTodoTitle.set('');
    this.todoService.saveTodos(this.todoItems());
    console.log("dodano nowe zadanie");
  }

  deleteTodoItem(todoItem: Todo): void {
    this.todoItems.update(todos => todos.filter(todo => todo.id !== todoItem.id));
    this.todoService.saveTodos(this.todoItems());
    console.log("usunięto zadanie")
  }

  drop(event: CdkDragDrop<Todo[]>): void{
    const todosCopy = [...this.todoItems()];
    moveItemInArray(todosCopy, event.previousIndex, event.currentIndex);
    this.todoItems.set(todosCopy);
    this.todoService.saveTodos(this.todoItems());
  }


}
