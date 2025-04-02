# Dự án Bán Khóa Học Online

## Giới thiệu
Dự án bán khóa học online được xây dựng bằng Next.js 15 và React 18, sử dụng shadcn/ui cho giao diện người dùng. Dự án này cho phép người dùng mua và học các khóa học trực tuyến.

## Công nghệ sử dụng
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- Prisma (ORM)
- NextAuth.js (Xác thực)
- Stripe (Thanh toán)

## Cấu trúc thư mục
```
├── src/
│   ├── app/                    # App Router của Next.js
│   │   ├── (auth)/            # Các route xác thực
│   │   ├── (dashboard)/       # Dashboard cho người dùng
│   │   ├── (marketing)/       # Trang marketing
│   │   └── api/               # API routes
│   ├── components/            # Components tái sử dụng
│   │   ├── ui/               # UI components từ shadcn
│   │   └── shared/           # Shared components
│   ├── lib/                   # Utility functions và configs
│   ├── hooks/                 # Custom React hooks
│   ├── types/                 # TypeScript types
│   └── styles/                # Global styles
├── prisma/                    # Database schema và migrations
├── public/                    # Static files
└── docs/                      # Documentation
```

## Các nhánh Git
- `main`: Nhánh chính cho production
- `develop`: Nhánh phát triển chính
- `feature/*`: Các nhánh tính năng mới
- `bugfix/*`: Các nhánh sửa lỗi
- `release/*`: Các nhánh chuẩn bị release

## Quy trình phát triển
1. Tạo nhánh feature từ `develop`
2. Phát triển và commit code
3. Tạo Pull Request vào `develop`
4. Code review và merge
5. Tạo release từ `develop` vào `main`

## Tính năng chính
- Đăng ký/Đăng nhập người dùng
- Xem danh sách khóa học
- Chi tiết khóa học
- Thanh toán khóa học
- Dashboard học viên
- Quản lý tiến độ học tập
- Đánh giá và bình luận khóa học 