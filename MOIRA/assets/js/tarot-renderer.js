/**
 * MOIRA — tarot-renderer.js
 * 타로 카드 렌더링 로직
 */

'use strict';

/**
 * 카드 이미지 경로 생성
 * @param {number} cardId - 카드 ID
 * @returns {string} 이미지 경로
 */
function getCardImagePath(cardId) {
  /* 실제 존재하는 이미지 파일 ID */
  const AVAILABLE = [0,1,2,3,5,6,7,8,9,10,11,12,13,14,15,16];
  /* fortune/ 서브페이지 기준 상대경로 */
  const base = '../assets/images/cards/';
  const id = AVAILABLE.includes(cardId) ? cardId : AVAILABLE[cardId % AVAILABLE.length];
  return `${base}${id}.png`;
}

/**
 * 타로 카드 DOM 요소 생성
 * @param {Object} card - 카드 데이터
 * @param {number} index - 카드 인덱스 (0, 1, 2)
 * @returns {HTMLElement} 카드 버튼 요소
 */
function createCardElement(card, index) {
  const button = document.createElement('button');
  button.className = 'tarot-card';
  button.type = 'button';
  button.dataset.index = index;
  button.dataset.cardId = card.id;
  button.setAttribute('aria-label', `${card.name_kr} 카드 선택`);
  button.setAttribute('data-aos', 'fade-up');
  button.setAttribute('data-aos-delay', String(index * 120));

  button.innerHTML = `
    <div class="tarot-card__inner" style="perspective:1000px;">
      <div class="tarot-card__back">
        <div class="tarot-card__back-symbol" aria-hidden="true">✦</div>
        <p class="tarot-card__back-text">클릭하여 선택</p>
      </div>
      <div class="tarot-card__face">
        <div class="tarot-card__img">
          <img src="${getCardImagePath(card.id)}" alt="${card.name_kr} 타로 카드" loading="lazy" width="240" height="360"
               style="width:100%;height:100%;object-fit:cover;display:block;">
        </div>
      </div>
    </div>`;

  return button;
}

/**
 * 컨테이너에 타로 카드 렌더링
 * @param {string} containerId - 컨테이너 ID
 * @param {Array} cards - 렌더링할 카드 배열
 */
function renderTarotCards(containerId, cards) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id "${containerId}" not found`);
    return;
  }

  container.innerHTML = '';

  cards.forEach((card, index) => {
    const cardElement = createCardElement(card, index);
    container.appendChild(cardElement);
  });

  // Refresh AOS if available
  if (typeof AOS !== 'undefined') {
    AOS.refreshHard();
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { renderTarotCards, getCardImagePath };
}
