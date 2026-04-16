import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DichVuService } from '@features/dich-vu/data-access';

@Component({
  selector: 'app-khung-gio-list',
  templateUrl: './khung-gio-list.component.html',
  styleUrls: ['./khung-gio-list.component.scss']
})
export class KhungGioListComponent implements OnInit {
  list: any[] = [];
  loading = false;
  dichVuId: number | null = null;

  constructor(public route: ActivatedRoute, public router: Router, public dichVuService: DichVuService) {}

  ngOnInit(): void {
    const dv = this.route.snapshot.paramMap.get('dichVuId');
    this.dichVuId = dv ? Number(dv) : null;
    this.load();
  }

  load() {
    this.loading = true;
    this.dichVuService.getKhungGioList({ dichVuId: this.dichVuId }).subscribe({
      next: (res: any) => {
        let items: any[] = [];
        if (!res) {
          items = [];
        } else if (Array.isArray(res)) {
          items = res;
        } else if (Array.isArray(res.result)) {
          items = res.result;
        } else if (res.result && Array.isArray(res.result.items)) {
          items = res.result.items;
        } else if (Array.isArray(res.data)) {
          items = res.data;
        } else if (Array.isArray(res.items)) {
          items = res.items;
        } else {
          const maybe = res.result ?? res.data ?? res;
          items = Array.isArray(maybe) ? maybe : [];
        }

        this.list = items;
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  delete(id: number) {
    if (this.dichVuId == null) return;
    this.dichVuService.deleteKhungGio({ dichVuId: this.dichVuId, ids: [id] }).subscribe({ next: () => this.load() });
  }

  revoke(id: number) {
    if (this.dichVuId == null) return;
    this.dichVuService.revokeKhungGio({ dichVuId: this.dichVuId, ids: [id] }).subscribe({ next: () => this.load() });
  }
}
