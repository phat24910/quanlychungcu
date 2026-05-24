import { Component, Input, OnInit, Optional } from '@angular/core';
import { BaoTriService } from '@features/bao-tri/data-access';
import { ApiResponse } from '@features/dich-vu/data-access';
import { DoiTacApiService } from '@features/doi-tac/data-access';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-phieu-bao-tri-detail',
  templateUrl: './phieu-bao-tri-detail.component.html',
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
    @Optional() public modalRef?: NzModalRef,
    @Optional() public drawerRef?: NzDrawerRef,
  ) {}

  ngOnInit(): void {
    this.load();
    this.loadContracts();
  }

  close(): void {
    if (this.modalRef) {
      this.modalRef.destroy();
    } else if (this.drawerRef) {
      this.drawerRef.close();
    }
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
