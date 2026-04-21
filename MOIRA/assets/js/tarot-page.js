/**
 * MOIRA — tarot-page.js
 * 타로 페이지 초기화 및 결과 렌더링
 * 각 페이지에서 initTarotPage(questionIntro, questionKey, category) 호출
 */

'use strict';

/**
 * 게이지 애니메이션
 */
function animateGauge(score) {
  const fill  = document.getElementById('gauge-fill');
  const label = document.getElementById('gauge-value');
  const track = fill.closest('[role="progressbar"]');
  let current = 0;
  const step  = score / 60;
  const tick  = () => {
    current = Math.min(current + step, score);
    fill.style.width  = current + '%';
    label.textContent = Math.round(current) + '%';
    track.setAttribute('aria-valuenow', Math.round(current));
    if (current < score) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/**
 * 결과 렌더링
 */
function renderResult(data, category, questionKey, questionIntro) {
  const cat    = data[category];
  const answer = cat.answers[questionKey] || Object.values(cat.answers)[0];
  const score  = typeof data.score === 'object' ? data.score[category] : data.score;

  const gaugeLabels = { love: '연애 긍정 지수', money: '금전 긍정 지수', career: '직장 긍정 지수' };
  const gaugeClasses = { love: 'gauge-fill--love', money: 'gauge-fill--money', career: 'gauge-fill--career' };
  const gaugeLabelEl = document.querySelector('.gauge-label__text');
  const gaugeFillEl  = document.getElementById('gauge-fill');
  if (gaugeLabelEl) gaugeLabelEl.textContent = `이 카드의 ${gaugeLabels[category] || '긍정 지수'}`;
  if (gaugeFillEl)  gaugeFillEl.className = `gauge-fill ${gaugeClasses[category] || ''}`;

  const resultImg = document.getElementById('result-img');
  resultImg.src = getCardImagePath(data.id);
  resultImg.alt = `${data.name_kr} 타로 카드`;
  document.getElementById('result-arcana').textContent = data.arcana;
  document.getElementById('result-name').textContent   = `${data.name_kr} · ${data.name_en}`;

  document.getElementById('result-tags').innerHTML = data.tags
    .map(t => `<span class="tag-chip" role="listitem">${t}</span>`).join('');

  document.getElementById('reading-intro-text').textContent  = questionIntro;
  document.getElementById('reading-core-text').textContent   = `현재 뽑으신 '${data.name_kr}' 카드는 ${cat.core}`;
  document.getElementById('reading-answer-text').textContent = answer;

  const dot = document.getElementById('lucky-color-dot');
  dot.style.backgroundColor = data.lucky_color_hex;
  dot.style.boxShadow       = `0 0 8px ${data.lucky_color_hex}`;
  document.getElementById('lucky-color-name').textContent = data.lucky_color;
  document.getElementById('lucky-item-text').textContent  = data.lucky_item;

  const section = document.getElementById('result-section');
  section.classList.add('is-visible');
  setTimeout(() => animateGauge(score), 300);
  setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
}

/**
 * Fisher-Yates 셔플로 3장 뽑기
 */
function drawThreeCards() {
  const cards = [...TAROT_CARDS];
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards.slice(0, 3);
}

/**
 * 페이지 초기화
 * @param {string} questionIntro - 도입 문장
 * @param {string} questionKey - 질문 키 (q1_flow 등)
 * @param {string} category - 'love' | 'money' | 'career'
 */
function initTarotPage(questionIntro, questionKey, category) {
  category = category || 'love';
  let picked = false;

  function initCards() {
    const cards = drawThreeCards();
    renderTarotCards('card-container', cards);
    picked = false;
  }

  function handleCardPicked(card, cardButton) {
    if (picked) return;
    picked = true;

    cardButton.classList.add('is-flipped');
    cardButton.setAttribute('aria-pressed', 'true');
    document.querySelectorAll('.tarot-card').forEach(c => {
      if (c !== cardButton) c.classList.add('is-dimmed');
    });

    setTimeout(() => renderResult(card, category, questionKey, questionIntro), 800);
  }

  // Initialize controller
  initTarotController('card-container', handleCardPicked);

  // Retry button
  document.getElementById('retry-btn').addEventListener('click', () => {
    document.getElementById('result-section').classList.remove('is-visible');
    document.getElementById('gauge-fill').style.width  = '0%';
    document.getElementById('gauge-value').textContent = '0%';
    initCards();
    setTimeout(() => {
      document.getElementById('card-container').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  });

  initCards();
}
