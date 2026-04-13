/**
 * MOIRA — tarot-page.js
 * 모든 tarot-love-XX.html 페이지가 공유하는 공통 로직
 * 각 페이지에서 initTarotPage(intro, questionKey) 호출
 */

'use strict';

/* ════════════════════════════════════════
   카드 데이터 (78장 입력 가능 구조)
   card_id: 라이더-웨이트 기준 0~77
   이미지:  assets/images/cards/{파일명}
════════════════════════════════════════ */
const CARDS = {
  0: {
    name_kr: '바보', name_en: 'The Fool', arcana: 'Major Arcana · 0',
    tags: ['#새로운시작', '#자유로움', '#직감', '#예측불가'],
    lucky_color: 'Yellow', lucky_color_hex: '#FDE68A',
    lucky_item: '가벼운 스니커즈, 즉흥적인 산책',
    score: 70,
    love: {
      core: '어딘가에 얽매이지 않는 자유롭고 가벼운 에너지가 가득한 시기입니다.',
      answers: {
        q1_feeling: '그 사람은 당신을 순수하고 자유로운 존재로 바라보고 있어요. 복잡하게 생각하기보다는, 당신과 함께 있을 때 편안함과 새로운 가능성을 느끼고 있습니다. 지금은 서로에 대한 기대 없이 자연스럽게 흘러가는 시기예요.',
        q2_reunion: '과거의 인연보다는 완전히 새로운 만남에 운이 열려 있습니다. 훌훌 털어버리는 것이 오히려 재회의 문을 열 수 있어요.',
        q3_decision: '현재 관계가 답답하다면 과감하게 마음이 이끄는 대로 결단을 내려도 좋습니다. 새로운 시작을 두려워하지 마세요.',
        q4_some: '진지하고 무거운 관계보다는 일단 가볍고 즐겁게 만나는 단계입니다. 너무 앞서가지 마세요.',
        q5_timing: '예상치 못한 순간에 갑자기 찾아올 수 있어요. 계획보다는 우연한 만남에 마음을 열어두세요.',
        q6_sincerity: '상대방의 마음은 아직 가볍고 자유로운 상태예요. 깊은 감정으로 발전하려면 시간이 더 필요합니다.'
      }
    }
  },
  1: {
    name_kr: '마법사', name_en: 'The Magician', arcana: 'Major Arcana · I',
    tags: ['#의지', '#창조력', '#실현', '#능력'],
    lucky_color: 'Red', lucky_color_hex: '#F87171',
    lucky_item: '펜, 노트북, 창작 도구',
    score: 85,
    love: {
      core: '당신이 원하는 것을 현실로 만들 수 있는 강력한 의지와 매력이 있는 시기입니다.',
      answers: {
        q1_feeling: '그 사람은 당신에게 강한 매력과 가능성을 느끼고 있어요. 당신과의 관계에서 무언가를 만들어가고 싶다는 의지가 있습니다.',
        q2_reunion: '재회 가능성이 높습니다. 당신이 먼저 적극적으로 다가간다면 좋은 결과를 얻을 수 있어요.',
        q3_decision: '관계를 지속할지 말지는 당신의 의지에 달려 있습니다. 원하는 방향으로 이끌어갈 힘이 있어요.',
        q4_some: '썸에서 연애로 발전할 가능성이 매우 높습니다. 당신이 주도권을 잡고 이끌어가세요.',
        q5_timing: '지금 당장 적극적으로 나선다면 곧 좋은 인연을 만날 수 있습니다. 기다리지 말고 행동하세요.',
        q6_sincerity: '상대방은 당신에게 진심이며, 관계를 발전시키고 싶어 합니다. 믿어도 좋습니다.'
      }
    }
  },
  2: {
    name_kr: '여사제', name_en: 'The High Priestess', arcana: 'Major Arcana · II',
    tags: ['#직관', '#신비', '#내면', '#지혜'],
    lucky_color: 'Silver', lucky_color_hex: '#CBD5E1',
    lucky_item: '달 모양 액세서리, 명상 음악',
    score: 75,
    love: {
      core: '표면적인 것보다 내면의 진실을 들여다봐야 하는 시기입니다.',
      answers: {
        q1_feeling: '그 사람은 당신에 대해 깊이 생각하고 있지만, 아직 마음을 완전히 드러내지 않고 있어요. 복잡하다기보다는 신중한 것에 가깝습니다.',
        q2_reunion: '재회 가능성은 있지만 시간이 필요합니다. 서두르지 말고 내면의 목소리에 귀 기울이세요.',
        q3_decision: '지금은 결정을 내리기보다 당신의 진짜 마음이 무엇인지 깊이 탐구할 시간입니다.',
        q4_some: '상대방도 당신에게 관심이 있지만 조심스럽게 접근하고 있습니다. 천천히 마음을 열어가세요.',
        q5_timing: '진짜 사랑은 예상보다 조금 더 시간이 걸릴 수 있어요. 하지만 기다릴 가치가 있습니다.',
        q6_sincerity: '상대방의 마음은 진심이지만 표현이 서툴 수 있습니다. 말보다는 행동을 보세요.'
      }
    }
  }
  /* 카드 3번부터 77번까지 동일한 구조로 추가 */
};

