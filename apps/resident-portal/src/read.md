# Auth
## Đăng nhập
- **/api/auth/login**

{
  "username": "string",
  "password": ## "string"
}

Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "userId": 0,
    "username": "string",
    "email": "string",
    "anhDaiDienUrl": "string",
    "role": "string",
    "fullName": "string",
    "accessToken": "string",
    "refreshToken": "string"
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}



## Đăng xuất
- **/api/auth/logout**
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": true,
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}




## Cấp lại access token mới bằng refresh token
- **/api/auth/refresh-token**

API này được gọi khi Access Token đã hết hạn. Yêu cầu cung cấp RefreshToken hợp lệ, chưa bị thu hồi. Hệ thống sẽ vô hiệu hóa Refresh Token cũ và tạo ra một cặp Access Token và Refresh Token mới để duy trì đăng nhập.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "refreshToken": "string"
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "userId": 0,
    "username": "string",
    "email": "string",
    "anhDaiDienUrl": "string",
    "role": "string",
    "fullName": "string",
    "accessToken": "string",
    "refreshToken": "string"
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}




## Yêu cầu tạo mã khôi phục mật khẩu qua email
- **/api/auth/forgot-password**

Request body

application/json
Example Value
Schema
{
  "username": "string"
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}




## Đặt lại mật khẩu mới thông qua mã khôi phục
- **/api/auth/reset-password**

Request body

application/json
Example Value
Schema
{
  "username": "string",
  "resetCode": "string",
  "newPassword": "string",
  "confirmPassword": "string"
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": true,
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}



## Thay đổi mật khẩu cho người dung đang đăng nhập
- **/api/auth/change-password**

Request body

application/json
Example Value
Schema
{
  "oldPassword": "string",
  "newPassword": "string",
  "confirmPassword": "string"
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}






# Tạo mới tòa nhà
## /api/toa-nha
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "maToaNha": "string",
  "tenToaNha": "string",
  "diaChi": "string",
  "moTa": "string",
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "maToaNha": "string",
    "tenToaNha": "string",
    "soCanHo": 0,
    "diaChi": "string",
    "moTa": "string",
    "trangThaiToaNhaId": 0,
    "tenTrangThaiToaNha": "string"
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}

No links
400
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}




# Cập nhật thông tin tòa nhà
## /api/toa-nha
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "id": 0,
  "maToaNha": "string",
  "tenToaNha": "string",
  "diaChi": "string",
  "moTa": "string",
  "trangThaiToaNhaId": 0
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "maToaNha": "string",
    "tenToaNha": "string",
    "soCanHo": 0,
    "diaChi": "string",
    "moTa": "string",
    "trangThaiToaNhaId": 0,
    "tenTrangThaiToaNha": "string"
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}




# Xóa 1 hoặc nhiều tòa nhà theo ds id
## /api/toa-nha
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "ids": [
    0
  ]
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": [
    {
      "id": 0,
      "maToaNha": "string",
      "tenToaNha": "string",
      "soCanHo": 0,
      "diaChi": "string",
      "moTa": "string",
      "trangThaiToaNhaId": 0,
      "tenTrangThaiToaNha": "string"
    }
  ],
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}





# Lấy ds tòa nhà (hỗ trợ tìm kiếm, lọc, sắp xếp, phân trang)
## /api/toa-nha/get-list
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "keyword": "string",
  "sortCol": "string",
  "isAsc": true,
  "pageNumber": 0,
  "pageSize": 0
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "items": [
      {
        "id": 0,
        "maToaNha": "string",
        "tenToaNha": "string",
        "soCanHo": 0,
        "diaChi": "string",
        "moTa": "string",
        "trangThaiToaNhaId": 0,
        "tenTrangThaiToaNha": "string"
      }
    ],
    "pagingInfo": {
      "pageSize": 0,
      "pageNumber": 0,
      "totalItems": 0
    }
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}





# Lấy chi tiết tòa nhà theo ID
## /api/toa-nha/get-by-id
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "id": 0
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "maToaNha": "string",
    "tenToaNha": "string",
    "soCanHo": 0,
    "diaChi": "string",
    "moTa": "string",
    "trangThaiToaNhaId": 0,
    "tenTrangThaiToaNha": "string",
    "canHos": [
      {
        "id": 0,
        "maCanHo": "string",
        "tenCanHo": "string",
        "tangId": 0,
        "tenTang": "string",
        "dienTich": 0,
        "soPhongNgu": 0,
        "soPhongTam": 0,
        "loaiCanHoId": 0,
        "tenLoaiCanHo": "string",
        "tinhTrangCanHoId": 0,
        "tenTinhTrangCanHo": "string"
      }
    ]
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}





# Tạo mới 1 căn hộ
## /api/can-ho
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "maCanHo": "string",
  "tenCanHo": "string",
  "dienTich": 0,
  "tangId": 0,
  "soPhongNgu": 0,
  "soPhongTam": 0,
  "loaiCanHoId": 0
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "maCanHo": "string",
    "tenCanHo": "string",
    "tangId": 0,
    "tenTang": "string",
    "dienTich": 0,
    "soPhongNgu": 0,
    "soPhongTam": 0,
    "loaiCanHoId": 0,
    "tenLoaiCanHo": "string",
    "tinhTrangCanHoId": 0,
    "tenTinhTrangCanHo": "string"
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}





# Cập nhật thông tin căn hộ
## /api/can-ho
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "id": 0,
  "tangId": 0,
  "maCanHo": "string",
  "tenCanHo": "string",
  "dienTich": 0,
  "soPhongNgu": 0,
  "soPhongTam": 0,
  "loaiCanHoId": 0,
  "tinhTrangCanHoId": 0
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "maCanHo": "string",
    "tenCanHo": "string",
    "tangId": 0,
    "tenTang": "string",
    "dienTich": 0,
    "soPhongNgu": 0,
    "soPhongTam": 0,
    "loaiCanHoId": 0,
    "tenLoaiCanHo": "string",
    "tinhTrangCanHoId": 0,
    "tenTinhTrangCanHo": "string"
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}






# Xóa 1 hoặc nhiều căn hộ theo ds ID
## /api/can-ho
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "ids": [
    0
  ]
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": [
    {
      "id": 0,
      "maCanHo": "string",
      "tenCanHo": "string",
      "tangId": 0,
      "tenTang": "string",
      "dienTich": 0,
      "soPhongNgu": 0,
      "soPhongTam": 0,
      "loaiCanHoId": 0,
      "tenLoaiCanHo": "string",
      "tinhTrangCanHoId": 0,
      "tenTinhTrangCanHo": "string"
    }
  ],
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}




# Lấy ds căn hộ (hỗ trợ tìm kiếm, lọc, sắp xếp, phân trang)
## /api/can-ho/get-list
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "tangId": 0,
  "keyword": "string",
  "sortCol": "string",
  "isAsc": true,
  "pageNumber": 0,
  "pageSize": 0
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "items": [
      {
        "id": 0,
        "maCanHo": "string",
        "tenCanHo": "string",
        "tangId": 0,
        "tenTang": "string",
        "dienTich": 0,
        "soPhongNgu": 0,
        "soPhongTam": 0,
        "loaiCanHoId": 0,
        "tenLoaiCanHo": "string",
        "tinhTrangCanHoId": 0,
        "tenTinhTrangCanHo": "string"
      }
    ],
    "pagingInfo": {
      "pageSize": 0,
      "pageNumber": 0,
      "totalItems": 0
    }
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}






Lấy chi tiết căn hộ theo id
/api/can-ho/get-by-id
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "id": 0
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "tangId": 0,
    "tenTang": "string",
    "tenCanHo": "string",
    "maCanHo": "string",
    "dienTich": 0,
    "soPhongNgu": 0,
    "soPhongTam": 0,
    "loaiCanHoId": 0,
    "tenLoaiCanHo": "string",
    "tinhTrangCanHoId": 0,
    "tenTinhTrangCanHo": "string",
    "quanHeCuTrus": [
      {
        "id": 0,
        "canHoId": 0,
        "userId": 0,
        "fullName": "string",
        "loaiQuanHeCuTruId": 0,
        "tenLoaiQuanHeCuTru": "string",
        "ngayBatDau": "2026-03-17T01:46:17.292Z",
        "ngayKetThuc": "2026-03-17T01:46:17.292Z",
        "isKetThuc": true
      }
    ]
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}






Thay đổi mật khẩu cho người dùng đang đăng nhập
/api/Profile/change-password
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "oldPassword": "string",
  "newPassword": "string",
  "confirmPassword": "string"
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}







Lấy thông tin cá nhân người dùng đang đăng nhập
/api/Profile/get-profile
Parameters
Try it out
No parameters

Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "username": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "phoneNumber": "string",
    "idCard": "string",
    "dob": "2026-03-10T04:08:57.001Z",
    "gioiTinhId": 0,
    "gioiTinhName": "string",
    "roleId": 0,
    "roleName": "string"
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}





Cập nhật thông tin cá nhân người dùng đang đăng nhập
/api/Profile
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "firstName": "string",
  "lastName": "string",
  "phoneNumber": "string",
  "idCard": "string",
  "dob": "2026-03-10T04:09:50.629Z",
  "gioiTinhId": 0,
  "diaChi": "string"
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "username": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "phoneNumber": "string",
    "idCard": "string",
    "dob": "2026-03-10T04:09:50.630Z",
    "gioiTinhId": 0,
    "gioiTinhName": "string",
    "roleId": 0,
    "roleName": "string"
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}




Cập nhật ảnh đại diện người dùng đang đăng nhập
/api/Profile/change-avatar
Parameters
Try it out
No parameters

Request body

multipart/form-data
avatar
string($binary)
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}




Tạo mới tầng
/api/tang
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "maTang": "string",
  "tenTang": "string",
  "loaiTangId": 0,
  "toaNhaId": 0
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "maTang": "string",
    "tenTang": "string",
    "loaiTangId": 0,
    "tenLoaiTang": "string",
    "toaNhaId": 0,
    "tenToaNha": "string"
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}



