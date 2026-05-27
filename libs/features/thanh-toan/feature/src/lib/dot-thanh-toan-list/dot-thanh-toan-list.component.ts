import { Component, OnInit } from '@angular/core';
import { ThanhToanService } from '@features/thanh-toan/data-access';
import { ApiResponse } from '@features/dich-vu/data-access';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { DotThanhToanFormComponent } from './dot-thanh-toan-form.component';

@Component({
  selector: 'app-dot-thanh-toan-list',
  templateUrl: './dot-thanh-toan-list.component.html',
  styleUrls: ['./dot-thanh-toan-list.component.scss'],
})
export class DotThanhToanListComponent implements OnInit {
  loading = false;
  items: any[] = [];

  thang = new Date().getMonth() + 1;
  nam = new Date().getFullYear();
  trangThaiId: number | null = null;
  keyword = '';

  pageSize = 10;
  pageNumber = 1;
  totalItems = 0;

  constructor(
    private thanhToanService: ThanhToanService,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    const query = {
      thang: this.thang,
      nam: this.nam,
      trangThaiId: this.trangThaiId,
      keyword: this.keyword,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    };
    this.thanhToanService.getDotThanhToanList(query).subscribe({
      next: (res: ApiResponse<any>) => {
        this.items = res.result?.items || [];
        this.totalItems = res.result?.pagingInfo?.totalItems || 0;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notification.error(
          'Lỗi',
          'Không thể tải danh sách đợt thanh toán',
        );
      },
    });
  }

  onPageChange(page: number): void {
    this.pageNumber = page;
    this.load();
  }

  openCreateModal(item?: any): void {
    const modal = this.modal.create({
      nzTitle: item ? 'Cập nhật đợt thanh toán' : 'Tạo đợt thanh toán mới',
      nzContent: DotThanhToanFormComponent,
      nzComponentParams: { item },
      nzFooter: null,
      nzWidth: 800,
      nzBodyStyle: { 'max-height': '70vh', 'overflow': 'auto' },
    });

    modal.afterClose.subscribe((res) => {
      if (res) this.load();
    });
  }

  approve(item: any): void {
    this.modal.confirm({
      nzTitle: 'Xác nhận duyệt',
      nzContent: `Bạn có chắc chắn muốn duyệt đợt thanh toán "${item.tenDot}"?`,
      nzOnOk: () => {
        this.thanhToanService
          .approveDotThanhToan([item.id])
          .subscribe((res: ApiResponse<any>) => {
            if (res.isOk) {
              this.notification.success(
                'Thành công',
                'Đã duyệt đợt thanh toán',
              );
              this.load();
            }
          });
      },
    });
  }

  getStatusColor(statusId: number): string {
    switch (statusId) {
      case 1:
        return 'blue'; // TaoMoi
      case 2:
        return 'orange'; // ChoDuyet
      case 3:
        return 'green'; // DaDuyet
      case 4:
        return 'gray'; // DaDong
      default:
        return 'default';
    }
  }

  lapHoaDon(item: any): void {
    this.loading = true;
    this.thanhToanService.lapHoaDonDuThao(item.id).subscribe({
      next: (res: ApiResponse<any>) => {
        if (res.isOk) {
          this.notification.success(
            'Thành công',
            `Đã lập ${res.result.soLuongHoaDonTaoMoi} hóa đơn dự thảo`,
          );
          this.load();
        }
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  onRefresh(): void {
    this.keyword = '';
    this.thang = new Date().getMonth() + 1;
    this.nam = new Date().getFullYear();
    this.trangThaiId = null;
    this.pageNumber = 1;
    this.load();
  }

  delete(item: any): void {
    this.modal.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: `Bạn có chắc chắn muốn xóa đợt thanh toán "${item.tenDot}"?`,
      nzOkDanger: true,
      nzOnOk: () => {
        this.thanhToanService
          .deleteDotThanhToan([item.id])
          .subscribe((res: ApiResponse<any>) => {
            if (res.isOk) {
              this.notification.success('Thành công', 'Đã xóa đợt thanh toán');
              this.load();
            }
          });
      },
    });
  }

  viewInvoices(item: any): void {
    this.router.navigate(['/dashboard/thanh-toan/hoa-don'], {
      queryParams: { dotThanhToanId: item.id },
    });
  }

  dongDot(item: any): void {
    this.modal.confirm({
      nzTitle: 'Xác nhận đóng đợt',
      nzContent: `Bạn có chắc chắn muốn đóng đợt thanh toán "${item.tenDot}"? Sau khi đóng, đợt thanh toán này sẽ không thể nhận thêm thanh toán nào nữa.`,
      nzOnOk: () => {
        this.thanhToanService
          .dongDotThanhToan(item.id)
          .subscribe((res: ApiResponse<any>) => {
            if (res.isOk) {
              this.notification.success('Thành công', 'Đã đóng đợt thanh toán');
              this.load();
            }
          });
      },
    });
  }
}
