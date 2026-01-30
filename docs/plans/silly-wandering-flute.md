# План: Адаптация дашборда на один экран (без прокрутки)

## Цель
Переработать дашборд так, чтобы все 6 карточек (сетка 3x2) помещались на один экран без прокрутки, с адаптивным масштабированием под разные размеры экрана.

## Текущие проблемы
1. Grid-контейнер без ограничения высоты (`h-screen`)
2. Нет фиксированных строк (`grid-rows-2`)
3. Большие отступы: `px-12`, `pt-10`, `p-5` в карточках
4. Изображения слайдера с фиксированными размерами (1527x907)
5. Таблицы и графики без ограничения высоты

---

## Изменения по файлам

### 1. `src/app/dashboard/dashboard.component.html`
**Главный layout - критично**

```html
<!-- Было -->
<div class="grid grid-cols-3 px-12 pt-10 gap-4">

<!-- Станет -->
<div class="grid grid-cols-3 grid-rows-2 h-full px-4 py-2 3xl:px-6 3xl:py-4 gap-2 3xl:gap-3">
```

Для каждой карточки добавить `class="min-h-0 overflow-hidden"`:
```html
<app-card-wrapper class="min-h-0 overflow-hidden">
```

Таблица погоды - уменьшить padding:
```html
<td class="py-1 3xl:py-2">  <!-- было py-6 -->
```

---

### 2. `src/app/shared/component/card-wrapper/card-wrapper.component.html`
**Базовый компонент карточки**

```html
<!-- Было -->
<div class="flex flex-col h-full w-full space-y-2 p-5 rounded-md shadow-lg shadow-cyan-500 bg-slate-800/90">

<!-- Станет -->
<div class="flex flex-col h-full w-full min-h-0 space-y-1 3xl:space-y-2 p-2 3xl:p-3 rounded-md shadow-lg shadow-cyan-500 bg-slate-800/90 overflow-hidden">
```

---

### 3. `src/app/shared/component/card-header/card-header.component.html`
**Уменьшение заголовков**

```html
<!-- Было -->
<p class="mr-2 text-2xl 3xl:text-3xl ...">
<div class="flex flex-col w-full h-full space-y-4">

<!-- Станет -->
<p class="mr-2 text-lg 3xl:text-2xl ...">
<div class="flex flex-col w-full h-full space-y-1 3xl:space-y-2">
```

---

### 4. `src/app/dashboard/dashboard-current-chart/dashboard-current-chart.component.html`
**График водных ресурсов**

```html
<!-- Было -->
<div class="flex flex-col h-full w-full justify-between">
  <div class="grid grid-cols-4 justify-stretch gap-2 text-xs">
    <button class="text-base px-4 py-2" ...>
  ...
  <a routerLink="/recourses" class="flex flex-1">

<!-- Станет -->
<div class="flex flex-col h-full w-full min-h-0 overflow-hidden">
  <div class="grid grid-cols-4 justify-stretch gap-1 3xl:gap-2 flex-shrink-0">
    <button class="text-xs 3xl:text-sm px-2 py-1 3xl:px-3 3xl:py-1.5" ...>
  ...
  <a routerLink="/recourses" class="flex flex-1 min-h-0 overflow-hidden">
```

---

### 5. `src/app/dashboard/dashboard-snow-char/dashboard-snow-char.component.html`
**График MODSNOW**

```html
<!-- Было -->
<a routerLink="/snow" class="flex flex-1">

<!-- Станет -->
<a routerLink="/snow" class="flex flex-1 min-h-0 h-full overflow-hidden">
```

---

### 6. `src/app/dashboard/dashboard-snow-table/dashboard-snow-table.component.html`
**Таблица MODSNOW - обертка с overflow**

```html
<!-- Было -->
<table *ngIf="data.length !== 0; else loader">

<!-- Станет -->
<div class="h-full overflow-auto" *ngIf="data.length !== 0; else loader">
  <table>
    ...
  </table>
</div>
```

---

### 7. `src/app/dashboard/dashboard-snow-slider/dashboard-snow-slider.component.html`
**Слайдер изображений - критично**

```html
<!-- Было -->
<p-carousel [value]="urls" [numVisible]="2" [numScroll]="2" ...>
  <img [ngSrc]="url.url" width="1527" height="907" ...>

<!-- Станет -->
<div class="h-full overflow-hidden" *ngIf="images$ | async as urls; else loader">
  <p-carousel [value]="urls" [numVisible]="1" [numScroll]="1" [circular]="true"
              styleClass="h-full" *ngIf="urls.length > 0; else noImages">
    <ng-template let-url pTemplate="item">
      <div class="flex flex-col h-full justify-center mx-1 space-y-1">
        <h2 class="text-base 3xl:text-xl font-medium text-center flex-shrink-0">{{ url.name }}</h2>
        <div class="flex-1 min-h-0 flex items-center justify-center overflow-hidden">
          <img [src]="url.url" [alt]="url.name" class="max-w-full max-h-full object-contain">
        </div>
      </div>
    </ng-template>
  </p-carousel>
</div>
```

---

### 8. `src/app/dashboard/dashboard-snow-slider/dashboard-snow-slider.component.css`
**Стили для PrimeNG Carousel**

```css
:host {
  display: flex;
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

:host ::ng-deep .p-carousel,
:host ::ng-deep .p-carousel-content,
:host ::ng-deep .p-carousel-container,
:host ::ng-deep .p-carousel-items-container {
  height: 100%;
}
```

---

### 9. `src/app/reservoir/reservoir-decade/decade-many-years-income-table/decade-many-years-income-table.component.html`
**Таблица многолетних данных - обертка**

```html
<!-- Было -->
<table *ngIf="data.length !== 0; else loader">

<!-- Станет -->
<div class="h-full overflow-auto" *ngIf="data.length !== 0; else loader">
  <table>
    ...
  </table>
</div>
```

---

## Файлы для изменения (по приоритету)

| # | Файл | Критичность |
|---|------|-------------|
| 1 | `dashboard.component.html` | Критично |
| 2 | `card-wrapper.component.html` | Критично |
| 3 | `dashboard-snow-slider.component.html` | Критично |
| 4 | `dashboard-snow-slider.component.css` | Критично |
| 5 | `dashboard-current-chart.component.html` | Высокая |
| 6 | `dashboard-snow-char.component.html` | Высокая |
| 7 | `dashboard-snow-table.component.html` | Высокая |
| 8 | `card-header.component.html` | Средняя |
| 9 | `decade-many-years-income-table.component.html` | Средняя |

---

## Ключевые принципы решения

1. **`h-full` + `grid-rows-2`** - фиксация высоты экрана и двух равных строк
2. **`min-h-0`** - позволяет flex/grid элементам сжиматься ниже их контента
3. **`overflow-hidden/auto`** - предотвращает выход контента за границы
4. **Адаптивные классы `3xl:`** - более крупные размеры для экранов 1920px+

---

## Верификация

1. Запустить `ng serve`
2. Открыть http://localhost:4200 (или актуальный URL дашборда)
3. Проверить на разных разрешениях:
   - 1920x1080 (основное)
   - 1366x768 (минимальное)
   - 2560x1440 (большое)
4. Убедиться что:
   - Нет вертикальной прокрутки страницы
   - Все карточки видны полностью
   - Графики масштабируются корректно
   - Таблицы имеют внутреннюю прокрутку при необходимости
   - Изображения в слайдере масштабируются пропорционально