Cập nhật thông tin tầng
/api/tang
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "id": 0,
  "toaNhaId": 0,
  "maTang": "string",
  "tenTang": "string",
  "loaiTangId": 0
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "maTang": "string",
    "tenTang": "string",
    "loaiTangId": 0,
    "tenLoaiTang": "string",
    "toaNhaId": 0,
    "tenToaNha": "string"
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}



Xóa tầng theo ds ID
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "ids": [
    0
  ]
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": [
    {
      "id": 0,
      "maTang": "string",
      "tenTang": "string",
      "loaiTangId": 0,
      "tenLoaiTang": "string",
      "toaNhaId": 0,
      "tenToaNha": "string"
    }
  ],
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}



Lấy ds tầng theo ID tòa nhà
/api/tang/get-list

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "toaNhaId": 0,
  "keyword": "string",
  "sortCol": "string",
  "isAsc": true,
  "pageNumber": 0,
  "pageSize": 0
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "items": [
      {
        "id": 0,
        "maTang": "string",
        "tenTang": "string",
        "loaiTangId": 0,
        "tenLoaiTang": "string",
        "toaNhaId": 0,
        "tenToaNha": "string"
      }
    ],
    "pagingInfo": {
      "pageSize": 0,
      "pageNumber": 0,
      "totalItems": 0
    }
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}



Lấy chi tiết tầng theo ID
/api/tang/get-by-id
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "id": 0
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "maTang": "string",
    "tenTang": "string",
    "loaiTangId": 0,
    "tenLoaiTang": "string",
    "toaNhaId": 0,
    "tenToaNha": "string",
    "canHos": [
      {
        "id": 0,
        "maCanHo": "string",
        "tenCanHo": "string",
        "tangId": 0,
        "tenTang": "string",
        "dienTich": 0,
        "soPhongNgu": 0,
        "soPhongTam": 0,
        "loaiCanHoId": 0,
        "tenLoaiCanHo": "string",
        "tinhTrangCanHoId": 0,
        "tenTinhTrangCanHo": "string"
      }
    ]
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}



Tìm hồ sơ cư dân (bước 1a)
/api/quan-he-cu-tru/search-user
API sử dụng khi Nhân viên BQL muốn kiểm tra xem cư dân đã có hồ sơ trong hệ thống hay chưa dựa trên thông tin CCCD. Tra cứu thông tin để tránh tạo trùng lặp hồ sơ người dùng và chuẩn bị cho bước thiết lập cư trú.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "idCard": "string"
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "username": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "fullName": "string",
    "phoneNumber": "string",
    "dob": "2026-03-26T07:14:22.736Z",
    "gioiTinhId": 0,
    "gioiTinhName": "string",
    "roleId": 0,
    "roleName": "string",
    "diaChi": "string",
    "idCard": "string",
    "documents": [
      {
        "id": 0,
        "loaiGiayToId": 0,
        "tenLoaiGiayTo": "string",
        "soGiayTo": "string",
        "ngayPhatHanh": "2026-03-26T07:14:22.736Z",
        "files": [
          {
            "id": 0,
            "fileUrl": "string",
            "fileName": "string",
            "contentType": "string"
          }
        ]
      }
    ]
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}



Tạo hồ sơ cư dân mới (bước 1b)
/api/quan-he-cu-tru/tao-ho-so
API dùng để tạo mới một Hồ sơ người dùng (User) khi cư dân đó chưa từng tồn tại trong hệ thống. Hồ sơ này chỉ chứa thông tin định danh cơ bản, chưa liên kết với căn hộ hay tài khoản đăng nhập.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "firstName": "string",
  "lastName": "string",
  "dob": "2026-03-26T07:15:02.767Z",
  "gioiTinhId": 0,
  "diaChi": "string",
  "idCard": "string",
  "documents": [
    {
      "loaiGiayToId": 0,
      "soGiayTo": "string",
      "ngayPhatHanh": "2026-03-26T07:15:02.767Z",
      "fileIds": [
        0
      ]
    }
  ]
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": 0,
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}




Chỉnh sửa hồ sơ cư dân
/api/quan-he-cu-tru/ho-so
API dùng để chỉnh sửa thông tin hồ sơ của cư dân trong căn hộ. Cho phép cập nhật thông tin cá nhân và các tài liệu cư trú đi kèm.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "quanHeCuTruId": 0,
  "firstName": "string",
  "lastName": "string",
  "dob": "2026-03-30T04:14:31.436Z",
  "gioiTinhId": 0,
  "diaChi": "string",
  "loaiQuanHeCuTruId": 0,
  "idCard": "string",
  "phoneNumber": "string",
  "taiLieuCuTrus": [
    {
      "taiLieuCuTruId": 0,
      "loaiGiayToId": 0,
      "soGiayTo": "string",
      "ngayPhatHanh": "2026-03-30T04:14:31.436Z",
      "fileIds": [
        0
      ]
    }
  ]
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "firstName": "string",
    "lastName": "string",
    "fullName": "string",
    "gioiTinhId": 0,
    "gioiTinhName": "string",
    "dob": "2026-03-30T04:14:31.468Z",
    "idCard": "string",
    "phoneNumber": "string",
    "diaChi": "string",
    "loaiQuanHeCuTruId": 0,
    "tenLoaiQuanHeCuTru": "string",
    "taiLieuCuTrus": [
      {
        "id": 0,
        "loaiGiayToId": 0,
        "tenLoaiGiayTo": "string",
        "soGiayTo": "string",
        "ngayPhatHanh": "2026-03-30T04:14:31.468Z",
        "targetTaiLieuCuTruId": 0,
        "files": [
          {
            "id": 0,
            "fileUrl": "string",
            "fileName": "string",
            "contentType": "string"
          }
        ]
      }
    ]
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}




Thiết lập cư trú - thêm cư dân vào căn hộ (Bước 2)
/api/quan-he-cu-tru
API dành cho BQL để gán một Hồ sơ người dùng (đã tìm thấy ở Bước 1a hoặc tạo ở 1b) vào một căn hộ cụ thể. Hệ thống sẽ tạo một bản ghi Quan hệ cư trú (QuanHeCuTru) liên kết User với CanHo.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "canHoId": 0,
  "userId": 0,
  "loaiQuanHeCuTruId": 0
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "maToaNha": "string",
    "maTang": "string",
    "maCanHo": "string",
    "quanHeCuTruId": 0,
    "userId": 0,
    "hoTen": "string",
    "phoneNumber": "string",
    "loaiQuanHeCuTruId": 0,
    "tenLoaiQuanHeCuTru": "string",
    "ngayBatDau": "2026-03-26T07:15:51.248Z",
    "ngayKetThuc": "2026-03-26T07:15:51.248Z",
    "trangThaiCuTruId": 0,
    "userCode": "string",
    "documents": [
      {
        "id": 0,
        "loaiGiayToId": 0,
        "tenLoaiGiayTo": "string",
        "soGiayTo": "string",
        "ngayPhatHanh": "2026-03-26T07:15:51.248Z",
        "files": [
          {
            "id": 0,
            "fileUrl": "string",
            "fileName": "string",
            "contentType": "string"
          }
        ]
      }
    ]
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}




Kết thúc cư trú - đánh dấu cư dân đã chuyển đi
/api/quan-he-cu-tru
API dùng để kết thúc khoảng thời gian sinh sống của cư dân tại căn hộ. Yêu cầu truyền vào QuanHeCuTruId. Hệ thống sẽ cập nhật trạng thái TrangThaiCuTruId thành DaKetThuc và cập nhật 'NgayKetThuc' của quan hệ cư trú.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "quanHeCuTruId": 0
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": true,
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}




Cập nhật quan hệ cư trú (loại quan hệ trong căn hộ)
/api/quan-he-cu-tru
API dùng để sửa thông tin về quan hệ cư trú Cho phép đổi loại quan hệ (LoaiQuanHeCuTruId).

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "quanHeCuTruId": 0,
  "loaiQuanHeCuTruId": 0
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": true,
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}



Bổ sung tài liệu cư dân (Bước 2b)
/api/quan-he-cu-tru/tai-lieu
API dùng để đính kèm các tệp hồ sơ chứng minh (CCCD, sổ hộ khẩu, tạm trú...) vào hồ sơ của cư dân. Thường được thực hiện ngay sau khi thiết lập cư trú để hoàn thiện hồ sơ pháp lý.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "userId": 0,
  "documents": [
    {
      "loaiGiayToId": 0,
      "soGiayTo": "string",
      "ngayPhatHanh": "2026-03-26T07:18:40.777Z",
      "fileIds": [
        0
      ]
    }
  ]
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}



Tạo mã định danh (sinh token)
/api/quan-he-cu-tru/tao-ma-dinh-danh
API dùng để sinh ra một mã xác thực (Token) để cư dân có thể sử dụng mã này tự liên kết với tài khoản ứng dụng cá nhân. Giúp bảo mật quá trình bàn giao tài khoản cho cư dân chính chủ.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "userId": 0,
  "email": "string"
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}





Xác nhận định danh (dành cho app cư dân- qua link email) (Bước 4a)
/api/quan-he-cu-tru/xac-nhan-dinh-danh
API được gọi khi cư dân nhấn vào link xác nhận trong email. Hệ thống sẽ giải mã token để lấy thông tin UserId và thực hiện liên kết tài khoản.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "token": "string"
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "username": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "fullName": "string",
    "phoneNumber": "string",
    "dob": "2026-03-26T07:21:46.689Z",
    "gioiTinhId": 0,
    "gioiTinhName": "string",
    "roleId": 0,
    "roleName": "string",
    "diaChi": "string",
    "idCard": "string",
    "documents": [
      {
        "id": 0,
        "loaiGiayToId": 0,
        "tenLoaiGiayTo": "string",
        "soGiayTo": "string",
        "ngayPhatHanh": "2026-03-26T07:21:46.689Z",
        "files": [
          {
            "id": 0,
            "fileUrl": "string",
            "fileName": "string",
            "contentType": "string"
          }
        ]
      }
    ]
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}



