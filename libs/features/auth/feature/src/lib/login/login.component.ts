import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/auth/data-access';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  showPassword = false;
  loading = false;
  submitted = false;
  waiting = false;
  pendingTooltip = 'Đang xác thực...';
  errorMessages: string[] = [];
  warningMessages: string[] = [];
  usernameErrors: string[] = [];
  passwordErrors: string[] = [];


  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  submit() {
    this.errorMessages = [];
    this.warningMessages = [];
    this.usernameErrors = [];
    this.passwordErrors = [];

    const usernameCtrl = this.form.get('username');
    const pwCtrl = this.form.get('password');
    if (usernameCtrl) {
      const trimmed = (usernameCtrl.value || '').toString().trim();
      if (trimmed !== usernameCtrl.value) usernameCtrl.setValue(trimmed, { emitEvent: false });
      usernameCtrl.updateValueAndValidity();
    }
    if (pwCtrl) {
      const trimmedPw = (pwCtrl.value || '').toString().trim();
      if (trimmedPw !== pwCtrl.value) pwCtrl.setValue(trimmedPw, { emitEvent: false });
      pwCtrl.updateValueAndValidity();
    }

    this.submitted = true;
    this.form.markAllAsTouched();

    this.waiting = true;
    this.usernameErrors = [];
    this.passwordErrors = [];

    this.loading = true;
    const { username, password } = this.form.value;
    this.auth.login(username, password).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (!res) {
          this.errorMessages.push('Lỗi kết nối');
          return;
        }
        this.waiting = false;
        if (res.warningMessages && res.warningMessages.length) this.warningMessages = res.warningMessages;
        if (res.errors && res.errors.length) {
          this.usernameErrors = [];
          this.passwordErrors = [];
          this.errorMessages = [];
          res.errors.forEach((e: any) => {
            const desc: string = (e?.description || e?.code || '').toString();
            const lower = desc.toLowerCase();
            if (lower.includes('username') || lower.includes('tài khoản')) {
              this.usernameErrors.push(desc);
            } else if (lower.includes('password') || lower.includes('mật khẩu')) {
              this.passwordErrors.push(desc);
            } else {
              this.errorMessages.push(desc);
            }
          });
          return;
        }
        if (res.isOk === false && res.result && typeof res.result === 'string') {
          this.errorMessages.push(res.result);
          return;
        }
        if (res.isOk || (res.result && (res.result.accessToken || res.result.userId))) {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err: any) => {
        this.loading = false;
        this.waiting = false;
        const body = err?.error;
        if (body) {
          if (body.warningMessages) this.warningMessages = body.warningMessages;
          if (body.errors) {
            this.usernameErrors = [];
            this.passwordErrors = [];
            this.errorMessages = [];
            body.errors.forEach((e: any) => {
              const desc: string = (e?.description || e?.code || '').toString();
              const lower = desc.toLowerCase();
              if (lower.includes('username') || lower.includes('tài khoản')) {
                this.usernameErrors.push(desc);
              } else if (lower.includes('password') || lower.includes('mật khẩu')) {
                this.passwordErrors.push(desc);
              } else {
                this.errorMessages.push(desc);
              }
            });
          }
          if (body.result && typeof body.result === 'string') this.errorMessages.push(body.result);
        }
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
