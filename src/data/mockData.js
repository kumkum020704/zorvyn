export const CATEGORIES = [
  { id: 'salary', label: 'Salary', icon: '💼', type: 'income', color: '#10b981' },
  { id: 'freelance', label: 'Freelance', icon: '💻', type: 'income', color: '#06b6d4' },
  { id: 'investments', label: 'Investments', icon: '📈', type: 'income', color: '#8b5cf6' },
  { id: 'food', label: 'Food & Dining', icon: '🍔', type: 'expense', color: '#f59e0b' },
  { id: 'housing', label: 'Housing', icon: '🏠', type: 'expense', color: '#ef4444' },
  { id: 'transport', label: 'Transportation', icon: '🚗', type: 'expense', color: '#f97316' },
  { id: 'entertainment', label: 'Entertainment', icon: '🎭', type: 'expense', color: '#ec4899' },
  { id: 'healthcare', label: 'Healthcare', icon: '💊', type: 'expense', color: '#14b8a6' },
  { id: 'shopping', label: 'Shopping', icon: '🛒', type: 'expense', color: '#a855f7' },
  { id: 'utilities', label: 'Utilities', icon: '⚡', type: 'expense', color: '#64748b' },
  { id: 'education', label: 'Education', icon: '📚', type: 'expense', color: '#0ea5e9' },
];

export const getCategoryById = (id) => CATEGORIES.find((c) => c.id === id);

let _id = 1;
const tx = (date, description, category, amount, type) => ({
  id: String(_id++),
  date,
  description,
  category,
  amount,
  type,
});

export const DEFAULT_TRANSACTIONS = [
  // ──────── November 2025 ────────
  tx('2025-11-01', 'Monthly Salary', 'salary', 5800, 'income'),
  tx('2025-11-03', 'Rent Payment', 'housing', 1400, 'expense'),
  tx('2025-11-05', 'Grocery Run – Whole Foods', 'food', 187, 'expense'),
  tx('2025-11-07', 'Freelance – UI Design', 'freelance', 750, 'income'),
  tx('2025-11-09', 'Uber rides', 'transport', 42, 'expense'),
  tx('2025-11-11', 'Netflix & Spotify', 'entertainment', 28, 'expense'),
  tx('2025-11-13', 'Pharmacy', 'healthcare', 56, 'expense'),
  tx('2025-11-16', 'Amazon – Gadgets', 'shopping', 234, 'expense'),
  tx('2025-11-19', 'Electric Bill', 'utilities', 95, 'expense'),
  tx('2025-11-22', 'Online Course – Udemy', 'education', 19, 'expense'),
  tx('2025-11-25', 'Restaurant – Date Night', 'food', 112, 'expense'),
  tx('2025-11-28', 'Stock Dividends', 'investments', 200, 'income'),

  // ──────── December 2025 ────────
  tx('2025-12-01', 'Monthly Salary', 'salary', 5800, 'income'),
  tx('2025-12-02', 'Rent Payment', 'housing', 1400, 'expense'),
  tx('2025-12-04', 'Christmas Shopping', 'shopping', 520, 'expense'),
  tx('2025-12-06', 'Freelance – Dashboard Dev', 'freelance', 1100, 'income'),
  tx('2025-12-08', 'Grocery Run', 'food', 215, 'expense'),
  tx('2025-12-11', 'Metro Pass', 'transport', 60, 'expense'),
  tx('2025-12-14', 'Concert Tickets', 'entertainment', 180, 'expense'),
  tx('2025-12-17', 'Doctor Visit', 'healthcare', 90, 'expense'),
  tx('2025-12-20', 'Electric + Gas Bill', 'utilities', 140, 'expense'),
  tx('2025-12-24', 'Holiday Dinner', 'food', 175, 'expense'),
  tx('2025-12-28', 'Investment Return', 'investments', 380, 'income'),
  tx('2025-12-30', 'Year-End Bonus', 'salary', 2000, 'income'),

  // ──────── January 2026 ────────
  tx('2026-01-01', 'Monthly Salary', 'salary', 5800, 'income'),
  tx('2026-01-02', 'Rent Payment', 'housing', 1400, 'expense'),
  tx('2026-01-05', 'Grocery Run', 'food', 165, 'expense'),
  tx('2026-01-07', 'Gym Membership', 'healthcare', 45, 'expense'),
  tx('2026-01-09', 'Freelance – API Integration', 'freelance', 900, 'income'),
  tx('2026-01-12', 'Fuel – Car', 'transport', 78, 'expense'),
  tx('2026-01-14', 'Streaming Services', 'entertainment', 35, 'expense'),
  tx('2026-01-18', 'Pharmacy – Vitamins', 'healthcare', 30, 'expense'),
  tx('2026-01-20', 'Electric Bill', 'utilities', 108, 'expense'),
  tx('2026-01-23', 'Online Shopping – Clothes', 'shopping', 185, 'expense'),
  tx('2026-01-26', 'Investment Dividend', 'investments', 250, 'income'),
  tx('2026-01-29', 'Sushi Night', 'food', 95, 'expense'),

  // ──────── February 2026 ────────
  tx('2026-02-01', 'Monthly Salary', 'salary', 5800, 'income'),
  tx('2026-02-02', 'Rent Payment', 'housing', 1400, 'expense'),
  tx('2026-02-04', 'Grocery Run', 'food', 172, 'expense'),
  tx('2026-02-07', 'Freelance – Mobile App', 'freelance', 1300, 'income'),
  tx('2026-02-09', "Valentine's Dinner", 'food', 145, 'expense'),
  tx('2026-02-10', "Valentine's Gift", 'shopping', 210, 'expense'),
  tx('2026-02-13', 'Metro Pass', 'transport', 60, 'expense'),
  tx('2026-02-15', 'Movie + Snacks', 'entertainment', 55, 'expense'),
  tx('2026-02-18', 'Dental Checkup', 'healthcare', 120, 'expense'),
  tx('2026-02-20', 'Electric Bill', 'utilities', 99, 'expense'),
  tx('2026-02-24', 'Book Purchase', 'education', 65, 'expense'),
  tx('2026-02-27', 'ETF Investment Return', 'investments', 310, 'income'),

  // ──────── March 2026 ────────
  tx('2026-03-01', 'Monthly Salary', 'salary', 5800, 'income'),
  tx('2026-03-02', 'Rent Payment', 'housing', 1400, 'expense'),
  tx('2026-03-05', 'Grocery Run', 'food', 195, 'expense'),
  tx('2026-03-07', 'Freelance – E-commerce site', 'freelance', 2000, 'income'),
  tx('2026-03-09', 'Uber rides', 'transport', 55, 'expense'),
  tx('2026-03-12', 'Gaming Subscription', 'entertainment', 70, 'expense'),
  tx('2026-03-14', 'Eye Checkup', 'healthcare', 85, 'expense'),
  tx('2026-03-16', 'Laptop Accessories', 'shopping', 340, 'expense'),
  tx('2026-03-19', 'Water + Electric Bill', 'utilities', 115, 'expense'),
  tx('2026-03-22', 'Coursera Annual Plan', 'education', 199, 'expense'),
  tx('2026-03-25', 'Brunch with Friends', 'food', 88, 'expense'),
  tx('2026-03-28', 'Investment Dividend', 'investments', 290, 'income'),

  // ──────── April 2026 (partial) ────────
  tx('2026-04-01', 'Monthly Salary', 'salary', 5800, 'income'),
  tx('2026-04-02', 'Rent Payment', 'housing', 1400, 'expense'),
  tx('2026-04-04', 'Grocery Run', 'food', 145, 'expense'),
  tx('2026-04-05', 'Freelance – Dashboard UI', 'freelance', 850, 'income'),
];

