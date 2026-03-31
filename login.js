const USER_SESSION_KEY = 'dashboardUserSession';

const floatingMessages = [
  '+$7,500',
  '+$12,300',
  '+€9,800',
  '-€4,200',
  '+£15,750',
  '-£2,600',
  '+¥1,250,000',
  '-¥300,000',
  '+₹850,000',
  '-₹120,000',
  '+₦2,450,000',
  '-₦600,000',
  '+R1,200,000',
  '-R450,000',
  '+C$18,900',
  '-A$7,300',
  '+CHF25,000',
  '-CHF8,400',
  '+₩9,700,000',
  '-₩2,100,000',
  '-$22,400',
  '+$5,980',
  '+€14,600',
  '-€9,750',
  '+£3,250',
  '-£18,900',
  '+¥980,000',
  '-¥1,450,000',
  '+₹2,300,000',
  '-₹540,000',
  '+₦950,000',
  '-₦3,200,000',
  '+R780,000',
  '-R1,050,000',
  '+C$42,500',
  '-C$6,800',
  '+A$19,200',
  '-A$11,400',
  '+CHF7,300',
  '-CHF21,600',
  '+₩5,600,000',
  '-₩890,000',
];

let floatingTimer;

function loadUsers() {
  try {
    DashboardProfiles.ensureUsers();
    return DashboardProfiles.getUsers();
  } catch (error) {
    return [];
  }
}

function initFloatingNotifications() {
  const el = document.getElementById('floatingNotification');
  if (!el) return;

  function showFloating() {
    const message = floatingMessages[Math.floor(Math.random() * floatingMessages.length)];
    el.textContent = message;
    el.classList.remove('position-top', 'position-bottom', 'animate');
    void el.offsetWidth;
    const positionClass = Math.random() > 0.5 ? 'position-top' : 'position-bottom';
    el.classList.add(positionClass, 'animate');
  }

  function schedule(nextDelay = 15000) {
    if (floatingTimer) clearTimeout(floatingTimer);
    floatingTimer = setTimeout(showFloating, nextDelay);
  }

  el.addEventListener('animationend', () => {
    el.classList.remove('animate');
    schedule(15000);
  });

  schedule(1500);
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
  initFloatingNotifications();
  initLogin();
});
