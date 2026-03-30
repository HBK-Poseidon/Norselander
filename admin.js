const ADMIN_PASSWORD_KEY = 'dashboardAdminPassword';
const ADMIN_SESSION_KEY = 'dashboardAdminSession';

const defaultAdminPassword = 'admin123';

function getAdminPassword() {
  return localStorage.getItem(ADMIN_PASSWORD_KEY) || defaultAdminPassword;
}

function setAdminPassword(pwd) {
  localStorage.setItem(ADMIN_PASSWORD_KEY, pwd);
}

function getUsers() {
  return DashboardProfiles.getUsers();
}

function saveUsers(users) {
  DashboardProfiles.saveUsers(users);
}

function fillForm(user) {
  document.getElementById('regNumber').value = user?.regNumber || '';
  document.getElementById('password').value = user?.password || '';
  document.getElementById('name').value = user?.name || '';
  document.getElementById('balance').value = user?.balance || '';
  document.getElementById('bonus').value = user?.bonus || '';
  document.getElementById('equity').value = user?.equity || '';
  document.getElementById('requiredDeposit').value = user?.requiredDeposit || '';
  document.getElementById('withdrawalAccount').value = user?.withdrawalAccount || '';
  document.getElementById('tradeValue').value = user?.tradeValue || '';
}

function readForm() {
  return {
    regNumber: document.getElementById('regNumber').value.trim(),
    password: document.getElementById('password').value.trim(),
    name: document.getElementById('name').value.trim(),
    balance: document.getElementById('balance').value.trim(),
    bonus: document.getElementById('bonus').value.trim(),
    equity: document.getElementById('equity').value.trim(),
    requiredDeposit: document.getElementById('requiredDeposit').value.trim(),
    withdrawalAccount: document.getElementById('withdrawalAccount').value.trim(),
    tradeValue: document.getElementById('tradeValue').value.trim(),
  };
}

function renderUserOptions(users) {
  const select = document.getElementById('userSelect');
  select.innerHTML = '';
  users.forEach((user, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${user.regNumber} — ${user.name || 'Unnamed'}`;
    select.appendChild(option);
  });
  if (users.length === 0) {
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'No profiles yet';
    select.appendChild(placeholder);
  }
}

function showPanel() {
  document.getElementById('loginPanel').classList.add('hidden');
  document.getElementById('adminPanel').classList.remove('hidden');
}

function showLogin() {
  document.getElementById('adminPanel').classList.add('hidden');
  document.getElementById('loginPanel').classList.remove('hidden');
}

function initAdmin() {
  const loginBtn = document.getElementById('adminLogin');
  const logoutBtn = document.getElementById('logoutBtn');
  const saveUserBtn = document.getElementById('saveUser');
  const newUserBtn = document.getElementById('newUser');
  const deleteUserBtn = document.getElementById('deleteUser');
  const userSelect = document.getElementById('userSelect');
  const saveAdminBtn = document.getElementById('saveAdminPassword');

  let users = getUsers();
  renderUserOptions(users);

  loginBtn.addEventListener('click', () => {
    const pwd = document.getElementById('adminPassword').value.trim();
    if (!pwd) return alert('Enter admin password');
    if (pwd === getAdminPassword()) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, '1');
      showPanel();
    } else {
      alert('Wrong password');
    }
  });

  logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    showLogin();
  });

  saveAdminBtn.addEventListener('click', () => {
    const pwd = document.getElementById('newAdminPassword').value.trim();
    if (!pwd) return alert('Enter a new admin password');
    setAdminPassword(pwd);
    alert('Admin password updated');
    document.getElementById('newAdminPassword').value = '';
  });

  userSelect.addEventListener('change', () => {
    const index = parseInt(userSelect.value, 10);
    if (Number.isNaN(index)) return fillForm(null);
    fillForm(users[index]);
  });

  saveUserBtn.addEventListener('click', () => {
    const profile = readForm();
    if (!profile.regNumber || !profile.password) return alert('Reg number and password are required');

    const existing = users.findIndex((u) => u.regNumber === profile.regNumber);
    if (existing >= 0) {
      users[existing] = profile;
    } else {
      users.push(profile);
    }
    saveUsers(users);
    renderUserOptions(users);
    fillForm(profile);
    alert('Profile saved');
  });

  newUserBtn.addEventListener('click', () => {
    userSelect.value = '';
    fillForm({ regNumber: '', password: '', name: '', balance: '', bonus: '', equity: '', requiredDeposit: '', withdrawalAccount: '', tradeValue: '' });
  });

  deleteUserBtn.addEventListener('click', () => {
    const index = parseInt(userSelect.value, 10);
    if (Number.isNaN(index)) return alert('Select a profile first');
    if (!confirm('Delete this profile?')) return;
    users.splice(index, 1);
    saveUsers(users);
    renderUserOptions(users);
    fillForm(null);
  });

  if (sessionStorage.getItem(ADMIN_SESSION_KEY) === '1') {
    showPanel();
  }
}

document.addEventListener('DOMContentLoaded', initAdmin);
