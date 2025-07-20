# 💰 Welth – AI-powered Personal Finance Platform
**Welth** is an AI-driven finance management platform that simplifies expense tracking, automates budgeting, and offers intelligent financial insights. With secure Google OAuth login, AI receipt scanning, real-time alerts, and auto-generated monthly reports, Welth helps users stay on top of their financial game—effortlessly.

## ✨ Features

- 🔐 **Authentication**  
  - Secure login with [Clerk Google OAuth](https://clerk.dev/)
  
- 🧾 **Expense & Income Tracking**  
  - Add transactions with amount, description, and category (e.g., food, rent, salary)
  - View data visualizations via bar charts & pie charts

- 🤖 **AI Receipt Scanner**  
  - Upload receipts and let AI extract and record transaction details automatically

- ⚠️ **Budget Alerts**  
  - Get email alerts when 90% of your monthly expense limit is reached

- 📊 **AI Monthly Report**  
  - Automatically sent every 1st of the month with insights and analytics

- 🔁 **Recurring Transactions**  
  - Auto-add expenses/incomes at specified intervals via scheduled jobs

- 📈 **Interactive Dashboard**  
  - Visual financial overview using charts and smart insights

- 🛡️ **Bot Protection And Rate Limiting**  
  - Secured using [Arcjet] 

---

## 🛠️ Tech Stack

| Layer        | Tech                        |
|--------------|-----------------------------|
| Language     | JavaScript                  |
| Framework    | Next.Js                     |
| ORM          | Prisma                      |
| DB           | Supabase(PostGres)          |
| Auth         | Clerk (Google OAuth)        |
| CronJobs     | Inngest                     |
| Email Alerts | Resend                      |
|UI Framework  | Tailwind-CSS,ShadCn-UI      |
|AI Integration | AI Receipt Scanner         |
| Bot Protection,Rate Limiting | ArcJet |

---

## 🧱 Architecture
``` mermaid 
erDiagram
    users ||--o{ accounts : has
    users ||--o{ transactions : has
    users ||--o{ budgets : has
    accounts ||--o{ transactions : has

    users {
        text id PK
        text clerkUserId
        text email
        text name
        text imageUrl
        timestamp createdAt
        timestamp updatedAt
    }

    accounts {
        text id PK
        text name
        AccountType type
        numeric balance
        bool isDefault
        text userId FK
        timestamp createdAt
        timestamp updatedAt
    }

    transactions {
        text id PK
        TransactionType type
        numeric amount
        text description
        timestamp date
        text category
        text receiptUrl
        bool isRecurring
        RecurringInterval recurringInterval
        timestamp nextRecurringDate
        timestamp lastProcessedDate
        TransactionStatus status
        text userId FK
        text accountId FK
        timestamp createdAt
        timestamp updatedAt
    }

    budgets {
        text id PK
        numeric amount
        timestamp lastAlertSent
        text userId FK
        timestamp createdAt
        timestamp updatedAt
    }


```

## 🕒 Cron Jobs

| Schedule | Task                                  | Timezone      |
|----------|---------------------------------------|---------------|
| 1st of month @ 00:00 | Generate monthly Insights  | Configurable (e.g. Asia/Kolkata) |
| Check Budget Alert | Trigger After Every 6 Hr | Configurable |
| Recurring Transaction | Run Based on User-defind Recurring(e.g. Daily/Weekly/Monthly/Monthly/Yearly)| Configurable |

---

## 📦 Setup & Run

### Clone & Install

```bash
git clone https://github.com/Prakharpandey007/Welth
npm install
cd Welth
```

---
### Env Configuration

Create a `.env` file:

```env
PORT=3000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your key 
CLERK_SECRET_KEY=your Secret Key 
NEXT_PUBLIC_CLERK_SIGN_IN_URL=sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=sign-up
DATABASE_URL="postgresql://postgres.<your-password>/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.<your-password>/postgres?pgbouncer=true"
ARCJET_KEY=your key
RESEND_API_KEY=your-key
GEMINI_API_KEY=your-api
```
---

### Run

```bash
npm run dev
```

---
## ✨ Contributing

Contributions are welcome! Please fork the repo and submit a PR.

---

## 🛡️ License

MIT © 2025 YourName
