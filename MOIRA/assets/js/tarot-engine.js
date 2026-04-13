/**
 * MOIRA — Tarot Engine
 * 고정형 로직 시스템: 카드 데이터 + 질문 조합 → 완성된 리딩 생성
 */

'use strict';

class TarotEngine {
  constructor() {
    this.cards = null;
    this.questions = null;
    this.initialized = false;
  }

  /**
   * 데이터 로드 및 초기화
   */
  async init() {
    if (this.initialized) return;

    try {
      const [cardsRes, questionsRes] = await Promise.all([
        fetch('/assets/data/tarot-cards.json'),
        fetch('/assets/data/questions.json')
      ]);

      this.cards = await cardsRes.json();
      this.questions = await questionsRes.json();
      this.initialized = true;
    } catch (error) {
      console.error('타로 데이터 로드 실패:', error);
      throw new Error('타로 데이터를 불러올 수 없습니다.');
    }
  }

  /**
   * 카드 ID로 카드 데이터 가져오기
   */
  getCard(cardId) {
    if (!this.initialized) {
      throw new Error('TarotEngine이 초기화되지 않았습니다. init()을 먼저 호출하세요.');
    }
    return this.cards.cards.find(card => card.card_id === cardId);
  }

  /**
   * 질문 ID로 질문 데이터 가져오기
   */
  getQuestion(category, questionId) {
    if (!this.initialized) {
      throw new Error('TarotEngine이 초기화되지 않았습니다. init()을 먼저 호출하세요.');
    }
    const categoryData = this.questions.categories[category];
    if (!categoryData) return null;
    return categoryData.questions.find(q => q.id === questionId);
  }

  /**
   * 카테고리별 모든 질문 가져오기
   */
  getQuestionsByCategory(category) {
    if (!this.initialized) {
      throw new Error('TarotEngine이 초기화되지 않았습니다.');
    }
    return this.questions.categories[category]?.questions || [];
  }

  /**
   * 완성된 리딩 생성 (Intro + Core Message + Answer)
   * @param {number} cardId - 카드 ID (0~77)
   * @param {string} category - 카테고리 (love, money, career)
   * @param {string} questionId - 질문 ID (q1_feeling, q2_reunion 등)
   * @returns {Object} 완성된 리딩 객체
   */
  generateReading(cardId, category, questionId) {
    const card = this.getCard(cardId);
    const question = this.getQuestion(category, questionId);

    if (!card || !question) {
      throw new Error('유효하지 않은 카드 또는 질문입니다.');
    }

    const interpretation = card.interpretations[category];
    if (!interpretation) {
      throw new Error(`카드 ${cardId}에 ${category} 카테고리 해석이 없습니다.`);
    }

    const answer = interpretation.answers[questionId];
    if (!answer) {
      throw new Error(`카드 ${cardId}의 ${category} 카테고리에 ${questionId} 답변이 없습니다.`);
    }

    // 문장 조립: Intro + Core Message + Answer
    const fullReading = `${question.intro} 현재 뽑으신 '${card.card_name_kr}' 카드는 ${interpretation.core_message} ${answer}`;

    return {
      card: {
        id: card.card_id,
        name_kr: card.card_name_kr,
        name_en: card.card_name_en,
        tags: card.ui_elements.tags,
        lucky_color: card.ui_elements.lucky_color,
        lucky_item: card.ui_elements.lucky_item,
        score: card.ui_elements.scores[category]
      },
      question: {
        id: question.id,
        title: question.title,
        tags: question.tags,
        intro: question.intro
      },
      reading: {
        intro: question.intro,
        core_message: interpretation.core_message,
        answer: answer,
        full_text: fullReading
      }
    };
  }

  /**
   * UI 렌더링용 HTML 생성
   */
  renderReadingHTML(reading) {
    const { card, question, reading: readingData } = reading;

    return `
      <div class="reading-result">
        <!-- 카드 정보 -->
        <div class="reading-result__card-info">
          <h2 class="reading-result__card-name">
            ${card.name_kr} · ${card.name_en}
          </h2>
          <div class="reading-result__tags">
            ${card.tags.map(tag => `<span class="badge badge--lavender">${tag}</span>`).join('')}
          </div>
        </div>

        <!-- 운세 점수 바 -->
        <div class="reading-result__score">
          <div class="score-bar">
            <div class="score-bar__label">운세 지수</div>
            <div class="score-bar__track">
              <div class="score-bar__fill" style="width: ${card.score}%"></div>
            </div>
            <div class="score-bar__value">${card.score}%</div>
          </div>
        </div>

        <!-- 행운의 아이템 -->
        <div class="reading-result__lucky">
          <div class="lucky-item">
            <span class="lucky-item__label">행운의 색상</span>
            <span class="lucky-item__value" style="color: ${card.lucky_color}">${card.lucky_color}</span>
          </div>
          <div class="lucky-item">
            <span class="lucky-item__label">행운의 아이템</span>
            <span class="lucky-item__value">${card.lucky_item}</span>
          </div>
        </div>

        <!-- 리딩 본문 -->
        <div class="reading-result__text">
          <p>${readingData.full_text}</p>
        </div>
      </div>
    `;
  }

  /**
   * 랜덤 카드 뽑기 (0~77)
   */
  drawRandomCard() {
    return Math.floor(Math.random() * 78);
  }

  /**
   * 덱에서 중복 없이 n장 랜덤 뽑기
   * - 실제 보유 카드 수(cards.length) 범위 내에서만 뽑음
   * @param {number} n - 뽑을 장 수 (기본 3)
   * @returns {number[]} card_id 배열
   */
  drawCards(n = 3) {
    if (!this.initialized) throw new Error('TarotEngine이 초기화되지 않았습니다.');

    const ids = this.cards.cards.map(c => c.card_id);
    // Fisher-Yates 셔플
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    return ids.slice(0, Math.min(n, ids.length));
  }

  /**
   * 모든 카테고리 정보 가져오기
   */
  getCategories() {
    if (!this.initialized) {
      throw new Error('TarotEngine이 초기화되지 않았습니다.');
    }
    return Object.entries(this.questions.categories).map(([key, value]) => ({
      id: key,
      name: value.name,
      emoji: value.emoji,
      questionCount: value.questions.length
    }));
  }

  /**
   * 통계: 전체 조합 수 계산
   */
  getTotalCombinations() {
    if (!this.initialized) return 0;
    
    let total = 0;
    Object.values(this.questions.categories).forEach(category => {
      total += category.questions.length * this.cards.cards.length;
    });
    return total;
  }
}

// 싱글톤 인스턴스 생성
const tarotEngine = new TarotEngine();

// 전역 스코프에 노출 (다른 스크립트에서 사용 가능)
if (typeof window !== 'undefined') {
  window.TarotEngine = TarotEngine;
  window.tarotEngine = tarotEngine;
}

// ES6 모듈로도 사용 가능
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TarotEngine, tarotEngine };
}
