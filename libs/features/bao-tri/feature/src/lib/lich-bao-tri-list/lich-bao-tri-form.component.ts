import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaoTriService } from '@features/bao-tri/data-access';
import { ApiResponse } from '@features/dich-vu/data-access';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-lich-bao-tri-form',
  template: `
    <form nz-form [formGroup]="form" (ngSubmit)="submit()" nzLayout="vertical">
      <nz-form-item>
        <nz-form-label nzRequired class="text-gray-600 font-medium"
          >Thiết bị hạ tầng</nz-form-label
        >
        <nz-form-control [nzErrorTip]="'Vui lòng chọn thiết bị'">
          <nz-select
            formControlName="thietBiId"
            nzShowSearch
            [disabled]="!!item"
            class="rounded-lg"
          >
            <nz-option
              *ngFor="let o of thietBiOptions"
              [nzValue]="o.id"
              [nzLabel]="o.tenThietBi + ' (' + o.maThietBi + ')'"
            ></nz-option>
          </nz-select>
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-label nzRequired class="text-gray-600 font-medium"
          >Hạng mục bảo trì</nz-form-label
        >
        <nz-form-control [nzErrorTip]="'Vui lòng chọn hạng mục'">
          <nz-select
            formControlName="hangMucBaoTriId"
            nzShowSearch
            [disabled]="!!item"
            class="rounded-lg"
          >
            <nz-option
              *ngFor="let o of hangMucOptions"
              [nzValue]="o.id"
              [nzLabel]="o.tenHangMuc"
            ></nz-option>
          </nz-select>
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-label nzRequired class="text-gray-600 font-medium"
          >Tần suất bảo trì</nz-form-label
        >
        <nz-form-control>
          <nz-select formControlName="tanSuatBaoTriId" class="rounded-lg">
            <nz-option [nzValue]="1" nzLabel="Hàng tuần"></nz-option>
            <nz-option [nzValue]="2" nzLabel="Hàng tháng"></nz-option>
            <nz-option [nzValue]="3" nzLabel="Hàng quý"></nz-option>
            <nz-option [nzValue]="4" nzLabel="Hàng năm"></nz-option>
            <nz-option [nzValue]="5" nzLabel="6 tháng / lần"></nz-option>
          </nz-select>
        </nz-form-control>
      </nz-form-item>

      <div class="grid grid-cols-2 gap-4">
        <nz-form-item>
          <nz-form-label nzRequired class="text-gray-600 font-medium"
            >Ngày bắt đầu áp dụng</nz-form-label
          >
          <nz-form-control>
            <nz-date-picker
              formControlName="ngayBatDau"
              class="w-full rounded-lg"
            ></nz-date-picker>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label nzRequired class="text-gray-600 font-medium"
            >Ngày kết thúc áp dụng</nz-form-label
          >
          <nz-form-control>
            <nz-date-picker
              formControlName="ngayKetThuc"
              class="w-full rounded-lg"
            ></nz-date-picker>
          </nz-form-control>
        </nz-form-item>
      </div>

      <nz-form-item *ngIf="item">
        <nz-form-label class="text-gray-600 font-medium"
          >Trạng thái kích hoạt</nz-form-label
        >
        <nz-form-control>
          <label nz-checkbox formControlName="isActive"
            >Đang kích hoạt lịch này</label
          >
        </nz-form-control>
      </nz-form-item>

      <div class="flex justify-end gap-3 mt-6 pt-6 border-t">
        <button
          nz-button
          type="button"
          (click)="modalRef.destroy()"
          class="rounded-lg"
        >
          Hủy
        </button>
        <button
          nz-button
          nzType="primary"
          [nzLoading]="loading"
          class="rounded-lg bg-indigo-600 border-none px-8 font-semibold"
        >
          Lưu lịch
        </button>
      </div>
    </form>
  `,
})
export class LichBaoTriFormComponent implements OnInit {
  @Input() item?: any;
  @Input() thietBiOptions: any[] = [];
  @Input() hangMucOptions: any[] = [];

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private baoTriService: BaoTriService,
    public modalRef: NzModalRef,
    private notification: NzNotificationService,
  ) {
    this.form = this.fb.group({
      id: [null],
      thietBiId: [null, [Validators.required]],
      hangMucBaoTriId: [null, [Validators.required]],
      tanSuatBaoTriId: [2, [Validators.required]],
      ngayBatDau: [new Date(), [Validators.required]],
      ngayKetThuc: [null, [Validators.required]],
      isActive: [true],
    });
  }

  ngOnInit(): void {
    if (this.item) {
      this.form.patchValue(this.item);
    }
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
      ? this.baoTriService.updateLichBaoTri(val)
      : this.baoTriService.createLichBaoTri(val);

    obs.subscribe({
      next: (res: ApiResponse<any>) => {
        if (res.isOk) {
          this.notification.success(
            'Thành công',
            'Đã lưu lịch bảo trì định kỳ',
          );
          this.modalRef.close(true);
        }
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }
}
