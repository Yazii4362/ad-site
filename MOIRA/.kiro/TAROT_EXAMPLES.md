# Tarot System - Usage Examples

## Love Fortune Pages

### Example 1: Feeling Question
```html
<script src="../assets/js/tarot-cards.js"></script>
<script src="../assets/js/tarot-renderer.js"></script>
<script src="../assets/js/tarot-controller.js"></script>
<script src="../assets/js/tarot-page.js"></script>
<script>
  AOS.init({ duration: 800, once: true, offset: 80 });
  initTarotPage(
    '그 사람의 마음에 대해 카드를 펼쳐보았습니다.',
    'q1_feeling',
    'love'
  );
</script>
```

### Example 2: Reunion Question
```javascript
initTarotPage(
  '재회 가능성에 대해 카드를 펼쳐보았습니다.',
  'q2_reunion',
  'love'
);
```

### Example 3: Decision Question
```javascript
initTarotPage(
  '관계 결정에 대해 카드를 펼쳐보았습니다.',
  'q3_decision',
  'love'
);
```

## Money Fortune Pages

### Example 1: Financial Flow
```javascript
initTarotPage(
  '현재의 금전 흐름에 대해 카드를 펼쳐보았습니다.',
  'q1_flow',
  'money'
);
```

### Example 2: Investment Timing
```javascript
initTarotPage(
  '투자 타이밍에 대해 카드를 펼쳐보았습니다.',
  'q2_investment',
  'money'
);
```

### Example 3: Business Prospects
```javascript
initTarotPage(
  '사업 전망에 대해 카드를 펼쳐보았습니다.',
  'q3_business',
  'money'
);
```

## Career Fortune Pages

### Example 1: Job Change
```javascript
initTarotPage(
  '이직 가능성에 대해 카드를 펼쳐보았습니다.',
  'q1_turnover',
  'career'
);
```

### Example 2: Interview/Exam
```javascript
initTarotPage(
  '합격 가능성에 대해 카드를 펼쳐보았습니다.',
  'q2_pass',
  'career'
);
```

### Example 3: Workplace Conflict
```javascript
initTarotPage(
  '직장 갈등 해결에 대해 카드를 펼쳐보았습니다.',
  'q3_conflict',
  'career'
);
```

### Example 4: Promotion
```javascript
initTarotPage(
  '승진 가능성에 대해 카드를 펼쳐보았습니다.',
  'q4_promotion',
  'career'
);
```

### Example 5: Job Endurance
```javascript
initTarotPage(
  '현재 직장 지속 여부에 대해 카드를 펼쳐보았습니다.',
  'q5_endurance',
  'career'
);
```

### Example 6: Aptitude (Already Implemented)
```javascript
initTarotPage(
  '질문자님의 적성과 진로에 대해 카드를 펼쳐보았습니다.',
  'q6_aptitude',
  'career'
);
```

## Available Question Keys

### Love Category
- `q1_feeling`: How does the person feel about you?
- `q2_reunion`: Is reunion possible?
- `q3_decision`: Should you continue the relationship?
- `q4_some`: Will the relationship develop?
- `q5_timing`: When will you meet someone?
- `q6_sincerity`: Is the person sincere?

### Money Category
- `q1_flow`: How is your financial flow?
- `q2_investment`: Is it a good time to invest?
- `q3_business`: Should you start a business?
- `q4_debt`: Will you get your money back?
- `q5_windfall`: Will you get unexpected money?
- `q6_spending`: Is this spending worthwhile?

### Career Category
- `q1_turnover`: Should you change jobs?
- `q2_pass`: Will you pass the interview/exam?
- `q3_conflict`: How will workplace conflict resolve?
- `q4_promotion`: Will you get promoted?
- `q5_endurance`: Should you stay at your job?
- `q6_aptitude`: Is your desired job suitable for you?

## HTML Structure Required

Each page needs this container:

```html
<div class="card-select-grid" id="card-container" role="group" aria-label="타로 카드 선택"></div>
```

And this result section:

```html
<div id="result-section" class="result-section" aria-live="polite" aria-atomic="true">
  <!-- Result content with these IDs:
    - result-img
    - result-arcana
    - result-name
    - result-tags
    - gauge-fill
    - gauge-value
    - gauge-label__text
    - reading-intro-text
    - reading-core-text
    - reading-answer-text
    - lucky-color-dot
    - lucky-color-name
    - lucky-item-text
    - retry-btn
  -->
</div>
```

## How It Works

1. **Load Scripts**: All four tarot scripts are loaded in order
2. **Initialize**: `initTarotPage()` is called with parameters
3. **Draw Cards**: 3 random cards are drawn using Fisher-Yates shuffle
4. **Render**: Cards are dynamically rendered to the container
5. **User Interaction**: User clicks a card
6. **Display Result**: Card flips and result is displayed with animation
7. **Retry**: User can click retry button to draw new cards

## Customization

To customize card data, edit `assets/js/tarot-cards.js`.

To customize rendering, edit `assets/js/tarot-renderer.js`.

To customize event handling, edit `assets/js/tarot-controller.js`.

To customize result display, edit `assets/js/tarot-page.js`.
