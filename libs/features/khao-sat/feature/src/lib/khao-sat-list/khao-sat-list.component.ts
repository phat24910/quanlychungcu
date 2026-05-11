import { Component, OnInit } from '@angular/core';
import { KhaoSatService, KhaoSatResponse } from '@features/khao-sat/data-access';
import { ApiResponse } from '@features/dich-vu/data-access';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { KhaoSatFormComponent } from '../khao-sat-form/khao-sat-form.component';
import { KhaoSatResultComponent } from '../khao-sat-result/khao-sat-result.component';

@Component({
  selector: 'app-khao-sat-list',
  templateUrl: './khao-sat-list.component.html',
  styleUrls: ['./khao-sat-list.component.scss']
})
export class KhaoSatListComponent implements OnInit {
  loading = false;
  items: KhaoSatResponse[] = [];
  
  // Filters
  trangThaiId: number | null = null;
  loaiKhaoSatId: number | null = null;
  keyword = '';
  
  pageSize = 10;
  pageNumber = 1;
  totalItems = 0;

  constructor(
    private khaoSatService: KhaoSatService,
    private notification: NzNotificationService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    const query = {
      trangThaiId: this.trangThaiId,
      loaiKhaoSatId: this.loaiKhaoSatId,
      keyword: this.keyword,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sortCol: 'CreatedAt',
      isAsc: false
    };

    this.khaoSatService.getList(query).subscribe({
      next: (res: ApiResponse<any>) => {
        if (res.isOk) {
          this.items = res.result.items;
          this.totalItems = res.result.pagingInfo.totalItems;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notification.error('Lỗi', 'Không thể tải danh sách khảo sát');
      }
    });
  }

  onPageChange(page: number): void {
    this.pageNumber = page;
    this.load();
  }

  openCreateModal(item?: KhaoSatResponse): void {
    const modal = this.modal.create({
      nzTitle: item ? 'Cập nhật đợt khảo sát' : 'Tạo mới đợt khảo sát/bầu cử',
      nzContent: KhaoSatFormComponent,
      nzComponentParams: { item },
      nzWidth: 800,
      nzFooter: null,
      nzClassName: 'khao-sat-modal'
    });

    modal.afterClose.subscribe(res => {
      if (res) this.load();
    });
  }

  viewResult(item: KhaoSatResponse): void {
    this.modal.create({
      nzTitle: 'Kết quả khảo sát & Biểu quyết',
      nzContent: KhaoSatResultComponent,
      nzComponentParams: { id: item.id },
      nzWidth: 700,
      nzFooter: null
    });
  }

  getStatusColor(id: number): string {
    switch (id) {
      case 1: return 'orange'; // Draft
      case 2: return 'green';  // Published
      case 3: return 'gold';   // Suspended
      case 4: return 'default'; // Ended
      default: return 'blue';
    }
  }

  delete(item: KhaoSatResponse): void {
    this.modal.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: `Bạn có chắc chắn muốn xóa cuộc khảo sát "${item.tieuDe}"?`,
      nzOkDanger: true,
      nzOnOk: () => {
        this.khaoSatService.delete(item.id).subscribe(res => {
          if (res.isOk) {
            this.notification.success('Thành công', 'Đã xóa cuộc khảo sát');
            this.load();
          }
        });
      }
    });
  }

  congBo(item: KhaoSatResponse): void {
    this.modal.confirm({
      nzTitle: 'Xác nhận công bố',
      nzContent: `Sau khi công bố, cư dân có thể bắt đầu bỏ phiếu. Bạn có chắc chắn?`,
      nzOnOk: () => {
        this.khaoSatService.congBo(item.id).subscribe(res => {
          if (res.isOk) {
            this.notification.success('Thành công', 'Đã công bố cuộc khảo sát');
            this.load();
          }
        });
      }
    });
  }
}
