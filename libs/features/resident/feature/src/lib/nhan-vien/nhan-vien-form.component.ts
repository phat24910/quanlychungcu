import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { take } from 'rxjs/operators';
import { ChungCuService } from '@features/resident/data-access';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-nhan-vien-form',
  templateUrl: './nhan-vien-form.component.html',
  styleUrls: ['./nhan-vien-form.component.scss']
})
export class NhanVienFormComponent implements OnInit {
  @Input() nhanVienId?: number | null;
  @Input() inModal = false;
  @Output() saved = new EventEmitter<void>();

  form!: FormGroup;
  loading = false;
  loaiNhanVienOptions: any[] = [];
  loaiGiayToOptions: any[] = [];
  documentCards: Array<{ meta: any; files: File[]; displayFiles: NzUploadFile[] }> = [];
  documentFilesCount = 0;
  currentAttachCardIndex: number | null = null;
  // avatar upload
  avatarFile: File | null = null;
  avatarDisplay: NzUploadFile | null = null;
  avatarPreview: string | null = null;

  constructor(private fb: FormBuilder, private chungCu: ChungCuService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      ho: ['', Validators.required],
      ten: ['', Validators.required],
      ngaySinh: [null, Validators.required],
      gioiTinhId: [null],
      diaChi: [''],
      cccd: [''],
      soDienThoai: [''],
      email: ['', [Validators.required, Validators.email]],
      loaiNhanVienId: [null, Validators.required],
      trangThaiNhanVienId: [null, Validators.required],
      ngayVaoLam: [null],
      ghiChu: [''],
      anhDaiDienId: [null],
      taiLieus: this.fb.array([])
    });

    if (this.nhanVienId) {
      this.loadDetail(this.nhanVienId);
    }
    this.chungCu.getLoaiNhanVienForSelector().pipe(take(1)).subscribe((r: any) => {
      if (r && r.isOk && Array.isArray(r.result)) this.loaiNhanVienOptions = r.result;
      else if (Array.isArray(r)) this.loaiNhanVienOptions = r || [];
    }, () => { this.loaiNhanVienOptions = []; });
    this.chungCu.getLoaiGiayToForSelector().pipe(take(1)).subscribe((r: any) => {
      if (r && r.isOk && Array.isArray(r.result)) this.loaiGiayToOptions = r.result;
      else if (Array.isArray(r)) this.loaiGiayToOptions = r || [];
    }, () => { this.loaiGiayToOptions = []; });
  }

  loadDetail(id: number): void {
    this.chungCu.getNhanVienById(id).subscribe((res: any) => {
      if (res && res.isOk && res.result) {
        const d = res.result;
        this.form.patchValue({
          ho: d.lastName || d.ho || '',
          ten: d.firstName || d.ten || '',
          ngaySinh: d.dob || null,
          trangThaiNhanVienId: d.trangThaiNhanVienId || null,
          gioiTinhId: d.gioiTinhId || null,
          diaChi: d.diaChi || '',
          cccd: d.cccd || '',
          soDienThoai: d.soDienThoai || '',
          email: d.email || '',
          loaiNhanVienId: d.loaiNhanVienId || null,
          ngayVaoLam: d.ngayVaoLam || null,
          ghiChu: d.ghiChu || '',
          anhDaiDienId: d.anhDaiDienId || null
        });
        const arr = this.form.get('taiLieus') as FormArray | null;
        if (Array.isArray(d.taiLieuNguoiDungs) && arr) {
          arr.clear();
          d.taiLieuNguoiDungs.forEach((t: any) => {
            arr.push(this.fb.group({
              taiLieuCuTruId: [t.targetTaiLieuCuTruId || t.taiLieuCuTruId || null],
              loaiGiayToId: [t.loaiGiayToId || null],
              soGiayTo: [t.soGiayTo || ''],
              ngayPhatHanh: [t.ngayPhatHanh || null],
              fileIds: [(t.files || []).map((f: any) => f.id).join(',')]
            }));
          });
        }
      }
    });
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const raw = this.form.value;
    this.loading = true;

    const formTaiLieus = (raw.taiLieus || []).map((t: any) => ({
      taiLieuCuTruId: t.taiLieuCuTruId || null,
      loaiGiayToId: t.loaiGiayToId || null,
      soGiayTo: t.soGiayTo || '',
      ngayPhatHanh: t.ngayPhatHanh ? new Date(t.ngayPhatHanh).toISOString() : null,
      fileIds: ('' + (t.fileIds || '')).split(',').map((s: string) => Number(s)).filter((n: number) => !isNaN(n))
    }));

    const finalizeWithPayload = (payload: any) => {
      const op = this.nhanVienId ? this.chungCu.updateNhanVien({ id: this.nhanVienId, ...payload }) : this.chungCu.createNhanVien(payload);
      op.pipe(take(1)).subscribe(() => { this.loading = false; this.saved.emit(); }, () => { this.loading = false; });
    };

    const uploadDocumentsAndFinalize = (payloadRaw: any) => {
      const allFiles: File[] = [];
      this.documentCards.forEach(c => c.files.forEach(f => allFiles.push(f)));
      if (allFiles.length === 0) {
        finalizeWithPayload({ ...payloadRaw, taiLieus: formTaiLieus });
        return;
      }

      this.chungCu.uploadMedia(allFiles, 'tai-lieu-nhan-vien').pipe(take(1)).subscribe({
        next: (res: any) => {
          if (res && res.isOk && Array.isArray(res.result)) {
            const uploaded = res.result.map((x: any) => x && (x.fileId || x.id)).filter((id: any) => id !== null && id !== undefined);
            let cursor = 0;
            const docs = this.documentCards.map(card => {
              const count = card.files.length;
              const ids = uploaded.slice(cursor, cursor + count);
              cursor += count;
              return {
                loaiGiayToId: card.meta.loaiGiayToId || 0,
                soGiayTo: card.meta.soGiayTo || '',
                ngayPhatHanh: card.meta.ngayPhatHanh ? new Date(card.meta.ngayPhatHanh).toISOString() : new Date().toISOString(),
                fileIds: ids || []
              };
            }).filter(d => d.fileIds && d.fileIds.length > 0);

            const combined = formTaiLieus.concat(docs);
            finalizeWithPayload({ ...payloadRaw, taiLieus: combined });
          } else {
            this.loading = false;
          }
        },
        error: () => { this.loading = false; }
      });
    };

    if (this.avatarFile) {
      this.chungCu.uploadMedia([this.avatarFile], 'tai-lieu-nhan-vien').pipe(take(1)).subscribe({
        next: (res: any) => {
          if (res && res.isOk && Array.isArray(res.result) && res.result.length > 0) {
            const fid = res.result[0].fileId || res.result[0].id || null;
            if (fid) raw.anhDaiDienId = fid;
          }
          uploadDocumentsAndFinalize(raw);
        },
        error: () => { this.loading = false; }
      });
    } else {
      uploadDocumentsAndFinalize(raw);
    }
  }

  get taiLieus(): FormArray {
    return this.form.get('taiLieus') as FormArray;
  }

  addTaiLieu(): void {
    const arr = this.taiLieus;
    arr.push(this.fb.group({ taiLieuCuTruId: [null], loaiGiayToId: [null], soGiayTo: [''], ngayPhatHanh: [null], fileIds: [''] }));
  }

  removeTaiLieu(index: number): void {
    const arr = this.taiLieus;
    arr.removeAt(index);
  }

  addDocumentCard(): void {
    this.documentCards.push({ meta: { loaiGiayToId: 0, soGiayTo: '', ngayPhatHanh: '' }, files: [], displayFiles: [] });
    this.documentFilesCount = this.documentCards.reduce((s, c) => s + c.displayFiles.length, 0);
  }

  removeDocumentCard(index: number): void {
    if (index < 0 || index >= this.documentCards.length) return;
    this.documentCards.splice(index, 1);
    this.documentFilesCount = this.documentCards.reduce((s, c) => s + c.displayFiles.length, 0);
    if (this.currentAttachCardIndex === index) this.currentAttachCardIndex = null;
    else if (this.currentAttachCardIndex != null && this.currentAttachCardIndex > index) this.currentAttachCardIndex -= 1;
  }

  startAddFileToCard(index: number, inputEl: HTMLInputElement): void {
    this.currentAttachCardIndex = index;
    inputEl.value = '';
    inputEl.click();
  }

  onCardFileInput(evt: Event): void {
    const input = evt.target as HTMLInputElement;
    if (!input.files || input.files.length === 0 || this.currentAttachCardIndex == null) return;
    const idx = this.currentAttachCardIndex;
    const fList = Array.from(input.files);
    const displayFiles: NzUploadFile[] = fList.map((f, i) => ({ uid: 'n-' + Date.now() + '-' + i, name: f.name, size: f.size, originFileObj: f } as any));
    if (!this.documentCards[idx]) return;
    this.documentCards[idx].files = this.documentCards[idx].files.concat(fList);
    this.documentCards[idx].displayFiles = this.documentCards[idx].displayFiles.concat(displayFiles);
    this.documentFilesCount = this.documentCards.reduce((s, c) => s + c.displayFiles.length, 0);
    this.currentAttachCardIndex = null;
  }

  removeDocumentFile(cardIndex: number, fileIndex: number): void {
    if (cardIndex < 0 || cardIndex >= this.documentCards.length) return;
    const card = this.documentCards[cardIndex];
    if (!card || fileIndex < 0 || fileIndex >= card.displayFiles.length) return;
    card.displayFiles.splice(fileIndex, 1);
    if (fileIndex < card.files.length) card.files.splice(fileIndex, 1);
    this.documentFilesCount = this.documentCards.reduce((s, c) => s + c.displayFiles.length, 0);
  }

  // avatar helpers
  onAvatarFileInput(evt: Event): void {
    const input = evt.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const f = input.files[0];
    this.avatarFile = f;
    this.avatarDisplay = { uid: 'a-' + Date.now(), name: f.name, size: f.size, originFileObj: f } as any;
    const reader = new FileReader();
    reader.onload = () => {
      this.avatarPreview = String(reader.result || '');
    };
    reader.readAsDataURL(f);
  }

  removeAvatarFile(): void {
    this.avatarFile = null;
    this.avatarDisplay = null;
    this.avatarPreview = null;
  }

  private pascalCaseKeys(obj: any): any {
    if (obj === null || obj === undefined) return obj;
    if (Array.isArray(obj)) return obj.map(v => this.pascalCaseKeys(v));
    if (typeof obj !== 'object') return obj;
    const out: any = {};
    Object.keys(obj).forEach(k => {
      const v = obj[k];
      const newKey = k && k.length > 0 ? k.charAt(0).toUpperCase() + k.slice(1) : k;
      out[newKey] = this.pascalCaseKeys(v);
    });
    return out;
  }
}
