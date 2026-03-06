import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { QuanLyCuDanComponent } from './quan-ly-cu-dan/quan-ly-cu-dan.component';

const routes: Routes = [
  {
    path: '',
    component: QuanLyCuDanComponent
  }
];

@NgModule({
  declarations: [QuanLyCuDanComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ResidentFeatureModule {}
