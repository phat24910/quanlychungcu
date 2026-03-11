import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, PagedResult, ToaNha, Tang, CanHo, CauTrucToaNha } from './chung-cu.model';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class ChungCuService {
  private base = (environment && environment.apiBaseUrl)
    ? `${environment.apiBaseUrl.replace(/\/$/, '')}/api`
    : '/api';

  constructor(private http: HttpClient) {}

  // Toa nha
  createToaNha(payload: ToaNha): Observable<ApiResponse<ToaNha>> {
    return this.http.post<ApiResponse<ToaNha>>(`${this.base}/toa-nha`, payload);
  }

  updateToaNha(payload: ToaNha): Observable<ApiResponse<ToaNha>> {
    return this.http.put<ApiResponse<ToaNha>>(`${this.base}/toa-nha`, payload);
  }

  deleteToaNha(ids: number[]): Observable<ApiResponse<ToaNha[]>> {
    return this.http.request<ApiResponse<ToaNha[]>>('delete', `${this.base}/toa-nha`, { body: { ids } });
  }

  getToaNhaList(query: any): Observable<ApiResponse<PagedResult<ToaNha>>> {
    return this.http.post<ApiResponse<PagedResult<ToaNha>>>(`${this.base}/toa-nha/get-list`, query || {});
  }

  getToaNhaById(id: number): Observable<ApiResponse<ToaNha>> {
    return this.http.post<ApiResponse<ToaNha>>(`${this.base}/toa-nha/get-by-id`, { id });
  }

  // Tang
  createTang(payload: Tang): Observable<ApiResponse<Tang>> {
    return this.http.post<ApiResponse<Tang>>(`${this.base}/tang`, payload);
  }

  updateTang(payload: Tang): Observable<ApiResponse<Tang>> {
    return this.http.put<ApiResponse<Tang>>(`${this.base}/tang`, payload);
  }

  deleteTang(ids: number[]): Observable<ApiResponse<Tang[]>> {
    return this.http.request<ApiResponse<Tang[]>>('delete', `${this.base}/tang`, { body: { ids } });
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

  getCauTrucChungCu(keyword?: string): Observable<ApiResponse<CauTrucToaNha[]>> {
	const body: any = {};
	if (keyword) body.keyword = keyword;
	return this.http.post<ApiResponse<CauTrucToaNha[]>>(`${this.base}/catalog/cau-truc-chung-cu`, body);
  }

  // Can ho
  createCanHo(payload: CanHo): Observable<ApiResponse<CanHo>> {
    return this.http.post<ApiResponse<CanHo>>(`${this.base}/can-ho`, payload);
  }

  updateCanHo(payload: CanHo): Observable<ApiResponse<CanHo>> {
    return this.http.put<ApiResponse<CanHo>>(`${this.base}/can-ho`, payload);
  }

  deleteCanHo(ids: number[]): Observable<ApiResponse<CanHo[]>> {
    return this.http.request<ApiResponse<CanHo[]>>('delete', `${this.base}/can-ho`, { body: { ids } });
  }

  getCanHoList(query: any): Observable<ApiResponse<PagedResult<CanHo>>> {
    return this.http.post<ApiResponse<PagedResult<CanHo>>>(`${this.base}/can-ho/get-list`, query || {});
  }

  getCanHoById(id: number): Observable<ApiResponse<CanHo>> {
    return this.http.post<ApiResponse<CanHo>>(`${this.base}/can-ho/get-by-id`, { id });
  }
}
