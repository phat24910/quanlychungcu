import { Component, OnInit } from '@angular/core';
import { BaoTriService } from '@features/bao-tri/data-access';
import { ApiResponse } from '@features/dich-vu/data-access';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HangMucFormComponent } from './hang-muc-form.component';

@Component({
  selector: 'app-hang-muc-list',
  template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2
            class="text-2xl font-black text-gray-800 tracking-tight text-indigo-900"
          >
            Hạng mục bảo trì
          </h2>
          <p class="text-gray-500 text-sm">
            Cấu hình danh mục các đầu việc bảo trì và quy trình kiểm tra.
          </p>
        </div>
        <button
          nz-button
          nzType="primary"
          (click)="openForm()"
          class="h-10 px-6 rounded-lg bg-indigo-600 border-none font-semibold shadow-sm flex items-center gap-2"
        >
          <i nz-icon nzType="plus-circle"></i> Thêm hạng mục
        </button>
      </div>

      <div
        class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex gap-4 items-end"
      >
        <div class="flex-1">
          <label class="text-[10px] font-semibold text-gray-400 mb-1 block"
            >Tìm kiếm hạng mục</label
          >
          <nz-input-group [nzPrefix]="prefixIcon">
            <input
              type="text"
              nz-input
              [(ngModel)]="keyword"
              placeholder="Mã hoặc tên hạng mục..."
              (keyup.enter)="load()"
              class="rounded-lg h-10 border-gray-200"
            />
          </nz-input-group>
          <ng-template #prefixIcon><i nz-icon nzType="search"></i></ng-template>
        </div>
        <button
          nz-button
          nzType="primary"
          (click)="load()"
          class="h-10 px-4 rounded-lg font-semibold bg-indigo-600 border-none flex items-center gap-2"
        >
          <i nz-icon nzType="search"></i> Tìm kiếm
        </button>
        <button nz-button (click)="load()" class="h-10 w-10 rounded-lg">
          <i nz-icon nzType="reload"></i>
        </button>
      </div>

      <div
        class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <app-scroll-table [height]="'calc(100vh - 320px)'" [noBorder]="true">
          <nz-table
            #basicTable
            [nzData]="items"
            [nzLoading]="loading"
            [nzFrontPagination]="false"
            [nzTotal]="totalItems"
            [nzPageSize]="pageSize"
            [nzPageIndex]="pageNumber"
            (nzPageIndexChange)="onPageChange($event)"
          >
            <thead>
              <tr>
                <th
                  class="bg-gray-50/50 text-[11px] font-bold text-gray-400 py-4"
                >
                  Mã hạng mục
                </th>
                <th
                  class="bg-gray-50/50 text-[11px] font-bold text-gray-400 py-4"
                >
                  Tên hạng mục
                </th>
                <th
                  class="bg-gray-50/50 text-[11px] font-bold text-gray-400 py-4 text-right"
                >
                  Thời gian ước tính
                </th>
                <th
                  class="bg-gray-50/50 text-[11px] font-bold text-gray-400 py-4 text-right"
                >
                  Chi phí dự kiến
                </th>
                <th
                  class="bg-gray-50/50 text-[11px] font-bold text-gray-400 py-4 text-center"
                >
                  Checklist
                </th>
                <th
                  class="bg-gray-50/50 text-[11px] font-bold text-gray-400 py-4 text-right pr-6"
                >
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                *ngFor="let data of basicTable.data"
                class="group hover:bg-indigo-50/30 transition-colors"
              >
                <td class="py-4 font-mono text-xs font-bold text-indigo-600">
                  {{ data.maHangMuc }}
                </td>
                <td class="py-4">
                  <div class="font-bold text-gray-800">
                    {{ data.tenHangMuc }}
                  </div>
                  <div class="text-xs text-gray-400 line-clamp-1">
                    {{ data.moTa }}
                  </div>
                </td>
                <td class="py-4 text-right font-medium">
                  {{ data.thoiGianUocTinhPhut }} phút
                </td>
                <td class="py-4 text-right font-bold text-emerald-600">
                  {{ data.chiPhiUocTinh | number }} đ
                </td>
                <td class="py-4 text-center">
                  <nz-badge
                    [nzCount]="data.checklistTieuChuan?.length || 0"
                    [nzStyle]="{ backgroundColor: '#6366f1' }"
                  ></nz-badge>
                </td>
                <td class="py-4 text-right pr-6">
                  <div
                    class="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <button
                      nz-button
                      nzType="text"
                      (click)="openForm(data)"
                      class="text-indigo-600"
                    >
                      <i nz-icon nzType="edit" class="text-lg"></i>
                    </button>
                    <button
                      nz-button
                      nzType="text"
                      (click)="delete(data)"
                      class="text-red-500"
                    >
                      <i nz-icon nzType="delete" class="text-lg"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </nz-table>
        </app-scroll-table>
      </div>
    </div>
  `,
})
export class HangMucListComponent implements OnInit {
  loading = false;
  items: any[] = [];

  keyword = '';

  pageSize = 10;
  pageNumber = 1;
  totalItems = 0;

  constructor(
    private baoTriService: BaoTriService,
    private notification: NzNotificationService,
    private modal: NzModalService,
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    const query = {
      keyword: this.keyword,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sortCol: 'id',
      isAsc: false,
    };

    this.baoTriService.getHangMucList(query).subscribe({
      next: (res: ApiResponse<any>) => {
        this.items = res.result?.items || [];
        this.totalItems = res.result?.pagingInfo?.totalItems || 0;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notification.error('Lỗi', 'Không thể tải danh sách hạng mục');
      },
    });
  }

  onPageChange(page: number): void {
    this.pageNumber = page;
    this.load();
  }

  openForm(item?: any): void {
    const modal = this.modal.create({
      nzTitle: item ? 'Cập nhật hạng mục' : 'Thêm hạng mục mới',
      nzContent: HangMucFormComponent,
      nzComponentParams: { item },
      nzFooter: null,
      nzWidth: 800,
    });

    modal.afterClose.subscribe((res) => {
      if (res) this.load();
    });
  }

  delete(item: any): void {
    this.modal.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: `Bạn có chắc chắn muốn xóa hạng mục "${item.tenHangMuc}"?`,
      nzOkDanger: true,
      nzOnOk: () => {
        this.baoTriService
          .deleteHangMuc(item.id)
          .subscribe((res: ApiResponse<any>) => {
            if (res.isOk) {
              this.notification.success('Thành công', 'Đã xóa hạng mục');
              this.load();
            }
          });
      },
    });
  }
}
