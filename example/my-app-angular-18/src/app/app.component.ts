import { Component } from '@angular/core';
import { MyComponent } from 'component-library';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
