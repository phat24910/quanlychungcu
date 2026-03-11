import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from '@core/auth/data-access';
import { ChangePasswordModalService } from '@features/profile/feature';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isCollapsed = false;
  isMobile = false;
  currentTitle = 'Trang chủ';
  menuItems: any[] = [];
  userName = 'Quản trị viên';
  userRole = 'Ban quản lý';
  avatarUrl = '';
  defaultAvatar = 'assets/images/login.jpg';

  private avatarSub?: Subscription;

  constructor(private router: Router, private auth: AuthService, private changePwd: ChangePasswordModalService) { }

  ngOnInit(): void {
    this.checkMobile();
    this.buildDefaultMenu();
    this.updateTitleFromUrl(this.router.url);
    this.routerSub = this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
      const url = e.urlAfterRedirects || e.url;
      this.updateTitleFromUrl(url);
    });

    this.avatarSub = this.auth.avatar$.subscribe(url => {
      if (url) this.avatarUrl = url;
      else this.avatarUrl = this.auth.getAvatar() || '';
    });
    this.avatarUrl = this.auth.getAvatar() || this.avatarUrl;
  }

  @HostListener('window:resize')
  onResize() {
    this.checkMobile();
  }

  checkMobile() {
    this.isMobile = window.innerWidth <= 768;
    if (this.isMobile) this.isCollapsed = true;
  }

  buildDefaultMenu() {
    this.menuItems = [
      { title: 'Trang chủ', route: '/dashboard/home', icon: 'home' },
      { title: 'Quản lý chung cư', route: '/dashboard/resident', icon: 'team' },
      { title: 'Dịch vụ', children: [
        { title: 'Bảo trì', route: '/dashboard/services/maintenance', icon: 'tool' },
        { title: 'Thanh toán', route: '/dashboard/services/billing', icon: 'pay-circle' }
      ], icon: 'appstore' },
      { title: 'Thông báo', route: '/dashboard/notifications', icon: 'notification' },
      { title: 'Cài đặt', route: '/dashboard/settings', icon: 'setting' }
    ];
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
    this.avatarSub?.unsubscribe();
  }

  private routerSub?: Subscription;

  private updateTitleFromUrl(url: string): void {
    const title = this.findTitleByUrl(url, this.menuItems) || 'Trang chủ';
    this.currentTitle = title;
  }

  private findTitleByUrl(url: string, items: any[]): string | null {
    if (!items) return null;
    for (const it of items) {
      if (it.route && url.startsWith(it.route)) return it.title;
      if (it.children) {
        const childMatch = this.findTitleByUrl(url, it.children);
        if (childMatch) return childMatch;
      }
    }
    return null;
  }

  logout() {
    this.auth?.logout().subscribe({
      next: () => {
        this.auth.clearTokens();
        this.router.navigate(['/login']);
      },
      error: () => {
        this.auth.clearTokens();
        this.router.navigate(['/login']);
      }
    });
  }

  onBreakpoint(broken: any) {
    this.isMobile = !!broken;
    if (this.isMobile) this.isCollapsed = true;
  }

  goHome() {
    this.router.navigate(['/dashboard']);
  }

  goProfile() {
    this.router.navigate(['/profile']);
  }

  goChangePassword() {
    this.changePwd.open();
  }

  onAvatarError(ev: any) {
    ev.target.src = this.defaultAvatar;
  }

}
