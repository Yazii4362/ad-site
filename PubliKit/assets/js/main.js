/* ============================================================
   publiKit — main.js
   테마 토글, 공통 UI (토스트, 코드 복사)
   ============================================================ */

/* ── 테마 초기화 (FOUC 방지 — head에서 인라인 실행 후 여기서도 보장) ── */
(function () {
  const saved = localStorage.getItem('publikit-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
})();

document.addEventListener('DOMContentLoaded', () => {

  /* ── 테마 토글 ── */
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    const updateIcon = (theme) => {
      toggleBtn.setAttribute('aria-label', theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환');
      toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    };
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    updateIcon(currentTheme);

    toggleBtn.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('publikit-theme', next);
      updateIcon(next);
    });
  }

  /* ── 코드 복사 버튼 ── */
  document.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.querySelector(btn.dataset.target);
      if (!target) return;
      navigator.clipboard.writeText(target.textContent.trim()).then(() => {
        showToast('코드가 복사되었습니다 ✓');
        btn.textContent = '✓ 복사됨';
        setTimeout(() => { btn.textContent = '복사'; }, 2000);
      }).catch(() => showToast('복사 실패. 직접 선택해 주세요.'));
    });
  });

  /* ── 활성 네비 링크 ── */
  const currentPath = location.pathname;
  document.querySelectorAll('.header-nav a').forEach(link => {
    if (link.getAttribute('href') && currentPath.includes(link.getAttribute('href').replace('../', '').replace('.html', ''))) {
      link.classList.add('active');
    }
  });

});

/* ── 토스트 ── */
function showToast(message, duration = 2200) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
}

window.showToast = showToast;