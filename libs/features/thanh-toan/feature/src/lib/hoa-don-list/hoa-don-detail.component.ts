import { Component, Input, OnInit } from '@angular/core';
import { ThanhToanService } from '@features/thanh-toan/data-access';
import { ApiResponse } from '@features/dich-vu/data-access';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-hoa-don-detail',
  templateUrl: './hoa-don-detail.component.html',
  styleUrls: ['./hoa-don-detail.component.scss']
})
export class HoaDonDetailComponent implements OnInit {
  @Input() hoaDonId!: number;
  loading = false;
  item: any;

  constructor(
    private thanhToanService: ThanhToanService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.thanhToanService.getHoaDonById(this.hoaDonId).subscribe({
      next: (res: ApiResponse<any>) => {
        this.item = res.result;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notification.error('Lỗi', 'Không thể tải chi tiết hóa đơn');
      }
    });
  }

  getLoaiDinhGiaLabel(id: number): string {
    const maps: any = { 1: 'Giá cố định', 2: 'Giá lũy tiến', 3: 'Theo diện tích', 4: 'Theo khung giờ' };
    return maps[id] || 'Khác';
  }
}
