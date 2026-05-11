import { Component, OnInit } from '@angular/core';
import { BaoTriService } from '@features/bao-tri/data-access';
import { ApiResponse } from '@features/dich-vu/data-access';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LichBaoTriFormComponent } from './lich-bao-tri-form.component';

@Component({
  selector: 'app-lich-bao-tri-list',
  template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2
            class="text-2xl font-black text-gray-800 tracking-tight text-indigo-900"
          >
            Lịch bảo trì định kỳ
          </h2>
          <p class="text-gray-500 text-sm">
            Thiết lập tần suất và thời gian bảo trì tự động cho các thiết bị.
          </p>
        </div>
        <div class="flex gap-2">
          <button
            nz-button
            (click)="quetLich()"
            [nzLoading]="loading"
            class="h-10 px-6 rounded-lg border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition-all"
          >
            <i nz-icon nzType="scan"></i> Quét lịch đến hạn
          </button>
          <button
            nz-button
            nzType="primary"
            (click)="openForm()"
            class="h-10 px-6 rounded-lg bg-indigo-600 border-none font-semibold shadow-sm flex items-center gap-2"
          >
            <i nz-icon nzType="plus-circle"></i> Thiết lập lịch
          </button>
        </div>
      </div>

      <div
        class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-wrap gap-4 items-end"
      >
        <div class="flex-1 min-w-[200px]">
          <label class="text-[10px] font-semibold text-gray-400 mb-1 block"
            >Thiết bị</label
          >
          <nz-select
            [(ngModel)]="thietBiId"
            nzAllowClear
            nzShowSearch
            nzPlaceHolder="Tất cả thiết bị"
            class="w-full rounded-lg"
            (ngModelChange)="load()"
          >
            <nz-option
              *ngFor="let o of thietBiOptions"
              [nzValue]="o.id"
              [nzLabel]="o.tenThietBi"
            ></nz-option>
          </nz-select>
        </div>

        <div class="flex-1 min-w-[200px]">
          <label class="text-[10px] font-semibold text-gray-400 mb-1 block"
            >Hạng mục</label
          >
          <nz-select
            [(ngModel)]="hangMucId"
            nzAllowClear
            nzShowSearch
            nzPlaceHolder="Tất cả hạng mục"
            class="w-full rounded-lg"
            (ngModelChange)="load()"
          >
            <nz-option
              *ngFor="let o of hangMucOptions"
              [nzValue]="o.id"
              [nzLabel]="o.tenHangMuc"
            ></nz-option>
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
                  Thiết bị
                </th>
                <th
                  class="bg-gray-50/50 text-[11px] font-bold text-gray-400 py-4"
                >
                  Hạng mục
                </th>
                <th
                  class="bg-gray-50/50 text-[11px] font-bold text-gray-400 py-4"
                >
                  Tần suất
                </th>
                <th
                  class="bg-gray-50/50 text-[11px] font-bold text-gray-400 py-4"
                >
                  Thời gian áp dụng
                </th>
                <th
                  class="bg-gray-50/50 text-[11px] font-bold text-gray-400 py-4"
                >
                  Kỳ bảo trì
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
                  <div class="font-bold text-gray-800">
                    {{ data.tenThietBi }}
                  </div>
                  <div class="text-[10px] text-gray-400 font-bold">
                    {{ data.maThietBi }}
                  </div>
                </td>
                <td class="py-4 text-sm font-medium text-gray-600">
                  {{ data.tenHangMuc }}
                </td>
                <td class="py-4">
                  <nz-tag
                    nzColor="blue"
                    class="rounded-full border-none px-3 font-bold text-[10px] uppercase tracking-wider"
                  >
                    {{ data.tenTanSuatBaoTri }}
                  </nz-tag>
                </td>
                <td class="py-4">
                  <div class="text-xs text-gray-500">
                    Từ:
                    <span class="text-gray-800 font-bold">{{
                      data.ngayBatDau | date: 'dd/MM/yyyy'
                    }}</span>
                  </div>
                  <div class="text-xs text-gray-500">
                    Đến:
                    <span class="text-gray-800 font-bold">{{
                      data.ngayKetThuc | date: 'dd/MM/yyyy'
                    }}</span>
                  </div>
                </td>
                <td class="py-4">
                  <div
                    class="text-[10px] font-bold text-gray-400 tracking-tighter"
                  >
                    Gần nhất:
                    <span class="text-gray-600">{{
                      data.ngayBaoTriGanNhat | date: 'dd/MM/yyyy'
                    }}</span>
                  </div>
                  <div
                    class="text-[10px] font-bold text-indigo-400 tracking-tighter"
                  >
                    Tiếp theo:
                    <span class="text-indigo-600">{{
                      data.ngayBaoTriTiepTheo | date: 'dd/MM/yyyy'
                    }}</span>
                  </div>
                </td>
                <td class="py-4">
                  <nz-badge
                    [nzStatus]="data.isActive ? 'success' : 'default'"
                    [nzText]="data.isActive ? 'Đang kích hoạt' : 'Ngừng'"
                  ></nz-badge>
                </td>
                <td class="py-4 text-right pr-6">
                  <button
                    nz-button
                    nzType="text"
                    (click)="openForm(data)"
                    class="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <i nz-icon nzType="edit" class="text-lg"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </nz-table>
        </app-scroll-table>
      </div>
    </div>
  `,
})
export class LichBaoTriListComponent implements OnInit {
  loading = false;
  items: any[] = [];

  thietBiId: number | null = null;
  hangMucId: number | null = null;

  pageSize = 10;
  pageNumber = 1;
  totalItems = 0;

  thietBiOptions: any[] = [];
  hangMucOptions: any[] = [];

  constructor(
    private baoTriService: BaoTriService,
    private notification: NzNotificationService,
    private modal: NzModalService,
  ) {}

  ngOnInit(): void {
    this.loadOptions();
    this.load();
  }

  loadOptions(): void {
    this.baoTriService
      .getThietBiList({
        pageNumber: 1,
        pageSize: 1000,
        sortCol: 'id',
        isAsc: false,
      })
      .subscribe((res) => {
        this.thietBiOptions = res.result?.items || [];
      });
    this.baoTriService
      .getHangMucList({
        pageNumber: 1,
        pageSize: 1000,
        sortCol: 'id',
        isAsc: false,
      })
      .subscribe((res) => {
        this.hangMucOptions = res.result?.items || [];
      });
  }

  load(): void {
    this.loading = true;
    const query = {
      thietBiId: this.thietBiId,
      hangMucId: this.hangMucId,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sortCol: 'id',
      isAsc: false,
    };

    this.baoTriService.getLichBaoTriList(query).subscribe({
      next: (res: ApiResponse<any>) => {
        this.items = res.result?.items || [];
        this.totalItems = res.result?.pagingInfo?.totalItems || 0;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notification.error('Lỗi', 'Không thể tải danh sách lịch bảo trì');
      },
    });
  }

  onPageChange(page: number): void {
    this.pageNumber = page;
    this.load();
  }

  openForm(item?: any): void {
    const modal = this.modal.create({
      nzTitle: item ? 'Cập nhật lịch bảo trì' : 'Thiết lập lịch bảo trì mới',
      nzContent: LichBaoTriFormComponent,
      nzComponentParams: {
        item,
        thietBiOptions: this.thietBiOptions,
        hangMucOptions: this.hangMucOptions,
      },
      nzFooter: null,
      nzWidth: 600,
    });

    modal.afterClose.subscribe((res) => {
      if (res) this.load();
    });
  }

  quetLich(): void {
    this.modal.confirm({
      nzTitle: 'Xác nhận quét lịch',
      nzContent:
        'Hệ thống sẽ kiểm tra các lịch bảo trì đến hạn và tự động sinh phiếu bảo trì dự thảo. Bạn có muốn tiếp tục?',
      nzOnOk: () => {
        this.loading = true;
        this.baoTriService.quetLichBaoTri().subscribe({
          next: (res: ApiResponse<any>) => {
            if (res.isOk) {
              this.notification.success(
                'Thành công',
                'Đã quét lịch và sinh phiếu bảo trì dự thảo',
              );
              this.load();
            }
            this.loading = false;
          },
          error: () => (this.loading = false),
        });
      },
    });
  }

  getTanSuatLabel(id: number): string {
    const maps: any = {
      1: 'Hàng tuần',
      2: 'Hàng tháng',
      3: 'Hàng quý',
      4: 'Hàng năm',
      5: '6 tháng/lần',
    };
    return maps[id] || 'Định kỳ';
  }
}
