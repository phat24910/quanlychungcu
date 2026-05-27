import { Component, OnInit } from '@angular/core';
import { ThanhToanService } from '@features/thanh-toan/data-access';
import { ApiResponse } from '@features/dich-vu/data-access';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { ActivatedRoute } from '@angular/router';
import { HoaDonDetailComponent } from './hoa-don-detail.component';

@Component({
  selector: 'app-hoa-don-list',
  templateUrl: './hoa-don-list.component.html',
  styleUrls: ['./hoa-don-list.component.scss'],
})
export class HoaDonListComponent implements OnInit {
  loading = false;
  items: any[] = [];

  thang = new Date().getMonth() + 1;
  nam = new Date().getFullYear();
  dotThanhToanId: number | null = null;
  trangThaiHoaDonId: number | null = null;
  keyword = '';

  dotThanhToanOptions: any[] = [];

  pageSize = 10;
  pageNumber = 1;
  totalItems = 0;

  constructor(
    private thanhToanService: ThanhToanService,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private drawerService: NzDrawerService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadDots();
    this.route.queryParams.subscribe((params) => {
      if (params['dotThanhToanId']) {
        this.dotThanhToanId = Number(params['dotThanhToanId']);
      }
      this.load();
    });
  }

  loadDots(): void {
    this.thanhToanService
      .getDotThanhToanList({ pageSize: 1000 })
      .subscribe((res: ApiResponse<any>) => {
        this.dotThanhToanOptions = res.result?.items || [];
      });
  }

  load(): void {
    this.loading = true;
    const query = {
      thang: this.thang,
      nam: this.nam,
      dotThanhToanId: this.dotThanhToanId,
      trangThaiHoaDonId: this.trangThaiHoaDonId,
      keyword: this.keyword,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    };
    this.thanhToanService.getHoaDonList(query).subscribe({
      next: (res: ApiResponse<any>) => {
        this.items = res.result?.items || [];
        this.totalItems = res.result?.pagingInfo?.totalItems || 0;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notification.error('Lỗi', 'Không thể tải danh sách hóa đơn');
      },
    });
  }

  onPageChange(page: number): void {
    this.pageNumber = page;
    this.load();
  }

  getStatusColor(statusId: number): string {
    switch (statusId) {
      case 1:
        return 'blue'; // ChoDuyet
      case 2:
        return 'orange'; // ChuaThanhToan
      case 3:
        return 'green'; // DaThanhToan
      case 4:
        return 'red'; // DaHuy
      default:
        return 'default';
    }
  }

  openDetail(item: any): void {
    this.drawerService.create({
      nzTitle: 'Chi tiết hóa đơn',
      nzContent: HoaDonDetailComponent,
      nzContentParams: {
        hoaDonId: item.id,
      },
      nzWidth: 800,
    });
  }

  cancelInvoice(item: any): void {
    this.modal.confirm({
      nzTitle: 'Xác nhận hủy hóa đơn',
      nzContent: `Bạn có chắc chắn muốn hủy hóa đơn "${item.maHoaDon || item.id}"?`,
      nzOkDanger: true,
      nzOnOk: () => {
        this.thanhToanService
          .huyHoaDon({ hoaDonId: item.id, lyDo: '' })
          .subscribe((res: ApiResponse<any>) => {
            if (res.isOk) {
              this.notification.success('Thành công', 'Đã hủy hóa đơn');
              this.load();
            }
          });
      },
    });
  }

  onRefresh(): void {
    this.keyword = '';
    this.thang = new Date().getMonth() + 1;
    this.nam = new Date().getFullYear();
    this.dotThanhToanId = null;
    this.trangThaiHoaDonId = null;
    this.pageNumber = 1;
    this.load();
  }

  publishInvoices(): void {
    if (!this.dotThanhToanId) {
      this.notification.warning(
        'Cảnh báo',
        'Vui lòng chọn đợt thanh toán để phát hành',
      );
      return;
    }

    this.modal.confirm({
      nzTitle: 'Xác nhận phát hành',
      nzContent:
        'Bạn có chắc chắn muốn phát hành toàn bộ hóa đơn dự thảo trong đợt này?',
      nzOnOk: () => {
        this.thanhToanService
          .phatHanhHoaDon({
            dotThanhToanId: this.dotThanhToanId!,
            hoaDonIds: [],
          })
          .subscribe((res: ApiResponse<any>) => {
            if (res.isOk) {
              this.notification.success('Thành công', 'Đã phát hành hóa đơn');
              this.load();
            }
          });
      },
    });
  }
}
