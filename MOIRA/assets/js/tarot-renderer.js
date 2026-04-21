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
  const card = TAROT_CARDS.find(c => c.id === cardId);
  if (!card) return 'assets/images/cards/0.png';

  if (card.suit) {
    // Minor Arcana
    return `assets/images/cards/${card.suit}/${card.number}.png`;
  } else {
    // Major Arcana
    return `assets/images/cards/${cardId}.png`;
  }
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
    <div class="tarot-card__inner">
      <div class="tarot-card__back">
        <div class="tarot-card__back-symbol" aria-hidden="true">✦</div>
        <p class="tarot-card__back-text">클릭하여 선택</p>
      </div>
      <div class="tarot-card__face">
        <div class="tarot-card__img">
          <img src="${getCardImagePath(card.id)}" alt="${card.name_kr} 타로 카드" loading="lazy" width="240" height="360">
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
