import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DichVuService } from '@features/dich-vu/data-access';

@Component({
  selector: 'app-bang-gia-form',
  templateUrl: './bang-gia-form.component.html',
  styleUrls: ['./bang-gia-form.component.scss']
})
export class BangGiaFormComponent implements OnInit {
  model: any = { tenBangGia: '', ngayApDung: '', ngayKetThuc: '', loaiDinhGiaId: null, donGiaCoDinh: null };
  loading = false;
  id: number | null = null;
  dichVuId: number | null = null;

  constructor(public route: ActivatedRoute, public router: Router, public dichVuService: DichVuService) {}

  ngOnInit(): void {
    const dv = this.route.snapshot.paramMap.get('dichVuId') || this.route.snapshot.queryParamMap.get('dichVuId');
    this.dichVuId = dv ? Number(dv) : null;
    const idStr = this.route.snapshot.paramMap.get('id');
    this.id = idStr ? Number(idStr) : null;
    if (this.id) this.load();
    else if (this.dichVuId) this.model.dichVuId = this.dichVuId;
  }

  load() {
    if (!this.id) return;
    this.loading = true;
    this.dichVuService.getBangGiaById(Number(this.id)).subscribe({
      next: (res: any) => {
        this.model = res?.result ?? res?.data ?? res;
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  save() {
    this.loading = true;
    let obs: any;
    if (this.id) {
      this.model.id = Number(this.id);
      obs = this.dichVuService.updateBangGia(this.model);
    } else {
      obs = this.dichVuService.createBangGia(this.model);
    }

    obs.subscribe({ next: () => this.router.navigate(['../'], { relativeTo: this.route }), error: () => (this.loading = false) });
  }

  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
