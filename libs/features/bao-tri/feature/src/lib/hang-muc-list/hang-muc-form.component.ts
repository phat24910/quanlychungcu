import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { BaoTriService } from '@features/bao-tri/data-access';
import { ApiResponse } from '@features/dich-vu/data-access';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-hang-muc-form',
  template: `
    <form nz-form [formGroup]="form" (ngSubmit)="submit()" nzLayout="vertical">
      <div class="grid grid-cols-2 gap-x-6">
        <nz-form-item>
          <nz-form-label nzRequired class="text-gray-600 font-medium"
            >Mã hạng mục</nz-form-label
          >
          <nz-form-control [nzErrorTip]="'Vui lòng nhập mã hạng mục'">
            <input
              nz-input
              formControlName="maHangMuc"
              placeholder="Ví dụ: HM-DIEN-01"
              [disabled]="!!item"
              class="rounded-lg"
            />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label nzRequired class="text-gray-600 font-medium"
            >Tên hạng mục</nz-form-label
          >
          <nz-form-control [nzErrorTip]="'Vui lòng nhập tên hạng mục'">
            <input
              nz-input
              formControlName="tenHangMuc"
              placeholder="Ví dụ: Kiểm tra hệ thống điện tầng hầm"
              class="rounded-lg"
            />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label nzRequired class="text-gray-600 font-medium"
            >Thời gian ước tính (phút)</nz-form-label
          >
          <nz-form-control [nzErrorTip]="'Vui lòng nhập thời gian'">
            <nz-input-number
              formControlName="thoiGianUocTinhPhut"
              [nzMin]="5"
              [nzStep]="5"
              class="w-full rounded-lg"
            ></nz-input-number>
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-label nzRequired class="text-gray-600 font-medium"
            >Chi phí ước tính</nz-form-label
          >
          <nz-form-control [nzErrorTip]="'Vui lòng nhập chi phí'">
            <nz-input-number
              formControlName="chiPhiUocTinh"
              [nzMin]="0"
              [nzStep]="100000"
              class="w-full rounded-lg"
              [nzFormatter]="formatterVnd"
              [nzParser]="parserVnd"
            ></nz-input-number>
          </nz-form-control>
        </nz-form-item>
      </div>

      <nz-form-item>
        <nz-form-label class="text-gray-600 font-medium"
          >Mô tả hạng mục</nz-form-label
        >
        <nz-form-control>
          <textarea
            nz-input
            formControlName="moTa"
            rows="2"
            placeholder="Mô tả sơ lược về công việc..."
            class="rounded-lg"
          ></textarea>
        </nz-form-control>
      </nz-form-item>

      <nz-divider
        nzText="Checklist Tiêu Chuẩn"
        nzOrientation="left"
      ></nz-divider>

      <div formArrayName="checklistTieuChuan" class="space-y-3">
        <div
          *ngFor="let control of checklistArray.controls; let i = index"
          class="flex gap-2 items-center bg-gray-50 p-2 rounded-lg border border-gray-100"
        >
          <span class="font-bold text-gray-400 w-6 text-center text-xs">{{
            i + 1
          }}</span>
          <input
            nz-input
            [formControlName]="i"
            placeholder="Nội dung cần kiểm tra..."
            class="flex-1 border-none bg-transparent focus:bg-white rounded-lg"
          />
          <button
            nz-button
            nzType="text"
            nzDanger
            (click)="removeChecklistItem(i)"
          >
            <i nz-icon nzType="minus-circle"></i>
          </button>
        </div>
      </div>

      <button
        nz-button
        nzType="dashed"
        block
        (click)="addChecklistItem()"
        class="mt-3 rounded-lg border-indigo-200 text-indigo-600"
      >
        <i nz-icon nzType="plus"></i> Thêm dòng checklist
      </button>

      <div class="flex justify-end gap-3 mt-8 pt-6 border-t">
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
          Lưu hạng mục
        </button>
      </div>
    </form>
  `,
})
export class HangMucFormComponent implements OnInit {
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
      maHangMuc: ['', [Validators.required]],
      tenHangMuc: ['', [Validators.required]],
      moTa: [''],
      thoiGianUocTinhPhut: [30, [Validators.required]],
      chiPhiUocTinh: [0, [Validators.required]],
      checklistTieuChuan: this.fb.array([]),
    });
  }

  get checklistArray(): FormArray {
    return this.form.get('checklistTieuChuan') as FormArray;
  }

  ngOnInit(): void {
    if (this.item) {
      const { checklistTieuChuan, ...other } = this.item;
      this.form.patchValue(other);
      if (checklistTieuChuan && Array.isArray(checklistTieuChuan)) {
        checklistTieuChuan.forEach((item) => this.addChecklistItem(item));
      }
    } else {
      // Default items
      this.addChecklistItem('Kiểm tra ngoại quan');
      this.addChecklistItem('Vệ sinh thiết bị');
    }
  }

  addChecklistItem(value: string = ''): void {
    this.checklistArray.push(this.fb.control(value, [Validators.required]));
  }

  removeChecklistItem(index: number): void {
    this.checklistArray.removeAt(index);
  }

  submit(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((c) => {
        if (c instanceof FormArray) {
          c.controls.forEach((ctrl) => {
            ctrl.markAsDirty();
            ctrl.updateValueAndValidity({ onlySelf: true });
          });
        } else {
          c.markAsDirty();
          c.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }

    this.loading = true;
    const val = this.form.getRawValue();
    const obs = val.id
      ? this.baoTriService.updateHangMuc(val)
      : this.baoTriService.createHangMuc(val);

    obs.subscribe({
      next: (res: ApiResponse<any>) => {
        if (res.isOk) {
          this.notification.success('Thành công', 'Đã lưu hạng mục bảo trì');
          this.modalRef.close(true);
        }
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }
}
