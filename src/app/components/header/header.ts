import { Component, signal } from '@angular/core';
import {RouterLink} from '@angular/router';
import {Todos} from '../../todos/todos';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  standalone: true,
  styleUrl: './header.scss',
})
export class Header {
  title = signal('My First Angular App');
}
