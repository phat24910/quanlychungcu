import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { QuanLyCuDanComponent } from './quan-ly-cu-dan/quan-ly-cu-dan.component';
import { ToaNhaListComponent } from './toa-nha/toa-nha-list.component';
import { ToaNhaFormComponent } from './toa-nha/toa-nha-form.component';
import { CanHoListComponent } from './can-ho/can-ho-list.component';
import { CanHoFormComponent } from './can-ho/can-ho-form.component';
import { CanHoResidentsComponent } from './can-ho/can-ho-residents.component';
import { TangFormComponent } from './tang/tang-form.component';
import { CauTrucChungCuTreeComponent } from './cau-truc-chung-cu-tree/cau-truc-chung-cu-tree.component';
import { ResidentLayoutComponent } from './resident-layout/resident-layout.component';
import { TangListComponent } from './tang/tang-list.component';
import { SharedUiModule } from '@shared/ui';

const routes: Routes = [
  {
    path: '',
    component: ResidentLayoutComponent,
    children: [
      { path: '', component: QuanLyCuDanComponent },
      { path: 'toa-nha', component: ToaNhaListComponent },
      { path: 'tang', component: TangListComponent },
      { path: 'toa-nha/create', component: ToaNhaFormComponent },
      { path: 'toa-nha/:id/edit', component: ToaNhaFormComponent },
      { path: 'can-ho', component: CanHoListComponent },
      { path: 'can-ho/create', component: CanHoFormComponent },
      { path: 'can-ho/:id/edit', component: CanHoFormComponent },
      { path: 'can-ho/:id', component: CanHoResidentsComponent }
    ]
  }
];

@NgModule({
  declarations: [
    QuanLyCuDanComponent,
    ToaNhaListComponent,
    ToaNhaFormComponent,
    CanHoListComponent,
    CanHoFormComponent,
    CanHoResidentsComponent,
    TangFormComponent,
    CauTrucChungCuTreeComponent,
    ResidentLayoutComponent,
    TangListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzButtonModule,
    NzIconModule,
    NzDropDownModule,
    NzMenuModule,
    NzTableModule,
    NzPaginationModule,
    NzModalModule,
    NzGridModule,
    NzSelectModule,
    NzCheckboxModule,
    NzTreeViewModule,
    FormsModule,
    NzNotificationModule
    ,
    SharedUiModule
  ],
  providers: []
})
export class ResidentFeatureModule {}
