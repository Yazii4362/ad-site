/**
 * MOIRA — main.js
 * AOS 초기화 · 공통 유틸 · 타로 카드 플립 · FAQ 아코디언
 */

'use strict';

/* ── AOS 초기화 ── */
function initAOS() {
  if (typeof AOS === 'undefined') return;
  AOS.init({
    once: true,
    duration: 700,
    easing: 'ease-out-quart',
    offset: 60,
    delay: 0,
  });
}

/* ── Swiper: 타로 카드 슬라이더 ── */
function initTarotSwiper() {
  const el = document.querySelector('.swiper--tarot');
  if (!el || typeof Swiper === 'undefined') return;

  new Swiper(el, {
    slidesPerView: 1.2,
    centeredSlides: true,
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    pagination: {
      el: el.querySelector('.swiper-pagination'),
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        centeredSlides: true,
        spaceBetween: 24,
      },
      1024: {
        slidesPerView: 3,
        centeredSlides: true,
        spaceBetween: 28,
      },
    },
  });
}

/* ── Swiper: 후기 슬라이더 ── */
function initTestimonialSwiper() {
  const el = document.querySelector('.swiper--testimonial');
  if (!el || typeof Swiper === 'undefined') return;

  new Swiper(el, {
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 16,
    loop: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: el.querySelector('.swiper-pagination'),
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        centeredSlides: false,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        centeredSlides: false,
        spaceBetween: 24,
      },
    },
  });
}

/* ── 타로 카드 플립 ── */
function initTarotFlip() {
  document.querySelectorAll('.tarot-card').forEach((card) => {
    card.addEventListener('click', () => {
      const isFlipped = card.classList.toggle('is-flipped');
      card.setAttribute('aria-pressed', String(isFlipped));
    });

    // 키보드 접근성
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
}

/* ── FAQ 아코디언 ── */
function initFAQ() {
  document.querySelectorAll('.faq-item__trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      const isOpen = item.classList.contains('is-open');

      // 다른 항목 닫기
      document.querySelectorAll('.faq-item.is-open').forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove('is-open');
          openItem.querySelector('.faq-item__trigger').setAttribute('aria-expanded', 'false');
        }
      });

      // 현재 항목 토글
      item.classList.toggle('is-open', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });
  });
}

/* ── Smooth Scroll (앵커 링크) ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const headerHeight = document.querySelector('.header')?.offsetHeight ?? 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ── IntersectionObserver: 현재 섹션 감지 ── */
function initSectionObserver() {
  const navLinks = document.querySelectorAll('.header__nav-list a[href^="#"]');
  if (!navLinks.length) return;

  const sections = Array.from(navLinks)
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((a) => {
          a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`);
        });
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
}

/* ── 별점 렌더링 유틸 ── */
function renderStars(count, max = 5) {
  return Array.from({ length: max }, (_, i) =>
    `<span aria-hidden="true">${i < count ? '★' : '☆'}</span>`
  ).join('');
}

/* ── DOMContentLoaded ── */
document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initTarotSwiper();
  initTestimonialSwiper();
  initTarotFlip();
  initFAQ();
  initSmoothScroll();
  initSectionObserver();
  initKVVideo();
});

/* ── KV 비디오: 멈춤 감지 → 자동 재개 ── */
function initKVVideo() {
  const video = document.getElementById('kv-video');
  if (!video) return;

  // 로드 완료 후 재생 보장
  video.addEventListener('canplaythrough', () => {
    video.play().catch(() => {});
  });

  // 멈춤 감지 → 즉시 재개
  video.addEventListener('stalled', () => {
    video.load();
    video.play().catch(() => {});
  });

  video.addEventListener('waiting', () => {
    // 버퍼링 중 — 재생 재시도
    setTimeout(() => {
      if (video.paused) video.play().catch(() => {});
    }, 300);
  });

  video.addEventListener('pause', () => {
    // loop 중 의도치 않은 pause 방지
    if (!video.ended) {
      video.play().catch(() => {});
    }
  });

  // 저전력 모드 / 탭 복귀 시 재개
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && video.paused) {
      video.play().catch(() => {});
    }
  });
}
