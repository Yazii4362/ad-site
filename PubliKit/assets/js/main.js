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

  /* ── ☕ 커피챗 이스터에그 — 푸터 카피라이트 5번 클릭 ── */
  const footerCopy = document.querySelector('.footer-copy');
  if (footerCopy) {
    let clickCount = 0;
    let clickTimer = null;

    footerCopy.style.cursor = 'default';

    footerCopy.addEventListener('click', () => {
      clickCount++;

      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => { clickCount = 0; }, 2000);

      if (clickCount >= 5) {
        clickCount = 0;
        clearTimeout(clickTimer);
        showCoffeeChatModal();
      }
    });
  }

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

/* ── 쿠키 동의 배너 ── */
function initCookieBanner() {
  if (localStorage.getItem('publikit-cookie-consent')) return;

  const privacyPath = location.pathname.includes('/pages/utility/')
    ? '../../pages/privacy.html'
    : location.pathname.includes('/pages/')
      ? 'privacy.html'
      : 'pages/privacy.html';

  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-label', '쿠키 동의');
  banner.innerHTML = `
    <p class="cookie-banner-text">
      🍪 publiKit은 서비스 개선 및 광고 제공을 위해 쿠키를 사용합니다.
      자세한 내용은 <a href="${privacyPath}">개인정보처리방침</a>을 확인하세요.
    </p>
    <div class="cookie-banner-actions">
      <button class="btn btn-outline btn-sm" id="cookie-deny">거부</button>
      <button class="btn btn-primary btn-sm" id="cookie-accept">동의</button>
    </div>
  `;
  document.body.appendChild(banner);

  requestAnimationFrame(() => {
    setTimeout(() => banner.classList.add('show'), 600);
  });

  const dismiss = (value) => {
    localStorage.setItem('publikit-cookie-consent', value);
    banner.style.transform = banner.style.transform.replace('translateY(0)', 'translateY(120%)');
    setTimeout(() => banner.remove(), 400);
  };

  document.getElementById('cookie-accept').addEventListener('click', () => dismiss('accepted'));
  document.getElementById('cookie-deny').addEventListener('click',   () => dismiss('denied'));
}

document.addEventListener('DOMContentLoaded', initCookieBanner);

/* ── ☕ 커피챗 모달 ── */
function showCoffeeChatModal() {
  if (document.getElementById('coffee-modal')) return;

  const modal = document.createElement('div');
  modal.id = 'coffee-modal';
  modal.style.cssText = `
    position:fixed; inset:0; z-index:9999;
    background:rgba(0,0,0,0.5);
    display:flex; align-items:center; justify-content:center;
    opacity:0; transition:opacity 0.2s ease;
  `;

  modal.innerHTML = `
    <div style="
      background:var(--bg-surface);
      border:2px solid var(--border-color);
      border-radius:24px;
      padding:40px 36px;
      max-width:400px; width:90%;
      text-align:center;
      transform:translateY(20px);
      transition:transform 0.2s ease;
    ">
      <div style="font-size:3.5rem; margin-bottom:16px;">☕</div>
      <h2 style="font-size:1.4rem; font-weight:900; letter-spacing:-0.03em; margin-bottom:10px; color:var(--text-primary);">
        숨겨진 메뉴 발견!
      </h2>
      <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.7; margin-bottom:28px;">
        publiKit을 이렇게 깊이 탐험해 주시다니 감사해요 🙏<br/>
        커피 한 잔 하면서 이야기 나눠요.<br/>
        <strong style="color:var(--color-primary);">아이디어, 피드백, 협업</strong> 뭐든 환영합니다.
      </p>
      <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
        <a href="mailto:hello@publikit.dev"
           style="
             display:inline-flex; align-items:center; gap:6px;
             padding:10px 22px; border-radius:9999px;
             background:var(--color-primary); color:#fff;
             font-size:0.85rem; font-weight:700;
             border:2px solid var(--color-blue-dark);
             text-decoration:none;
           ">
          ✉️ 커피챗 신청하기
        </a>
        <button id="coffee-close" style="
          padding:10px 22px; border-radius:9999px;
          background:var(--bg-surface-2); color:var(--text-secondary);
          font-size:0.85rem; font-weight:700;
          border:2px solid var(--border-color);
          cursor:pointer;
        ">닫기</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  /* 애니메이션 */
  requestAnimationFrame(() => {
    modal.style.opacity = '1';
    modal.querySelector('div').style.transform = 'translateY(0)';
  });

  const close = () => {
    modal.style.opacity = '0';
    setTimeout(() => modal.remove(), 200);
  };

  document.getElementById('coffee-close').addEventListener('click', close);
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  document.addEventListener('keydown', function esc(e) {
    if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); }
  });
}

window.showCoffeeChatModal = showCoffeeChatModal;