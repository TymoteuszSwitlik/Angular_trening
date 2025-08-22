import {Component, signal} from '@angular/core';
import {Greeting} from '../components/greeting/greeting';
import {Counter} from '../components/counter/counter';

@Component({
  selector: 'app-home',
  imports: [Greeting, Counter],
  templateUrl: './home.html',
  standalone: true,
  styleUrl: './home.scss'
})
export class Home {
  homeMessage = signal('halo z domu!')

  protected readonly KeyboardEvent = KeyboardEvent;

  keyUpHandler(event: KeyboardEvent): void {
    console.log(`user pressed ${event.key} key in the input`);
  }
}
