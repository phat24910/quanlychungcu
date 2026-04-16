import { Component, OnInit, ViewChild } from '@angular/core';
import { DichVuService } from '@features/dich-vu/data-access';

@Component({
  selector: 'app-dich-vu-list',
  templateUrl: './dich-vu-list.component.html',
  styleUrls: ['./dich-vu-list.component.scss']
})
export class DichVuListComponent implements OnInit {
  list: any[] = [];
  loading = false;

  constructor(private dichVuService: DichVuService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.dichVuService.getDichVuList({}).subscribe({
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

  delete(id: string) {
    this.dichVuService.deleteDichVu([id]).subscribe({
      next: () => this.load()
    });
  }
}
