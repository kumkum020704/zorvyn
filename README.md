# 💹 FinTrack — Finance Dashboard UI

A modern, feature-rich personal finance dashboard built with **React 18 + Vite**. Designed with a premium dark-first aesthetic, smooth animations, and comprehensive financial tracking features.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🧭 Features Overview

### 1. Dashboard Overview
- **4 Summary Cards**: Total Balance, Monthly Income, Monthly Expenses, and Savings Rate
- **Balance Trend Chart**: Area chart showing income, expenses, and net balance across 6 months
- **Spending Breakdown Donut**: Interactive pie chart showing spending by category with live legend
- **Recent Transactions**: Latest 6 transactions with quick navigation to full list

### 2. Transactions Page
- Full table view of all transactions with: Date, Description, Category, Type, and Amount
- **Search**: Real-time search by description or category
- **Filters**: Filter by type (income/expense), category, and date range
- **Sorting**: Click any column header to sort ascending/descending
- **Admin Actions**: Edit ✏️ and Delete 🗑️ buttons appear on row hover (Admin only)
- **Add Transaction Modal**: Full form with type toggle, validation, and category grouping

### 3. Role-Based UI
Two roles are switchable via the header toggle:
| Role | Capabilities |
|------|-------------|
| **Admin** 🛡️ | View all data + Add, Edit, Delete transactions + Export CSV |
| **Viewer** 👁️ | Read-only access — no mutation controls visible |

Switch roles using the **Viewer / Admin** pill in the top header.

### 4. Insights Page
- **Highest Spending Category**: Visual callout of where most money goes
- **Month-over-Month Comparison**: Table comparing income/expenses/net savings between the last two months with a change indicator chip
- **Monthly Bar Chart**: Side-by-side income vs expenses bars across all months
- **Budget Utilization**: Per-category progress bars showing spending vs estimated budgets, color-coded (green → amber → red)

### 5. State Management
Implemented using **React Context + useReducer**:
- `AppContext.jsx` holds all global state: transactions, role, theme, filters, modal state
- Derived filtered/sorted transaction list computed with `useMemo` inside the context
- **localStorage persistence** — transactions, role, and theme survive page refresh

---

## 🎨 Design Highlights
- **Dark-first** with full **Light Mode** support (toggle via ☀️/🌙 button in header)
- Premium color palette: Deep navy background, electric violet (`#7c3aed`) primary, emerald (`#10b981`) income, rose (`#f43f5e`) expense
- **Glassmorphism** card styling with subtle borders and backdrop blur
- **Inter** typeface from Google Fonts
- Smooth **micro-animations**: fade-in on page mount, hover lifts on cards, budget bar fill animation
- Fully **responsive**: sidebar collapses to drawer on mobile, grid reflows at breakpoints

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| Styling | Vanilla CSS (custom design system) |
| Charts | Recharts |
| Icons | Lucide React |
| State | React Context + useReducer |
| Persistence | localStorage |

---

## 🗂️ Project Structure

```
src/
├── context/
│   └── AppContext.jsx          # Global state, filters, persistence
├── data/
│   └── mockData.js             # 60+ mock transactions + computed helpers
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   └── Header.jsx
│   ├── dashboard/
│   │   ├── SummaryCards.jsx
│   │   ├── BalanceTrendChart.jsx
│   │   └── SpendingBreakdownChart.jsx
│   ├── transactions/
│   │   ├── TransactionFilters.jsx
│   │   ├── TransactionRow.jsx
│   │   ├── TransactionList.jsx
│   │   └── AddEditTransactionModal.jsx
│   └── insights/
│       └── InsightsPanel.jsx
├── pages/
│   ├── DashboardPage.jsx
│   ├── TransactionsPage.jsx
│   └── InsightsPage.jsx
├── App.jsx
├── main.jsx
└── index.css                  # Complete design system
```

---

## ✨ Optional Enhancements Implemented
- ✅ **Dark / Light mode** with CSS custom properties
- ✅ **localStorage persistence** across sessions
- ✅ **CSV Export** (Admin only — downloads all transactions)
- ✅ **Animations & transitions** (fade-in on mount, card hover lifts, chart animations)
- ✅ **Advanced filtering** (search + type + category + date range)
- ✅ **Empty state handling** on all lists and charts

---

## 📝 Assumptions Made
1. "This month" in summary cards refers to the current calendar month (April 2026 at time of development)
2. Budget limits in the Insights page are illustrative static values per category
3. The app uses client-side routing (page state) rather than URL-based routing, keeping the setup simple
4. Transactions in mock data span November 2025 – April 2026 to provide meaningful charts
