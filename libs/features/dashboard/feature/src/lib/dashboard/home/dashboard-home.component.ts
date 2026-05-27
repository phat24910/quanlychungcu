import { Component, OnInit } from '@angular/core';
import { DashboardService, DashboardOverview } from '@features/dashboard/data-access';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {
  loading = true;
  data: DashboardOverview | null = null;

  doanhThuColors = ['#6366f1', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899'];
  tienIchColors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899', '#10b981'];
  tienIchIcons = ['thunderbolt', 'experiment', 'book', 'crown', 'smile', 'appstore'];

  today = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  constructor(
    private dashboardService: DashboardService,
    private notification: NzNotificationService,
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.dashboardService.getOverview({}).subscribe({
      next: (res) => {
        if (res.isOk && res.result) {
          this.data = res.result;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notification.error('Lỗi', 'Không thể tải dữ liệu tổng quan');
      }
    });
  }

  formatCurrency(value: number): string {
    return (value || 0).toLocaleString('vi-VN') + 'đ';
  }

  getUsagePercent(value: number): number {
    if (!this.data?.dangKyTienIch?.length) return 0;
    const max = Math.max(...this.data.dangKyTienIch.map(i => i.luotDungTrongThang));
    return max ? (value / max) * 100 : 0;
  }
}
