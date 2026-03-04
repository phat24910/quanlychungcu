import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleButtonComponent } from './example-button/example-button.component';

@NgModule({
  declarations: [ExampleButtonComponent],
  imports: [CommonModule],
  exports: [CommonModule, ExampleButtonComponent]
})
export class SharedModule {}
