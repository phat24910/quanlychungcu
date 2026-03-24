import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChungCuService } from '@features/resident/data-access';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthApiService } from '@features/auth/data-access';
import { ProfileApiService } from '@features/profile/data-access';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-quan-he-cu-tru',
  templateUrl: './quan-he-cu-tru.component.html',
  styleUrls: ['./quan-he-cu-tru.component.scss']
})
export class QuanHeCuTruComponent implements OnInit, OnDestroy {
  items: any[] = [];
  loading = false;

  pageNumber = 1;
  pageSize = 10;
  totalItems = 0;

  // sắp xếp
  sortCol: string | null = null;
  isAsc = true;

  // bộ lọc nâng cao
  maToaNha = '';
  maTang = '';
  maCanHo = '';

  advancedVisible = false;

  keyword = '';
  loaiQuanHeCuTruId: number | null = null;
  isKetThuc: boolean | null = null;

  ngayBatDauFrom = '';
  ngayBatDauTo = '';
  ngayKetThucFrom = '';
  ngayKetThucTo = '';

  loaiQuanHeOptions: any[] = [];

  // selection / bulk actions
  setOfCheckedId = new Set<number | string>();
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly any[] = [];

  // add / edit resident
  registerForm!: FormGroup;
  registerLoading = false;
  searchLoading = false;
  foundUser: any | null = null;
  currentUserId?: number;
  searchError = '';
  gioiTinhOptions: any[] = [];

  isAddingResident = false;
  selectedLoaiQuanHeCuTruId: number | null = null;
  ngayBatDau: string = '';
  setResidenceLoading = false;

  editingResident: any | null = null;
  editModalVisible = false;
  editForm!: FormGroup;
  editLoading = false;

  private destroy$ = new Subject<void>();

  filterScope: 'root' | 'building' | 'floor' | 'apartment' = 'root';
  toaNhaId?: number;
  toaNhaName = '';
  tangId?: number;
  tangName = '';
  canHoId?: number;

