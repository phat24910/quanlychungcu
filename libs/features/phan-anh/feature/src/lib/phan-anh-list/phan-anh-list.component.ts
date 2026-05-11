import { Component, OnInit } from '@angular/core';
import { PhanAnhService, PhanAnhResponse } from '@features/phan-anh/data-access';
import { ApiResponse } from '@features/dich-vu/data-access';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PhanAnhDetailComponent } from '../phan-anh-detail/phan-anh-detail.component';

@Component({
  selector: 'app-phan-anh-list',
  templateUrl: './phan-anh-list.component.html',
  styleUrls: ['./phan-anh-list.component.scss']
})
export class PhanAnhListComponent implements OnInit {
  loading = false;
  items: PhanAnhResponse[] = [];
  
  // Filters
  trangThaiId: number | null = null;
  loaiPhanAnhId: number | null = null;
  keyword = '';
  
  pageSize = 10;
  pageNumber = 1;
  totalItems = 0;

  constructor(
    private phanAnhService: PhanAnhService,
    private notification: NzNotificationService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    const query = {
      trangThaiPhanAnhId: this.trangThaiId,
      loaiPhanAnhId: this.loaiPhanAnhId,
      keyword: this.keyword,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sortCol: 'CreatedAt',
      isAsc: false
    };

    this.phanAnhService.getList(query).subscribe({
      next: (res: ApiResponse<any>) => {
        if (res.isOk && res.result) {
          this.items = res.result.items;
          this.totalItems = res.result.pagingInfo.totalItems;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notification.error('Lỗi', 'Không thể tải danh sách phản ánh');
      }
    });
  }

  onPageChange(page: number): void {
    this.pageNumber = page;
    this.load();
  }

  getStatusColor(id: number): string {
    switch (id) {
      case 1: return 'default'; // Wait
      case 2: return 'blue';    // Processing
      case 3: return 'orange';  // BQL Replied
      case 4: return 'gold';    // Res Replied
      case 5: return 'purple';  // Wait Evaluation
      case 6: return 'green';   // Completed
      case 7: return 'red';     // Cancelled
      default: return 'gray';
    }
  }

  openDetail(item: PhanAnhResponse): void {
    const modal = this.modal.create({
      nzTitle: 'Chi tiết phản ánh & Trao đổi',
      nzContent: PhanAnhDetailComponent,
      nzComponentParams: { id: item.id },
      nzWidth: 900,
      nzFooter: null,
      nzStyle: { top: '20px' }
    });

    modal.afterClose.subscribe(() => {
      this.load();
    });
  }
}
