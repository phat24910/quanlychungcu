import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResidentRoutingModule } from './resident-routing.module';
import { QuanLyCuDanComponent } from './quan-ly-cu-dan/quan-ly-cu-dan.component';


@NgModule({
  declarations: [
    QuanLyCuDanComponent
  ],
  imports: [
    CommonModule,
    ResidentRoutingModule
  ]
})
export class ResidentModule { }
