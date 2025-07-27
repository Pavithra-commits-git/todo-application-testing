# Fullstack Todo App (Test Automation Demo)

## 🔧 Setup

### Backend
```bash
cd backend
npm install
node index.js
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## ✅ Run Tests

### API Tests (Jest + Supertest)
```bash
cd backend
npm test
```

### UI Tests (Cypress)
```bash
cd frontend
npx cypress open   # interactive
# or
npx cypress run    # headless
```

## 🚀 CI/CD (GitHub Actions)
- Automatically runs:
  - API tests with Jest
  - UI tests with Cypress (headless)