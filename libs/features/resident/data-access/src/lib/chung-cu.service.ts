import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiResponse, PagedResult, ToaNha, Tang, CanHo, CauTrucToaNha } from './chung-cu.model';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class ChungCuService {
  private refreshSubject = new Subject<void>();
  refresh$ = this.refreshSubject.asObservable();
  private base = (environment && environment.apiBaseUrl)
    ? `${environment.apiBaseUrl.replace(/\/$/, '')}/api`
    : '/api';

  constructor(private http: HttpClient) {}

  // Toa nha
  createToaNha(payload: ToaNha): Observable<ApiResponse<ToaNha>> {
    return this.http.post<ApiResponse<ToaNha>>(`${this.base}/toa-nha`, payload)
      .pipe(tap((res: any) => { if (res && res.isOk) this.refreshSubject.next(); }));
  }

  updateToaNha(payload: ToaNha): Observable<ApiResponse<ToaNha>> {
    return this.http.put<ApiResponse<ToaNha>>(`${this.base}/toa-nha`, payload)
      .pipe(tap((res: any) => { if (res && res.isOk) this.refreshSubject.next(); }));
  }

  deleteToaNha(ids: number[]): Observable<ApiResponse<ToaNha[]>> {
    return this.http.request<ApiResponse<ToaNha[]>>('delete', `${this.base}/toa-nha`, { body: { ids } })
      .pipe(tap((res: any) => { if (res && res.isOk) this.refreshSubject.next(); }));
  }

  getToaNhaList(query: any): Observable<ApiResponse<PagedResult<ToaNha>>> {
    return this.http.post<ApiResponse<PagedResult<ToaNha>>>(`${this.base}/toa-nha/get-list`, query || {});
  }

  getToaNhaById(id: number): Observable<ApiResponse<ToaNha>> {
    return this.http.post<ApiResponse<ToaNha>>(`${this.base}/toa-nha/get-by-id`, { id });
  }

  // Tang
  createTang(payload: Tang): Observable<ApiResponse<Tang>> {
    return this.http.post<ApiResponse<Tang>>(`${this.base}/tang`, payload)
      .pipe(tap((res: any) => { if (res && res.isOk) this.refreshSubject.next(); }));
  }

  updateTang(payload: Tang): Observable<ApiResponse<Tang>> {
    return this.http.put<ApiResponse<Tang>>(`${this.base}/tang`, payload)
      .pipe(tap((res: any) => { if (res && res.isOk) this.refreshSubject.next(); }));
  }

  deleteTang(ids: number[]): Observable<ApiResponse<Tang[]>> {
    return this.http.request<ApiResponse<Tang[]>>('delete', `${this.base}/tang`, { body: { ids } })
      .pipe(tap((res: any) => { if (res && res.isOk) this.refreshSubject.next(); }));
  }

  getTangList(query: any): Observable<ApiResponse<PagedResult<Tang>>> {
    return this.http.post<ApiResponse<PagedResult<Tang>>>(`${this.base}/tang/get-list`, query || {});
  }

  getTangById(id: number): Observable<ApiResponse<Tang>> {
    return this.http.post<ApiResponse<Tang>>(`${this.base}/tang/get-by-id`, { id });
  }

  // Catalog
  getTrangThaiToaNhaForSelector(): Observable<ApiResponse<any[]>> {
	return this.http.post<ApiResponse<any[]>>(`${this.base}/catalog/trang-thai-toa-nha-for-selector`, {});
  }

  getLoaiTangForSelector(): Observable<ApiResponse<any[]>> {
    return this.http.post<ApiResponse<any[]>>(`${this.base}/catalog/loai-tang-for-selector`, {});
  }

  getLoaiCanHoForSelector(): Observable<ApiResponse<any[]>> {
    return this.http.post<ApiResponse<any[]>>(`${this.base}/catalog/loai-can-ho-for-selector`, {});
  }

  getTinhTrangCanHoForSelector(): Observable<ApiResponse<any[]>> {
    return this.http.post<ApiResponse<any[]>>(`${this.base}/catalog/tinh-trang-can-ho-for-selector`, {});
  }

  getLoaiQuanHeCuTruForSelector(): Observable<ApiResponse<any[]>> {
    return this.http.post<ApiResponse<any[]>>(`${this.base}/catalog/loai-quan-he-cu-tru-for-selector`, {});
  }

  getCauTrucChungCu(keyword?: string): Observable<ApiResponse<CauTrucToaNha[]>> {
	const body: any = {};
	if (keyword) body.keyword = keyword;
	return this.http.post<ApiResponse<CauTrucToaNha[]>>(`${this.base}/catalog/cau-truc-chung-cu`, body);
  }

  // Catalog - phuong tien
  getLoaiPhuongTienForSelector(): Observable<ApiResponse<any[]>> {
    return this.http.post<ApiResponse<any[]>>(`${this.base}/catalog/loai-phuong-tien-for-selector`, {});
  }

  getTrangThaiPhuongTienForSelector(): Observable<ApiResponse<any[]>> {
    return this.http.post<ApiResponse<any[]>>(`${this.base}/catalog/trang-thai-phuong-tien-for-selector`, {});
  }

  // Can ho
  createCanHo(payload: CanHo): Observable<ApiResponse<CanHo>> {
    return this.http.post<ApiResponse<CanHo>>(`${this.base}/can-ho`, payload)
      .pipe(tap((res: any) => { if (res && res.isOk) this.refreshSubject.next(); }));
  }

  updateCanHo(payload: CanHo): Observable<ApiResponse<CanHo>> {
    return this.http.put<ApiResponse<CanHo>>(`${this.base}/can-ho`, payload)
      .pipe(tap((res: any) => { if (res && res.isOk) this.refreshSubject.next(); }));
  }

  deleteCanHo(ids: number[]): Observable<ApiResponse<CanHo[]>> {
    return this.http.request<ApiResponse<CanHo[]>>('delete', `${this.base}/can-ho`, { body: { ids } })
      .pipe(tap((res: any) => { if (res && res.isOk) this.refreshSubject.next(); }));
  }

  getCanHoList(query: any): Observable<ApiResponse<PagedResult<CanHo>>> {
    return this.http.post<ApiResponse<PagedResult<CanHo>>>(`${this.base}/can-ho/get-list`, query || {});
  }

  getCanHoById(id: number): Observable<ApiResponse<CanHo>> {
    return this.http.post<ApiResponse<CanHo>>(`${this.base}/can-ho/get-by-id`, { id });
  }

  getResidentsByCanHo(query: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.base}/quan-he-cu-tru/cu-dan`, query || {});
  }

  searchUserForQuanHeCuTru(phoneNumber: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.base}/quan-he-cu-tru/search-user`, { phoneNumber });
  }

  createQuanHeCuTru(payload: { canHoId: number; userId: number; loaiQuanHeCuTruId: number; ngayBatDau?: string }): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.base}/quan-he-cu-tru`, payload)
      .pipe(tap((res: any) => { if (res && res.isOk) this.refreshSubject.next(); }));
  }

  ketThucQuanHeCuTru(quanHeCuTruId: number | string): Observable<ApiResponse<boolean>> {
    return this.http.request<ApiResponse<boolean>>('delete', `${this.base}/quan-he-cu-tru`, { body: { quanHeCuTruId } })
      .pipe(tap((res: any) => { if (res && res.isOk) this.refreshSubject.next(); }));
  }

  updateQuanHeCuTru(payload: { quanHeCuTruId: number | string; loaiQuanHeCuTruId?: number; ngayBatDau?: string; ngayKetThuc?: string }): Observable<ApiResponse<boolean>> {
    return this.http.put<ApiResponse<boolean>>(`${this.base}/quan-he-cu-tru`, payload)
      .pipe(tap((res: any) => { if (res && res.isOk) this.refreshSubject.next(); }));
  }

  deleteQuanHeCuTru(ids: Array<number | string>): Observable<ApiResponse<any[]>> {
    return this.http.request<ApiResponse<any[]>>('delete', `${this.base}/quan-he-cu-tru`, { body: { ids } })
      .pipe(tap((res: any) => { if (res && res.isOk) this.refreshSubject.next(); }));
  }

  // Phuong tien
  createPhuongTien(payload: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.base}/phuong-tien`, payload)
      .pipe(tap((res: any) => { if (res && res.isOk) this.refreshSubject.next(); }));
  }

  updatePhuongTien(payload: any): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.base}/phuong-tien`, payload)
      .pipe(tap((res: any) => { if (res && res.isOk) this.refreshSubject.next(); }));
  }

  deletePhuongTien(ids: number[]): Observable<ApiResponse<any>> {
    return this.http.request<ApiResponse<any>>('delete', `${this.base}/phuong-tien`, { body: { ids } })
      .pipe(tap((res: any) => { if (res && res.isOk) this.refreshSubject.next(); }));
  }

  updateTrangThaiPhuongTien(payload: any): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.base}/phuong-tien/trang-thai`, payload)
      .pipe(tap((res: any) => { if (res && res.isOk) this.refreshSubject.next(); }));
  }

  taoThePhuongTien(payload: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.base}/phuong-tien/tao-the`, payload)
      .pipe(tap((res: any) => { if (res && res.isOk) this.refreshSubject.next(); }));
  }

  goiYMaThe(phuongTienId: number): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.base}/phuong-tien/goi-y-ma-the`, { phuongTienId });
  }

  getPhuongTienList(query: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.base}/phuong-tien/get-list`, query || {});
  }

  getPhuongTienById(id: number): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.base}/phuong-tien/get-by-id`, { id });
  }

  khoaThePhuongTien(theIds: number[]): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.base}/phuong-tien/khoa-the`, { theIds })
      .pipe(tap((res: any) => { if (res && res.isOk) this.refreshSubject.next(); }));
  }
}
