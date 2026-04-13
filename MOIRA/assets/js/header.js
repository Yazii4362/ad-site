/**
 * MOIRA — header.js
 * 햄버거 메뉴 · 스크롤 이벤트 · 모바일 오버레이
 */

'use strict';

(function () {
  const SCROLL_THRESHOLD = 50;

  const header      = document.querySelector('.header');
  const hamburger   = document.querySelector('.header__hamburger');
  const mobileNav   = document.querySelector('.header__mobile-nav');
  const mobileLinks = document.querySelectorAll('.header__mobile-nav-list a');

  if (!header) return;

  /* ── 스크롤: 헤더 배경 전환 ── */
  function onScroll() {
    const scrolled = window.scrollY > SCROLL_THRESHOLD;
    header.classList.toggle('is-scrolled', scrolled);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // 초기 실행

  /* ── 모바일 메뉴 열기/닫기 ── */
  function openMenu() {
    if (!hamburger || !mobileNav) return;
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', '메뉴 닫기');
    mobileNav.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // 첫 번째 링크에 포커스
    const firstLink = mobileNav.querySelector('a');
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    if (!hamburger || !mobileNav) return;
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', '메뉴 열기');
    mobileNav.classList.remove('is-open');
    document.body.style.overflow = '';
    hamburger.focus();
  }

  function toggleMenu() {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  /* ── 모바일 링크 클릭 시 메뉴 닫기 ── */
  mobileLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  /* ── ESC 키로 메뉴 닫기 ── */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const isOpen = hamburger?.getAttribute('aria-expanded') === 'true';
      if (isOpen) closeMenu();
    }
  });

  /* ── 오버레이 바깥 클릭 시 닫기 ── */
  if (mobileNav) {
    mobileNav.addEventListener('click', (e) => {
      if (e.target === mobileNav) closeMenu();
    });
  }

  /* ── 리사이즈: 데스크탑 전환 시 메뉴 닫기 ── */
  const mediaQuery = window.matchMedia('(min-width: 768px)');
  mediaQuery.addEventListener('change', (e) => {
    if (e.matches) closeMenu();
  });
})();
