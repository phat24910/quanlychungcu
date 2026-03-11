import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChungCuService, CanHo } from '@features/resident/data-access';

@Component({
  selector: 'app-can-ho-list',
  templateUrl: './can-ho-list.component.html'
})
export class CanHoListComponent implements OnInit {
  items: CanHo[] = [];
  toaNhaId?: number;
  toaNhaName?: string;
  tangId?: number;
  tangName?: string;
  loading = false;

  constructor(private svc: ChungCuService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((q: any) => {
      this.toaNhaId = q['toaNhaId'] ? +q['toaNhaId'] : undefined;
      this.toaNhaName = q['toaNhaName'];
      this.tangId = q['tangId'] ? +q['tangId'] : undefined;
      this.tangName = q['tangName'];
      this.load();
    });
  }

  load(): void {
    this.loading = true;
    const query: any = { pageNumber: 1, pageSize: 20 };
    if (this.tangId) query.tangId = this.tangId;
    else if (this.toaNhaId) query.toaNhaId = this.toaNhaId;
    this.svc.getCanHoList(query).subscribe({
      next: (r: any) => {
        this.loading = false;
        if (r && r.isOk) this.items = r.result.items || [];
      },
      error: () => {
        this.loading = false;
        this.items = [];
      }
    });
  }

  deleteOne(id?: number): void {
    if (id == null) return;
    if (!confirm('Xóa căn hộ?')) return;
    this.svc.deleteCanHo([id]).subscribe(() => this.load());
  }
}
