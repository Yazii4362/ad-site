# Tarot System Architecture

## Module Dependency Graph

```
HTML Page
    ↓
tarot-cards.js (TAROT_CARDS constant)
    ↓
tarot-renderer.js (renderTarotCards, getCardImagePath)
    ↓
tarot-controller.js (initTarotController)
    ↓
tarot-page.js (initTarotPage - main entry point)
```

## Module Responsibilities

### 1. tarot-cards.js
**Purpose**: Card data definition

**Exports**:
- `TAROT_CARDS`: Array of 78 card objects

**Structure**:
- Major Arcana: 22 cards (IDs 0-21)
- Minor Arcana: 56 cards (IDs 22-77)
  - 4 suits × 14 cards each
  - Suits: cups, swords, wands, pentacles

**Card Object**:
```javascript
{
  id: number,
  name_kr: string,
  name_en: string,
  arcana: string,
  suit?: string,
  number?: number,
  tags: string[],
  lucky_color: string,
  lucky_color_hex: string,
  lucky_item: string,
  score: { love: number, money: number, career: number },
  love: { core: string, answers: { [key]: string } },
  money: { core: string, answers: { [key]: string } },
  career: { core: string, answers: { [key]: string } }
}
```

### 2. tarot-renderer.js
**Purpose**: DOM rendering logic

**Exports**:
- `renderTarotCards(containerId, cards)`: Render cards to container
- `getCardImagePath(cardId)`: Get image path for card

**Responsibilities**:
- Create button elements for each card
- Set data attributes and ARIA labels
- Handle image lazy loading
- Integrate with AOS animations

**DOM Structure Created**:
```html
<button class="tarot-card" data-index="0" data-card-id="5">
  <div class="tarot-card__inner">
    <div class="tarot-card__back">
      <div class="tarot-card__back-symbol">✦</div>
      <p class="tarot-card__back-text">클릭하여 선택</p>
    </div>
    <div class="tarot-card__face">
      <div class="tarot-card__img">
        <img src="..." alt="..." loading="lazy">
      </div>
    </div>
  </div>
</button>
```

### 3. tarot-controller.js
**Purpose**: Event handling and state management

**Exports**:
- `initTarotController(containerId, onCardPicked)`: Initialize event listeners

**Responsibilities**:
- Event delegation for card clicks
- Keyboard support (Enter/Space)
- Accessibility features
- Call callback when card is picked

**Event Flow**:
```
User clicks card
    ↓
Event delegation catches click
    ↓
Extract card ID from data attribute
    ↓
Find card in TAROT_CARDS
    ↓
Call onCardPicked callback with card object
```

### 4. tarot-page.js
**Purpose**: Page initialization and result display

**Exports**:
- `initTarotPage(questionIntro, questionKey, category)`: Main entry point

**Responsibilities**:
- Initialize card rendering
- Initialize event controller
- Handle card selection
- Render results
- Manage retry functionality
- Animate gauge

**Flow**:
```
initTarotPage() called
    ↓
drawThreeCards() - Fisher-Yates shuffle
    ↓
renderTarotCards() - Display 3 cards
    ↓
initTarotController() - Setup event handling
    ↓
User clicks card
    ↓
handleCardPicked() callback
    ↓
renderResult() - Display reading
    ↓
animateGauge() - Animate score
```

## Data Flow

### Initialization
```
Page Load
  ↓
Script tags loaded (in order)
  ↓
initTarotPage(intro, key, category)
  ↓
drawThreeCards() → 3 random cards
  ↓
renderTarotCards(containerId, cards)
  ↓
initTarotController(containerId, callback)
  ↓
Ready for user interaction
```

### User Interaction
```
User clicks card
  ↓
Event delegation in controller
  ↓
Extract card ID
  ↓
Find card in TAROT_CARDS
  ↓
Call handleCardPicked(card, button)
  ↓
Add CSS classes (is-flipped, is-dimmed)
  ↓
renderResult(card, category, key, intro)
  ↓
Update DOM with card data
  ↓
animateGauge(score)
  ↓
Scroll to result
```

### Retry
```
User clicks retry button
  ↓
Clear result section
  ↓
Reset gauge
  ↓
drawThreeCards() → 3 new random cards
  ↓
renderTarotCards() → Re-render
  ↓
Ready for new selection
```

## Key Design Patterns

### 1. Separation of Concerns
- **Data**: tarot-cards.js
- **Rendering**: tarot-renderer.js
- **Events**: tarot-controller.js
- **Logic**: tarot-page.js

### 2. Event Delegation
- Single event listener on container
- Efficient for dynamic content
- Supports keyboard accessibility

### 3. Callback Pattern
- Controller calls callback on card pick
- Page handles the callback
- Loose coupling between modules

### 4. Fisher-Yates Shuffle
- Unbiased random selection
- O(n) time complexity
- Ensures no duplicates

### 5. Lazy Loading
- Images load only when needed
- Improves initial page load
- Better performance

## Scalability

### Adding New Cards
1. Edit `tarot-cards.js`
2. Add card object to `TAROT_CARDS` array
3. Automatically available on all pages

### Adding New Categories
1. Add category to card `score` object
2. Add category data (core, answers)
3. Update `renderResult()` if needed
4. Call `initTarotPage()` with new category

### Adding New Question Types
1. Add question key to card answers
2. Call `initTarotPage()` with new key
3. No code changes needed

### Customizing Rendering
1. Modify `tarot-renderer.js`
2. Changes apply to all pages
3. No need to update individual pages

## Performance Considerations

- **Lazy Loading**: Images load on demand
- **Event Delegation**: Single listener vs. 3 listeners
- **Fisher-Yates**: O(n) shuffle algorithm
- **RequestAnimationFrame**: Smooth gauge animation
- **AOS Integration**: Efficient scroll animations

## Accessibility Features

- ARIA labels on cards
- Keyboard support (Enter/Space)
- Role attributes
- Live regions for results
- Progress bar with aria-valuenow
- Semantic HTML structure

## Browser Compatibility

- Modern browsers (ES6+)
- No external dependencies required
- Works with vanilla JavaScript
- Compatible with AOS library
