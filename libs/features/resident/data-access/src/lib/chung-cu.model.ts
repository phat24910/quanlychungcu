export interface ApiResponse<T> {
  result: T;
  warningMessages?: string[];
  errors?: { code: string; description: string }[];
  isOk: boolean;
}

export interface PagingInfo {
  pageSize: number;
  pageNumber: number;
  totalItems: number;
}

export interface PagedResult<T> {
  items: T[];
  pagingInfo: PagingInfo;
}

export interface ToaNha {
  id?: number;
  maToaNha?: string;
  tenToaNha: string;
  soTang: number;
  soTangHam?: number;
  soCanHo?: number;
  diaChi?: string;
  moTa?: string;
  trangThaiToaNhaId?: number;
  tenTrangThaiToaNha?: string;
}

export interface Tang {
  id?: number;
  maTang?: string;
  tenTang?: string;
  loaiTangId?: number;
  tenLoaiTang?: string;
  toaNhaId?: number;
  tenToaNha?: string;
}

export interface CanHo {
  id?: number;
  toaNhaId: number;
  maCanHo?: string;
  dienTich?: number;
  tang?: number;
  soPhongNgu?: number;
  soPhongTam?: number;
  loaiCanHoId?: number;
  tinhTrangCanHoId?: number;
}

// Cấu trúc chung cư dùng cho tree view
export interface CauTrucCanHo {
  id: number;
  maCanHo?: string;
  tenCanHo?: string;
  trangThaiId?: number;
  tenTrangThai?: string;
}

export interface CauTrucTang {
  id: number;
  maTang?: string;
  tenTang?: string;
  cauTrucCanHos?: CauTrucCanHo[];
}

export interface CauTrucToaNha {
  id: number;
  maToaNha?: string;
  tenToaNha?: string;
  trangThaiId?: number;
  tenTrangThai?: string;
  cauTrucTangs?: CauTrucTang[];
}
