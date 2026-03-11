import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChungCuService } from '@features/resident/data-access';

@Component({
  selector: 'app-can-ho-form',
  templateUrl: './can-ho-form.component.html'
})
export class CanHoFormComponent implements OnInit {
  form: FormGroup;
  id?: number;

  constructor(private fb: FormBuilder, private svc: ChungCuService, private route: ActivatedRoute, private router: Router) {
    this.form = this.fb.group({
      toaNhaId: [null, Validators.required],
      maCanHo: [''],
      dienTich: [0],
      tang: [0]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((p: any) => {
      if (p['id']) {
        this.id = +p['id'];
        this.svc.getCanHoById(this.id).subscribe((r: any) => {
          if (r && r.isOk) this.form.patchValue(r.result);
        });
      }
    });
  }

  save(): void {
    const payload = { ...(this.form.value as any), id: this.id };
    const obs = this.id ? this.svc.updateCanHo(payload) : this.svc.createCanHo(payload);
    obs.subscribe(() => this.router.navigate(['../'], { relativeTo: this.route }));
  }
}
