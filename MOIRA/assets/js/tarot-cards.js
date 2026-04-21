/**
 * MOIRA — tarot-cards.js
 * 78장의 타로 카드 데이터 정의
 * Major Arcana (22) + Minor Arcana (56)
 */

'use strict';

const TAROT_CARDS = (() => {
  // Major Arcana (22 cards)
  const majorArcana = [
    {
      id: 0, name_kr: '바보', name_en: 'The Fool', arcana: 'Major Arcana · 0',
      tags: ['#새로운시작', '#자유로움', '#직감', '#예측불가'],
      lucky_color: 'Yellow', lucky_color_hex: '#FDE68A',
      lucky_item: '가벼운 스니커즈, 즉흥적인 산책',
      score: { love: 70, money: 40, career: 85 },
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
      },
      money: {
        core: '재물에 대한 집착을 버리고 마음을 비울 때 오히려 기회가 찾아옵니다.',
        answers: {
          q1_flow: '계획 없는 지출이 발생할 수 있습니다. 꼼꼼한 예산 관리가 필요한 시점입니다.',
          q2_investment: '정보가 부족한 상태에서의 무모한 투자는 위험합니다. 잠시 관망하세요.',
          q3_business: '사업 시작보다는 아이디어를 구체화하고 준비하는 단계가 적합합니다.',
          q4_debt: '돌려받기 어려울 수 있어요. 기대를 내려놓고 새로운 수입원을 찾는 것이 현명합니다.',
          q5_windfall: '예상치 못한 작은 행운은 있을 수 있지만, 큰 횡재를 기대하기는 어렵습니다.',
          q6_spending: '지금의 소비가 미래에 직접적인 도움이 되기보다는 경험과 배움으로 남을 가능성이 높습니다.'
        }
      },
      career: {
        core: '기존의 틀을 깨고 새로운 분야로 뛰어들 수 있는 도전적인 에너지가 넘칩니다.',
        answers: {
          q1_turnover: '이직이나 퇴사를 고민 중이라면, 두려워하지 말고 새로운 챕터를 시작할 타이밍입니다.',
          q2_pass: '백지상태에서 흡수하는 능력이 좋습니다. 기존 방식에서 벗어나 새롭게 접근해 보세요.',
          q3_conflict: '그 사람과의 갈등은 일시적입니다. 너무 심각하게 받아들이지 말고 가볍게 넘기세요.',
          q4_promotion: '승진보다는 새로운 기회나 프로젝트에서 두각을 나타낼 가능성이 높습니다.',
          q5_endurance: '버티기보다는 새로운 환경을 탐색하는 것이 장기적으로 더 유리할 수 있습니다.',
          q6_aptitude: '당신이 하고 싶은 일은 충분히 가능성이 있습니다. 두려움 없이 도전해보세요.'
        }
      }
    },
    {
      id: 1, name_kr: '마법사', name_en: 'The Magician', arcana: 'Major Arcana · I',
      tags: ['#의지', '#창조력', '#실현', '#능력'],
      lucky_color: 'Red', lucky_color_hex: '#F87171',
      lucky_item: '펜, 노트북, 창작 도구',
      score: { love: 85, money: 90, career: 95 },
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
      },
      money: {
        core: '당신의 능력과 노력이 재물로 직결되는 시기입니다. 적극적으로 움직이세요.',
        answers: {
          q1_flow: '재정 상황이 크게 개선될 조짐이 보입니다. 당신의 노력이 결실을 맺을 때입니다.',
          q2_investment: '투자 타이밍이 좋습니다. 충분한 정보를 바탕으로 결정한다면 좋은 결과를 얻을 수 있어요.',
          q3_business: '사업이나 부업을 시작하기에 최적의 시기입니다. 당신의 능력을 믿고 도전하세요.',
          q4_debt: '적극적으로 요구한다면 돌려받을 가능성이 높습니다. 주저하지 마세요.',
          q5_windfall: '횡재운보다는 당신의 실력으로 얻는 수입이 증가할 것입니다.',
          q6_spending: '지금의 소비는 미래를 위한 투자입니다. 자기계발이나 능력 향상에 쓴 돈은 반드시 돌아옵니다.'
        }
      },
      career: {
        core: '당신의 능력을 최대한 발휘할 수 있는 절호의 기회가 찾아왔습니다.',
        answers: {
          q1_turnover: '이직은 성공적일 것입니다. 당신의 능력을 더 인정받을 수 있는 곳으로 옮기세요.',
          q2_pass: '합격 가능성이 매우 높습니다. 자신감을 가지고 임하세요.',
          q3_conflict: '당신이 주도권을 잡고 상황을 컨트롤할 수 있습니다. 당당하게 대처하세요.',
          q4_promotion: '승진이나 좋은 평가를 받을 가능성이 높습니다. 당신의 능력이 인정받을 때입니다.',
          q5_endurance: '지금 회사에서 당신의 가치를 증명할 기회가 있습니다. 조금만 더 버티면 좋은 결과가 있을 것입니다.',
          q6_aptitude: '당신이 하고 싶은 일은 충분히 직업으로 성립 가능합니다. 능력과 의지가 있으니 도전하세요.'
        }
      }
    },
    {
      id: 2, name_kr: '여사제', name_en: 'The High Priestess', arcana: 'Major Arcana · II',
      tags: ['#직관', '#신비', '#내면', '#지혜'],
      lucky_color: 'Silver', lucky_color_hex: '#CBD5E1',
      lucky_item: '달 모양 액세서리, 명상 음악',
      score: { love: 75, money: 60, career: 70 },
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
      },
      money: {
        core: '겉으로 드러나지 않는 기회를 발견할 수 있는 통찰력이 필요한 시기입니다.',
        answers: {
          q1_flow: '재정 상황은 안정적이지만 극적인 변화는 없을 것입니다. 꾸준한 관리가 중요합니다.',
          q2_investment: '표면적인 정보만으로 판단하지 마세요. 숨겨진 리스크를 꼼꼼히 살펴보세요.',
          q3_business: '사업 시작 전에 충분한 시장 조사와 내부 준비가 필요합니다. 서두르지 마세요.',
          q4_debt: '직접적으로 요구하기보다는 우회적인 방법이나 제3자의 도움을 받는 것이 효과적일 수 있습니다.',
          q5_windfall: '횡재운은 낮지만, 예상치 못한 곳에서 작은 수입이 생길 수 있습니다.',
          q6_spending: '지금의 소비가 당장 눈에 보이는 결과를 가져오지는 않지만, 장기적으로는 도움이 될 것입니다.'
        }
      },
      career: {
        core: '직관과 내면의 지혜를 활용하면 올바른 길을 찾을 수 있습니다.',
        answers: {
          q1_turnover: '이직 결정은 신중하게 하세요. 겉으로 보이는 조건보다 회사의 문화와 분위기를 중요하게 고려하세요.',
          q2_pass: '합격 여부는 당신의 실력보다 타이밍과 운에 달려 있을 수 있습니다. 최선을 다하되 결과에 집착하지 마세요.',
          q3_conflict: '그 사람의 진짜 의도를 파악하는 것이 중요합니다. 표면적인 말보다 행동을 관찰하세요.',
          q4_promotion: '승진은 가능하지만 예상보다 시간이 걸릴 수 있습니다. 조급해하지 마세요.',
          q5_endurance: '지금 회사에 남을지 말지는 당신의 직관을 믿고 결정하세요. 답은 이미 당신 안에 있습니다.',
          q6_aptitude: '당신이 하고 싶은 일은 가능하지만, 충분한 준비와 학습이 필요합니다. 서두르지 마세요.'
        }
      }
    }
  ];

  // Generate remaining Major Arcana (3-21)
  const majorArcanaNames = [
    { id: 3, name_kr: '여황제', name_en: 'The Empress' },
    { id: 4, name_kr: '황제', name_en: 'The Emperor' },
    { id: 5, name_kr: '교황', name_en: 'The Hierophant' },
    { id: 6, name_kr: '연인', name_en: 'The Lovers' },
    { id: 7, name_kr: '전차', name_en: 'The Chariot' },
    { id: 8, name_kr: '힘', name_en: 'Strength' },
    { id: 9, name_kr: '은둔자', name_en: 'The Hermit' },
    { id: 10, name_kr: '운명의 수레바퀴', name_en: 'Wheel of Fortune' },
    { id: 11, name_kr: '정의', name_en: 'Justice' },
    { id: 12, name_kr: '매달린 남자', name_en: 'The Hanged Man' },
    { id: 13, name_kr: '죽음', name_en: 'Death' },
    { id: 14, name_kr: '절제', name_en: 'Temperance' },
    { id: 15, name_kr: '악마', name_en: 'The Devil' },
    { id: 16, name_kr: '탑', name_en: 'The Tower' },
    { id: 17, name_kr: '별', name_en: 'The Star' },
    { id: 18, name_kr: '달', name_en: 'The Moon' },
    { id: 19, name_kr: '태양', name_en: 'The Sun' },
    { id: 20, name_kr: '심판', name_en: 'Judgement' },
    { id: 21, name_kr: '세계', name_en: 'The World' }
  ];

  majorArcanaNames.forEach(card => {
    majorArcana.push({
      id: card.id,
      name_kr: card.name_kr,
      name_en: card.name_en,
      arcana: `Major Arcana · ${card.id}`,
      tags: ['#변화', '#성장', '#깨달음', '#운명'],
      lucky_color: 'Purple',
      lucky_color_hex: '#D8B4FE',
      lucky_item: '명상, 자기 성찰',
      score: { love: 70, money: 65, career: 75 },
      love: {
        core: '이 카드는 당신의 감정 여정에 중요한 메시지를 담고 있습니다.',
        answers: {
          q1_feeling: '상대방의 감정은 복잡하지만 진심입니다.',
          q2_reunion: '재회는 가능하지만 과거와는 다른 형태일 것입니다.',
          q3_decision: '당신의 직관을 따르세요. 답은 이미 당신 안에 있습니다.',
          q4_some: '관계는 천천히 발전할 것입니다. 서두르지 마세요.',
          q5_timing: '좋은 타이밍이 올 것입니다. 준비하고 기다리세요.',
          q6_sincerity: '상대방의 진심을 의심하지 마세요.'
        }
      },
      money: {
        core: '재정 상황에 변화가 찾아올 것입니다.',
        answers: {
          q1_flow: '현재의 흐름을 관찰하고 기회를 포착하세요.',
          q2_investment: '신중한 판단이 필요합니다.',
          q3_business: '새로운 시작을 고려해볼 만합니다.',
          q4_debt: '상황이 개선될 가능성이 있습니다.',
          q5_windfall: '예상치 못한 기회가 올 수 있습니다.',
          q6_spending: '지금의 선택이 미래에 영향을 미칠 것입니다.'
        }
      },
      career: {
        core: '직업 운에 중요한 변화가 예상됩니다.',
        answers: {
          q1_turnover: '이직을 고려한다면 신중하게 결정하세요.',
          q2_pass: '당신의 노력이 인정받을 것입니다.',
          q3_conflict: '상황은 시간이 지나면서 해결될 것입니다.',
          q4_promotion: '기회가 올 때를 대비하세요.',
          q5_endurance: '현재의 상황을 견디는 것이 중요합니다.',
          q6_aptitude: '당신의 적성은 충분히 가치 있습니다.'
        }
      }
    });
  });

  // Minor Arcana (56 cards)
  const suits = ['cups', 'swords', 'wands', 'pentacles'];
  const suitNames = { cups: '컵', swords: '검', wands: '지팡이', pentacles: '동전' };
  const minorArcana = [];
  let cardId = 22;

  suits.forEach(suit => {
    for (let number = 1; number <= 14; number++) {
      const numberNames = {
        1: 'Ace', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five', 6: 'Six',
        7: 'Seven', 8: 'Eight', 9: 'Nine', 10: 'Ten',
        11: 'Page', 12: 'Knight', 13: 'Queen', 14: 'King'
      };

      minorArcana.push({
        id: cardId,
        name_kr: `${suitNames[suit]} ${number}`,
        name_en: `${numberNames[number]} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
        arcana: `Minor Arcana · ${suit}`,
        suit: suit,
        number: number,
        tags: ['#변화', '#성장', '#일상', '#경험'],
        lucky_color: 'Blue',
        lucky_color_hex: '#93C5FD',
        lucky_item: '일상의 작은 행운',
        score: { love: 65, money: 60, career: 70 },
        love: {
          core: '일상 속의 감정 변화를 나타내는 카드입니다.',
          answers: {
            q1_feeling: '상대방의 감정은 변화하고 있습니다.',
            q2_reunion: '재회는 가능하지만 새로운 시작이 될 것입니다.',
            q3_decision: '당신의 마음을 따르세요.',
            q4_some: '관계가 천천히 발전하고 있습니다.',
            q5_timing: '좋은 시간이 올 것입니다.',
            q6_sincerity: '상대방은 진심입니다.'
          }
        },
        money: {
          core: '재정에 작은 변화가 있을 것입니다.',
          answers: {
            q1_flow: '현재의 흐름을 유지하세요.',
            q2_investment: '신중하게 판단하세요.',
            q3_business: '준비가 필요합니다.',
            q4_debt: '상황이 개선될 것입니다.',
            q5_windfall: '작은 행운이 있을 수 있습니다.',
            q6_spending: '현명한 선택을 하세요.'
          }
        },
        career: {
          core: '직업 운에 작은 변화가 있을 것입니다.',
          answers: {
            q1_turnover: '신중하게 결정하세요.',
            q2_pass: '당신의 노력이 인정받을 것입니다.',
            q3_conflict: '상황은 해결될 것입니다.',
            q4_promotion: '기회를 놓치지 마세요.',
            q5_endurance: '조금만 더 버티세요.',
            q6_aptitude: '당신의 적성은 충분합니다.'
          }
        }
      });
      cardId++;
    }
  });

  return [...majorArcana, ...minorArcana];
})();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TAROT_CARDS };
}
