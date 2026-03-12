import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChungCuService } from '@features/resident/data-access';

@Component({
  selector: 'app-can-ho-form',
  templateUrl: './can-ho-form.component.html',
  styleUrls: ['./can-ho-form.component.scss']
})
export class CanHoFormComponent implements OnInit, OnChanges {
  form: FormGroup;
  @Input() id?: number;
  @Input() inModal = false;
  @Input() initialTangId?: number;
  @Output() saved = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private svc: ChungCuService, private route: ActivatedRoute, private router: Router) {
    this.form = this.fb.group({
      maCanHo: [''],
      dienTich: [0],
      tangId: [null],
      soPhongNgu: [null],
      soPhongTam: [null],
      loaiCanHoId: [null],
      tinhTrangCanHoId: [null]
    });
  }

  ngOnInit(): void {
    if (!this.inModal) {
      this.route.params.subscribe((p: any) => {
        if (p['id']) {
          this.id = +p['id'];
          this.svc.getCanHoById(this.id).subscribe((r: any) => {
            if (r && r.isOk) this.form.patchValue(r.result);
          });
        }
      });
    }
    if (this.initialTangId) this.form.patchValue({ tangId: this.initialTangId });
    this.form.get('tangId')?.disable();
    this.loadTinhTrangOptions();
    this.loadLoaiCanHoOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.inModal && changes['id'] && this.id) {
      this.svc.getCanHoById(this.id).subscribe((r: any) => {
        if (r && r.isOk) {
          const val: any = {
            ...r.result,
            tangId: r.result.tangId ?? r.result.tang,
            soPhongNgu: r.result.soPhongNgu,
            soPhongTam: r.result.soPhongTam,
            loaiCanHoId: r.result.loaiCanHoId,
            tinhTrangCanHoId: r.result.tinhTrangCanHoId
          };
          this.form.patchValue(val);
        }
      });
    }
    if (this.inModal && !this.id) {
      if (changes['initialTangId'] && this.initialTangId) this.form.patchValue({ tangId: this.initialTangId });
    }
  }

  save(): void {
    const fv: any = this.form.getRawValue();
    const payload: any = {
      id: this.id,
      maCanHo: fv.maCanHo,
      dienTich: fv.dienTich,
      tangId: fv.tangId,
      soPhongNgu: fv.soPhongNgu,
      soPhongTam: fv.soPhongTam,
      loaiCanHoId: fv.loaiCanHoId,
      tinhTrangCanHoId: fv.tinhTrangCanHoId
    };
    const obs = this.id ? this.svc.updateCanHo(payload) : this.svc.createCanHo(payload);
    obs.subscribe(() => {
      if (this.inModal) this.saved.emit();
      else this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  tinhTrangOptions: any[] = [];
  loaiCanHoOptions: any[] = [];
  private loadTinhTrangOptions(): void {
    this.svc.getTinhTrangCanHoForSelector().subscribe(r => {
      if (r && r.isOk && Array.isArray(r.result)) this.tinhTrangOptions = r.result;
    });
  }

  private loadLoaiCanHoOptions(): void {
    this.svc.getLoaiCanHoForSelector().subscribe(r => {
      if (r && r.isOk && Array.isArray(r.result)) this.loaiCanHoOptions = r.result;
    });
  }
}
