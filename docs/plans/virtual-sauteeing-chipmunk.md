# План исправления лейаута страниц reservoir

## Проблема
Страницы `/water/current`, `/water/year`, `/water/analytics` не занимают весь экран.

## Причина
Разрыв в цепочке передачи высоты:

```
video-wrapper (h-screen)
  → main-layout div (flex-1)
    → router-outlet + * ← НЕТ height: 100%! (main-layout.component.css ПУСТОЙ)
      → reservoir :host (height: 100%)
        → дочерние компоненты
```

## Изменения

### 1. main-layout.component.css (КРИТИЧНО)
**Путь:** `src/app/shared/component/main-layout/main-layout.component.css`

```css
router-outlet + * {
  display: block;
  height: 100%;
  width: 100%;
}
```

### 2. card-wrapper.component.html
**Путь:** `src/app/shared/component/card-wrapper/card-wrapper.component.html`

**Было:**
```html
<div class="flex flex-col h-full w-full min-h-0 ...">
  <ng-content select="[slot=header]"></ng-content>
  <ng-content select="[slot=body]"></ng-content>
</div>
```

**Стало:**
```html
<div class="flex flex-col h-full w-full min-h-0 ...">
  <ng-content select="[slot=header]"></ng-content>
  <div class="flex-1 min-h-0 flex flex-col">
    <ng-content select="[slot=body]"></ng-content>
  </div>
</div>
```

### 3. Добавить :host стили в компоненты

**Файлы:**
- `src/app/reservoir/reservoir-month/reservoir-month.component.css`
- `src/app/reservoir/reservoir-decade/reservoir-decade.component.css`
- `src/app/reservoir/reservoir-lv/reservoir-lv.component.css`

**Содержимое:**
```css
:host {
  display: block;
  height: 100%;
  width: 100%;
}
```

## Порядок выполнения
1. main-layout.component.css
2. card-wrapper.component.html
3. reservoir-month/decade/lv .component.css

## Проверка
После изменений проверить:
- `/water/current` - должна занимать весь экран
- `/water/year` - должна занимать весь экран
- `/water/analytics` - должна занимать весь экран
- `/dashboard` - убедиться что не сломан (использует card-wrapper)
