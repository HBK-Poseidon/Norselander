const USER_SESSION_KEY = 'dashboardUserSession';

const notifications = [
  'N20,000,000 Withdrawal✅',
  'N5,000,000 Withdrawal✅',
  'N800,000 Withdrawal✅',
  'N12,000,000 Withdrawal✅',
  'N3,500,000 Withdrawal✅',
];

function loadUsers() {
  try {
    DashboardProfiles.ensureUsers();
    return DashboardProfiles.getUsers();
  } catch (error) {
    return [];
  }
}

function showRandomNotification() {
  const el = document.getElementById('loginNotification');
  if (!el) return;
  const text = notifications[Math.floor(Math.random() * notifications.length)];
  el.textContent = text;
  el.classList.remove('pulse');
  // trigger reflow so animation restarts
  void el.offsetWidth;
  el.classList.add('pulse');
}

function initNotifications() {
  showRandomNotification();
  setInterval(showRandomNotification, 3000);
}

function initLogin() {
  const form = document.getElementById('loginForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const reg = document.getElementById('loginReg').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    if (!reg || !password) {
      return alert('Enter reg number and password');
    }
    const users = loadUsers();
    const match = users.find((user) => user.regNumber === reg && user.password === password);
    if (!match) {
      return alert('Invalid credentials');
    }
    sessionStorage.setItem(USER_SESSION_KEY, reg);
    window.location.href = 'dashboard.html';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNotifications();
  initLogin();
});
