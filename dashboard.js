const USER_SESSION_KEY = 'dashboardUserSession';

const defaultProfile =
  (DashboardProfiles && DashboardProfiles.DEFAULT_USERS && DashboardProfiles.DEFAULT_USERS[0]) || {
    regNumber: 'NR-001',
    name: 'Unknown',
    balance: '₦0',
    bonus: 'Bonus: ₦0',
    equity: '₦0',
    withdrawalAccount: 'Not set',
    tradeValue: '$0',
  };

function getUsers() {
  return DashboardProfiles.getUsers();
}

function getCurrentReg() {
  return sessionStorage.getItem(USER_SESSION_KEY);
}

function ensureAuth() {
  if (!getCurrentReg()) {
    window.location.href = 'login.html';
  }
}

function renderProfile(profile) {
  document.getElementById('profileName').textContent = `${profile.name.toUpperCase()} • online`;
  document.getElementById('balanceValue').textContent = profile.balance;
  document.getElementById('bonusValue').textContent = profile.bonus;
  document.getElementById('tradeValue').textContent = profile.tradeValue;
  document.getElementById('equityValue').textContent = profile.equity;
  document.getElementById('withdrawalAccount').textContent = profile.withdrawalAccount;
}

function initActions() {
  const message = document.getElementById('actionMessage');
  document.querySelectorAll('.quick-actions button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const icon = btn.dataset.icon || '';
      let text = '';
      switch (btn.dataset.action) {
        case 'withdrawal':
          text = 'Complete profile payment to enable withdrawal ✅';
          break;
        case 'profile':
          text = '09157947455 - Kelvin Mbah';
          break;
        case 'reward':
          text = 'Complete profile to open gift box';
          break;
      }
      message.textContent = `${icon} ${text}`.trim();
    });
  });
}

function init() {
  ensureAuth();
  const reg = getCurrentReg();
  const users = getUsers();
  const profile = users.find((u) => u.regNumber === reg);
  renderProfile(profile || defaultProfile);
  initActions();

  document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem(USER_SESSION_KEY);
    window.location.href = 'login.html';
  });
}

document.addEventListener('DOMContentLoaded', init);
