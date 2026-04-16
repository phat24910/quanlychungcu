import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

import { DichVuListComponent } from './dich-vu-list/dich-vu-list.component';
import { DichVuFormComponent } from './dich-vu-form/dich-vu-form.component';
import { KhungGioListComponent } from './khung-gio-list/khung-gio-list.component';
import { KhungGioFormComponent } from './khung-gio-form/khung-gio-form.component';
import { BangGiaListComponent } from './bang-gia-list/bang-gia-list.component';
import { BangGiaFormComponent } from './bang-gia-form/bang-gia-form.component';
import { DangKyComponent } from './dang-ky/dang-ky.component';

const routes: Routes = [
  { path: '', component: DichVuListComponent },
  { path: 'create', component: DichVuFormComponent },
  { path: ':id/edit', component: DichVuFormComponent },

  // Khung giờ
  { path: ':dichVuId/khung-gio', component: KhungGioListComponent },
  { path: ':dichVuId/khung-gio/create', component: KhungGioFormComponent },
  { path: ':dichVuId/khung-gio/:id/edit', component: KhungGioFormComponent },

  // Bảng giá
  { path: ':dichVuId/bang-gia', component: BangGiaListComponent },
  { path: ':dichVuId/bang-gia/create', component: BangGiaFormComponent },
  { path: ':dichVuId/bang-gia/:id/edit', component: BangGiaFormComponent },

  // Đăng ký
  { path: ':dichVuId/dang-ky', component: DangKyComponent }
];

@NgModule({
  declarations: [
    DichVuListComponent,
    DichVuFormComponent,
    KhungGioListComponent,
    KhungGioFormComponent,
    BangGiaListComponent,
    BangGiaFormComponent,
    DangKyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzInputModule,
    NzFormModule,
    NzSelectModule,
    NzCheckboxModule,
    NzPopconfirmModule
  ],
  exports: [DichVuListComponent]
})
export class DichVuFeatureModule {}
