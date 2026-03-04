import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-example-button',
  template: `<button class="example-btn">{{ label }}</button>`,
  styles: [`.example-btn { padding: 0.5rem 1rem; }`]
})
export class ExampleButtonComponent {
  @Input() label = 'Click';
}
