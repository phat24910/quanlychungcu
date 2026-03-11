import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChungCuService, Tang } from '@features/resident/data-access';

@Component({
  selector: 'app-tang-list',
  templateUrl: './tang-list.component.html'
})
export class TangListComponent implements OnInit {
  items: Tang[] = [];
  toaNhaId?: number;
  toaNhaName?: string;
  loading = false;

  constructor(private svc: ChungCuService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((q: any) => {
      this.toaNhaId = q['toaNhaId'] ? +q['toaNhaId'] : undefined;
      this.toaNhaName = q['toaNhaName'];
      this.load();
    });
  }

  load(): void {
    this.loading = true;
    const query: any = { pageNumber: 1, pageSize: 50 };
    if (this.toaNhaId) query.toaNhaId = this.toaNhaId;
    this.svc.getTangList(query).subscribe({
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
    if (!confirm('Xóa tầng này?')) return;
    this.svc.deleteTang([id]).subscribe(() => this.load());
  }
}