Liên kết tài khoản trực tiếp (Dành cho Ban quản lý)
/api/quan-he-cu-tru/lien-ket-tai-khoan
API cho phép BQL trực tiếp liên kết một Hồ sơ cư dân với một Tài khoản người dùng dựa trên Email. Không cần thông qua quy trình gửi email xác nhận.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "userId": 0,
  "email": "string"
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "username": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "fullName": "string",
    "phoneNumber": "string",
    "dob": "2026-03-30T03:14:12.792Z",
    "gioiTinhId": 0,
    "gioiTinhName": "string",
    "roleId": 0,
    "roleName": "string",
    "diaChi": "string",
    "idCard": "string",
    "taiLieuCuTrus": [
      {
        "id": 0,
        "loaiGiayToId": 0,
        "tenLoaiGiayTo": "string",
        "soGiayTo": "string",
        "ngayPhatHanh": "2026-03-30T03:14:12.792Z",
        "targetTaiLieuCuTruId": 0,
        "files": [
          {
            "id": 0,
            "fileUrl": "string",
            "fileName": "string",
            "contentType": "string"
          }
        ]
      }
    ]
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}




Lấy danh sách cư dân trong chung cư với bộ lọc và tìm kiếm nâng cao
/api/quan-he-cu-tru/cu-dan
API truy vấn danh sách cư dân hỗ trợ các chức năng:

Phạm vi (ID): Lọc chính xác theo ToaNhaId, TangId, CanHoId.
Từ khóa: Tìm kiếm theo HoTen, MaToaNha, MaTang, MaCanHo (qua tham số Keyword).
Bộ lọc:
Mã định danh: MaToaNha, MaTang, MaCanHo.
Trạng thái: LoaiQuanHeCuTruId, TrangThaiCuTruId.
Thời gian: Khoảng ngày bắt đầu (NgayBatDauFrom/To) và khoảng ngày kết thúc (NgayKetThucFrom/To).
Sắp xếp: Hỗ trợ sắp xếp theo MaToaNha, MaTang, MaCanHo, HoTen, LoaiQuanHeCuTruId, NgayBatDau, NgayKetThuc, TrangThaiCuTruId.
Phân trang: PageNumber và PageSize.
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "toaNhaId": 0,
  "tangId": 0,
  "canHoId": 0,
  "keyword": "string",
  "maToaNha": "string",
  "maTang": "string",
  "maCanHo": "string",
  "loaiQuanHeCuTruId": 0,
  "trangThaiCuTruId": 0,
  "ngayBatDauFrom": "2026-03-26T07:23:18.494Z",
  "ngayBatDauTo": "2026-03-26T07:23:18.494Z",
  "ngayKetThucFrom": "2026-03-26T07:23:18.494Z",
  "ngayKetThucTo": "2026-03-26T07:23:18.494Z",
  "sortCol": "string",
  "isAsc": true,
  "pageNumber": 0,
  "pageSize": 0
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "items": [
      {
        "maToaNha": "string",
        "maTang": "string",
        "maCanHo": "string",
        "quanHeCuTruId": 0,
        "userId": 0,
        "hoTen": "string",
        "phoneNumber": "string",
        "loaiQuanHeCuTruId": 0,
        "tenLoaiQuanHeCuTru": "string",
        "ngayBatDau": "2026-03-26T07:23:18.495Z",
        "ngayKetThuc": "2026-03-26T07:23:18.495Z",
        "trangThaiCuTruId": 0,
        "userCode": "string",
        "documents": [
          {
            "id": 0,
            "loaiGiayToId": 0,
            "tenLoaiGiayTo": "string",
            "soGiayTo": "string",
            "ngayPhatHanh": "2026-03-26T07:23:18.495Z",
            "files": [
              {
                "id": 0,
                "fileUrl": "string",
                "fileName": "string",
                "contentType": "string"
              }
            ]
          }
        ]
      }
    ],
    "pagingInfo": {
      "pageSize": 0,
      "pageNumber": 0,
      "totalItems": 0
    }
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}




Lấy lịch sử cư trú theo căn hộ hoặc theo cư dân (phải truyền CanHoId hoặc UserId)
Dùng để tra cứu lịch sử cư trú.
/api/quan-he-cu-tru/lich-su
API truy vấn lịch sử các lần cư trú của một người dựa trên UserId:

Người dùng: Lọc theo UserId (Bắt buộc).
Thông tin cư trú: Loại quan hệ cư trú.
Thời gian: Khoảng ngày bắt đầu (NgayBatDauFrom/To) và khoảng ngày kết thúc (NgayKetThucFrom/To).
Sắp xếp: Hỗ trợ sắp xếp theo NgayBatDau, NgayKetThuc, MaCanHo, LoaiQuanHeCuTruId.
Phân trang: PageNumber và PageSize.
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "userId": 0,
  "loaiQuanHeCuTruId": 0,
  "ngayBatDauFrom": "2026-03-26T07:24:17.733Z",
  "ngayBatDauTo": "2026-03-26T07:24:17.733Z",
  "ngayKetThucFrom": "2026-03-26T07:24:17.733Z",
  "ngayKetThucTo": "2026-03-26T07:24:17.733Z",
  "sortCol": "string",
  "isAsc": true,
  "pageNumber": 0,
  "pageSize": 0
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "items": [
      {
        "toaNhaId": 0,
        "tenToaNha": "string",
        "tangId": 0,
        "tenTang": "string",
        "canHoId": 0,
        "tenCanHo": "string",
        "quanHeCuTruId": 0,
        "loaiQuanHeCuTruId": 0,
        "tenLoaiQuanHeCuTru": "string",
        "ngayBatDau": "2026-03-26T07:24:17.734Z",
        "ngayKetThuc": "2026-03-26T07:24:17.734Z"
      }
    ],
    "pagingInfo": {
      "pageSize": 0,
      "pageNumber": 0,
      "totalItems": 0
    }
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}




Tạo hồ sơ cư trú (Dành cho app cư dân)
/api/quan-he-cu-tru/yeu-cau
API cho phép Chủ hộ chủ động gửi yêu cầu Thêm/Sửa/Xóa thành viên cư trú trong căn hộ của mình. Yêu cầu sẽ được lưu dưới dạng bản ghi tạm thời, bao gồm cả thông tin thành viên đề xuất và các tài liệu đính kèm, chờ BQL phê duyệt.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "canHoId": 0,
  "loaiYeuCauId": 0,
  "firstName": "string",
  "lastName": "string",
  "phoneNumber": "string",
  "dob": "2026-03-26T07:25:54.950Z",
  "gioiTinhId": 0,
  "loaiQuanHeId": 0,
  "quanHeCuTruId": 0,
  "newLoaiQuanHeId": 0,
  "noiDung": "string",
  "taiLieuCuTrus": [
    {
      "loaiGiayToId": 0,
      "soGiayTo": "string",
      "ngayPhatHanh": "2026-03-26T07:25:54.950Z",
      "fileIds": [
        0
      ]
    }
  ]
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "canHoId": 0,
    "maCanHo": "string",
    "loaiYeuCauId": 0,
    "tenLoaiYeuCau": "string",
    "quanHeCuTruId": 0,
    "proposedFirstName": "string",
    "proposedLastName": "string",
    "proposedDob": "2026-03-26T07:25:54.951Z",
    "proposedGioiTinhId": 0,
    "proposedPhoneNumber": "string",
    "proposedLoaiQuanHeId": 0,
    "noiDung": "string",
    "reason": "string",
    "trangThaiId": 0,
    "tenTrangThai": "string",
    "createdAt": "2026-03-26T07:25:54.951Z",
    "processedAt": "2026-03-26T07:25:54.951Z",
    "processedBy": 0,
    "documents": [
      {
        "id": 0,
        "loaiGiayToId": 0,
        "tenLoaiGiayTo": "string",
        "soGiayTo": "string",
        "ngayPhatHanh": "2026-03-26T07:25:54.951Z",
        "files": [
          {
            "id": 0,
            "fileUrl": "string",
            "fileName": "string",
            "contentType": "string"
          }
        ]
      }
    ]
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}



Phê duyệt yêu cầu cư trú (Dành cho Ban quản lý)
/api/quan-he-cu-tru/yeu-cau
API dùng để BQL duyệt yêu cầu do cư dân gửi lên. Sau khi duyệt:

Nếu là yêu cầu Thêm: Hệ thống tự động tạo User, thêm tài liệu và gán vào căn hộ.
Nếu là yêu cầu Sửa/Xóa: Cập nhật thông tin thực tế của cư dân tương ứng.
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "yeuCauCuTruId": 0
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": true,
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}



Từ chối yêu cầu cư trú (Dành cho Ban quản lý)
/api/quan-he-cu-tru/yeu-cau
BQL dùng API này để bác bỏ yêu cầu của cư dân nếu thông tin không hợp lệ hoặc thiếu tài liệu. Yêu cầu bắt buộc phải truyền vào Lý do từ chối để thông báo cho cư dân.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "yeuCauCuTruId": 0,
  "lyDo": "string"
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": true,
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}




