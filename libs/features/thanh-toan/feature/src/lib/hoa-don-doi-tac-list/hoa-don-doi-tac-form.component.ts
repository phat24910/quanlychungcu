import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThanhToanService } from '@features/thanh-toan/data-access';
import { DoiTacApiService } from '@features/doi-tac/data-access';
import { ApiResponse } from '@features/dich-vu/data-access';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-hoa-don-doi-tac-form',
  template: `
    <form nz-form [formGroup]="form" (ngSubmit)="submit()" nzLayout="vertical">
      <nz-form-item>
        <nz-form-label
          [nzSm]="6"
          [nzXs]="24"
          class="text-gray-600 font-medium"
          >Đối tác</nz-form-label
        >
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <nz-select
            formControlName="doiTacId"
            nzShowSearch
            (ngModelChange)="onDoiTacChange($event)"
            class="rounded-lg"
          >
            <nz-option
              *ngFor="let o of doiTacOptions"
              [nzValue]="o.id"
              [nzLabel]="o.tenDoiTac"
            ></nz-option>
          </nz-select>
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-label
          [nzSm]="6"
          [nzXs]="24"
          class="text-gray-600 font-medium"
          >Hợp đồng</nz-form-label
        >
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <nz-select
            formControlName="hopDongDoiTacId"
            [nzLoading]="loadingContracts"
            class="rounded-lg"
          >
            <nz-option
              *ngFor="let c of hopDongOptions"
              [nzValue]="c.id"
              [nzLabel]="c.soHopDong + ' - ' + c.tenHopDong"
            ></nz-option>
          </nz-select>
        </nz-form-control>
      </nz-form-item>

      <div class="grid grid-cols-2 gap-4">
        <nz-form-item>
          <nz-form-label
            [nzSm]="12"
            [nzXs]="24"
            class="text-gray-600 font-medium"
            >Tháng</nz-form-label
          >
          <nz-form-control [nzSm]="12" [nzXs]="24">
            <nz-select formControlName="thang" class="rounded-lg h-10">
              <nz-option
                *ngFor="let m of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
                [nzValue]="m"
                [nzLabel]="m"
              ></nz-option>
            </nz-select>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label
            [nzSm]="12"
            [nzXs]="24"
            class="text-gray-600 font-medium"
            >Năm</nz-form-label
          >
          <nz-form-control [nzSm]="12" [nzXs]="24">
            <nz-select formControlName="nam" class="rounded-lg h-10">
              <nz-option
                *ngFor="let y of [2024, 2025, 2026]"
                [nzValue]="y"
                [nzLabel]="y"
              ></nz-option>
            </nz-select>
          </nz-form-control>
        </nz-form-item>
      </div>

      <nz-form-item>
        <nz-form-label
          [nzSm]="6"
          [nzXs]="24"
          class="text-gray-600 font-medium"
          >Số tiền</nz-form-label
        >
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <nz-input-number
            formControlName="soTien"
            [nzMin]="0"
            [nzStep]="100000"
            class="w-full rounded-lg"
            [nzFormatter]="formatterVnd"
            [nzParser]="parserVnd"
          ></nz-input-number>
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" class="text-gray-600 font-medium"
          >Ghi chú</nz-form-label
        >
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <textarea
            nz-input
            formControlName="ghiChu"
            rows="3"
            class="rounded-lg"
          ></textarea>
        </nz-form-control>
      </nz-form-item>

      <div class="flex justify-end gap-3 mt-6 pt-6 border-t">
        <button
          nz-button
          type="button"
          (click)="modalRef.destroy()"
          class="rounded-lg px-6"
        >
          Hủy
        </button>
        <button
          nz-button
          nzType="primary"
          [nzLoading]="loading"
          class="rounded-lg px-8 bg-indigo-600 border-none font-semibold"
        >
          Lưu hóa đơn
        </button>
      </div>
    </form>
  `,
})
export class HoaDonDoiTacFormComponent implements OnInit {
  @Input() item?: any;
  @Input() doiTacOptions: any[] = [];

  form: FormGroup;
  loading = false;
  loadingContracts = false;
  hopDongOptions: any[] = [];

  formatterVnd = (value: number) =>
    value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
  parserVnd = (value: string) => value.replace(/\$\s?|(,*)/g, '');

  constructor(
    private fb: FormBuilder,
    private thanhToanService: ThanhToanService,
    private doiTacApiService: DoiTacApiService,
    public modalRef: NzModalRef,
    private notification: NzNotificationService,
  ) {
    this.form = this.fb.group({
      id: [null],
      doiTacId: [null, [Validators.required]],
      hopDongDoiTacId: [null, [Validators.required]],
      thang: [new Date().getMonth() + 1, [Validators.required]],
      nam: [new Date().getFullYear(), [Validators.required]],
      soTien: [0, [Validators.required, Validators.min(1)]],
      ghiChu: [''],
      fileHoaDonId: [null],
    });
  }

  ngOnInit(): void {
    if (this.item) {
      this.form.patchValue(this.item);
      this.onDoiTacChange(this.item.doiTacId);
    }
  }

  onDoiTacChange(doiTacId: number): void {
    if (!doiTacId) {
      this.hopDongOptions = [];
      return;
    }
    this.loadingContracts = true;
    this.doiTacApiService.getById(doiTacId).subscribe({
      next: (res: ApiResponse<any>) => {
        this.hopDongOptions = res.result?.hopDongs || [];
        this.loadingContracts = false;
      },
      error: () => (this.loadingContracts = false),
    });
  }

  submit(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((c) => {
        if (c.invalid) {
          c.markAsDirty();
          c.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }

    this.loading = true;
    const val = this.form.value;
    const obs = val.id
      ? this.thanhToanService.updateHoaDonDoiTac(val)
      : this.thanhToanService.createHoaDonDoiTac(val);

    obs.subscribe({
      next: (res: ApiResponse<any>) => {
        if (res.isOk) {
          this.notification.success('Thành công', 'Đã lưu hóa đơn đối tác');
          this.modalRef.close(true);
        }
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }
}
