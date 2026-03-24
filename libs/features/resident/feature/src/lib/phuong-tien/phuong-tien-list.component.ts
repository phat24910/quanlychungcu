import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChungCuService } from '@features/resident/data-access';
import { forkJoin } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TaoTheFormComponent } from './tao-the-form.component';
import { PhuongTienFormComponent } from './phuong-tien-form.component';
import { TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-phuong-tien-list',
  templateUrl: './phuong-tien-list.component.html',
  styleUrls: ['./phuong-tien-list.component.scss']
})
export class PhuongTienListComponent implements OnInit {
  items: any[] = [];
  loading = false;
  pageSize = 10;
  pageNumber = 1;
  total = 0;
  // search / filters / sort
  keyword = '';
  maToaNha = '';
  maTang = '';
  maCanHo = '';
  loaiPhuongTienId: number | null = null;
  mauXe = '';
  trangThaiPhuongTienId: number | null = null;
  sortCol: string | null = null;
  isAsc = true;

  // selection
  listOfCurrentPageData: readonly any[] = [];
  setOfCheckedId = new Set<number>();
  checked = false;
  indeterminate = false;

  // catalog options
  loaiPhuongTienOptions: any[] = [];
  loaiDict: { [id: number]: any } = {};

  trangThaiOptions: any[] = [];
  trangThaiDict: { [id: number]: any } = {};
  trangThaiColorDict: { [id: number]: string } = {};
  selectedTrangThaiId: number | null = null;
  @ViewChild('bulkStatusTpl', { static: true }) bulkStatusTpl!: TemplateRef<any>;

  @ViewChild(PhuongTienFormComponent) formComp?: PhuongTienFormComponent;

  advancedVisible = false;
  isModalVisible = false;
  modalTitle = '';
  editingId?: number;
  saving = false;

  // chi tiet the theo tung phuong tien
  cardModalVisible = false;
  cardModalLoading = false;
  selectedPhuongTien: any | null = null;

  constructor(
    private svc: ChungCuService,
    public route: ActivatedRoute,
    private router: Router,
    private modal: NzModalService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.loadCatalogs();
    this.route.queryParams.subscribe(q => this.load(q));
  }

  private loadCatalogs(): void {
    this.svc.getLoaiPhuongTienForSelector().subscribe(r => {
      if (r && r.isOk && Array.isArray(r.result)) {
        this.loaiPhuongTienOptions = r.result;
        const dict: { [id: number]: any } = {};
        for (const it of this.loaiPhuongTienOptions) if (it && it.id != null) dict[it.id] = it;
        this.loaiDict = dict;
      }
    });

    this.svc.getTrangThaiPhuongTienForSelector().subscribe(r => {
      if (r && r.isOk && Array.isArray(r.result)) {
        this.trangThaiOptions = r.result;
        const dict: { [id: number]: any } = {};
        for (const it of this.trangThaiOptions) if (it && it.id != null) dict[it.id] = it;
        this.trangThaiDict = dict;
        const colorMapById: { [id: number]: string } = {};
        for (const t of this.trangThaiOptions) {
          if (!t || t.id == null) continue;
          const name = (t.name || t.ten || '').toLowerCase();
          if (name.includes('chờ') || name.includes('cho')) colorMapById[t.id] = 'orange';
          else if (name.includes('đã duyệt') || name.includes('da duyet') || name.includes('đã')) colorMapById[t.id] = 'green';
          else if (name.includes('từ chối') || name.includes('tu choi') || name.includes('từ')) colorMapById[t.id] = 'red';
          else if (name.includes('vô hiệu') || name.includes('vo hieu') || name.includes('vô')) colorMapById[t.id] = 'default';
          else colorMapById[t.id] = 'default';
        }
        this.trangThaiColorDict = colorMapById;
      }
    });
  }



  getTrangThaiClass(trangThaiPhuongTienId: number | null | undefined, ten?: string): string {
    if (trangThaiPhuongTienId != null && this.trangThaiColorDict[trangThaiPhuongTienId]) {
      const c = this.trangThaiColorDict[trangThaiPhuongTienId];
      return `status-tag status--${c}`;
    }
    const name = (ten || '').toLowerCase();
    if (name.includes('chờ') || name.includes('cho')) return 'status-tag status--orange';
    if (name.includes('đã') || name.includes('da')) return 'status-tag status--green';
    if (name.includes('từ') || name.includes('tu')) return 'status-tag status--red';
    if (name.includes('vô') || name.includes('vo')) return 'status-tag status--default';
    return 'status-tag status--default';
  }

  // class cho trạng thái thẻ (card)
  getCardClass(the: any): string {
    return this.isCardActive(the) ? 'status-tag status--green' : 'status-tag status--default';
  }