Lấy chi tiết yêu cầu cư trú
/api/quan-he-cu-tru/yeu-cau/get-by-id
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "requestId": 0
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "canHoId": 0,
    "maCanHo": "string",
    "loaiYeuCauId": 0,
    "tenLoaiYeuCau": "string",
    "quanHeCuTruId": 0,
    "proposedFirstName": "string",
    "proposedLastName": "string",
    "proposedDob": "2026-03-26T07:29:03.745Z",
    "proposedGioiTinhId": 0,
    "proposedPhoneNumber": "string",
    "proposedLoaiQuanHeId": 0,
    "noiDung": "string",
    "reason": "string",
    "trangThaiId": 0,
    "tenTrangThai": "string",
    "createdAt": "2026-03-26T07:29:03.745Z",
    "processedAt": "2026-03-26T07:29:03.745Z",
    "processedBy": 0,
    "documents": [
      {
        "id": 0,
        "loaiGiayToId": 0,
        "tenLoaiGiayTo": "string",
        "soGiayTo": "string",
        "ngayPhatHanh": "2026-03-26T07:29:03.745Z",
        "files": [
          {
            "id": 0,
            "fileUrl": "string",
            "fileName": "string",
            "contentType": "string"
          }
        ]
      }
    ]
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}




Lấy danh sách yêu cầu cư trú (dành cho ban quản lý) với bộ lọc, sắp xếp và phân trang nâng cao
/api/quan-he-cu-tru/yeu-cau/get-list
API truy vấn danh sách các yêu cầu cư trú hỗ trợ các chức năng:

Phạm vi: Lọc theo căn hộ (CanHoId).
Loại yêu cầu: Lọc theo loại yêu cầu (LoaiYeuCauId - Thêm, Sửa, Xóa).
Trạng thái: Lọc theo trạng thái xử lý (TrangThaiId - Chờ duyệt, Đã duyệt, Từ chối).
Sắp xếp: Hỗ trợ sắp xếp theo các cột thông qua SortCol và IsAsc.
Phân trang: Hỗ trợ phân trang qua PageNumber và PageSize.
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "canHoId": 0,
  "loaiYeuCauId": 0,
  "trangThaiId": 0,
  "sortCol": "string",
  "isAsc": true,
  "pageNumber": 0,
  "pageSize": 0
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "items": [
      {
        "id": 0,
        "canHoId": 0,
        "loaiYeuCauId": 0,
        "tenLoaiYeuCau": "string",
        "targetQuanHeCuTruId": 0,
        "yeuCauTen": "string",
        "yeuCauHo": "string",
        "yeuCauNgaySinh": "2026-03-30T16:06:36.841Z",
        "yeuCauGioiTinhId": 0,
        "yeuCauSoDienThoai": "string",
        "yeuCauCCCD": "string",
        "yeuCauDiaChi": "string",
        "yeuCauLoaiQuanHeId": 0,
        "noiDung": "string",
        "lyDo": "string",
        "trangThaiId": 0,
        "tenTrangThai": "string",
        "createdAt": "2026-03-30T16:06:36.841Z",
        "ngayXuLy": "2026-03-30T16:06:36.841Z",
        "nguoiXuLyId": 0,
        "documents": [
          {
            "id": 0,
            "loaiGiayToId": 0,
            "tenLoaiGiayTo": "string",
            "soGiayTo": "string",
            "ngayPhatHanh": "2026-03-30T16:06:36.841Z",
            "targetTaiLieuCuTruId": 0,
            "files": [
              {
                "id": 0,
                "fileUrl": "string",
                "fileName": "string",
                "contentType": "string"
              }
            ]
          }
        ]
      }
    ],
    "pagingInfo": {
      "pageSize": 0,
      "pageNumber": 0,
      "totalItems": 0
    }
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}



UploadMedia
/api/upload-media
Parameters
Try it out
No parameters

Request body

multipart/form-data
files
array
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": [
    {
      "fileId": 0,
      "fileName": "string",
      "fileUrl": "string",
      "contentType": "string"
    }
  ],
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}



Lấy chi tiết yêu cầu cư trú
/api/quan-he-cu-tru/yeu-cau/get-by-id
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "requestId": 0
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "canHoId": 0,
    "loaiYeuCauId": 0,
    "tenLoaiYeuCau": "string",
    "targetQuanHeCuTruId": 0,
    "yeuCauTen": "string",
    "yeuCauHo": "string",
    "yeuCauNgaySinh": "2026-03-30T16:13:09.217Z",
    "yeuCauGioiTinhId": 0,
    "yeuCauSoDienThoai": "string",
    "yeuCauCCCD": "string",
    "yeuCauDiaChi": "string",
    "yeuCauLoaiQuanHeId": 0,
    "noiDung": "string",
    "lyDo": "string",
    "trangThaiId": 0,
    "tenTrangThai": "string",
    "createdAt": "2026-03-30T16:13:09.217Z",
    "ngayXuLy": "2026-03-30T16:13:09.217Z",
    "nguoiXuLyId": 0,
    "documents": [
      {
        "id": 0,
        "loaiGiayToId": 0,
        "tenLoaiGiayTo": "string",
        "soGiayTo": "string",
        "ngayPhatHanh": "2026-03-30T16:13:09.217Z",
        "targetTaiLieuCuTruId": 0,
        "files": [
          {
            "id": 0,
            "fileUrl": "string",
            "fileName": "string",
            "contentType": "string"
          }
        ]
      }
    ]
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}




Xóa yêu cầu cư trú
/api/quan-he-cu-tru/yeu-cau
API cho phép BQL xóa các yêu cầu dư thừa hoặc không cần thiết. Cho phép xóa nhiều yêu cầu cùng lúc.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "ids": [
    0
  ]
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": true,
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}



Phê duyệt yêu cầu cư trú
/api/quan-he-cu-tru/yeu-cau/phe-duyet
Hoàn cảnh sử dụng: BQL phê duyệt yêu cầu hợp lệ của cư dân để cập nhật dữ liệu chính thức vào hệ thống.
Hệ thống xử lý:
Thêm mới: Tự động tạo Hồ sơ người dùng, lưu trữ tài liệu đính kèm và thiết lập quan hệ cư trú mới.
Chỉnh sửa: Cập nhật thông tin cá nhân và quản lý tài liệu (thêm/sửa/xóa tài liệu cũ để khớp với yêu cầu).
Xóa: Chấm dứt quan hệ cư trú hiện tại.
Chuyển trạng thái yêu cầu sang "Đã duyệt" và ghi nhận người xử lý.
Yêu cầu dữ liệu:
Bắt buộc: YeuCauCuTruId.
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "yeuCauCuTruId": 0
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": true,
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}




Từ chối yêu cầu cư trú
/api/quan-he-cu-tru/yeu-cau/tu-choi
Hoàn cảnh sử dụng: BQL không chấp nhận yêu cầu của cư dân (thiếu hồ sơ, thông tin sai, v.v.).
Hệ thống xử lý: Ghi nhận lý do từ chối, chuyển trạng thái yêu cầu sang "Từ chối" và gửi phản hồi đến cư dân qua hệ thống thông báo.
Yêu cầu dữ liệu:
Bắt buộc: YeuCauCuTruId, LyDo.
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "yeuCauCuTruId": 0,
  "lyDo": "string"
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": true,
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}