  constructor(
    private route: ActivatedRoute,
    private chungCu: ChungCuService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private modal: NzModalService,
    private authApi: AuthApiService,
    private profileApi: ProfileApiService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      idCard: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gioiTinhId: [null, [Validators.required]],
      diaChi: ['', [Validators.required]]
    });

    this.editForm = this.fb.group({
      quanHeCuTruId: [null, [Validators.required]],
      loaiQuanHeCuTruId: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadLoaiQuanHeCuTruOptions();

    this.route.queryParams.subscribe(params => {
      const scope = params['filterScope'] as any;
      this.filterScope = scope === 'building' || scope === 'floor' || scope === 'apartment' ? scope : 'root';

      this.toaNhaId = params['toaNhaId'] ? Number(params['toaNhaId']) : undefined;
      this.toaNhaName = params['toaNhaName'] || '';
      this.tangId = params['tangId'] ? Number(params['tangId']) : undefined;
      this.tangName = params['tangName'] || '';
      this.canHoId = params['canHoId'] ? Number(params['canHoId']) : undefined;

      this.pageNumber = 1;
      this.loadResidents();
    });
    this.loadGioiTinhOptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadGioiTinhOptions(): void {
    this.profileApi.getGioiTinhForSelector()
      .pipe(takeUntil(this.destroy$))
      .subscribe(r => {
        if (r && r.isOk && Array.isArray(r.result)) this.gioiTinhOptions = r.result;
      });
  }

  private loadLoaiQuanHeCuTruOptions(): void {
    this.chungCu.getLoaiQuanHeCuTruForSelector().subscribe(r => {
      if (r && r.isOk && Array.isArray(r.result)) {
        this.loaiQuanHeOptions = r.result;
      }
    });
  }

  loadResidents(): void {
    this.loading = true;

    const query: any = {
      keyword: this.keyword || undefined,
      maToaNha: this.maToaNha || undefined,
      maTang: this.maTang || undefined,
      maCanHo: this.maCanHo || undefined,
      loaiQuanHeCuTruId: this.loaiQuanHeCuTruId || undefined,
      isKetThuc: this.isKetThuc !== null ? this.isKetThuc : undefined,
      ngayBatDauFrom: this.ngayBatDauFrom || undefined,
      ngayBatDauTo: this.ngayBatDauTo || undefined,
      ngayKetThucFrom: this.ngayKetThucFrom || undefined,
      ngayKetThucTo: this.ngayKetThucTo || undefined,
      sortCol: this.sortCol || undefined,
      isAsc: this.sortCol ? this.isAsc : undefined,
      pageNumber: this.pageNumber || 1,
      pageSize: this.pageSize || 10
    };

    if (this.filterScope === 'building' && this.toaNhaId) {
      query.toaNhaId = this.toaNhaId;
    } else if (this.filterScope === 'floor' && this.tangId) {
      query.tangId = this.tangId;
    } else if (this.filterScope === 'apartment' && this.canHoId) {
      query.canHoId = this.canHoId;
    }

    this.chungCu.getResidentsByCanHo(query).subscribe({
      next: res => {
        this.loading = false;
        if (res && res.isOk) {
          const payload: any = res.result;
          if (payload) {
            if (Array.isArray(payload)) {
              this.items = payload;
              this.totalItems = payload.length;
            } else if (payload.items && Array.isArray(payload.items)) {
              this.items = payload.items;
              this.totalItems = payload.pagingInfo?.totalItems || payload.items.length;
            } else {
              this.items = [];
              this.totalItems = 0;
            }
          } else {
            this.items = [];
            this.totalItems = 0;
          }
        } else {
          this.items = [];
          this.totalItems = 0;
          this.notification.error('Lỗi', 'Không lấy được danh sách cư dân');
        }
      },
      error: () => {
        this.loading = false;
        this.items = [];
        this.totalItems = 0;
        this.notification.error('Lỗi', 'Không lấy được danh sách cư dân');
      }
    });
  }

  refresh(): void {
    this.keyword = '';
    this.maToaNha = '';
    this.maTang = '';
    this.maCanHo = '';
    this.loaiQuanHeCuTruId = null;
    this.isKetThuc = null;
    this.ngayBatDauFrom = '';
    this.ngayBatDauTo = '';
    this.ngayKetThucFrom = '';
    this.ngayKetThucTo = '';
    this.sortCol = null;
    this.isAsc = true;
    this.pageNumber = 1;
    this.loadResidents();
  }

  search(): void {
    this.pageNumber = 1;
    this.loadResidents();
  }

  onPageChange(page: number): void {
    this.pageNumber = page;
    this.loadResidents();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageNumber = 1;
    this.loadResidents();
  }

  openAdvanced(): void {
    this.advancedVisible = true;
  }

  closeAdvanced(): void {
    this.advancedVisible = false;
  }

  applyAdvanced(): void {
    this.pageNumber = 1;
    this.loadResidents();
    this.advancedVisible = false;
  }

  changeSort(col: string): void {
    if (this.sortCol === col) {
      this.isAsc = !this.isAsc;
    } else {
      this.sortCol = col;
      this.isAsc = true;
    }
    this.pageNumber = 1;
    this.loadResidents();
  }

  // selection helpers copied from can-ho-residents
  onCurrentPageDataChange(list: readonly any[]): void {
    this.listOfCurrentPageData = list;
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    if (checked) {
      this.listOfCurrentPageData.forEach(item => this.setOfCheckedId.add(item.quanHeCuTruId || item.userId));
    } else {
      this.listOfCurrentPageData.forEach(item => this.setOfCheckedId.delete(item.quanHeCuTruId || item.userId));
    }
    this.refreshCheckedStatus();
  }

  onItemChecked(id: number | string, checked: boolean): void {
    if (checked) this.setOfCheckedId.add(id); else this.setOfCheckedId.delete(id);
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.length > 0 && this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.quanHeCuTruId || item.userId));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.quanHeCuTruId || item.userId)) && !this.checked;
  }

  onSearchUserByPhone(): void {
    const phone = (this.registerForm.get('phoneNumber')?.value || '').trim();
    if (!phone) { this.searchError = 'Vui lòng nhập số điện thoại.'; return; }
    this.searchError = '';
    this.searchLoading = true;
    this.foundUser = null;
    this.currentUserId = undefined;

    this.chungCu.searchUserForQuanHeCuTru(phone).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        this.searchLoading = false;
        if (res && res.isOk && res.result) {
          this.foundUser = res.result;
          const u: any = res.result;
          this.currentUserId = u.userId ?? u.id;
          try {
            this.registerForm.patchValue({
              username: u.username || '',
              email: u.email || '',
              firstName: u.firstName || u.fullName || '',
              lastName: u.lastName || '',
              phoneNumber: u.phoneNumber || '',
              idCard: u.idCard || '',
              dob: u.dob ? (new Date(u.dob).toISOString().substring(0, 10)) : '',
              gioiTinhId: u.gioiTinhId ?? null,
              diaChi: u.diaChi || ''
            });
          } catch (e) {
          }
          this.selectedLoaiQuanHeCuTruId = null;
          this.ngayBatDau = new Date().toISOString().substring(0, 10);
        } else {
          this.searchError = 'Không tìm thấy người dùng';
        }
      },
      error: () => { this.searchLoading = false; this.searchError = 'Không tìm thấy người dùng'; }
    });
  }

  cancelRegister(): void {
    this.isAddingResident = false;
    this.searchError = '';
    this.foundUser = null;
    this.currentUserId = undefined;
    this.selectedLoaiQuanHeCuTruId = null;
    this.registerForm.reset();
  }

  submitRegister(): void {
    if (this.registerForm.invalid) { this.registerForm.markAllAsTouched(); return; }
    const val = this.registerForm.value;
    const dobIso = val.dob ? new Date(val.dob).toISOString() : new Date().toISOString();

    this.registerLoading = true;
    this.authApi.registerResident({
      username: val.username,
      email: val.email,
      password: val.password,
      firstName: val.firstName,
      lastName: val.lastName,
      phoneNumber: val.phoneNumber,
      idCard: val.idCard,
      dob: dobIso,
      gioiTinhId: val.gioiTinhId,
      diaChi: val.diaChi
    }).pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.registerLoading = false;
      if (res && res.isOk && res.result) {
          this.foundUser = res.result;
          const u: any = res.result;
          this.currentUserId = u.userId ?? u.id;
          try {
            this.registerForm.patchValue({
              username: u.username || '',
              email: u.email || '',
              firstName: u.firstName || u.fullName || '',
              lastName: u.lastName || '',
              phoneNumber: u.phoneNumber || '',
              idCard: u.idCard || '',
              dob: u.dob ? (new Date(u.dob).toISOString().substring(0, 10)) : '',
              gioiTinhId: u.gioiTinhId ?? null,
              diaChi: u.diaChi || ''
            });
          } catch (e) {}
      }
    }, _ => { this.registerLoading = false; });
  }

  setResidence(): void {
    if (!this.currentUserId || !this.selectedLoaiQuanHeCuTruId) { this.searchError = 'Vui lòng chọn loại quan hệ trước khi thiết lập cư trú.'; return; }
    this.searchError = '';
    const payload: any = {
      canHoId: this.canHoId,
      userId: this.currentUserId,
      loaiQuanHeCuTruId: this.selectedLoaiQuanHeCuTruId
    };
    if (this.ngayBatDau) payload.ngayBatDau = new Date(this.ngayBatDau).toISOString();

    this.setResidenceLoading = true;
    this.chungCu.createQuanHeCuTru(payload).pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.setResidenceLoading = false;
      if (res && res.isOk) {
        this.notification.success('Thành công', 'Thiết lập cư trú thành công');
        this.isAddingResident = false;
        this.registerForm.reset();
        this.loadResidents();
      } else {
        this.notification.error('Lỗi', 'Thiết lập cư trú thất bại');
      }
    }, _ => { this.setResidenceLoading = false; this.notification.error('Lỗi', 'Thiết lập cư trú thất bại'); });
  }

  // edit / end residence
  editResident(item: any): void {
    this.editingResident = item;
    this.editForm.reset();
    this.editForm.patchValue({
      quanHeCuTruId: item.quanHeCuTruId || item.userId,
      loaiQuanHeCuTruId: item.loaiQuanHeCuTruId || null
    });
    this.editModalVisible = true;
  }

  submitEdit(): void {
    if (this.editForm.invalid) { this.editForm.markAllAsTouched(); return; }
    const val = this.editForm.value;
    const payload: any = { quanHeCuTruId: val.quanHeCuTruId, loaiQuanHeCuTruId: val.loaiQuanHeCuTruId };
    this.editLoading = true;
    this.chungCu.updateQuanHeCuTru(payload).pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.editLoading = false;
      if (res && res.isOk) {
        this.notification.success('Thành công', 'Cập nhật thành công');
        this.editModalVisible = false;
        this.editingResident = null;
        this.loadResidents();
      } else this.notification.error('Lỗi', 'Cập nhật thất bại');
    }, _ => { this.editLoading = false; this.notification.error('Lỗi', 'Cập nhật thất bại'); });
  }

  closeEdit(): void { this.editModalVisible = false; this.editingResident = null; }

  deleteOne(id?: number | string): void {
    if (id == null) return;
    this.modal.confirm({
      nzTitle: 'Kết thúc cư trú',
      nzContent: 'Bạn có chắc chắn muốn kết thúc cư trú của cư dân này?',
      nzOkText: 'Đồng ý',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: 'Hủy',
      nzOnOk: () => this.chungCu.ketThucQuanHeCuTru(id).pipe(takeUntil(this.destroy$)).subscribe(() => this.loadResidents())
    });
  }

  deleteSelectedMultiple(): void {
    const ids = Array.from(this.setOfCheckedId);
    if (!ids.length) { this.notification.warning('Thông báo', 'Chưa chọn cư dân nào'); return; }
    this.modal.confirm({
      nzTitle: 'Kết thúc cư trú các cư dân đã chọn',
      nzContent: `Bạn có chắc chắn muốn kết thúc cư trú của ${ids.length} cư dân đã chọn?`,
      nzOkText: 'Đồng ý',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: 'Hủy',
      nzOnOk: () => forkJoin(ids.map(id => this.chungCu.ketThucQuanHeCuTru(id))).pipe(takeUntil(this.destroy$)).subscribe(() => this.loadResidents())
    });
  }
}
