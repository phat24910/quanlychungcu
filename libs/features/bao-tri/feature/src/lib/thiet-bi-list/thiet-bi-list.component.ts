import { Component, OnInit } from '@angular/core';
import { BaoTriService } from '@features/bao-tri/data-access';
import { ApiResponse } from '@features/dich-vu/data-access';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ThietBiFormComponent } from './thiet-bi-form.component';

@Component({
  selector: 'app-thiet-bi-list',
  template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-2xl font-black text-gray-800 tracking-tight">
            Thiết bị hạ tầng
          </h2>
          <p class="text-gray-500 text-sm">
            Quản lý danh mục máy móc, trang thiết bị trong tòa nhà.
          </p>
        </div>
        <button
          nz-button
          nzType="primary"
          (click)="openForm()"
          class="h-10 px-6 rounded-lg bg-indigo-600 border-none hover:bg-indigo-700 shadow-sm flex items-center gap-2 font-semibold"
        >
          <i nz-icon nzType="plus-circle"></i> Thêm thiết bị
        </button>
      </div>

      <div
        class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-wrap gap-4 items-end"
      >
        <div class="flex-1 min-w-[300px]">
          <label class="text-[10px] font-semibold text-gray-400 mb-1 block"
            >Tìm kiếm thiết bị</label
          >
          <nz-input-group [nzPrefix]="prefixIcon">
            <input
              type="text"
              nz-input
              [(ngModel)]="keyword"
              placeholder="Mã thiết bị, tên thiết bị, vị trí..."
              (keyup.enter)="load()"
              class="rounded-lg h-10 border-gray-200"
            />
          </nz-input-group>
          <ng-template #prefixIcon
            ><i nz-icon nzType="search" class="text-gray-400"></i
          ></ng-template>
        </div>

        <div style="width: 200px">
          <label class="text-[10px] font-semibold text-gray-400 mb-1 block"
            >Trạng thái</label
          >
          <nz-select
            [(ngModel)]="trangThaiThietBiId"
            nzAllowClear
            nzPlaceHolder="Tất cả"
            class="w-full rounded-lg"
            (ngModelChange)="load()"
          >
            <nz-option [nzValue]="1" nzLabel="Hoạt động"></nz-option>
            <nz-option [nzValue]="2" nzLabel="Đang bảo trì"></nz-option>
            <nz-option [nzValue]="3" nzLabel="Hỏng"></nz-option>
            <nz-option [nzValue]="4" nzLabel="Thanh lý"></nz-option>
          </nz-select>
        </div>

        <button
          nz-button
          nzType="primary"
          (click)="load()"
          class="h-10 px-4 rounded-lg font-semibold bg-indigo-600 border-none flex items-center gap-2"
        >
          <i nz-icon nzType="search"></i> Tìm kiếm
        </button>
        <button
          nz-button
          (click)="load()"
          class="h-10 w-10 rounded-lg flex items-center justify-center hover:text-indigo-600 transition-colors"
        >
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
                  Mã thiết bị
                </th>
                <th
                  class="bg-gray-50/50 text-[11px] font-bold text-gray-400 py-4"
                >
                  Tên thiết bị
                </th>
                <th
                  class="bg-gray-50/50 text-[11px] font-bold text-gray-400 py-4"
                >
                  Loại / Vị trí
                </th>
                <th
                  class="bg-gray-50/50 text-[11px] font-bold text-gray-400 py-4"
                >
                  Ngày mua
                </th>
                <th
                  class="bg-gray-50/50 text-[11px] font-bold text-gray-400 py-4"
                >
                  Trạng thái
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
                <td class="py-4">
                  <span
                    class="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded"
                    >{{ data.maThietBi }}</span
                  >
                </td>
                <td class="py-4">
                  <div class="font-bold text-gray-800">
                    {{ data.tenThietBi }}
                  </div>
                  <div
                    class="text-[10px] text-gray-400 font-bold tracking-tighter"
                  >
                    {{ data.loaiThietBi }}
                  </div>
                </td>
                <td class="py-4 text-sm text-gray-600">{{ data.viTri }}</td>
                <td class="py-4">
                  <div class="text-sm font-medium">
                    {{ data.ngayMua | date: 'dd/MM/yyyy' }}
                  </div>
                  <div
                    class="text-[10px] text-red-400 font-bold"
                    *ngIf="data.ngayHetHanBaoHanh"
                  >
                    BH: {{ data.ngayHetHanBaoHanh | date: 'dd/MM/yyyy' }}
                  </div>
                </td>
                <td class="py-4">
                  <nz-tag
                    [nzColor]="getStatusColor(data.trangThaiThietBiId)"
                    class="rounded-full px-3 border-none font-bold text-[10px] uppercase tracking-wider"
                  >
                    {{ data.tenTrangThaiThietBi }}
                  </nz-tag>
                </td>
                <td class="py-4 text-right pr-6">
                  <div
                    class="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <button
                      nz-button
                      nzType="text"
                      (click)="openForm(data)"
                      class="text-indigo-600 hover:bg-indigo-100 rounded-lg"
                      nz-tooltip
                      nzTooltipTitle="Chỉnh sửa"
                    >
                      <i nz-icon nzType="edit" class="text-lg"></i>
                    </button>
                    <button
                      nz-button
                      nzType="text"
                      (click)="delete(data)"
                      class="text-red-500 hover:bg-red-50 rounded-lg"
                      nz-tooltip
                      nzTooltipTitle="Xóa"
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
export class ThietBiListComponent implements OnInit {
  loading = false;
  items: any[] = [];

  keyword = '';
  trangThaiThietBiId: number | null = null;

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
      trangThaiThietBiId: this.trangThaiThietBiId,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sortCol: 'id',
      isAsc: false,
    };

    this.baoTriService.getThietBiList(query).subscribe({
      next: (res: ApiResponse<any>) => {
        this.items = res.result?.items || [];
        this.totalItems = res.result?.pagingInfo?.totalItems || 0;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notification.error('Lỗi', 'Không thể tải danh sách thiết bị');
      },
    });
  }

  onPageChange(page: number): void {
    this.pageNumber = page;
    this.load();
  }

  openForm(item?: any): void {
    const modal = this.modal.create({
      nzTitle: item ? 'Cập nhật thiết bị' : 'Thêm thiết bị mới',
      nzContent: ThietBiFormComponent,
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
      nzContent: `Bạn có chắc chắn muốn xóa thiết bị "${item.tenThietBi}"?`,
      nzOkDanger: true,
      nzOnOk: () => {
        this.baoTriService
          .deleteThietBi(item.id)
          .subscribe((res: ApiResponse<any>) => {
            if (res.isOk) {
              this.notification.success('Thành công', 'Đã xóa thiết bị');
              this.load();
            }
          });
      },
    });
  }

  getStatusColor(statusId: number): string {
    switch (statusId) {
      case 1:
        return 'green'; // Hoạt động
      case 2:
        return 'orange'; // Đang bảo trì
      case 3:
        return 'red'; // Hỏng
      case 4:
        return 'gray'; // Thanh lý
      default:
        return 'default';
    }
  }
}