Lấy ds phương tiện trong chung cư với bộ lọc và tìm kiếm nâng cao
/api/phuong-tien/get-list
Hoàn cảnh sử dụng: Nhân viên BQL truy vấn danh sách toàn bộ phương tiện trong chung cư để kiểm soát số lượng, vị trí đỗ và trạng thái vận hành.
Hệ thống xử lý:
Truy vấn kết hợp thông tin phương tiện, chủ sở hữu (căn hộ) và vị trí (tòa nhà/tầng).
Hỗ trợ bộ lọc động theo loại xe, biển số, màu sắc và trạng thái (tìm kiếm theo tên xe, biển số, màu xe qua Keyword).
Thực hiện phân trang và sắp xếp phía Server.
Yêu cầu dữ liệu:
Bắt buộc: PageNumber, PageSize.
Tùy chọn (Filter): ToaNhaId, TangId, CanHoId, Keyword, LoaiPhuongTienId (api/catalog/loai-phuong-tien-for-selector), MauXe, TrangThaiPhuongTienId (api/catalog/trang-thai-phuong-tien-for-selector), SortCol, IsAsc.
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "toaNhaId": 0,
  "tangId": 0,
  "canHoId": 0,
  "keyword": "string",
  "maToaNha": "string",
  "maTang": "string",
  "maCanHo": "string",
  "loaiPhuongTienId": 0,
  "mauXe": "string",
  "trangThaiPhuongTienId": 0,
  "sortCol": "string",
  "isAsc": true,
  "pageNumber": 0,
  "pageSize": 0
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "items": [
      {
        "id": 0,
        "canHoId": 0,
        "maToaNha": "string",
        "maTang": "string",
        "maCanHo": "string",
        "tenPhuongTien": "string",
        "loaiPhuongTienId": 0,
        "tenLoaiPhuongTien": "string",
        "bienSo": "string",
        "mauXe": "string",
        "trangThaiPhuongTienId": 0,
        "tenTrangThaiPhuongTien": "string",
        "thePhuongTiens": [
          {
            "id": 0,
            "phuongTienId": 0,
            "maThe": "string",
            "ngayBatDau": "2026-03-31T16:51:53.766Z",
            "ngayKetThuc": "2026-03-31T16:51:53.766Z",
            "trangThaiThePhuongTienId": 0,
            "tenTrangThaiThePhuongTien": "string"
          }
        ],
        "hinhAnhPhuongTiens": [
          {
            "fileId": 0,
            "fileName": "string",
            "fileUrl": "string",
            "contentType": "string"
          }
        ]
      }
    ],
    "pagingInfo": {
      "pageSize": 0,
      "pageNumber": 0,
      "totalItems": 0
    }
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
Lấy thông tin chi tiết phương tiện cùng ds thẻ 
/api/phuong-tien/get-by-id
Hoàn cảnh sử dụng: Xem chi tiết thông số kỹ thuật, hình ảnh và danh sách các thẻ xe (RFID) đang liên kết với phương tiện này.
Hệ thống xử lý: Truy xuất thông tin phương tiện kèm theo các tệp hình ảnh và thông tin thẻ xe liên quan.
Yêu cầu dữ liệu:
Bắt buộc: Id.
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "id": 0
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "canHoId": 0,
    "maToaNha": "string",
    "maTang": "string",
    "maCanHo": "string",
    "tenPhuongTien": "string",
    "loaiPhuongTienId": 0,
    "tenLoaiPhuongTien": "string",
    "bienSo": "string",
    "mauXe": "string",
    "trangThaiPhuongTienId": 0,
    "tenTrangThaiPhuongTien": "string",
    "thePhuongTiens": [
      {
        "id": 0,
        "phuongTienId": 0,
        "maThe": "string",
        "ngayBatDau": "2026-03-31T16:53:24.864Z",
        "ngayKetThuc": "2026-03-31T16:53:24.864Z",
        "trangThaiThePhuongTienId": 0,
        "tenTrangThaiThePhuongTien": "string"
      }
    ],
    "hinhAnhPhuongTiens": [
      {
        "fileId": 0,
        "fileName": "string",
        "fileUrl": "string",
        "contentType": "string"
      }
    ]
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
404	
Not Found

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
Đăng ký phương tiện mới cho căn hộ
/api/phuong-tien
Hoàn cảnh sử dụng: Nhân viên BQL thực hiện đăng ký xe chính thức cho cư dân sau khi kiểm tra hồ sơ giấy tờ trực tiếp.
Hệ thống xử lý:
Xác thực sự tồn tại của căn hộ.
Kiểm tra hạn mức (quota) số lượng xe tối đa của căn hộ để đảm bảo không vượt quá quy định.
Tạo bản ghi phương tiện và lưu trữ thông tin hình ảnh đi kèm.
Lưu ý về Tệp tin: Các tệp tin hình ảnh phải được tải lên trước thông qua API POST api/upload-media để lấy danh sách Id. Sau đó, sử dụng các Id này để điền vào trường HinhAnhIds.
Yêu cầu dữ liệu:
Bắt buộc: CanHoId, TenPhuongTien, LoaiPhuongTienId (Lấy tại api/catalog/loai-phuong-tien-for-selector), BienSo, MauXe.
Tùy chọn: HinhAnhIds.
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "canHoId": 0,
  "tenPhuongTien": "string",
  "loaiPhuongTienId": 0,
  "bienSo": "string",
  "mauXe": "string",
  "hinhAnhIds": [
    0
  ]
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "canHoId": 0,
    "maToaNha": "string",
    "maTang": "string",
    "maCanHo": "string",
    "tenPhuongTien": "string",
    "loaiPhuongTienId": 0,
    "tenLoaiPhuongTien": "string",
    "bienSo": "string",
    "mauXe": "string",
    "trangThaiPhuongTienId": 0,
    "tenTrangThaiPhuongTien": "string",
    "thePhuongTiens": [
      {
        "id": 0,
        "phuongTienId": 0,
        "maThe": "string",
        "ngayBatDau": "2026-03-31T16:54:01.248Z",
        "ngayKetThuc": "2026-03-31T16:54:01.248Z",
        "trangThaiThePhuongTienId": 0,
        "tenTrangThaiThePhuongTien": "string"
      }
    ],
    "hinhAnhPhuongTiens": [
      {
        "fileId": 0,
        "fileName": "string",
        "fileUrl": "string",
        "contentType": "string"
      }
    ]
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
Cập nhật thông tin phương tiện
/api/phuong-tien
Hoàn cảnh sử dụng: BQL sửa đổi các thông tin cơ bản của xe (tên xe, biển số, màu sắc) do nhập sai hoặc cư dân thay đổi thông tin.
Hệ thống xử lý: Cập nhật các thuộc tính của bản ghi phương tiện và cập nhật lại danh sách hình ảnh đính kèm.
Lưu ý về Tệp tin: Các tệp tin hình ảnh mới phải được tải lên trước thông qua API POST api/upload-media để lấy danh sách Id. Sau đó, sử dụng các Id này để điền vào trường HinhAnhIds.
Yêu cầu dữ liệu:
Bắt buộc: PhuongTienId, TenPhuongTien, LoaiPhuongTienId (api/catalog/loai-phuong-tien-for-selector), BienSo, MauXe.
Tùy chọn: HinhAnhIds.
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "phuongTienId": 0,
  "tenPhuongTien": "string",
  "loaiPhuongTienId": 0,
  "bienSo": "string",
  "mauXe": "string",
  "hinhAnhIds": [
    0
  ]
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "canHoId": 0,
    "maToaNha": "string",
    "maTang": "string",
    "maCanHo": "string",
    "tenPhuongTien": "string",
    "loaiPhuongTienId": 0,
    "tenLoaiPhuongTien": "string",
    "bienSo": "string",
    "mauXe": "string",
    "trangThaiPhuongTienId": 0,
    "tenTrangThaiPhuongTien": "string",
    "thePhuongTiens": [
      {
        "id": 0,
        "phuongTienId": 0,
        "maThe": "string",
        "ngayBatDau": "2026-03-31T16:54:39.971Z",
        "ngayKetThuc": "2026-03-31T16:54:39.971Z",
        "trangThaiThePhuongTienId": 0,
        "tenTrangThaiThePhuongTien": "string"
      }
    ],
    "hinhAnhPhuongTiens": [
      {
        "fileId": 0,
        "fileName": "string",
        "fileUrl": "string",
        "contentType": "string"
      }
    ]
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
Kích hoạt 1 hoặc nhiều phương tiện
/api/phuong-tien/kich-hoat
Hoàn cảnh sử dụng: Khôi phục trạng thái hoạt động cho các phương tiện đang bị khóa hoặc tạm dừng.
Hệ thống xử lý:
Kiểm tra lại hạn mức xe của căn hộ tại thời điểm kích hoạt (để tránh trường hợp đã hết chỗ trong lúc phương tiện đang bị khóa).
Cập nhật trạng thái phương tiện sang "Active".
Yêu cầu dữ liệu:
Bắt buộc: PhuongTienIds (Danh sách ID phương tiện).
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "phuongTienIds": [
    0
  ]
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": true,
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
Hủy 1 hoặc nhiều phương tiện
/api/phuong-tien/huy
Hoàn cảnh sử dụng: Chấm dứt quyền gửi xe của cư dân (ví dụ: cư dân chuyển đi hoặc không còn nhu cầu gửi xe).
Hệ thống xử lý:
Chuyển trạng thái phương tiện sang "Đã hủy" (Inactive).
Tự động khóa toàn bộ các thẻ xe đang liên kết với phương tiện này để ngăn chặn việc ra vào.
Yêu cầu dữ liệu:
Bắt buộc: PhuongTienIds (Danh sách ID phương tiện).
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "phuongTienIds": [
    0
  ]
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": true,
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
Khóa 1 hoặc nhiều phương tiện
/api/phuong-tien/khoa
Hoàn cảnh sử dụng: BQL tạm thời đình chỉ quyền gửi xe của cư dân do vi phạm quy định hoặc nợ phí gửi xe.
Hệ thống xử lý:
Cập nhật trạng thái phương tiện sang "Bị khóa" (Blocked).
Vô hiệu hóa tính năng quẹt thẻ của thẻ xe liên kết cho đến khi được mở khóa lại.
Yêu cầu dữ liệu:
Bắt buộc: PhuongTienIds (Danh sách ID phương tiện).
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "phuongTienIds": [
    0
  ]
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": true,
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
Tạo thẻ phương tiện (gán mã thẻ cho phương tiện)
/api/phuong-tien/the-phuong-tien
Hoàn cảnh sử dụng: Gán một thẻ vật lý (chip RFID) cho một phương tiện đã đăng ký để bắt đầu sử dụng dịch vụ trông giữ xe.
Hệ thống xử lý:
Kiểm tra tính duy nhất của mã thẻ (MaThe) trong hệ thống.
Tạo liên kết giữa thẻ và phương tiện, thiết lập trạng thái hoạt động cho thẻ.
Yêu cầu dữ liệu:
Bắt buộc: PhuongTienId, MaThe.
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "phuongTienId": 0,
  "maThe": "string"
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "phuongTienId": 0,
    "maThe": "string",
    "ngayBatDau": "2026-03-31T16:59:19.078Z",
    "ngayKetThuc": "2026-03-31T16:59:19.078Z",
    "trangThaiThePhuongTienId": 0,
    "tenTrangThaiThePhuongTien": "string"
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
Gợi ý mã phương tiện
/api/phuong-tien/the-phuong-tien/goi-y-ma-the
Hoàn cảnh sử dụng: Hỗ trợ BQL nhanh chóng lấy một mã thẻ gợi ý (thường dựa trên mã phương tiện hoặc số thứ tự) khi cấp thẻ mới.
Hệ thống xử lý: Sinh mã thẻ gợi ý dựa trên quy tắc đánh số của hệ thống và kiểm tra tính khả dụng.
Yêu cầu dữ liệu:
Bắt buộc: PhuongTienId.
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "phuongTienId": 0
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
Khóa thẻ phương tiện
/api/phuong-tien/the-phuong-tien/khoa
Hoàn cảnh sử dụng: BQL vô hiệu hóa thủ công một hoặc nhiều thẻ xe cụ thể (ví dụ: thẻ bị hỏng hoặc thu hồi riêng lẻ).
Hệ thống xử lý: Chuyển trạng thái thẻ sang "Bị khóa", ngăn chặn quẹt thẻ tại các máy iParking.
Yêu cầu dữ liệu:
Bắt buộc: TheIds (Danh sách ID thẻ).
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "theIds": [
    0
  ]
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": true,
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
Xóa yêu cầu phương tiện
/api/phuong-tien/yeu-cau
Hoàn cảnh sử dụng: Nhân viên BQL dọn dẹp các yêu cầu rác, yêu cầu bị gửi nhầm hoặc không còn giá trị xử lý.
Hệ thống xử lý: Thực hiện xóa cứng các bản ghi yêu cầu tương ứng khỏi hệ thống.
Yêu cầu dữ liệu:
Bắt buộc: Ids (Danh sách ID yêu cầu).
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "ids": [
    0
  ]
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": true,
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
Lấy thông tin chi tiết yêu cầu phương tiện
/api/phuong-tien/yeu-cau/get-by-id
Hoàn cảnh sử dụng: Xem chi tiết nội dung của một yêu cầu (Thêm/Sửa/Xóa xe) kèm theo các hình ảnh minh chứng và thông tin người gửi/xử lý.
Hệ thống xử lý: Truy xuất thông tin yêu cầu kết hợp với thông tin căn hộ, tòa nhà và lịch sử xử lý.
Yêu cầu dữ liệu:
Bắt buộc: RequestId.
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "requestId": 0
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "createdBy": 0,
    "tenNguoiGui": "string",
    "createdAt": "2026-03-31T17:02:08.460Z",
    "canHoId": 0,
    "tenCanHo": "string",
    "tenTang": "string",
    "tenToaNha": "string",
    "nguoiXuLyId": 0,
    "tenNguoiXuLy": "string",
    "ngayXuLy": "2026-03-31T17:02:08.460Z",
    "phuongTienId": 0,
    "loaiYeuCauId": 0,
    "tenLoaiYeuCau": "string",
    "trangThaiId": 0,
    "tenTrangThai": "string",
    "noiDung": "string",
    "lyDo": "string",
    "yeuCauTenPhuongTien": "string",
    "yeuCauLoaiPhuongTienId": 0,
    "tenYeuCauLoaiPhuongTien": "string",
    "yeuCauBienSo": "string",
    "yeuCauMauXe": "string",
    "yeuCauHinhAnhPhuongTiens": [
      {
        "id": 0,
        "fileUrl": "string",
        "fileName": "string",
        "contentType": "string"
      }
    ]
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
404	
Not Found

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}