  load(queryParams: any = {}): void {
    const q: any = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      toaNhaId: queryParams.toaNhaId,
      tangId: queryParams.tangId,
      canHoId: queryParams.canHoId,
      keyword: this.keyword || undefined,
      maToaNha: this.maToaNha || undefined,
      maTang: this.maTang || undefined,
      maCanHo: this.maCanHo || undefined,
      loaiPhuongTienId: this.loaiPhuongTienId || undefined,
      mauXe: this.mauXe || undefined,
      trangThaiPhuongTienId: this.trangThaiPhuongTienId || undefined,
      sortCol: this.sortCol || undefined,
      isAsc: this.sortCol ? this.isAsc : undefined
    };
    this.loading = true;
    this.svc.getPhuongTienList(q).subscribe(r => {
      this.loading = false;
      if (r && r.isOk && r.result) {
        this.items = r.result.items || [];
        const pi = r.result.pagingInfo;
        if (pi) {
          this.pageSize = pi.pageSize || this.pageSize;
          this.pageNumber = pi.pageNumber || this.pageNumber;
          this.total = pi.totalItems || 0;
        } else {
          this.total = r.result.pagingInfo?.totalItems || 0;
        }
      } else {
        this.items = [];
        this.total = 0;
      }
    });
  }

  onSearch(): void {
    this.pageNumber = 1;
    this.load(this.route.snapshot.queryParams);
  }

  onRefresh(): void {
    this.keyword = '';
    this.maToaNha = '';
    this.maTang = '';
    this.maCanHo = '';
    this.loaiPhuongTienId = null;
    this.mauXe = '';
    this.trangThaiPhuongTienId = null;
    this.sortCol = null;
    this.isAsc = true;
    this.pageNumber = 1;
    this.setOfCheckedId.clear();
    this.load(this.route.snapshot.queryParams);
  }

  onPageChange(page: number): void {
    this.pageNumber = page;
    this.load(this.route.snapshot.queryParams);
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageNumber = 1;
    this.load(this.route.snapshot.queryParams);
  }

  onSort(col: string): void {
    if (this.sortCol === col) this.isAsc = !this.isAsc;
    else {
      this.sortCol = col;
      this.isAsc = true;
    }
    this.pageNumber = 1;
    this.load(this.route.snapshot.queryParams);
  }

  onSortSelect(col: string | null): void {
    if (!col) {
      this.sortCol = null;
      this.isAsc = true;
      this.pageNumber = 1;
      this.load(this.route.snapshot.queryParams);
      return;
    }
    if (this.sortCol === col) this.isAsc = !this.isAsc;
    else {
      this.sortCol = col;
      this.isAsc = true;
    }
    this.pageNumber = 1;
    this.load(this.route.snapshot.queryParams);
  }

  openAdvanced(): void {
    this.advancedVisible = true;
  }

  closeAdvanced(): void {
    this.advancedVisible = false;
  }

  applyAdvanced(): void {
    this.pageNumber = 1;
    this.advancedVisible = false;
    this.load(this.route.snapshot.queryParams);
  }

  // selection helpers
  updateCheckedSet(id: number | undefined, checked: boolean): void {
    if (id == null) return;
    if (checked) this.setOfCheckedId.add(id);
    else this.setOfCheckedId.delete(id);
  }

  onItemChecked(id: number | undefined, checked: boolean): void {
    if (id == null) return;
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet((item as any).id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly any[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has((item as any).id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has((item as any).id)) && !this.checked;
  }

  create(): void {
    this.openCreateModal();
  }

  edit(id: number): void {
    this.editPhuongTien(id);
  }

  editPhuongTien(id?: number): void {
    if (!id) return;
    this.editingId = id;
    this.modalTitle = 'Cập nhật phương tiện';
    this.isModalVisible = true;
  }

  openCreateModal(): void {
    this.editingId = undefined;
    this.modalTitle = 'Tạo phương tiện';
    this.isModalVisible = true;
  }

  cancelModal(): void {
    this.isModalVisible = false;
    this.saving = false;
  }

  onModalOk(): void {
    this.saving = true;
    this.formComp?.submit();
  }

  onSaved(): void {
    this.saving = false;
    this.isModalVisible = false;
    this.load(this.route.snapshot.queryParams);
    if (this.editingId) {
      this.notification.success('Thành công', 'Cập nhật phương tiện thành công');
    } else {
      this.notification.success('Thành công', 'Tạo phương tiện thành công');
    }
  }

  // Xóa mềm phương tiện
  deleteSelected(): void {
    const ids = Array.from(this.setOfCheckedId);
    if (!ids.length) {
      this.notification.warning('Thông báo', 'Chưa chọn phương tiện nào');
      return;
    }

    this.modal.confirm({
      nzTitle: 'Xóa phương tiện đã chọn',
      nzContent: `Bạn có chắc chắn muốn xóa ${ids.length} phương tiện?`,
      nzOkText: 'Xóa',
      nzOkDanger: true,
      nzCancelText: 'Hủy',
      nzOnOk: () => {
        this.svc.deletePhuongTien(ids as number[]).subscribe({
          next: res => {
            if (res && res.isOk) {
              this.notification.success('Thành công', 'Xóa phương tiện thành công');
            } else {
              this.notification.warning('Cảnh báo', 'Một số phương tiện có thể chưa được xóa');
            }
            this.setOfCheckedId.clear();
            this.load(this.route.snapshot.queryParams);
          },
          error: () => {
            this.notification.error('Lỗi', 'Xóa phương tiện thất bại');
          }
        });
      }
    });
  }

  deleteOne(id?: number): void {
    if (id == null) return;
    this.modal.confirm({
      nzTitle: 'Xóa phương tiện',
      nzContent: 'Bạn có chắc chắn muốn xóa phương tiện này?',
      nzOkText: 'Xóa',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: 'Hủy',
      nzOnOk: () => this.svc.deletePhuongTien([id!]).subscribe({
        next: res => {
          if (res && res.isOk) this.notification.success('Thành công', 'Xóa phương tiện thành công');
          else this.notification.error('Lỗi', 'Xóa phương tiện thất bại');
          this.load(this.route.snapshot.queryParams);
        },
        error: () => this.notification.error('Lỗi', 'Xóa phương tiện thất bại')
      })
    });
  }

  // Cập nhật trạng thái nhiều phương tiện
  updateTrangThaiSelected(): void {
    const ids = Array.from(this.setOfCheckedId);
    if (!ids.length) {
      this.notification.warning('Thông báo', 'Chưa chọn phương tiện nào');
      return;
    }
    if (!this.selectedTrangThaiId) {
      this.notification.warning('Thông báo', 'Vui lòng chọn trạng thái cần cập nhật');
      return;
    }

    const payload = {
      phuongTienIds: ids,
      trangThaiPhuongTienId: this.selectedTrangThaiId
    };

    this.modal.confirm({
      nzTitle: 'Cập nhật trạng thái',
      nzContent: `Cập nhật trạng thái cho ${ids.length} phương tiện?`,
      nzOkText: 'Xác nhận',
      nzCancelText: 'Hủy',
      nzOnOk: () => {
        this.svc.updateTrangThaiPhuongTien(payload).subscribe({
          next: res => {
            if (res && res.isOk) this.notification.success('Thành công', 'Cập nhật trạng thái thành công');
            this.load(this.route.snapshot.queryParams);
          },
          error: () => {
            this.load(this.route.snapshot.queryParams);
          }
        });
      }
    });
  }

  // Khóa thẻ cho các phương tiện được chọn
  khoaTheSelected(): void {
    const selectedIds = Array.from(this.setOfCheckedId);
    if (!selectedIds.length) {
      this.notification.warning('Thông báo', 'Chưa chọn phương tiện nào');
      return;
    }
    const ids: number[] = [];
    const missing: number[] = [];

    for (const sid of selectedIds) {
      const it = this.items.find(x => x.id === sid);
      if (it && Array.isArray(it.thePhuongTiens) && it.thePhuongTiens.length) {
        const active = (it.thePhuongTiens || [])
          .filter((x: any) => this.isCardActive(x))
          .map((x: any) => x.id as number)
          .filter((x: any) => x != null);
        ids.push(...active);
      } else {
        missing.push(sid);
      }
    }

    const proceedWithIds = (finalIds: number[]) => {
      if (!finalIds.length) {
        this.notification.info('Thông báo', 'Không có thẻ đang hoạt động trong các phương tiện đã chọn');
        return;
      }
      this.modal.confirm({
        nzTitle: 'Khóa thẻ các phương tiện đã chọn',
        nzContent: `Khóa ${finalIds.length} thẻ đang hoạt động?`,
        nzOkText: 'Khóa thẻ',
        nzOkDanger: true,
        nzCancelText: 'Hủy',
        nzOnOk: () => {
          this.svc.khoaThePhuongTien(finalIds).subscribe({
            next: res => {
              if (res && res.isOk) this.notification.success('Thành công', 'Khóa thẻ thành công');
              this.load(this.route.snapshot.queryParams);
            },
            error: () => {
              this.load(this.route.snapshot.queryParams);
            }
          });
        }
      });
    };

    if (missing.length === 0) {
      proceedWithIds(ids);
      return;
    }

    const calls = missing.map(id => this.svc.getPhuongTienById(id));
    forkJoin(calls).subscribe({
      next: results => {
        for (const r of results) {
          if (r && r.isOk && r.result && Array.isArray(r.result.thePhuongTiens)) {
            const active = (r.result.thePhuongTiens || [])
              .filter((x: any) => this.isCardActive(x))
              .map((x: any) => x.id as number)
              .filter((x: any) => x != null);
            ids.push(...active);
          }
        }
        proceedWithIds(ids);
      },
      error: () => {
        proceedWithIds(ids);
      }
    });
  }

  openBulkStatusModal(): void {
    this.modal.create({
      nzTitle: 'Cập nhật trạng thái cho các phương tiện đã chọn',
      nzContent: this.bulkStatusTpl,
      nzOkText: 'Cập nhật',
      nzOnOk: () => this.updateTrangThaiSelected(),
      nzCancelText: 'Hủy'
    });
  }

  // chi tiet the phuong tien
  private loadSelectedPhuongTien(id: number): void {
    if (!id) return;
    this.cardModalLoading = true;
    this.svc.getPhuongTienById(id).subscribe({
      next: res => {
        this.cardModalLoading = false;
        if (res && res.isOk && res.result) {
          this.selectedPhuongTien = res.result;
        } else {
          this.selectedPhuongTien = null;
          this.notification.error('Lỗi', 'Không lấy được thông tin phương tiện');
        }
      },
      error: () => {
        this.cardModalLoading = false;
        this.selectedPhuongTien = null;
        this.notification.error('Lỗi', 'Không lấy được thông tin phương tiện');
      }
    });
  }

  viewThePhuongTien(it: any): void {
    if (!it || !it.id) return;
    this.cardModalVisible = true;
    this.selectedPhuongTien = { id: it.id };
    this.loadSelectedPhuongTien(it.id);
  }

  closeCardModal(): void {
    this.cardModalVisible = false;
    this.selectedPhuongTien = null;
    this.cardModalLoading = false;
  }

  private refreshSelectedPhuongTien(): void {
    if (!this.selectedPhuongTien || !this.selectedPhuongTien.id) return;
    this.loadSelectedPhuongTien(this.selectedPhuongTien.id);
  }

  // khoa tung the trong danh sach the
  khoaTheThe(the: any): void {
    if (!the || the.id == null) return;
    if (!this.isCardActive(the)) {
      this.notification.info('Thông báo', 'Thẻ này đã bị khóa');
      return;
    }

    this.modal.confirm({
      nzTitle: 'Khóa thẻ',
      nzContent: `Khóa thẻ ${the.maThe}?`,
      nzOkText: 'Khóa thẻ',
      nzOkDanger: true,
      nzCancelText: 'Hủy',
      nzOnOk: () => {
        this.svc.khoaThePhuongTien([the.id]).subscribe({
          next: res => {
            if (res && res.isOk) this.notification.success('Thành công', 'Khóa thẻ thành công');
            this.refreshSelectedPhuongTien();
            this.load(this.route.snapshot.queryParams);
          },
          error: () => {
            this.refreshSelectedPhuongTien();
            this.load(this.route.snapshot.queryParams);
          }
        });
      }
    });
  }

  // Tạo thẻ cho 1 phương tiện
  taoThe(it: any): void {
    const ref = this.modal.create({
      nzTitle: `Gán thẻ cho phương tiện #${it.id}`,
      nzContent: TaoTheFormComponent,
      nzComponentParams: {
        phuongTienId: it.id
      },
      nzFooter: null
    });

    ref.afterClose.subscribe((ok: any) => {
      if (ok === true) {
        this.refreshSelectedPhuongTien();
        this.load(this.route.snapshot.queryParams);
      }
    });
  }

  // Khóa các thẻ đang hoạt động của một phương tiện
  khoaThe(it: any): void {
    const activeCards = (it.thePhuongTiens || []).filter((x: any) => this.isCardActive(x));
    const ids = activeCards.map((x: any) => x.id as number).filter((x: any) => x != null);
    if (!ids.length) {
      this.notification.info('Thông báo', 'Phương tiện này không có thẻ đang hoạt động');
      return;
    }

    this.modal.confirm({
      nzTitle: 'Khóa thẻ phương tiện',
      nzContent: `Khóa ${ids.length} thẻ đang hoạt động của phương tiện này?`,
      nzOkText: 'Khóa thẻ',
      nzOkDanger: true,
      nzCancelText: 'Hủy',
      nzOnOk: () => {
        this.svc.khoaThePhuongTien(ids).subscribe({
          next: res => {
            if (res && res.isOk) this.notification.success('Thành công', 'Khóa thẻ thành công');
            this.load(this.route.snapshot.queryParams);
          },
          error: () => {
            this.load(this.route.snapshot.queryParams);
          }
        });
      }
    });
  }

  isCardActive(the: any): boolean {
    if (!the) return false;
    if (typeof the.isActive === 'boolean') return the.isActive;
    if (typeof the.isLocked === 'boolean') return !the.isLocked;
    return false;
  }

}
