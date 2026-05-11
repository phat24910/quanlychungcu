import { Component, Input, OnInit } from '@angular/core';
import { BaoTriService } from '@features/bao-tri/data-access';
import { ApiResponse } from '@features/dich-vu/data-access';
import { DoiTacApiService } from '@features/doi-tac/data-access';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-phieu-bao-tri-detail',
  template: `
    <div *ngIf="loading" class="flex justify-center p-20">
      <nz-spin nzSimple nzSize="large"></nz-spin>
    </div>

    <div *ngIf="data && !loading" class="p-2 max-h-[85vh] overflow-y-auto">
      <div class="flex justify-between items-start mb-6 border-b pb-4">
        <div class="flex items-center gap-4">
          <div
            class="h-12 w-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg"
          >
            <i nz-icon nzType="tool" class="text-2xl"></i>
          </div>
          <div>
            <h3
              class="text-xl font-black text-indigo-900 leading-none mb-1 uppercase tracking-tight"
            >
              {{ data.tenThietBi }}
            </h3>
            <p
              class="text-xs text-gray-500 font-bold uppercase tracking-widest"
            >
              {{ data.tenHangMuc }} • {{ data.maPhieu }}
            </p>
          </div>
        </div>
        <div class="text-right">
          <nz-tag
            [nzColor]="data.trangThaiPhieuBaoTriId === 4 ? 'green' : 'blue'"
            class="rounded-full px-4 py-1 border-none font-black text-[11px] uppercase tracking-widest mb-1 block"
          >
            {{ data.tenTrangThaiPhieuBaoTri }}
          </nz-tag>
          <span class="text-[10px] text-gray-400 font-bold"
            >Ngày lập: {{ data.ngayLapPhieu | date: 'dd/MM/yyyy HH:mm' }}</span
          >
        </div>
      </div>

      <nz-tabset
        [nzSelectedIndex]="activeTab"
        (nzSelectedIndexChange)="activeTab = $any($event)"
      >
        <nz-tab nzTitle="Thông tin chung">
          <div class="grid grid-cols-3 gap-6 mt-4">
            <div class="col-span-2 space-y-6">
              <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h4
                  class="text-[11px] font-black text-indigo-400 uppercase tracking-widest mb-4"
                >
                  Chi tiết công việc
                </h4>
                <nz-descriptions [nzColumn]="2">
                  <nz-descriptions-item nzTitle="Thiết bị">{{
                    data.tenThietBi
                  }}</nz-descriptions-item>
                  <nz-descriptions-item nzTitle="Mã thiết bị">{{
                    data.maThietBi
                  }}</nz-descriptions-item>
                  <nz-descriptions-item nzTitle="Vị trí">{{
                    data.viTri || 'Chưa cập nhật'
                  }}</nz-descriptions-item>
                  <nz-descriptions-item nzTitle="Hạng mục">{{
                    data.tenHangMuc
                  }}</nz-descriptions-item>
                </nz-descriptions>
              </div>

              <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h4
                  class="text-[11px] font-black text-indigo-400 uppercase tracking-widest mb-4"
                >
                  Nhân sự thực hiện
                </h4>
                <div
                  *ngIf="!data.tenDoiTac && !data.nhanSuBaoTris?.length"
                  class="text-gray-400 italic text-sm"
                >
                  Chưa có nhân sự được phân công.
                </div>

                <div
                  *ngIf="data.tenDoiTac"
                  class="flex items-center gap-3 bg-white p-3 rounded-xl border border-indigo-50 mb-3"
                >
                  <div
                    class="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600"
                  >
                    <i nz-icon nzType="solution"></i>
                  </div>
                  <div>
                    <div class="font-bold text-gray-800">
                      {{ data.tenDoiTac }}
                    </div>
                    <div class="text-[10px] text-gray-400 font-bold uppercase">
                      Đối tác dịch vụ • HD: {{ data.soHopDong }}
                    </div>
                  </div>
                </div>

                <div
                  *ngIf="data.nhanSuBaoTris?.length"
                  class="grid grid-cols-2 gap-3"
                >
                  <div
                    *ngFor="let ns of data.nhanSuBaoTris"
                    class="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100"
                  >
                    <div
                      class="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs"
                    >
                      {{ ns.hoTen.charAt(0) }}
                    </div>
                    <div>
                      <div class="text-sm font-bold text-gray-800">
                        {{ ns.hoTen }}
                      </div>
                      <div class="text-[10px] text-gray-400 font-bold">
                        {{ ns.vaiTro }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-6">
              <div class="bg-indigo-900 p-6 rounded-2xl text-white shadow-xl">
                <h4
                  class="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-4"
                >
                  Lịch trình & Chi phí
                </h4>
                <div class="space-y-4">
                  <div>
                    <label class="text-[10px] text-indigo-300 block mb-1"
                      >NGÀY DỰ KIẾN</label
                    >
                    <div class="text-lg font-black">
                      {{ data.ngayDuKien | date: 'dd/MM/yyyy' }}
                    </div>
                  </div>
                  <div>
                    <label class="text-[10px] text-indigo-300 block mb-1"
                      >NGÀY THỰC TẾ</label
                    >
                    <div class="text-lg font-black">
                      {{
                        (data.ngayThucTe | date: 'dd/MM/yyyy') || '--/--/----'
                      }}
                    </div>
                  </div>
                  <nz-divider class="bg-indigo-800 my-4"></nz-divider>
                  <div>
                    <label class="text-[10px] text-indigo-300 block mb-1"
                      >TỔNG CHI PHÍ THỰC TẾ</label
                    >
                    <div class="text-2xl font-black text-yellow-400">
                      {{ data.chiPhiThucTe | number }} đ
                    </div>
                  </div>
                </div>
              </div>

              <div
                *ngIf="data.trangThaiPhieuBaoTriId === 1"
                class="bg-white p-6 rounded-2xl border-2 border-dashed border-indigo-100"
              >
                <h4
                  class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3"
                >
                  Phân công công việc
                </h4>
                <nz-select
                  [(ngModel)]="selectedHopDongId"
                  nzPlaceHolder="Chọn đối tác thực hiện"
                  class="w-full mb-4 rounded-lg"
                >
                  <nz-option
                    *ngFor="let h of hopDongOptions"
                    [nzValue]="h.id"
                    [nzLabel]="h.tenDoiTac + ' (' + h.soHopDong + ')'"
                  ></nz-option>
                </nz-select>
                <button
                  nz-button
                  nzType="primary"
                  block
                  (click)="assign()"
                  class="bg-indigo-600 border-none font-bold rounded-lg h-10"
                >
                  XÁC NHẬN PHÂN CÔNG
                </button>
              </div>
            </div>
          </div>
        </nz-tab>

        <nz-tab nzTitle="Tiến độ & Checklist">
          <div class="mt-4 space-y-6">
            <div
              class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
            >
              <div class="flex justify-between items-center mb-4">
                <h4
                  class="text-[11px] font-black text-indigo-900 uppercase tracking-widest"
                >
                  Nội dung kiểm tra (Checklist)
                </h4>
                <span class="text-[10px] font-bold text-gray-400 uppercase"
                  >{{ data.checklists?.length || 0 }} ĐẦU VIỆC</span
                >
              </div>

              <div class="space-y-2">
                <div
                  *ngFor="let c of data.checklists"
                  class="flex items-center gap-4 p-3 rounded-xl border border-gray-50 hover:border-indigo-100 transition-all"
                >
                  <label
                    nz-checkbox
                    [(ngModel)]="c.datYeuCau"
                    [disabled]="data.trangThaiPhieuBaoTriId > 2"
                  ></label>
                  <div class="flex-1">
                    <div class="text-sm font-bold text-gray-700">
                      {{ c.noiDungChecklist }}
                    </div>
                    <input
                      *ngIf="data.trangThaiPhieuBaoTriId <= 2"
                      nz-input
                      nzSize="small"
                      [(ngModel)]="c.ghiChuThucTe"
                      placeholder="Ghi chú thực tế..."
                      class="text-[10px] mt-1 border-none bg-gray-50 p-1 px-2 rounded-lg"
                    />
                    <div
                      *ngIf="data.trangThaiPhieuBaoTriId > 2"
                      class="text-[10px] text-gray-400 italic mt-1"
                    >
                      {{ c.ghiChuThucTe }}
                    </div>
                  </div>
                  <div
                    class="h-10 w-10 bg-gray-50 rounded flex items-center justify-center text-gray-300 cursor-pointer hover:text-indigo-600 border border-dashed border-gray-200"
                  >
                    <i nz-icon nzType="camera"></i>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
            >
              <div class="flex justify-between items-center mb-4">
                <h4
                  class="text-[11px] font-black text-indigo-900 uppercase tracking-widest"
                >
                  Vật tư & Linh kiện thay thế
                </h4>
                <button
                  *ngIf="data.trangThaiPhieuBaoTriId <= 2"
                  nz-button
                  nzType="text"
                  (click)="addVatTu()"
                  class="text-indigo-600 font-bold text-xs tracking-tight"
                >
                  <i nz-icon nzType="plus"></i> THÊM VẬT TƯ
                </button>
              </div>

              <nz-table
                #vtTable
                [nzData]="data.vatTus || []"
                nzSize="small"
                [nzShowPagination]="false"
              >
                <thead>
                  <tr>
                    <th>Tên vật tư</th>
                    <th nzWidth="100px" class="text-center">Số lượng</th>
                    <th nzWidth="150px" class="text-right">Đơn giá</th>
                    <th nzWidth="150px" class="text-right">Thành tiền</th>
                    <th
                      *ngIf="data.trangThaiPhieuBaoTriId <= 2"
                      nzWidth="50px"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let v of vtTable.data; let i = index">
                    <td>
                      <input
                        nz-input
                        [(ngModel)]="v.tenVatTu"
                        [disabled]="data.trangThaiPhieuBaoTriId > 2"
                        class="border-none bg-transparent rounded-lg"
                      />
                    </td>
                    <td class="text-center">
                      <nz-input-number
                        [(ngModel)]="v.soLuong"
                        [nzMin]="1"
                        [nzDisabled]="data.trangThaiPhieuBaoTriId > 2"
                        class="w-full rounded-lg"
                      ></nz-input-number>
                    </td>
                    <td class="text-right">
                      <nz-input-number
                        [(ngModel)]="v.donGia"
                        [nzMin]="0"
                        [nzStep]="1000"
                        [nzDisabled]="data.trangThaiPhieuBaoTriId > 2"
                        class="w-full rounded-lg"
                      ></nz-input-number>
                    </td>
                    <td class="text-right font-bold">
                      {{ v.soLuong * v.donGia | number }} đ
                    </td>
                    <td *ngIf="data.trangThaiPhieuBaoTriId <= 2">
                      <button
                        nz-button
                        nzType="text"
                        nzDanger
                        (click)="removeVatTu(i)"
                      >
                        <i nz-icon nzType="delete"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </nz-table>
              <div class="text-right mt-4 pt-4 border-t">
                <span class="text-xs text-gray-400 font-bold mr-4"
                  >TỔNG CỘNG VẬT TƯ:</span
                >
                <span class="text-xl font-black text-indigo-600"
                  >{{ getTotalChiPhi() | number }} đ</span
                >
              </div>
            </div>

            <div
              class="flex justify-end gap-3"
              *ngIf="data.trangThaiPhieuBaoTriId <= 2"
            >
              <button
                nz-button
                nzType="primary"
                (click)="updateProgress()"
                [nzLoading]="submittingProgress"
                class="h-12 px-10 rounded-xl bg-indigo-600 border-none font-bold shadow-lg shadow-indigo-100 uppercase tracking-widest text-[11px]"
              >
                LƯU TIẾN ĐỘ THỰC TẾ
              </button>
            </div>
          </div>
        </nz-tab>
      </nz-tabset>

      <div class="flex justify-between items-center mt-10 pt-6 border-t">
        <div>
          <button
            *ngIf="data.trangThaiPhieuBaoTriId < 4"
            nz-button
            nzType="text"
            nzDanger
            class="font-bold text-xs tracking-widest uppercase"
          >
            HỦY PHIẾU NÀY
          </button>
        </div>
        <div class="flex gap-3">
          <button
            nz-button
            (click)="modalRef.destroy()"
            class="rounded-xl px-8 h-12 font-bold"
          >
            ĐÓNG
          </button>
          <div *ngIf="data.trangThaiPhieuBaoTriId === 3" class="flex gap-2">
            <button
              nz-button
              nzDanger
              (click)="approve(false)"
              class="rounded-xl px-8 h-12 font-bold uppercase tracking-widest text-[11px]"
            >
              TỪ CHỐI
            </button>
            <button
              nz-button
              nzType="primary"
              (click)="approve(true)"
              class="rounded-xl px-8 h-12 bg-emerald-600 border-none font-bold uppercase tracking-widest text-[11px] shadow-lg shadow-emerald-100"
            >
              NGHIỆM THU HOÀN TẤT
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class PhieuBaoTriDetailComponent implements OnInit {
  @Input() phieuId!: number;

  loading = false;
  data: any = null;

  activeTab = 0;

  // For Assignment
  hopDongOptions: any[] = [];
  selectedHopDongId: number | null = null;

  // For Progress Update
  submittingProgress = false;

  constructor(
    private baoTriService: BaoTriService,
    private doiTacService: DoiTacApiService,
    private notification: NzNotificationService,
    private modal: NzModalService,
    public modalRef: NzModalRef,
  ) {}

  ngOnInit(): void {
    this.load();
    this.loadContracts();
  }

  load(): void {
    this.loading = true;
    this.baoTriService.getPhieuBaoTriById(this.phieuId).subscribe({
      next: (res: ApiResponse<any>) => {
        this.data = res.result;
        this.selectedHopDongId = this.data.hopDongDoiTacId;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  loadContracts(): void {
    // This usually needs a selector or listing all active maintenance contracts
    // For simplicity, we use the catalog or similar.
    // Let's assume we fetch from doi-tac-service
  }

  assign(): void {
    const payload = {
      id: this.phieuId,
      hopDongDoiTacId: this.selectedHopDongId,
      ngayDuKien: this.data.ngayDuKien,
      nhanSus: [], // Can add internal staff selection here
    };

    this.baoTriService.phanCongPhieuBaoTri(payload).subscribe((res) => {
      if (res.isOk) {
        this.notification.success('Thành công', 'Đã phân công công việc');
        this.load();
      }
    });
  }

  updateProgress(): void {
    const payload = {
      id: this.phieuId,
      ghiChuXuLy: this.data.ghiChuXuLy,
      checklists: this.data.checklists.map((c: any) => ({
        checklistId: c.id,
        isDatYeuCau: c.datYeuCau,
        ghiChuThucTe: c.ghiChuThucTe,
        anhMinhHoaId: c.anhMinhHoaId,
      })),
      vatTus: this.data.vatTus.map((v: any) => ({
        tenVatTu: v.tenVatTu,
        soLuong: v.soLuong,
        donGia: v.donGia,
      })),
    };

    this.submittingProgress = true;
    this.baoTriService.capNhatTienDoPhieuBaoTri(payload).subscribe({
      next: (res) => {
        if (res.isOk) {
          this.notification.success(
            'Thành công',
            'Đã cập nhật tiến độ thực tế',
          );
          this.load();
        }
        this.submittingProgress = false;
      },
      error: () => (this.submittingProgress = false),
    });
  }

  approve(isDuyet: boolean): void {
    this.modal.confirm({
      nzTitle: isDuyet ? 'Xác nhận nghiệm thu' : 'Từ chối nghiệm thu',
      nzContent: `Bạn có chắc chắn muốn \${isDuyet ? 'phê duyệt hoàn thành' : 'từ chối'} phiếu bảo trì này?`,
      nzOnOk: () => {
        this.baoTriService
          .kiemDuyetPhieuBaoTri({ id: this.phieuId, isDuyet, ghiChuXuLy: '' })
          .subscribe((res) => {
            if (res.isOk) {
              this.notification.success(
                'Thành công',
                isDuyet ? 'Đã hoàn tất nghiệm thu' : 'Đã từ chối',
              );
              this.load();
            }
          });
      },
    });
  }

  addVatTu(): void {
    if (!this.data.vatTus) this.data.vatTus = [];
    this.data.vatTus.push({ tenVatTu: '', soLuong: 1, donGia: 0 });
  }

  removeVatTu(index: number): void {
    this.data.vatTus.splice(index, 1);
  }

  getTotalChiPhi(): number {
    return (this.data?.vatTus || []).reduce(
      (acc: number, cur: any) => acc + cur.soLuong * cur.donGia,
      0,
    );
  }
}
