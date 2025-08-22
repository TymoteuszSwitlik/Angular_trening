import {inject, Injectable} from '@angular/core';
import {Todo} from '../Model/todo.type';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  http = inject(HttpClient);
  private storageKey = 'todos';

  getTodos(){
    const saved = localStorage.getItem('todos');
    const url = 'https://jsonplaceholder.typicode.com/todos'

    if (saved) {
      return of(JSON.parse(saved));
    }
    else{
      return this.http.get<Array<Todo>>(url);
    }
  }


  saveTodos(todos: Array<Todo>){
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}
