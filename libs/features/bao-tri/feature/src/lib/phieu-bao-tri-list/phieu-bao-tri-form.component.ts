import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaoTriService } from '@features/bao-tri/data-access';
import { ApiResponse } from '@features/dich-vu/data-access';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-phieu-bao-tri-form',
  template: `
    <form nz-form [formGroup]="form" (ngSubmit)="submit()" nzLayout="vertical">
      <div class="grid grid-cols-2 gap-x-6">
        <nz-form-item>
          <nz-form-label nzRequired class="text-gray-600 font-medium"
            >Thiết bị hạ tầng</nz-form-label
          >
          <nz-form-control [nzErrorTip]="'Vui lòng chọn thiết bị'">
            <nz-select
              formControlName="thietBiId"
              nzShowSearch
              (ngModelChange)="onThietBiChange($any($event))"
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
            >Ngày dự kiến thực hiện</nz-form-label
          >
          <nz-form-control>
            <nz-date-picker
              formControlName="ngayDuKien"
              class="w-full rounded-lg"
            ></nz-date-picker>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label class="text-gray-600 font-medium"
            >Mã phiếu (tự động nếu để trống)</nz-form-label
          >
          <nz-form-control>
            <input
              nz-input
              formControlName="maPhieu"
              placeholder="PBT-XXXX"
              class="rounded-lg"
            />
          </nz-form-control>
        </nz-form-item>
      </div>

      <nz-form-item>
        <nz-form-label class="text-gray-600 font-medium"
          >Ghi chú ban đầu</nz-form-label
        >
        <nz-form-control>
          <textarea
            nz-input
            formControlName="ghiChuXuLy"
            rows="3"
            placeholder="Yêu cầu cụ thể cho nhân viên kỹ thuật..."
            class="rounded-lg"
          ></textarea>
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
          Lập phiếu
        </button>
      </div>
    </form>
  `,
})
export class PhieuBaoTriFormComponent implements OnInit {
  form: FormGroup;
  loading = false;

  thietBiOptions: any[] = [];
  hangMucOptions: any[] = [];

  constructor(
    private fb: FormBuilder,
    private baoTriService: BaoTriService,
    public modalRef: NzModalRef,
    private notification: NzNotificationService,
  ) {
    this.form = this.fb.group({
      thietBiId: [null, [Validators.required]],
      hangMucBaoTriId: [null, [Validators.required]],
      ngayDuKien: [new Date(), [Validators.required]],
      maPhieu: [''],
      ghiChuXuLy: [''],
      noiDungChecklistBanDaus: [[]],
      nhanSus: [[]],
    });
  }

  ngOnInit(): void {
    this.loadOptions();
  }

  loadOptions(): void {
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
    this.baoTriService
      .getHangMucList({
        pageSize: 1000,
        pageNumber: 1,
        sortCol: 'id',
        isAsc: false,
      })
      .subscribe((res) => {
        this.hangMucOptions = res.result?.items || [];
      });
  }

  onThietBiChange(id: number): void {
    // Logic to auto-select hang-muc if needed
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
    this.baoTriService.createPhieuBaoTri(this.form.value).subscribe({
      next: (res) => {
        if (res.isOk) {
          this.notification.success('Thành công', 'Đã lập phiếu bảo trì mới');
          this.modalRef.close(true);
        }
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }
}
