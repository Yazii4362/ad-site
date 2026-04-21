# Tarot System - Quick Reference

## 🚀 Quick Start

### 1. Add Scripts to HTML
```html
<script src="../assets/js/tarot-cards.js"></script>
<script src="../assets/js/tarot-renderer.js"></script>
<script src="../assets/js/tarot-controller.js"></script>
<script src="../assets/js/tarot-page.js"></script>
```

### 2. Initialize
```javascript
initTarotPage('Intro text', 'questionKey', 'category');
```

### 3. Done!
Cards render dynamically, no HTML changes needed.

---

## 📋 Question Keys

### Love (q1-q6)
```
q1_feeling    → How does the person feel?
q2_reunion    → Is reunion possible?
q3_decision   → Continue the relationship?
q4_some       → Will it develop?
q5_timing     → When will you meet?
q6_sincerity  → Are they sincere?
```

### Money (q1-q6)
```
q1_flow       → Financial flow?
q2_investment → Good time to invest?
q3_business   → Start a business?
q4_debt       → Get money back?
q5_windfall   → Unexpected money?
q6_spending   → Worth spending?
```

### Career (q1-q6)
```
q1_turnover   → Change jobs?
q2_pass       → Pass interview?
q3_conflict   → Resolve conflict?
q4_promotion  → Get promoted?
q5_endurance  → Stay at job?
q6_aptitude   → Suitable job?
```

---

## 🎯 Categories

```javascript
'love'    // Love & relationships
'money'   // Finance & investments
'career'  // Work & career
```

---

## 📝 Example Usage

### Love Page
```javascript
initTarotPage(
  '그 사람의 마음에 대해 카드를 펼쳐보았습니다.',
  'q1_feeling',
  'love'
);
```

### Money Page
```javascript
initTarotPage(
  '현재의 금전 흐름에 대해 카드를 펼쳐보았습니다.',
  'q1_flow',
  'money'
);
```

### Career Page
```javascript
initTarotPage(
  '이직 가능성에 대해 카드를 펼쳐보았습니다.',
  'q1_turnover',
  'career'
);
```

---

## 🔧 Customization

### Change Card Data
Edit `assets/js/tarot-cards.js`

### Change Rendering
Edit `assets/js/tarot-renderer.js`

### Change Events
Edit `assets/js/tarot-controller.js`

### Change Results
Edit `assets/js/tarot-page.js`

---

## 📊 Card Structure

```javascript
{
  id: 0,
  name_kr: '바보',
  name_en: 'The Fool',
  arcana: 'Major Arcana · 0',
  tags: ['#새로운시작', '#자유로움'],
  lucky_color: 'Yellow',
  lucky_color_hex: '#FDE68A',
  lucky_item: '가벼운 스니커즈',
  score: { love: 70, money: 40, career: 85 },
  love: {
    core: '...',
    answers: { q1_feeling: '...', ... }
  },
  money: { ... },
  career: { ... }
}
```

---

## 🎨 Image Paths

### Major Arcana
```
/assets/images/cards/0.png
/assets/images/cards/1.png
...
/assets/images/cards/21.png
```

### Minor Arcana
```
/assets/images/cards/cups/1.png
/assets/images/cards/swords/10.png
/assets/images/cards/wands/14.png
/assets/images/cards/pentacles/7.png
```

---

## 🎯 Key Functions

### tarot-cards.js
```javascript
TAROT_CARDS  // Array of 78 cards
```

### tarot-renderer.js
```javascript
renderTarotCards(containerId, cards)
getCardImagePath(cardId)
```

### tarot-controller.js
```javascript
initTarotController(containerId, onCardPicked)
```

### tarot-page.js
```javascript
initTarotPage(questionIntro, questionKey, category)
drawThreeCards()
renderResult(data, category, questionKey, intro)
animateGauge(score)
```

---

## ✅ Checklist for New Page

- [ ] Add 4 script tags
- [ ] Call `initTarotPage()` with correct parameters
- [ ] Verify `#card-container` exists
- [ ] Verify result section IDs exist
- [ ] Test card rendering
- [ ] Test card selection
- [ ] Test result display
- [ ] Test retry button

---

## 🐛 Troubleshooting

### Cards not rendering?
- Check script order
- Check container ID
- Check browser console

### Images not loading?
- Check image paths
- Check file names
- Check assets folder

### Events not working?
- Check container ID
- Check event listeners
- Check browser console

### Results not showing?
- Check result section IDs
- Check category name
- Check question key

---

## 📚 Documentation

- `TAROT_SYSTEM_GUIDE.md` - Full guide
- `TAROT_EXAMPLES.md` - Code examples
- `TAROT_ARCHITECTURE.md` - Architecture
- `IMPLEMENTATION_CHECKLIST.md` - Deployment
- `TAROT_SYSTEM_SUMMARY.md` - Overview
- `QUICK_REFERENCE.md` - This file

---

## 🎉 You're Ready!

Apply to all fortune pages and enjoy the new modular tarot system!