Lấy ds yêu cầu phương tiện với bộ lọc và phân trang
/api/phuong-tien/yeu-cau/get-list
Hoàn cảnh sử dụng: BQL truy vấn danh sách các yêu cầu đang chờ xử lý hoặc lịch sử yêu cầu của cư dân. Cư dân theo dõi trạng thái các yêu cầu của chính mình.
Hệ thống xử lý:
Hỗ trợ bộ lọc theo tòa nhà, tầng, căn hộ, loại yêu cầu và trạng thái.
Trả về thông tin tóm tắt kèm theo metadata về người gửi, người xử lý và vị trí căn hộ.
Yêu cầu dữ liệu:
Tùy chọn (Filter): ToaNhaId, TangId, CanHoId, LoaiYeuCauId, TrangThaiId.
Phân trang: PageNumber, PageSize.
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "toaNhaId": 0,
  "tangId": 0,
  "canHoId": 0,
  "loaiYeuCauId": 0,
  "trangThaiId": 0,
  "keyword": "string",
  "sortCol": "string",
  "isAsc": true,
  "pageNumber": 0,
  "pageSize": 0
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "items": [
      {
        "id": 0,
        "createdBy": 0,
        "tenNguoiGui": "string",
        "createdAt": "2026-04-06T03:03:53.682Z",
        "canHoId": 0,
        "tenCanHo": "string",
        "tenTang": "string",
        "tenToaNha": "string",
        "nguoiXuLyId": 0,
        "tenNguoiXuLy": "string",
        "ngayXuLy": "2026-04-06T03:03:53.682Z",
        "loaiYeuCauId": 0,
        "tenLoaiYeuCau": "string",
        "trangThaiId": 0,
        "tenTrangThai": "string",
        "lyDo": "string",
        "noiDung": "string",
        "yeuCauTenPhuongTien": "string",
        "yeuCauBienSo": "string"
      }
    ],
    "pagingInfo": {
      "pageSize": 0,
      "pageNumber": 0,
      "totalItems": 0
    }
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}


Phê duyệt yêu cầu về phương tiện
/api/phuong-tien/yeu-cau/phe-duyet
Hoàn cảnh sử dụng: BQL phê duyệt yêu cầu đăng ký/thay đổi/hủy xe của cư dân để cập nhật dữ liệu chính thức vào hệ thống.
Hệ thống xử lý:
Thêm mới: Tự động tạo bản ghi phương tiện chính thức và lưu trữ hình ảnh.
Chỉnh sửa: Cập nhật thông tin phương tiện hiện có.
Xóa: Chấm dứt quyền sử dụng dịch vụ của phương tiện (Inactive).
Chuyển trạng thái yêu cầu sang "Đã duyệt" và ghi nhận người xử lý.
Yêu cầu dữ liệu:
Bắt buộc: YeuCauPhuongTienId.
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "yeuCauPhuongTienId": 0
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "createdBy": 0,
    "tenNguoiGui": "string",
    "createdAt": "2026-03-31T17:03:25.347Z",
    "canHoId": 0,
    "tenCanHo": "string",
    "tenTang": "string",
    "tenToaNha": "string",
    "nguoiXuLyId": 0,
    "tenNguoiXuLy": "string",
    "ngayXuLy": "2026-03-31T17:03:25.347Z",
    "phuongTienId": 0,
    "loaiYeuCauId": 0,
    "tenLoaiYeuCau": "string",
    "trangThaiId": 0,
    "tenTrangThai": "string",
    "noiDung": "string",
    "lyDo": "string",
    "yeuCauTenPhuongTien": "string",
    "yeuCauLoaiPhuongTienId": 0,
    "tenYeuCauLoaiPhuongTien": "string",
    "yeuCauBienSo": "string",
    "yeuCauMauXe": "string",
    "yeuCauHinhAnhPhuongTiens": [
      {
        "id": 0,
        "fileUrl": "string",
        "fileName": "string",
        "contentType": "string"
      }
    ]
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
Từ chối yêu cầu về phương tiện
/api/phuong-tien/yeu-cau/tu-choi
Hoàn cảnh sử dụng: BQL không chấp nhận yêu cầu của cư dân (thiếu hình ảnh, thông tin sai, v.v.).
Hệ thống xử lý: Ghi nhận lý do từ chối, chuyển trạng thái yêu cầu sang "Từ chối" và gửi phản hồi đến cư dân qua hệ thống thông báo.
Yêu cầu dữ liệu:
Bắt buộc: YeuCauPhuongTienId, LyDo.
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "yeuCauPhuongTienId": 0,
  "lyDo": "string"
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "createdBy": 0,
    "tenNguoiGui": "string",
    "createdAt": "2026-03-31T17:03:56.366Z",
    "canHoId": 0,
    "tenCanHo": "string",
    "tenTang": "string",
    "tenToaNha": "string",
    "nguoiXuLyId": 0,
    "tenNguoiXuLy": "string",
    "ngayXuLy": "2026-03-31T17:03:56.366Z",
    "phuongTienId": 0,
    "loaiYeuCauId": 0,
    "tenLoaiYeuCau": "string",
    "trangThaiId": 0,
    "tenTrangThai": "string",
    "noiDung": "string",
    "lyDo": "string",
    "yeuCauTenPhuongTien": "string",
    "yeuCauLoaiPhuongTienId": 0,
    "tenYeuCauLoaiPhuongTien": "string",
    "yeuCauBienSo": "string",
    "yeuCauMauXe": "string",
    "yeuCauHinhAnhPhuongTiens": [
      {
        "id": 0,
        "fileUrl": "string",
        "fileName": "string",
        "contentType": "string"
      }
    ]
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}




Lấy thông tin chi tiết cư dân và quan hệ cư trú
/api/cu-dan/thong-tin
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "quanHeCuTruId": 0
}
Responses
Code	Description	Links
200
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "userId": 0,
    "fullName": "string",
    "firstName": "string",
    "lastName": "string",
    "phoneNumber": "string",
    "dob": "2026-03-30T02:01:49.286Z",
    "gioiTinhId": 0,
    "gioiTinhName": "string",
    "anhDaiDienUrl": "string",
    "taiLieuCuTrus": [
      {
        "id": 0,
        "loaiGiayToId": 0,
        "tenLoaiGiayTo": "string",
        "soGiayTo": "string",
        "ngayPhatHanh": "2026-03-30T02:01:49.286Z",
        "targetTaiLieuCuTruId": 0,
        "files": [
          {
            "id": 0,
            "fileUrl": "string",
            "fileName": "string",
            "contentType": "string"
          }
        ]
      }
    ],
    "quanHeCuTruId": 0,
    "loaiQuanHeCuTruId": 0,
    "loaiQuanHeTen": "string",
    "ngayBatDau": "2026-03-30T02:01:49.286Z",
    "idCard": "string"
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}




