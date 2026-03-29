# FOODI Back-End Development Task (AI-Optimized)

## 🎯 Project Overview
Production-ready REST API for FOODI food delivery platform. Secure, scalable, performant.

**Stack:** Node.js 20 + Express 4 + TypeScript + Prisma 5 + PostgreSQL 16 + JWT Auth

## 📁 File Structure
```
REPO/01-back-end/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── controllers/ (auth.ts, menu.ts, cart.ts, orders.ts)
│   ├── middleware/ (auth.ts, validation.ts, rate-limit.ts)
│   ├── models/ (user.ts, menu.ts, cart.ts, order.ts)
│   ├── routes/ (auth.ts, menu.ts, cart.ts, orders.ts)
│   ├── services/ (email.ts, payment.ts, upload.ts)
│   ├── types/ (express.d.ts, prisma.ts)
│   ├── utils/ (logger.ts, validator.ts, errors.ts)
│   ├── app.ts
│   └── server.ts
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── prisma/.env
├── tsconfig.json
└── README.md
```

## 🔌 API Endpoints (Required - Match Front-End)
```
Auth: POST /api/auth/register, /api/auth/login → JWT tokens
User: GET /api/user/profile, PUT /api/user/profile
Menu: GET /api/menu (filter=cat&search=term), GET /api/menu/:id
Cart: POST /api/cart/add, GET /api/cart, DELETE /api/cart/:itemId
Orders: POST /api/orders/checkout, GET /api/orders, GET /api/orders/:id
Admin: POST /api/admin/menu, PUT /api/admin/menu/:id, DELETE /api/admin/menu/:id
```

## 🛡️ Security & Features
```
✅ JWT Auth (refresh tokens)
✅ Input validation (Zod + express-validator)
✅ Rate limiting (express-rate-limit)
✅ CORS + Helmet security headers
✅ Prisma transactions for orders
✅ File uploads (Multer + Cloudinary)
✅ Email service (Nodemailer/Resend)
✅ Logging (Winston)
✅ Error handling middleware
✅ Swagger docs (/api-docs)
```

## 🗄️ Database Schema (Prisma)
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  role      Role     @default(USER)
  carts     Cart[]
  orders    Order[]
}

model MenuItem {
  id          String   @id @default(uuid())
  name        String
  price       Decimal
  category    String
  imageUrl    String?
  cartItems   CartItem[]
}

model Cart {
  id     String    @id @default(uuid())
  userId String
  items  CartItem[]
  user   User      @relation(fields: [userId], references: [id])
}

model Order {
  id         String    @id @default(uuid())
  userId     String
  total      Decimal
  status     OrderStatus
  items      OrderItem[]
  user       User      @relation(fields: [userId], references: [id])
}
```

## 🚀 Implementation Steps (AI Agent)
1. `npm init`, install deps: `express prisma @prisma/client typescript tsx zod jsonwebtoken bcryptjs cors helmet multer`
2. Prisma init + PostgreSQL docker-compose
3. Define schema.prisma with all models
4. Controllers + validation for each endpoint
5. Auth middleware + JWT utils
6. Express app setup (middleware stack)
7. Routes modularization
8. Prisma migrations + seed data
9. Docker + env config
10. Tests (supertest) + Swagger docs
11. Deployment (Render/Vercel/Docker)

## 📦 package.json Key Dependencies
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "prisma": "^5.7.1",
    "@prisma/client": "^5.7.1",
    "zod": "^3.22.4",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "multer": "^1.4.5-lts.1"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "tsx": "^4.7.0",
    "@types/express": "^4.17.21",
    "prisma": "^5.7.1"
  },
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev"
  }
}
```

## ✅ Success Criteria
- [ ] `npm run dev` → server running on port 3001
- [ ] All endpoints return correct responses
- [ ] JWT auth works end-to-end
- [ ] Prisma migrations applied
- [ ] Docker compose up works
- [ ] Swagger docs accessible
- [ ] 100% endpoint coverage tests

## 🌐 Environment
```
DATABASE_URL="postgresql://user:pass@localhost:5432/fo odi"
JWT_SECRET="your-super-secret-key-min32-chars"
CLOUDINARY_URL="your-cloudinary-url"
PORT=3001
FRONTEND_URL=http://localhost:5173
```

**AI Agent: Execute sequentially. Create TODO.md for progress tracking. Test all endpoints with Postman/Newman after each module.**

**Deployment:** Docker → Railway/Render with PostgreSQL addon

