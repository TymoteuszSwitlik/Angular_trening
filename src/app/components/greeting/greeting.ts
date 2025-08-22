import {Component, input} from '@angular/core';

@Component({
  selector: 'app-greeting',
  standalone:  true,
  imports: [],
  templateUrl: './greeting.html',
  styleUrl: './greeting.scss'
})
export class Greeting {
  message = input('HALO HALO!');
}
