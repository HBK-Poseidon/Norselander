(function () {
  const USERS_KEY = 'dashboardUsers';
  const DEFAULT_USERS = [
    {
      regNumber: 'NR-001',
      password: 'admin123',
      name: 'Default Investor',
      balance: '₦10,000,000',
      bonus: 'Bonus: ₦1,000,000',
      equity: '₦5,000,000',
      requiredDeposit: '₦500,000',
      withdrawalAccount: '0123456789',
      tradeValue: '$2,000,000',
    },
  ];

  function parseUsers() {
    try {
      const data = localStorage.getItem(USERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.warn('Failed to parse stored users', error);
      return [];
    }
  }

  function persistUsers(records) {
    localStorage.setItem(USERS_KEY, JSON.stringify(records));
  }

  function ensureSeeded() {
    const stored = parseUsers();
    if (!stored.length) {
      persistUsers(DEFAULT_USERS);
      return DEFAULT_USERS.slice();
    }
    return stored;
  }

  function getAllUsers() {
    ensureSeeded();
    return parseUsers();
  }

  window.DashboardProfiles = {
    USERS_KEY,
    DEFAULT_USERS,
    ensureUsers: ensureSeeded,
    getUsers: getAllUsers,
    saveUsers: persistUsers,
  };
})();
