Math.floor(Math.random() * floatingMessages.length)];
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
