import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChungCuService } from '@features/resident/data-access';

@Component({
  selector: 'app-toa-nha-form',
  templateUrl: './toa-nha-form.component.html',
  styleUrls: ['./toa-nha-form.component.scss']
})
export class ToaNhaFormComponent implements OnInit {
  form: FormGroup;
  @Input() id?: number;
  @Input() inModal = false;
  @Output() saved = new EventEmitter<void>();

  statusOptions: any[] = [];

  constructor(
    private fb: FormBuilder,
    private svc: ChungCuService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      maToaNha: [''],
      tenToaNha: ['', Validators.required],
      soTang: [0, Validators.required],
      soTangHam: [0],
      diaChi: [''],
      moTa: [''],
      trangThaiToaNhaId: [1, Validators.required],
      tenTrangThaiToaNha: ['']
    });
  }

  ngOnInit(): void {
    // load catalog trạng thái cho dropdown
    this.svc.getTrangThaiToaNhaForSelector().subscribe(r => {
      if (r && r.isOk && Array.isArray(r.result)) {
        this.statusOptions = r.result;
      }
    });

    if (!this.inModal) {
      this.route.params.subscribe((p: any) => {
        if (p['id']) {
          this.id = +p['id'];
          this.svc.getToaNhaById(this.id).subscribe((r: any) => {
            if (r.isOk) this.form.patchValue(r.result);
          });
        }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.inModal && changes['id'] && this.id) {
      this.svc.getToaNhaById(this.id).subscribe((r: any) => {
        if (r.isOk) this.form.patchValue(r.result);
      });
    }
  }

  save(): void {
    const payload = { ...(this.form.value as any), id: this.id };
    const obs = this.id ? this.svc.updateToaNha(payload) : this.svc.createToaNha(payload);
    obs.subscribe(() => {
      if (this.inModal) this.saved.emit();
      else this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
