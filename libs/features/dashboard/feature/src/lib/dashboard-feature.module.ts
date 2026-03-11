import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardHomeComponent } from './dashboard/home/dashboard-home.component';
import { SharedUiModule } from '@shared/ui';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: DashboardHomeComponent },
      { path: 'resident', loadChildren: () => import('@features/resident/feature').then((m) => m.ResidentFeatureModule) },
      { path: 'profile', loadChildren: () => import('@features/profile/feature').then((m) => m.ProfileFeatureModule) }
    ]
  }
];

@NgModule({
  declarations: [DashboardComponent, DashboardHomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedUiModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzDropDownModule
  ]
})
export class DashboardFeatureModule {}
