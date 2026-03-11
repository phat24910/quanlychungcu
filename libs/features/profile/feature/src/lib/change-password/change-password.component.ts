import { Component } from '@angular/core';
import { ProfileApiService } from '../../../../data-access/src/lib/profile-api.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  model = { oldPassword: '', newPassword: '', confirmPassword: '' };
  loading = false;
  error: string | null = null;
  showOld = false;
  showNew = false;
  showConfirm = false;

  constructor(private api: ProfileApiService, private modal: NzModalRef, private message: NzMessageService) {}

  submit(): void {
    this.error = null;
    const m = this.model;
    if (!m.oldPassword) { this.error = 'Nhập mật khẩu cũ'; return; }
    if (!m.newPassword) { this.error = 'Nhập mật khẩu mới'; return; }
    if (m.newPassword !== m.confirmPassword) { this.error = 'Mật khẩu xác nhận không khớp'; return; }
    this.loading = true;
    this.api.changePassword(m).subscribe({
      next: (r: any) => {
        this.loading = false;
        if (r && r.isOk) {
          const msg = (r && r.result) ? String(r.result) : 'Đổi mật khẩu thành công.';
          this.message.success(msg);
          this.modal.close(r);
        } else {
          this.error = r?.result || 'Đổi mật khẩu không thành công';
        }
      },
      error: (err: any) => {
        this.loading = false;
        try {
          const body = err?.error;
          if (body && body.errors) {
            const first = Object.values(body.errors)[0] as any;
            this.error = Array.isArray(first) ? first[0] : String(first);
            return;
          }
        } catch {}
        this.error = 'Lỗi khi gọi API';
      }
    });
  }

  cancel(): void { this.modal.destroy(); }
}