Tạo mới nhân viên tòa nhà
/api/nhan-vien
Hoàn cảnh sử dụng: Quản trị viên thêm mới nhân viên (kỹ thuật, bảo vệ, vệ sinh) vào hệ thống.
Hệ thống xử lý:
Tạo Hồ sơ Người dùng: Tự động tạo thông tin nhân thân (Họ tên, ngày sinh, CCCD...).
Tạo Tài khoản: Tự động tạo tài khoản đăng nhập với Email và Password cung cấp, gán quyền Staff.
Tạo mã nhân viên: Tự động tạo mã nhân viên theo định dạng NV-{YYYY}-{XXXX} (ví dụ: NV-2023-0001).
Khởi tạo nhân viên: Gán loại nhân viên và trạng thái mặc định "Đang làm việc".
Yêu cầu dữ liệu:
Thông tin cá nhân: Ho, Ten, NgaySinh, GioiTinhId, CCCD, SoDienThoai.
Tài khoản: Email, Password.
Nhân viên: LoaiNhanVienId, NgayVaoLam.
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "ho": "string",
  "ten": "string",
  "ngaySinh": "2026-04-07T09:15:37.388Z",
  "gioiTinhId": 0,
  "diaChi": "string",
  "cccd": "string",
  "soDienThoai": "string",
  "email": "string",
  "loaiNhanVienId": 0,
  "ngayVaoLam": "2026-04-07T09:15:37.388Z",
  "ghiChu": "string",
  "taiLieus": [
    {
      "taiLieuCuTruId": 0,
      "loaiGiayToId": 0,
      "soGiayTo": "string",
      "ngayPhatHanh": "2026-04-07T09:15:37.388Z",
      "fileIds": [
        0
      ]
    }
  ]
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "nguoiDungId": 0,
    "firstName": "string",
    "lastName": "string",
    "hoTen": "string",
    "email": "string",
    "soDienThoai": "string",
    "cccd": "string",
    "diaChi": "string",
    "dob": "2026-04-07T09:15:37.390Z",
    "gioiTinhId": 0,
    "gioiTinhName": "string",
    "anhDaiDienUrl": "string",
    "roles": [
      "string"
    ],
    "loaiNhanVienId": 0,
    "tenLoaiNhanVien": "string",
    "trangThaiNhanVienId": 0,
    "tenTrangThaiNhanVien": "string",
    "maNhanVien": "string",
    "ngayVaoLam": "2026-04-07T09:15:37.391Z",
    "ngayNghiLam": "2026-04-07T09:15:37.391Z",
    "ghiChu": "string",
    "taiLieuNguoiDungs": [
      {
        "id": 0,
        "loaiGiayToId": 0,
        "tenLoaiGiayTo": "string",
        "soGiayTo": "string",
        "ngayPhatHanh": "2026-04-07T09:15:37.391Z",
        "targetTaiLieuCuTruId": 0,
        "files": [
          {
            "id": 0,
            "fileUrl": "string",
            "fileName": "string",
            "contentType": "string"
          }
        ]
      }
    ]
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
Cập nhật thông tin nhân viên
/api/nhan-vien
Hoàn cảnh sử dụng: Cập nhật chức vụ, trạng thái làm việc hoặc thông tin nhân thân của nhân viên.
Hệ thống xử lý:
Cập nhật thông tin hồ sơ nhân viên.
Cập nhật thông tin người dùng được liên kết (Họ tên, địa chỉ, CCCD...).
Tự động ghi nhận NgayNghiLam nếu trạng thái chuyển sang "Đã nghỉ việc".
Lưu ý: Mã nhân viên (MaNhanVien) là không thể thay đổi sau khi tạo.
Yêu cầu dữ liệu:
Bắt buộc: Id, Ho, Ten, NgaySinh, GioiTinhId, LoaiNhanVienId, TrangThaiNhanVienId, NgayVaoLam.
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "id": 0,
  "ho": "string",
  "ten": "string",
  "ngaySinh": "2026-04-07T09:15:37.404Z",
  "gioiTinhId": 0,
  "diaChi": "string",
  "cccd": "string",
  "soDienThoai": "string",
  "loaiNhanVienId": 0,
  "trangThaiNhanVienId": 0,
  "ngayVaoLam": "2026-04-07T09:15:37.404Z",
  "ghiChu": "string",
  "taiLieus": [
    {
      "taiLieuCuTruId": 0,
      "loaiGiayToId": 0,
      "soGiayTo": "string",
      "ngayPhatHanh": "2026-04-07T09:15:37.404Z",
      "fileIds": [
        0
      ]
    }
  ]
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "nguoiDungId": 0,
    "firstName": "string",
    "lastName": "string",
    "hoTen": "string",
    "email": "string",
    "soDienThoai": "string",
    "cccd": "string",
    "diaChi": "string",
    "dob": "2026-04-07T09:15:37.406Z",
    "gioiTinhId": 0,
    "gioiTinhName": "string",
    "anhDaiDienUrl": "string",
    "roles": [
      "string"
    ],
    "loaiNhanVienId": 0,
    "tenLoaiNhanVien": "string",
    "trangThaiNhanVienId": 0,
    "tenTrangThaiNhanVien": "string",
    "maNhanVien": "string",
    "ngayVaoLam": "2026-04-07T09:15:37.406Z",
    "ngayNghiLam": "2026-04-07T09:15:37.406Z",
    "ghiChu": "string",
    "taiLieuNguoiDungs": [
      {
        "id": 0,
        "loaiGiayToId": 0,
        "tenLoaiGiayTo": "string",
        "soGiayTo": "string",
        "ngayPhatHanh": "2026-04-07T09:15:37.406Z",
        "targetTaiLieuCuTruId": 0,
        "files": [
          {
            "id": 0,
            "fileUrl": "string",
            "fileName": "string",
            "contentType": "string"
          }
        ]
      }
    ]
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
Xóa 1 hoặc nhiều nhân viên
/api/nhan-vien
Hoàn cảnh sử dụng: Loại bỏ danh sách nhân viên khỏi hệ thống quản lý.
Hệ thống xử lý:
Kiểm tra sự tồn tại của tất cả các ID cung cấp.
Đánh dấu nhân viên là đã xóa (IsDeleted).
Chuyển trạng thái nhân viên sang "Đã nghỉ việc".
Yêu cầu dữ liệu:
Bắt buộc: Ids (Danh sách ID nhân viên).
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "ids": [
    0
  ]
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": [
    0
  ],
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
Lấy danh sách nhân viên (hỗ trợ lọc, tìm kiếm, phân trang)
/api/nhan-vien/get-list
Hoàn cảnh sử dụng: Quản lý và tìm kiếm nhân viên theo loại hình (kỹ thuật/vệ sinh) hoặc trạng thái làm việc.
Hệ thống xử lý:
Tìm kiếm theo Mã nhân viên, Họ tên hoặc Số điện thoại qua Keyword.
Kết hợp dữ liệu từ bảng người dùng để lấy thông tin liên lạc.
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "keyword": "string",
  "loaiNhanVienId": 0,
  "trangThaiNhanVienId": 0,
  "pageNumber": 0,
  "pageSize": 0
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "items": [
      {
        "id": 0,
        "nguoiDungId": 0,
        "firstName": "string",
        "lastName": "string",
        "hoTen": "string",
        "email": "string",
        "soDienThoai": "string",
        "cccd": "string",
        "diaChi": "string",
        "dob": "2026-04-07T09:19:05.027Z",
        "gioiTinhId": 0,
        "gioiTinhName": "string",
        "anhDaiDienUrl": "string",
        "roles": [
          "string"
        ],
        "loaiNhanVienId": 0,
        "tenLoaiNhanVien": "string",
        "trangThaiNhanVienId": 0,
        "tenTrangThaiNhanVien": "string",
        "maNhanVien": "string",
        "ngayVaoLam": "2026-04-07T09:19:05.027Z",
        "ngayNghiLam": "2026-04-07T09:19:05.027Z",
        "ghiChu": "string",
        "taiLieuNguoiDungs": [
          {
            "id": 0,
            "loaiGiayToId": 0,
            "tenLoaiGiayTo": "string",
            "soGiayTo": "string",
            "ngayPhatHanh": "2026-04-07T09:19:05.027Z",
            "targetTaiLieuCuTruId": 0,
            "files": [
              {
                "id": 0,
                "fileUrl": "string",
                "fileName": "string",
                "contentType": "string"
              }
            ]
          }
        ]
      }
    ],
    "pagingInfo": {
      "pageSize": 0,
      "pageNumber": 0,
      "totalItems": 0
    }
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
Lấy chi tiết nhân viên theo id 
/api/nhan-vien/get-by-id
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "id": 0
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "nguoiDungId": 0,
    "firstName": "string",
    "lastName": "string",
    "hoTen": "string",
    "email": "string",
    "soDienThoai": "string",
    "cccd": "string",
    "diaChi": "string",
    "dob": "2026-04-07T09:20:06.089Z",
    "gioiTinhId": 0,
    "gioiTinhName": "string",
    "anhDaiDienUrl": "string",
    "roles": [
      "string"
    ],
    "loaiNhanVienId": 0,
    "tenLoaiNhanVien": "string",
    "trangThaiNhanVienId": 0,
    "tenTrangThaiNhanVien": "string",
    "maNhanVien": "string",
    "ngayVaoLam": "2026-04-07T09:20:06.089Z",
    "ngayNghiLam": "2026-04-07T09:20:06.089Z",
    "ghiChu": "string",
    "taiLieuNguoiDungs": [
      {
        "id": 0,
        "loaiGiayToId": 0,
        "tenLoaiGiayTo": "string",
        "soGiayTo": "string",
        "ngayPhatHanh": "2026-04-07T09:20:06.089Z",
        "targetTaiLieuCuTruId": 0,
        "files": [
          {
            "id": 0,
            "fileUrl": "string",
            "fileName": "string",
            "contentType": "string"
          }
        ]
      }
    ]
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}





