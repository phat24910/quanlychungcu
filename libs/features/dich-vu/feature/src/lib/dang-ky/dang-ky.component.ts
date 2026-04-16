import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DichVuService } from '@features/dich-vu/data-access';

@Component({
  selector: 'app-dang-ky',
  templateUrl: './dang-ky.component.html',
  styleUrls: ['./dang-ky.component.scss']
})
export class DangKyComponent implements OnInit {
  model: any = { canHoId: null, dichVuId: null, ngaySuDung: '', soLuong: 1, khungGioId: null };
  khungGios: any[] = [];
  loading = false;

  constructor(public route: ActivatedRoute, public router: Router, public dichVuService: DichVuService) {}

  ngOnInit(): void {
    const dv = this.route.snapshot.paramMap.get('dichVuId') || this.route.snapshot.queryParamMap.get('dichVuId');
    this.model.dichVuId = dv ? Number(dv) : null;
    if (this.model.dichVuId) this.loadKhungGio();
  }

  loadKhungGio() {
    this.dichVuService.getKhungGioList({ dichVuId: this.model.dichVuId }).subscribe((res: any) => {
      let items: any[] = [];
      if (!res) items = [];
      else if (Array.isArray(res)) items = res;
      else if (Array.isArray(res.result)) items = res.result;
      else if (res.result && Array.isArray(res.result.items)) items = res.result.items;
      else if (Array.isArray(res.data)) items = res.data;
      else if (Array.isArray(res.items)) items = res.items;
      else {
        const maybe = res.result ?? res.data ?? res;
        items = Array.isArray(maybe) ? maybe : [];
      }
      this.khungGios = items;
    });
  }

  submit() {
    this.loading = true;
    this.dichVuService.registerDichVu(this.model).subscribe({ next: () => this.router.navigate(['../'], { relativeTo: this.route }), error: () => (this.loading = false) });
  }
}
