import { Component } from '@angular/core';
import { MyComponent } from 'component-library';

@Component({
  selector: 'app-root',
  imports: [MyComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
