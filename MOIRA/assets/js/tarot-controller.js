/**
 * MOIRA — tarot-controller.js
 * 타로 카드 이벤트 처리 및 상태 관리
 */

'use strict';

/**
 * 타로 컨트롤러 초기화
 * @param {string} containerId - 카드 컨테이너 ID
 * @param {Function} onCardPicked - 카드 선택 시 콜백 함수
 */
function initTarotController(containerId, onCardPicked) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id "${containerId}" not found`);
    return;
  }

  // Event delegation: 클릭 이벤트 처리
  container.addEventListener('click', (event) => {
    const cardButton = event.target.closest('.tarot-card');
    if (!cardButton) return;

    const cardId = parseInt(cardButton.dataset.cardId, 10);
    const card = TAROT_CARDS.find(c => c.id === cardId);

    if (card && typeof onCardPicked === 'function') {
      onCardPicked(card, cardButton);
    }
  });

  // Keyboard support: Enter/Space 키
  container.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      const cardButton = event.target.closest('.tarot-card');
      if (!cardButton) return;

      event.preventDefault();
      const cardId = parseInt(cardButton.dataset.cardId, 10);
      const card = TAROT_CARDS.find(c => c.id === cardId);

      if (card && typeof onCardPicked === 'function') {
        onCardPicked(card, cardButton);
      }
    }
  });
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initTarotController };
}
