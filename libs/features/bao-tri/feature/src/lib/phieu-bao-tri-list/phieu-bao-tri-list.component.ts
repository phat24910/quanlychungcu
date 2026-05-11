import { Component, OnInit } from '@angular/core';
import { BaoTriService } from '@features/bao-tri/data-access';
import { ApiResponse } from '@features/dich-vu/data-access';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PhieuBaoTriDetailComponent } from './phieu-bao-tri-detail.component';
import { PhieuBaoTriFormComponent } from './phieu-bao-tri-form.component';

@Component({
  selector: 'app-phieu-bao-tri-list',
  template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2
            class="text-2xl font-black text-gray-800 tracking-tight text-indigo-900"
          >
            Phiếu bảo trì hạ tầng
          </h2>
          <p class="text-gray-500 text-sm">
            Quản lý quy trình thực hiện bảo trì, phân công và nghiệm thu.
          </p>
        </div>
        <button
          nz-button
          nzType="primary"
          (click)="openCreate()"
          class="h-10 px-6 rounded-lg bg-indigo-600 border-none font-semibold shadow-sm flex items-center gap-2"
        >
          <i nz-icon nzType="plus-circle"></i> Lập phiếu mới
        </button>
      </div>

      <div
        class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-wrap gap-4 items-end"
      >
        <div class="flex-1 min-w-[250px]">
          <label class="text-[10px] font-semibold text-gray-400 mb-1 block"
            >Tìm kiếm phiếu</label
          >
          <nz-input-group [nzPrefix]="prefixIcon">
            <input
              type="text"
              nz-input
              [(ngModel)]="keyword"
              placeholder="Mã phiếu, tên thiết bị..."
              (keyup.enter)="load()"
              class="rounded-lg h-10 border-gray-200"
            />
          </nz-input-group>
          <ng-template #prefixIcon><i nz-icon nzType="search"></i></ng-template>
        </div>

        <div style="width: 180px">
          <label class="text-[10px] font-semibold text-gray-400 mb-1 block"
            >Trạng thái</label
          >
          <nz-select
            [(ngModel)]="trangThaiPhieuBaoTriId"
            nzAllowClear
            nzPlaceHolder="Tất cả"
            class="w-full rounded-lg"
            (ngModelChange)="load()"
          >
            <nz-option [nzValue]="1" nzLabel="Chờ giao việc"></nz-option>
            <nz-option [nzValue]="2" nzLabel="Đang thực hiện"></nz-option>
            <nz-option [nzValue]="3" nzLabel="Chờ kiểm duyệt"></nz-option>
            <nz-option [nzValue]="4" nzLabel="Hoàn thành"></nz-option>
            <nz-option [nzValue]="5" nzLabel="Đã hủy"></nz-option>
          </nz-select>
        </div>

        <div style="width: 200px">
          <label class="text-[10px] font-semibold text-gray-400 mb-1 block"
            >Thiết bị</label
          >
          <nz-select
            [(ngModel)]="thietBiId"
            nzAllowClear
            nzShowSearch
            nzPlaceHolder="Tất cả"
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
                  Mã phiếu
                </th>
                <th
                  class="bg-gray-50/50 text-[11px] font-bold text-gray-400 py-4"
                >
                  Thiết bị / Hạng mục
                </th>
                <th
                  class="bg-gray-50/50 text-[11px] font-bold text-gray-400 py-4"
                >
                  Ngày thực hiện
                </th>
                <th
                  class="bg-gray-50/50 text-[11px] font-bold text-gray-400 py-4"
                >
                  Đối tác / Phụ trách
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
                <td class="py-4 font-mono text-xs font-bold text-gray-500">
                  {{ data.maPhieu }}
                </td>
                <td class="py-4">
                  <div class="font-bold text-gray-800">
                    {{ data.tenThietBi }}
                  </div>
                  <div class="text-[10px] text-indigo-400 font-bold">
                    {{ data.tenHangMuc }}
                  </div>
                </td>
                <td class="py-4">
                  <div class="text-sm font-medium">
                    DK: {{ data.ngayDuKien | date: 'dd/MM/yyyy' }}
                  </div>
                  <div
                    class="text-[10px] text-gray-400 font-bold"
                    *ngIf="data.ngayThucTe"
                  >
                    TT: {{ data.ngayThucTe | date: 'dd/MM/yyyy' }}
                  </div>
                </td>
                <td class="py-4">
                  <div
                    class="text-sm font-bold text-gray-700"
                    *ngIf="data.tenDoiTac; else internalStaff"
                  >
                    <i nz-icon nzType="solution"></i> {{ data.tenDoiTac }}
                  </div>
                  <ng-template #internalStaff>
                    <span
                      class="text-gray-400 text-xs italic"
                      *ngIf="!data.nhanSuBaoTris?.length"
                      >Chưa phân công</span
                    >
                    <div *ngIf="data.nhanSuBaoTris?.length" class="text-xs">
                      <span
                        *ngFor="let ns of data.nhanSuBaoTris; let last = last"
                        >{{ ns.hoTen }}{{ last ? '' : ', ' }}</span
                      >
                    </div>
                  </ng-template>
                </td>
                <td class="py-4">
                  <nz-tag
                    [nzColor]="getStatusColor(data.trangThaiPhieuBaoTriId)"
                    class="rounded-full border-none px-3 font-bold text-[10px] uppercase tracking-wider"
                  >
                    {{ data.tenTrangThaiPhieuBaoTri }}
                  </nz-tag>
                </td>
                <td class="py-4 text-right pr-6">
                  <button
                    nz-button
                    nzType="text"
                    (click)="openDetail(data)"
                    class="text-indigo-600 hover:bg-indigo-100 rounded-lg"
                  >
                    <i nz-icon nzType="arrow-right"></i>
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
export class PhieuBaoTriListComponent implements OnInit {
  loading = false;
  items: any[] = [];

  keyword = '';
  trangThaiPhieuBaoTriId: number | null = null;
  thietBiId: number | null = null;

  pageSize = 10;
  pageNumber = 1;
  totalItems = 0;

  thietBiOptions: any[] = [];

  constructor(
    private baoTriService: BaoTriService,
    private notification: NzNotificationService,
    private modal: NzModalService,
  ) {}

  ngOnInit(): void {
    this.loadThietBis();
    this.load();
  }

  loadThietBis(): void {
    this.baoTriService
      .getThietBiList({
        pageSize: 1000,
        pageNumber: 1,
        sortCol: 'id',
        isAsc: false,
      })
      .subscribe((res) => {
        this.thietBiOptions = res.result?.items || [];
      });
  }

  load(): void {
    this.loading = true;
    const query = {
      keyword: this.keyword,
      trangThaiPhieuBaoTriId: this.trangThaiPhieuBaoTriId,
      thietBiId: this.thietBiId,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sortCol: 'id',
      isAsc: false,
    };

    this.baoTriService.getPhieuBaoTriList(query).subscribe({
      next: (res: ApiResponse<any>) => {
        this.items = res.result?.items || [];
        this.totalItems = res.result?.pagingInfo?.totalItems || 0;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notification.error('Lỗi', 'Không thể tải danh sách phiếu bảo trì');
      },
    });
  }

  onPageChange(page: number): void {
    this.pageNumber = page;
    this.load();
  }

  openDetail(item: any): void {
    const modal = this.modal.create({
      nzTitle: 'Phiếu bảo trì: ' + item.maPhieu,
      nzContent: PhieuBaoTriDetailComponent,
      nzComponentParams: { phieuId: item.id },
      nzFooter: null,
      nzWidth: 1000,
    });

    modal.afterClose.subscribe((res) => {
      if (res) this.load();
    });
  }

  openCreate(): void {
    const modal = this.modal.create({
      nzTitle: 'Lập phiếu bảo trì mới',
      nzContent: PhieuBaoTriFormComponent,
      nzFooter: null,
      nzWidth: 800,
    });

    modal.afterClose.subscribe((res) => {
      if (res) this.load();
    });
  }

  getStatusColor(statusId: number): string {
    switch (statusId) {
      case 1:
        return 'blue';
      case 2:
        return 'orange';
      case 3:
        return 'cyan';
      case 4:
        return 'green';
      case 5:
        return 'red';
      default:
        return 'default';
    }
  }
}