// ─── Computed helpers ─────────────────────────────────────────────────────────

export function computeSummary(transactions) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const thisMonth = transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const totalBalance = transactions.reduce(
    (acc, t) => acc + (t.type === 'income' ? t.amount : -t.amount),
    0
  );

  const monthlyIncome = thisMonth
    .filter((t) => t.type === 'income')
    .reduce((a, t) => a + t.amount, 0);

  const monthlyExpenses = thisMonth
    .filter((t) => t.type === 'expense')
    .reduce((a, t) => a + t.amount, 0);

  const savingsRate =
    monthlyIncome > 0
      ? (((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100).toFixed(1)
      : 0;

  return { totalBalance, monthlyIncome, monthlyExpenses, savingsRate };
}

export function computeMonthlyTrend(transactions) {
  const months = {};
  transactions.forEach((t) => {
    const d = new Date(t.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (!months[key]) months[key] = { income: 0, expenses: 0 };
    if (t.type === 'income') months[key].income += t.amount;
    else months[key].expenses += t.amount;
  });

  return Object.entries(months)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, val]) => {
      const [year, month] = key.split('-');
      const label = new Date(Number(year), Number(month) - 1).toLocaleString('default', {
        month: 'short',
        year: '2-digit',
      });
      return {
        month: label,
        income: val.income,
        expenses: val.expenses,
        balance: val.income - val.expenses,
      };
    });
}

export function computeSpendingByCategory(transactions) {
  const byCategory = {};
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
    });

  return Object.entries(byCategory)
    .map(([catId, total]) => {
      const cat = getCategoryById(catId);
      return { id: catId, name: cat?.label || catId, value: total, color: cat?.color || '#888', icon: cat?.icon || '📦' };
    })
    .sort((a, b) => b.value - a.value);
}

export function computeInsights(transactions) {
  const spendingByCategory = computeSpendingByCategory(transactions);
  const monthlyTrend = computeMonthlyTrend(transactions);

  const highestCategory = spendingByCategory[0] || null;

  // Month-over-month comparison (last 2 months)
  const lastTwo = monthlyTrend.slice(-2);
  const prevMonth = lastTwo[0];
  const currMonth = lastTwo[1];

  let expenseChange = null;
  if (prevMonth && currMonth) {
    expenseChange = (
      ((currMonth.expenses - prevMonth.expenses) / prevMonth.expenses) * 100
    ).toFixed(1);
  }

  // Budget limits per category (illustrative)
  const budgets = {
    food: 300,
    housing: 1500,
    transport: 150,
    entertainment: 200,
    healthcare: 200,
    shopping: 400,
    utilities: 200,
    education: 250,
  };

  const budgetUtilization = spendingByCategory.map((cat) => ({
    ...cat,
    budget: budgets[cat.id] || 500,
    utilization: Math.min(100, ((cat.value / (budgets[cat.id] || 500)) * 100).toFixed(1)),
  }));

  return { highestCategory, expenseChange, prevMonth, currMonth, budgetUtilization, monthlyTrend };
}
