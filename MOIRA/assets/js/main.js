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

/* ── DOMContentLoaded ── */
document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initTestimonialSwiper();
  initFAQ();
  initSmoothScroll();
  initSectionObserver();
  initKVVideo();
  initTarotSlider();
});

/* ── 타로 슬라이더 — 78장 Swiper ── */
function initTarotSlider() {
  const wrapper = document.getElementById('tarot-swiper-wrapper');
  if (!wrapper || typeof Swiper === 'undefined') return;

  /* 실제 존재하는 이미지 파일 ID — 순서대로 하나씩 할당 */
  const IMG_IDS = [0,1,2,3,5,6,7,8,9,10,11,12,13,14,15,16];

  /* 78장 슬라이드 생성 */
  for (let i = 0; i < 78; i++) {
    const imgId = IMG_IDS[i % IMG_IDS.length]; /* 16장 순환 */
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.dataset.cardIndex = i;
    slide.dataset.imgId = imgId;
    slide.innerHTML = `
      <div class="tarot-card" role="button" tabindex="0"
           aria-pressed="false" aria-label="카드 ${i + 1}번 선택"
           style="perspective: 1000px;">
        <div class="tarot-card__inner">
          <div class="tarot-card__back">
            <div class="tarot-card__back-symbol" aria-hidden="true">✦</div>
            <p class="tarot-card__back-text">클릭하여 확인</p>
          </div>
          <div class="tarot-card__face">
            <img src="assets/images/cards/${imgId}.png"
                 alt="타로 카드 ${i + 1}"
                 loading="lazy" width="180" height="270">
          </div>
        </div>
      </div>`;
    wrapper.appendChild(slide);
  }

  /* 카드 데이터 — 이름/키워드/메시지 */
  const CARD_DATA = [
    { name: '바보 · The Fool',           keywords: '#새로운시작 #자유 #모험',     message: '두려움 없이 새로운 길을 떠날 때입니다. 지금의 불확실함이 오히려 가장 큰 가능성이에요.' },
    { name: '마법사 · The Magician',      keywords: '#의지 #창조력 #실현',        message: '당신 안에 모든 도구가 갖춰져 있어요. 원하는 것을 현실로 만들 힘이 지금 당신에게 있습니다.' },
    { name: '여사제 · High Priestess',    keywords: '#직관 #신비 #내면의지혜',    message: '말보다 침묵 속에 답이 있어요. 내면의 목소리에 귀 기울여 보세요.' },
    { name: '여황제 · The Empress',       keywords: '#풍요 #창조 #사랑',          message: '풍요롭고 따뜻한 에너지가 당신을 감싸고 있어요. 자신을 아끼고 돌보는 시간을 가져보세요.' },
    { name: '황제 · The Emperor',         keywords: '#안정 #권위 #구조',          message: '흔들리지 않는 기반을 다질 때입니다. 체계와 규칙이 오히려 자유를 만들어줄 거예요.' },
    { name: '교황 · The Hierophant',      keywords: '#전통 #지혜 #가르침',        message: '믿을 수 있는 사람의 조언을 구해보세요. 오래된 지혜 속에 지금의 답이 있을 수 있어요.' },
    { name: '연인 · The Lovers',          keywords: '#선택 #사랑 #조화',          message: '마음이 이끄는 선택을 하세요. 진정한 연결은 두려움이 아닌 사랑에서 시작됩니다.' },
    { name: '전차 · The Chariot',         keywords: '#의지 #승리 #전진',          message: '목표를 향해 흔들림 없이 나아가세요. 지금은 멈출 때가 아니라 달릴 때입니다.' },
    { name: '힘 · Strength',              keywords: '#용기 #인내 #내면의힘',      message: '부드러움이 강함을 이깁니다. 억누르지 말고 감정을 다독이며 앞으로 나아가세요.' },
    { name: '은둔자 · The Hermit',        keywords: '#성찰 #고독 #내면탐구',      message: '잠시 혼자만의 시간이 필요해요. 고요함 속에서 진짜 자신을 만날 수 있습니다.' },
    { name: '운명의 수레바퀴 · Wheel',    keywords: '#변화 #순환 #운명',          message: '변화의 물결이 찾아오고 있어요. 흐름에 저항하지 말고 함께 움직여 보세요.' },
    { name: '정의 · Justice',             keywords: '#균형 #공정 #진실',          message: '진실은 반드시 드러납니다. 올바른 선택이 결국 좋은 결과를 만들어낼 거예요.' },
    { name: '매달린 남자 · Hanged Man',   keywords: '#기다림 #관점전환 #희생',    message: '지금은 행동보다 기다림의 시간이에요. 다른 각도로 바라보면 새로운 답이 보입니다.' },
    { name: '죽음 · Death',               keywords: '#변환 #끝과시작 #해방',      message: '끝은 새로운 시작입니다. 놓아야 할 것을 놓을 때 비로소 새로운 문이 열려요.' },
    { name: '절제 · Temperance',          keywords: '#균형 #조화 #인내',          message: '서두르지 마세요. 천천히 균형을 맞춰가다 보면 원하는 곳에 도달할 수 있어요.' },
    { name: '악마 · The Devil',           keywords: '#집착 #욕망 #해방',          message: '스스로 만든 사슬을 인식하는 것이 첫 번째 자유입니다. 무엇에 묶여 있는지 돌아보세요.' },
    { name: '탑 · The Tower',             keywords: '#붕괴 #각성 #변화',          message: '갑작스러운 변화가 두렵겠지만, 무너진 자리에 더 단단한 것이 세워집니다.' },
    { name: '별 · The Star',              keywords: '#희망 #치유 #영감',          message: '어둠 뒤에 반드시 별이 뜹니다. 지금 이 순간도 희망의 빛이 당신을 향하고 있어요.' },
  ];

  function getCardData(index) {
    return CARD_DATA[index % CARD_DATA.length];
  }

  /* 결과 패널 표시 */
  function showResult(cardIndex, imgId) {
    const result  = document.getElementById('tarot-result');
    const imgEl   = document.getElementById('tarot-result-img');
    const nameEl  = document.getElementById('tarot-result-name');
    const kwEl    = document.getElementById('tarot-result-keywords');
    const msgEl   = document.getElementById('tarot-result-message');
    if (!result) return;

    const data = getCardData(cardIndex);
    imgEl.src = `assets/images/cards/${imgId}.png`;
    imgEl.alt = data.name;
    nameEl.textContent = data.name;
    kwEl.textContent   = data.keywords;
    msgEl.textContent  = data.message;

    result.hidden = false;
    setTimeout(() => {
      result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }

  /* 카드 플립 이벤트 — 플립 완료 후 결과 표시 */
  wrapper.addEventListener('click', (e) => {
    const card = e.target.closest('.tarot-card');
    if (!card) return;
    const wasFlipped = card.classList.contains('is-flipped');
    card.classList.toggle('is-flipped');
    card.setAttribute('aria-pressed', String(!wasFlipped));

    if (!wasFlipped) {
      /* 플립 애니메이션(700ms) 후 결과 표시 */
      const idx   = parseInt(card.closest('.swiper-slide').dataset.cardIndex, 10);
      const imgId = card.closest('.swiper-slide').dataset.imgId;
      setTimeout(() => showResult(idx, imgId), 750);
    }
  });

  wrapper.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.tarot-card');
      if (card) { e.preventDefault(); card.click(); }
    }
  });

  /* 닫기 버튼 */
  const closeBtn = document.getElementById('tarot-result-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      const result = document.getElementById('tarot-result');
      if (result) result.hidden = true;
    });
  }

  /* Swiper 초기화 */
  new Swiper('.swiper--tarot', {
    slidesPerView: 'auto',
    spaceBetween: 16,
    centeredSlides: false,
    grabCursor: true,
    loop: false,
    navigation: {
      nextEl: '.swiper--tarot .swiper-button-next',
      prevEl: '.swiper--tarot .swiper-button-prev',
    },
    pagination: {
      el: '.swiper--tarot .swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      640:  { spaceBetween: 20 },
      1024: { spaceBetween: 24 },
    },
  });
}

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
