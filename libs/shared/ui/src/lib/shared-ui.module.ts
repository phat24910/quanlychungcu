import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AlertComponent } from './alert/alert.component';
import { ButtonComponent } from './button/button.component';
import { ScrollTableComponent } from './scroll-table/scroll-table.component';

@NgModule({
  declarations: [ButtonComponent, AlertComponent, ScrollTableComponent],
  imports: [CommonModule, NzAlertModule, NzIconModule, NzToolTipModule],
  exports: [CommonModule, ButtonComponent, AlertComponent, ScrollTableComponent, NzIconModule, NzToolTipModule]
})
export class SharedUiModule {}
