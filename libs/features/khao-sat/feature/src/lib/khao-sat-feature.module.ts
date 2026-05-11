import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedUiModule } from '@shared/ui';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

import { KhaoSatListComponent } from './khao-sat-list/khao-sat-list.component';
import { KhaoSatFormComponent } from './khao-sat-form/khao-sat-form.component';
import { KhaoSatResultComponent } from './khao-sat-result/khao-sat-result.component';

const routes: Routes = [
  { path: '', component: KhaoSatListComponent }
];

@NgModule({
  declarations: [
    KhaoSatListComponent,
    KhaoSatFormComponent,
    KhaoSatResultComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedUiModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzSelectModule,
    NzTagModule,
    NzModalModule,
    NzNotificationModule,
    NzDatePickerModule,
    NzDropDownModule,
    NzSpinModule,
    NzEmptyModule,
    NzCheckboxModule,
    NzInputNumberModule
  ]
})
export class KhaoSatFeatureModule { }
