import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThanhToanService } from '@features/thanh-toan/data-access';
import { ApiResponse } from '@features/dich-vu/data-access';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-dot-thanh-toan-form',
  template: `
    <form nz-form [formGroup]="form" (ngSubmit)="submit()">
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired>Tháng/Năm</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <div class="flex gap-2">
            <nz-select formControlName="thang" style="width: 80px">
              <nz-option *ngFor="let m of [1,2,3,4,5,6,7,8,9,10,11,12]" [nzValue]="m" [nzLabel]="m"></nz-option>
            </nz-select>
            <nz-select formControlName="nam" style="width: 120px">
              <nz-option *ngFor="let y of [2024,2025,2026]" [nzValue]="y" [nzLabel]="y"></nz-option>
            </nz-select>
          </div>
        </nz-form-control>
      </nz-form-item>

      <nz-form-item *ngIf="item">
        <nz-form-label [nzSm]="6" [nzXs]="24">Tên đợt</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input formControlName="tenDot" />
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24">Ghi chú</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <textarea nz-input formControlName="ghiChu" rows="3"></textarea>
        </nz-form-control>
      </nz-form-item>

      <div class="flex justify-end gap-2 mt-4">
        <button nz-button type="button" (click)="modalRef.destroy()">Hủy</button>
        <button nz-button nzType="primary" [nzLoading]="loading">Lưu</button>
      </div>
    </form>
  `
})
export class DotThanhToanFormComponent implements OnInit {
  @Input() item?: any;
  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private thanhToanService: ThanhToanService,
    public modalRef: NzModalRef,
    private notification: NzNotificationService
  ) {
    this.form = this.fb.group({
      id: [null],
      thang: [new Date().getMonth() + 1, [Validators.required]],
      nam: [new Date().getFullYear(), [Validators.required]],
      tenDot: [''],
      ghiChu: ['']
    });
  }

  ngOnInit(): void {
    if (this.item) {
      this.form.patchValue(this.item);
    }
  }

  submit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    const val = this.form.value;
    const obs = val.id ? this.thanhToanService.updateDotThanhToan(val) : this.thanhToanService.createDotThanhToan(val);

    obs.subscribe({
      next: (res: ApiResponse<any>) => {
        if (res.isOk) {
          this.notification.success('Thành công', 'Đã lưu đợt thanh toán');
          this.modalRef.close(true);
        }
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}
