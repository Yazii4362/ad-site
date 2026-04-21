# Tarot Card System - Implementation Guide

## Overview
The tarot card system has been refactored into a modular, scalable architecture with 78 dynamically rendered cards.

## File Structure

```
assets/js/
├── tarot-cards.js        # 78 card data (Major + Minor Arcana)
├── tarot-renderer.js     # Card rendering logic
├── tarot-controller.js   # Event handling & state management
└── tarot-page.js         # Page initialization & result display
```

## How to Use on Other Pages

### 1. Add Script Tags
Include all four scripts in your HTML file (in order):

```html
<script src="../assets/js/tarot-cards.js"></script>
<script src="../assets/js/tarot-renderer.js"></script>
<script src="../assets/js/tarot-controller.js"></script>
<script src="../assets/js/tarot-page.js"></script>
```

### 2. Initialize the Page
Call `initTarotPage()` with three parameters:

```javascript
initTarotPage(questionIntro, questionKey, category);
```

**Parameters:**
- `questionIntro` (string): Introduction text for the reading
- `questionKey` (string): Question key (e.g., 'q1_feeling', 'q2_reunion', 'q6_aptitude')
- `category` (string): 'love', 'money', or 'career'

**Example:**
```javascript
initTarotPage(
  '질문자님의 적성과 진로에 대해 카드를 펼쳐보았습니다.',
  'q6_aptitude',
  'career'
);
```

## Card Data Structure

Each card includes:
- `id`: Unique identifier (0-77)
- `name_kr`: Korean name
- `name_en`: English name
- `arcana`: Arcana type
- `suit`: Minor Arcana suit (cups, swords, wands, pentacles)
- `number`: Card number in suit
- `tags`: Array of hashtags
- `lucky_color`: Color name
- `lucky_color_hex`: Hex color code
- `lucky_item`: Lucky item description
- `score`: Object with love/money/career scores
- `love/money/career`: Category data with core message and answers

## Key Functions

### tarot-cards.js
- `TAROT_CARDS`: Array of all 78 cards

### tarot-renderer.js
- `renderTarotCards(containerId, cards)`: Render cards to container
- `getCardImagePath(cardId)`: Get image path for a card

### tarot-controller.js
- `initTarotController(containerId, onCardPicked)`: Initialize event handling

### tarot-page.js
- `initTarotPage(questionIntro, questionKey, category)`: Main initialization
- `drawThreeCards()`: Draw 3 random cards using Fisher-Yates shuffle
- `renderResult()`: Display reading result
- `animateGauge()`: Animate score gauge

## Features

✅ All 78 tarot cards dynamically rendered
✅ No hardcoded HTML card elements
✅ Modular, reusable architecture
✅ Event delegation for efficient handling
✅ Keyboard support (Enter/Space)
✅ Accessibility features (ARIA labels, roles)
✅ AOS animation integration
✅ Fisher-Yates shuffle algorithm
✅ Responsive design
✅ Production-ready code

## Image Path Convention

- Major Arcana: `/assets/images/cards/{id}.png` (0-21)
- Minor Arcana: `/assets/images/cards/{suit}/{number}.png`
  - Suits: cups, swords, wands, pentacles
  - Numbers: 1-14 (Ace through King)

## Extending the System

To add more card data or modify existing cards, edit `tarot-cards.js`. The system will automatically use the updated data across all pages.

To customize rendering, modify `tarot-renderer.js` or `tarot-controller.js` without affecting other modules.
