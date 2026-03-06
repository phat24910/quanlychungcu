import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AlertComponent } from './alert/alert.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [ButtonComponent, AlertComponent],
  imports: [CommonModule, NzAlertModule, NzIconModule, NzToolTipModule],
  exports: [CommonModule, ButtonComponent, AlertComponent, NzIconModule, NzToolTipModule]
})
export class SharedUiModule {}