/* ════════════════════════════════════════
   이미지 경로 매핑
════════════════════════════════════════ */
const CARD_IMG_MAP = {
  0: '0.png', 1: 'I.png', 2: 'II.png'
  /* 3: 'III.png', 4: 'IV.png', ... */
};

function getCardImg(id) {
  const file = CARD_IMG_MAP[id];
  return file
    ? `assets/images/cards/${file}`
    : `assets/images/cards/0.png`; /* fallback */
}

/* ════════════════════════════════════════
   Fisher-Yates 셔플 → 3장 뽑기
════════════════════════════════════════ */
function drawThree() {
  const ids = Object.keys(CARDS).map(Number);
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  return ids.slice(0, 3);
}

/* ════════════════════════════════════════
   카드 DOM 생성
════════════════════════════════════════ */
const ORDINALS = ['첫 번째', '두 번째', '세 번째'];

function buildCardEl(cardId, index, onPick) {
  const data = CARDS[cardId];
  const el   = document.createElement('div');
  el.className = 'tarot-card';
  el.dataset.card = cardId;
  el.setAttribute('role', 'button');
  el.setAttribute('tabindex', '0');
  el.setAttribute('aria-label', `${ORDINALS[index]} 카드 선택`);
  el.setAttribute('data-aos', 'fade-up');
  el.setAttribute('data-aos-delay', String(index * 120));
  el.innerHTML = `
    <div class="tarot-card__inner">
      <div class="tarot-card__back">
        <div class="tarot-card__back-symbol" aria-hidden="true">✦</div>
        <p class="tarot-card__back-text">클릭하여 선택</p>
      </div>
      <div class="tarot-card__face">
        <div class="tarot-card__img">
          <img src="${getCardImg(cardId)}" alt="${data.name_kr} 타로 카드" loading="lazy" width="240" height="360">
        </div>
      </div>
    </div>`;
  el.addEventListener('click',   () => onPick(el));
  el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPick(el); } });
  return el;
}

/* ════════════════════════════════════════
   게이지 애니메이션
════════════════════════════════════════ */
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

/* ════════════════════════════════════════
   결과 렌더링
════════════════════════════════════════ */
function renderResult(data, questionKey, questionIntro) {
  const answer = data.love.answers[questionKey] || data.love.answers['q1_feeling'];

  document.getElementById('result-img').src = getCardImg(
    parseInt(document.querySelector('.tarot-card.is-flipped').dataset.card, 10)
  );
  document.getElementById('result-img').alt       = `${data.name_kr} 타로 카드`;
  document.getElementById('result-arcana').textContent = data.arcana;
  document.getElementById('result-name').textContent   = `${data.name_kr} · ${data.name_en}`;

  document.getElementById('result-tags').innerHTML = data.tags
    .map(t => `<span class="tag-chip" role="listitem">${t}</span>`).join('');

  document.getElementById('reading-intro-text').textContent  = questionIntro;
  document.getElementById('reading-core-text').textContent   = `현재 뽑으신 '${data.name_kr}' 카드는 ${data.love.core}`;
  document.getElementById('reading-answer-text').textContent = answer;

  const dot = document.getElementById('lucky-color-dot');
  dot.style.backgroundColor = data.lucky_color_hex;
  dot.style.boxShadow       = `0 0 8px ${data.lucky_color_hex}`;
  document.getElementById('lucky-color-name').textContent = data.lucky_color;
  document.getElementById('lucky-item-text').textContent  = data.lucky_item;

  const section = document.getElementById('result-section');
  section.classList.add('is-visible');
  setTimeout(() => animateGauge(data.score), 300);
  setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
}

/* ════════════════════════════════════════
   페이지 초기화 (각 페이지에서 호출)
════════════════════════════════════════ */
function initTarotPage(questionIntro, questionKey) {
  let picked = false;

  function initCards() {
    const container = document.getElementById('card-container');
    container.innerHTML = '';
    picked = false;

    drawThree().forEach((id, i) => {
      container.appendChild(buildCardEl(id, i, pickCard));
    });

    if (typeof AOS !== 'undefined') AOS.refreshHard();
  }

  function pickCard(cardEl) {
    if (picked) return;
    picked = true;

    const data = CARDS[parseInt(cardEl.dataset.card, 10)];
    cardEl.classList.add('is-flipped');
    cardEl.setAttribute('aria-pressed', 'true');
    document.querySelectorAll('.tarot-card').forEach(c => {
      if (c !== cardEl) c.classList.add('is-dimmed');
    });

    setTimeout(() => renderResult(data, questionKey, questionIntro), 800);
  }

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