Tạo mới 1 đối tác
/api/doi-tac
Hoàn cảnh sử dụng: Khi BQL muốn thêm một đơn vị mới vào hệ thống để quản lý các hợp đồng và dịch vụ đi kèm.
Hệ thống xử lý:
Lưu trữ thông tin cơ bản: Tên, địa chỉ, mã số thuế, thông tin liên hệ.
Khởi tạo danh sách hợp đồng trống cho đối tác này.
Yêu cầu dữ liệu:
Bắt buộc: TenDoiTac, DiaChi, MaSoThue, NguoiDaiDien, SoDienThoai.
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "tenDoiTac": "string",
  "tenCongTy": "string",
  "nguoiDaiDien": "string",
  "soGiayPhepKD": "string",
  "maSoThue": "string",
  "diaChi": "string",
  "soDienThoai": "string",
  "email": "string",
  "ghiChu": "string",
  "hopDongs": [
    {
      "id": 0,
      "soHopDong": "string",
      "ngayKy": "2026-04-10T03:17:51.624Z",
      "ngayHetHan": "2026-04-10T03:17:51.624Z",
      "giaTri": 0,
      "noiDung": "string",
      "tepFileIds": [
        0
      ],
      "maDichVu": "string",
      "tenDichVu": "string",
      "loaiDichVuId": 0,
      "donViTinh": "string",
      "moTa": "string",
      "isBatBuoc": true,
      "iconId": 0,
      "soLuongToiDa": 0
    }
  ]
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "tenDoiTac": "string",
    "tenCongTy": "string",
    "nguoiDaiDien": "string",
    "soDienThoai": "string",
    "email": "string",
    "ghiChu": "string",
    "ngayHetHan": "2026-04-10T03:17:51.626Z",
    "soGiayPhepKD": "string",
    "maSoThue": "string",
    "diaChi": "string",
    "hopDongs": [
      {
        "id": 0,
        "soHopDong": "string",
        "ngayKy": "2026-04-10T03:17:51.626Z",
        "ngayHetHan": "2026-04-10T03:17:51.626Z",
        "giaTriHopDong": 0,
        "loaiDichVuId": 0,
        "tenLoaiDichVu": "string",
        "trangThaiHopDongId": 0,
        "tenTrangThaiHopDong": "string",
        "noiDung": "string",
        "teps": [
          {
            "fileId": 0,
            "fileName": "string",
            "fileUrl": "string",
            "contentType": "string"
          }
        ],
        "maDichVu": "string",
        "tenDichVu": "string",
        "donViTinh": "string",
        "isBatBuoc": true,
        "trangThaiDichVuId": 0,
        "trangThaiDichVuTen": "string"
      }
    ]
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links

PUT
/api/doi-tac
Cập nhật thông tin đối tác


Hoàn cảnh sử dụng: Khi đối tác thay đổi thông tin liên lạc, địa chỉ hoặc người đại diện.
Hệ thống xử lý: Cập nhật thông tin chi tiết của đối tác vào cơ sở dữ liệu.
Yêu cầu dữ liệu:
Bắt buộc: Id, TenDoiTac, DiaChi, MaSoThue, NguoiDaiDien, SoDienThoai.
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "id": 0,
  "tenDoiTac": "string",
  "tenCongTy": "string",
  "nguoiDaiDien": "string",
  "soGiayPhepKD": "string",
  "maSoThue": "string",
  "diaChi": "string",
  "soDienThoai": "string",
  "email": "string",
  "ghiChu": "string"
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "tenDoiTac": "string",
    "tenCongTy": "string",
    "nguoiDaiDien": "string",
    "soDienThoai": "string",
    "email": "string",
    "ghiChu": "string",
    "ngayHetHan": "2026-04-10T03:17:51.632Z",
    "soGiayPhepKD": "string",
    "maSoThue": "string",
    "diaChi": "string",
    "hopDongs": [
      {
        "id": 0,
        "soHopDong": "string",
        "ngayKy": "2026-04-10T03:17:51.632Z",
        "ngayHetHan": "2026-04-10T03:17:51.632Z",
        "giaTriHopDong": 0,
        "loaiDichVuId": 0,
        "tenLoaiDichVu": "string",
        "trangThaiHopDongId": 0,
        "tenTrangThaiHopDong": "string",
        "noiDung": "string",
        "teps": [
          {
            "fileId": 0,
            "fileName": "string",
            "fileUrl": "string",
            "contentType": "string"
          }
        ],
        "maDichVu": "string",
        "tenDichVu": "string",
        "donViTinh": "string",
        "isBatBuoc": true,
        "trangThaiDichVuId": 0,
        "trangThaiDichVuTen": "string"
      }
    ]
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links

DELETE
/api/doi-tac
Xóa danh sách đối tác theo ID


Hoàn cảnh sử dụng: Loại bỏ các đối tác không còn hợp tác hoặc nhập sai thông tin.
Hệ thống xử lý:
Kiểm tra các ràng buộc: Đối tác không được có hợp đồng đang còn hiệu lực để đảm bảo tính toàn vẹn.
Xóa các bản ghi đối tác theo danh sách IDs.
Yêu cầu dữ liệu:
Bắt buộc: Ids (Danh sách ID đối tác).
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "ids": [
    0
  ]
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links

POST
/api/doi-tac/hop-dong
Ký hợp đồng mới với đối tác


Hoàn cảnh sử dụng: Khi cần bổ sung một dịch vụ mới từ đối tác hiện tại.
Hệ thống xử lý:
Tạo mới một dịch vụ (DichVu) tương ứng với các thông số truyền vào.
Tạo mới một hợp đồng (HopDongDoiTac) liên kết với đối tác và dịch vụ vừa tạo.
Yêu cầu dữ liệu:
Bắt buộc: DoiTacId, HopDong.SoHopDong, HopDong.MaDichVu, HopDong.TenDichVu.
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "doiTacId": 0,
  "hopDong": {
    "id": 0,
    "soHopDong": "string",
    "ngayKy": "2026-04-10T03:17:51.642Z",
    "ngayHetHan": "2026-04-10T03:17:51.642Z",
    "giaTri": 0,
    "noiDung": "string",
    "tepFileIds": [
      0
    ],
    "maDichVu": "string",
    "tenDichVu": "string",
    "loaiDichVuId": 0,
    "donViTinh": "string",
    "moTa": "string",
    "isBatBuoc": true,
    "iconId": 0,
    "soLuongToiDa": 0
  }
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "tenDoiTac": "string",
    "tenCongTy": "string",
    "nguoiDaiDien": "string",
    "soDienThoai": "string",
    "email": "string",
    "ghiChu": "string",
    "ngayHetHan": "2026-04-10T03:17:51.644Z",
    "soGiayPhepKD": "string",
    "maSoThue": "string",
    "diaChi": "string",
    "hopDongs": [
      {
        "id": 0,
        "soHopDong": "string",
        "ngayKy": "2026-04-10T03:17:51.644Z",
        "ngayHetHan": "2026-04-10T03:17:51.644Z",
        "giaTriHopDong": 0,
        "loaiDichVuId": 0,
        "tenLoaiDichVu": "string",
        "trangThaiHopDongId": 0,
        "tenTrangThaiHopDong": "string",
        "noiDung": "string",
        "teps": [
          {
            "fileId": 0,
            "fileName": "string",
            "fileUrl": "string",
            "contentType": "string"
          }
        ],
        "maDichVu": "string",
        "tenDichVu": "string",
        "donViTinh": "string",
        "isBatBuoc": true,
        "trangThaiDichVuId": 0,
        "trangThaiDichVuTen": "string"
      }
    ]
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links

DELETE
/api/doi-tac/hop-dong/revoke
Thu hồi/Thanh lý các hợp đồng đối tác (Bulk Revoke)


Hoàn cảnh sử dụng: Khi hợp đồng kết thúc trước hạn hoặc không còn hiệu lực.
Hệ thống xử lý: Chuyển trạng thái hợp đồng sang Đã thanh lý và cập nhật ngày kết thúc.
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "doiTacId": 0,
  "ids": [
    0
  ]
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": true,
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links

POST
/api/doi-tac/get-list
Lấy danh sách đối tác (hỗ trợ phân trang, lọc, tìm kiếm)


Hoàn cảnh sử dụng: Trang quản lý danh sách đối tác tổng thể.
Hệ thống xử lý:
Tìm kiếm theo Keyword (Tên đối tác, mã số thuế).
Áp dụng phân trang và sắp xếp.
Yêu cầu dữ liệu:
Bắt buộc: PageNumber, PageSize.
Tùy chọn: Keyword, SortCol, IsAsc.
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "keyword": "string",
  "loaiDichVuId": 0,
  "sortCol": "string",
  "isAsc": true,
  "pageNumber": 0,
  "pageSize": 0
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "items": [
      {
        "id": 0,
        "tenDoiTac": "string",
        "tenCongTy": "string",
        "nguoiDaiDien": "string",
        "soDienThoai": "string",
        "email": "string",
        "ghiChu": "string",
        "ngayHetHan": "2026-04-10T03:17:51.653Z"
      }
    ],
    "pagingInfo": {
      "pageSize": 0,
      "pageNumber": 0,
      "totalItems": 0
    }
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links

POST
/api/doi-tac/get-by-id
Lấy chi tiết đối tác theo ID


Hoàn cảnh sử dụng: Xem thông tin đầy đủ của một đối tác bao gồm cả danh sách hợp đồng liên quan.
Hệ thống xử lý: Truy xuất thông tin chi tiết của đối tác từ database.
Yêu cầu dữ liệu:
Bắt buộc: Id.
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "id": 0
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "result": {
    "id": 0,
    "tenDoiTac": "string",
    "tenCongTy": "string",
    "nguoiDaiDien": "string",
    "soDienThoai": "string",
    "email": "string",
    "ghiChu": "string",
    "ngayHetHan": "2026-04-10T03:17:51.661Z",
    "soGiayPhepKD": "string",
    "maSoThue": "string",
    "diaChi": "string",
    "hopDongs": [
      {
        "id": 0,
        "soHopDong": "string",
        "ngayKy": "2026-04-10T03:17:51.661Z",
        "ngayHetHan": "2026-04-10T03:17:51.661Z",
        "giaTriHopDong": 0,
        "loaiDichVuId": 0,
        "tenLoaiDichVu": "string",
        "trangThaiHopDongId": 0,
        "tenTrangThaiHopDong": "string",
        "noiDung": "string",
        "teps": [
          {
            "fileId": 0,
            "fileName": "string",
            "fileUrl": "string",
            "contentType": "string"
          }
        ],
        "maDichVu": "string",
        "tenDichVu": "string",
        "donViTinh": "string",
        "isBatBuoc": true,
        "trangThaiDichVuId": 0,
        "trangThaiDichVuTen": "string"
      }
    ]
  },
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "result": "string",
  "warningMessages": [
    "string"
  ],
  "errors": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "isOk": true
}
