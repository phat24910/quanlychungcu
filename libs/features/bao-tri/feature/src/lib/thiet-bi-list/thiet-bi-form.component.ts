import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaoTriService } from '@features/bao-tri/data-access';
import { ApiResponse } from '@features/dich-vu/data-access';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-thiet-bi-form',
  template: `
    <form nz-form [formGroup]="form" (ngSubmit)="submit()" nzLayout="vertical">
      <div class="grid grid-cols-2 gap-x-6">
        <nz-form-item>
          <nz-form-label nzRequired class="text-gray-600 font-medium"
            >Mã thiết bị</nz-form-label
          >
          <nz-form-control [nzErrorTip]="'Vui lòng nhập mã thiết bị'">
            <input
              nz-input
              formControlName="maThietBi"
              placeholder="Ví dụ: TB-001"
              [disabled]="!!item"
              class="rounded-lg"
            />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label nzRequired class="text-gray-600 font-medium"
            >Tên thiết bị</nz-form-label
          >
          <nz-form-control [nzErrorTip]="'Vui lòng nhập tên thiết bị'">
            <input
              nz-input
              formControlName="tenThietBi"
              placeholder="Ví dụ: Máy phát điện Mitsubishi"
              class="rounded-lg"
            />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label nzRequired class="text-gray-600 font-medium"
            >Loại thiết bị</nz-form-label
          >
          <nz-form-control [nzErrorTip]="'Vui lòng nhập loại thiết bị'">
            <input
              nz-input
              formControlName="loaiThietBi"
              placeholder="Ví dụ: Điện lực, Cấp thoát nước..."
              class="rounded-lg"
            />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label nzRequired class="text-gray-600 font-medium"
            >Vị trí lắp đặt</nz-form-label
          >
          <nz-form-control [nzErrorTip]="'Vui lòng nhập vị trí'">
            <input
              nz-input
              formControlName="viTri"
              placeholder="Ví dụ: Tầng hầm B1, Phòng KT"
              class="rounded-lg"
            />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label class="text-gray-600 font-medium"
            >Ngày mua</nz-form-label
          >
          <nz-form-control>
            <nz-date-picker
              formControlName="ngayMua"
              class="w-full rounded-lg"
            ></nz-date-picker>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label class="text-gray-600 font-medium"
            >Hết hạn bảo hành</nz-form-label
          >
          <nz-form-control>
            <nz-date-picker
              formControlName="ngayHetHanBaoHanh"
              class="w-full rounded-lg"
            ></nz-date-picker>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label class="text-gray-600 font-medium"
            >Giá trị ban đầu</nz-form-label
          >
          <nz-form-control>
            <nz-input-number
              formControlName="giaTriBanDau"
              [nzMin]="0"
              [nzStep]="1000000"
              class="w-full rounded-lg"
              [nzFormatter]="formatterVnd"
              [nzParser]="parserVnd"
            ></nz-input-number>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item *ngIf="item">
          <nz-form-label nzRequired class="text-gray-600 font-medium"
            >Trạng thái</nz-form-label
          >
          <nz-form-control>
            <nz-select formControlName="trangThaiThietBiId" class="rounded-lg">
              <nz-option [nzValue]="1" nzLabel="Hoạt động"></nz-option>
              <nz-option [nzValue]="2" nzLabel="Đang bảo trì"></nz-option>
              <nz-option [nzValue]="3" nzLabel="Hỏng"></nz-option>
              <nz-option [nzValue]="4" nzLabel="Thanh lý"></nz-option>
            </nz-select>
          </nz-form-control>
        </nz-form-item>
      </div>

      <nz-form-item>
        <nz-form-label class="text-gray-600 font-medium">Ghi chú</nz-form-label>
        <nz-form-control>
          <textarea
            nz-input
            formControlName="ghiChu"
            rows="3"
            placeholder="Thông tin bổ sung về thiết bị..."
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
          Lưu thiết bị
        </button>
      </div>
    </form>
  `,
})
export class ThietBiFormComponent implements OnInit {
  @Input() item?: any;
  form: FormGroup;
  loading = false;

  formatterVnd = (value: number) =>
    value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
  parserVnd = (value: string) => value.replace(/\$\s?|(,*)/g, '');

  constructor(
    private fb: FormBuilder,
    private baoTriService: BaoTriService,
    public modalRef: NzModalRef,
    private notification: NzNotificationService,
  ) {
    this.form = this.fb.group({
      id: [null],
      maThietBi: ['', [Validators.required]],
      tenThietBi: ['', [Validators.required]],
      loaiThietBi: ['', [Validators.required]],
      viTri: ['', [Validators.required]],
      ngayMua: [null],
      ngayHetHanBaoHanh: [null],
      giaTriBanDau: [0],
      trangThaiThietBiId: [1],
      ghiChu: [''],
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
      ? this.baoTriService.updateThietBi(val)
      : this.baoTriService.createThietBi(val);

    obs.subscribe({
      next: (res: ApiResponse<any>) => {
        if (res.isOk) {
          this.notification.success('Thành công', 'Đã lưu thông tin thiết bị');
          this.modalRef.close(true);
        }
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }
}
