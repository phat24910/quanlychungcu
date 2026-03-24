import { Component, OnInit, Input, Output, EventEmitter, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChungCuService } from '@features/resident/data-access';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-phuong-tien-form',
  templateUrl: './phuong-tien-form.component.html',
  styleUrls: ['./phuong-tien-form.component.scss']
})
export class PhuongTienFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  id: number | null = null;
  @Input() inModal = false;
  @Input() phuongTienId?: number;
  @Input() canHoId?: number;
  @Output() saved = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();
  loaiPhuongTienOptions: any[] = [];

  constructor(
    private fb: FormBuilder,
    private svc: ChungCuService,
    private route: ActivatedRoute,
    private router: Router,
    @Optional() private modalRef?: NzModalRef
  ) {
    this.form = this.fb.group({
      canHoId: [null, Validators.required],
      tenPhuongTien: ['', Validators.required],
      loaiPhuongTienId: [null, Validators.required],
      bienSo: [''],
      mauXe: ['']
    });
  }

  ngOnInit(): void {
    this.loadCatalogs();
    if (this.phuongTienId) {
      this.isEdit = true;
      this.id = this.phuongTienId as number;
      this.load(this.id);
    } else {
      this.route.params.subscribe(p => {
        if (p && p.id) {
          this.isEdit = true;
          this.id = +p.id;
          this.load(this.id);
        }
      });
    }
    if (this.canHoId != null) {
      this.form.patchValue({ canHoId: +this.canHoId });
      this.form.get('canHoId')?.disable();
    } else {
      this.route.queryParams.subscribe((q: any) => {
        if (q && q['canHoId']) {
          this.form.patchValue({ canHoId: +q['canHoId'] });
          this.form.get('canHoId')?.disable();
        }
      });
    }
  }

  private loadCatalogs(): void {
    this.svc.getLoaiPhuongTienForSelector().subscribe(r => {
      if (r && r.isOk && Array.isArray(r.result)) this.loaiPhuongTienOptions = r.result;
    });
  }

  load(id: number): void {
    this.svc.getPhuongTienById(id).subscribe(r => {
      if (r && r.isOk && r.result) {
        this.form.patchValue({
          canHoId: r.result.canHoId,
          tenPhuongTien: r.result.tenPhuongTien,
          loaiPhuongTienId: r.result.loaiPhuongTienId,
          bienSo: r.result.bienSo,
          mauXe: r.result.mauXe
        });
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
      const payload = this.form.getRawValue();
      if (!payload.canHoId) {
        if (this.canHoId != null) payload.canHoId = +this.canHoId;
        else if (this.route && this.route.snapshot && this.route.snapshot.queryParams && this.route.snapshot.queryParams['canHoId']) {
          payload.canHoId = +this.route.snapshot.queryParams['canHoId'];
        }
      }
    if (this.isEdit && this.id) {
      payload.phuongTienId = this.id;
      this.svc.updatePhuongTien(payload).subscribe(() => {
        if (this.inModal) {
          this.saved.emit();
          this.modalRef?.close();
        } else this.router.navigate(['../'], { relativeTo: this.route });
      });
    } else {
      this.svc.createPhuongTien(payload).subscribe(() => {
        if (this.inModal) {
          this.saved.emit();
          this.modalRef?.close();
        } else this.router.navigate(['../'], { relativeTo: this.route });
      });
    }
  }

  onCancel(): void {
    if (this.inModal) {
      if (this.modalRef) this.modalRef.close();
      else this.canceled.emit();
    } else {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }
}
