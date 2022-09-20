# MediaBayPopup

Простой скрипт для создания всплывающих окон на сайте.
Преимущества:

1. Events (init, beforeopen, open, beforeclose, close, destroy, reload).
2. Methods (close, open, reload).
3. Popup.caller.
4. Transitions and Animations.
5. Open by hash with page onload (site.com/#notice-popup).
6. Cloe by ESC, click outside, close buttons and method.
7. Disable page scroll when popup is open.
8. Clear inputs when close popup.

## Быстрый старт
Для создания всплывающего окна требуется минимальная HTML-разметка, CSS-код и инициализация каждого окна в JavaScript.

Required HTML:
```html
<div class="popup">
  <div class="popup-content">
    <button type="button" class="popup-close">X</button>
  </div>
</div>
```
**Внимание!** Если используется `lazyload` с `IntersectionObserver` и внутри окна есть lazy-элементы, то нужно задать всплывающему окну inline css `style="display: none"`. Если этого не сделать, то lazy-элементы внутри окна будут загружены сразу при загрузке страницы. Скрипт это учитывает.
```html
<div class="popup" style="display:none">
  <div class="popup-content">
    <button type="button" class="popup-close">X</button>
    <img src="#" alt="image" data-src="image.jpg" class="lazy">
  </div>
</div>
```

Required CSS:
```css
body.no-scroll {
  overflow: hidden;
}

.popup {
  /* required */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  transition: opacity 0.5s, visibility 0.5s;
  opacity: 0;

  /* can change */
  z-index: 10;
  background-color: rgba(0,0,0,.7);
}

.popup-content {
  /* can change */
  max-width: 320px;
  width: 100%;
  transition: transform .5s, opacity .5s;
  opacity: 0;
  transform: translateY(-100%);
}

.popup.active {
  /* required */
  opacity: 1;
  visibility: visible;
}

.popup.active > .popup-content {
  /* can change */
  opacity: 1;
  transform: translateY(0);
}
```

```javascript
// Minimal init
const popup = new MediaBayPopup('.popup');

// Init with HTMLElement
const callbackPopup = document.getElementById('callback-popup');
const popup = new MediaBayPopup(callbackPopup);

// With close button
const popup = new MediaBayPopup('.popup', {
  closeButtons: '.popup-close'
});

// With close and open button
const popup = new MediaBayPopup('.popup', {
  openButtons: '.popup-open',
  closeButtons: '.popup-close'
});

// More open buttons
const popup = new MediaBayPopup('.popup', {
  openButtons: '.popup-open, .popup-open-2, #popup-open-3',
  closeButtons: '.popup-close'
});

// More close and open buttons
const popup = new MediaBayPopup('.popup', {
  openButtons: '.popup-open, .popup-open-2, #popup-open-3',
  closeButtons: '.popup-close, .popup-close-2'
});

// With HTMLElements and function
const openButton = document.querySelectorAll('#open-button'); // Only NodeList
const callbackPopup = document.getElementById('callback-popup');

const popup = new MediaBayPopup(callbackPopup, {
  openButtons: openButton,
  closeButtons: callbackPopup.querySelector('.close-popup')
});
```

## Настройки
Option | Type | Default | Description
------ | ---- | ------- | -----------
openButtons | Stirng, HTMLElement, Function | '' | description
closeButtons | Stirng, HTMLElement, Function | '' | description
transitions | Boolean | true | description
animations | Boolean | false | description
allowPageScroll | Boolean | false | description
popupClass | String | 'active' | description
bodyClass | String | 'no-scroll' | description
popupId | String | '' | description

## События
`init` - срабатывает при инициализации окна.
`beforeopen` - срабатывает перед открытием окна, при нажатии на откр. кнопку.
`open` - если `transitions: true` или `animations: true`, событие сработает после окончания плавного открытия, иначе сработает мгновенно.
`beforeclose` - сработает перед закрытием окна.
`close` - если `transitions: true` или `animations: true`, событие сработает после окончания плавного закрытия, иначе сработает мгновенно.
`update` - сработает при обновлении окна вручную.
`destroy` - сработает при отключении всех функций окна вручную.

## Методы
```javascript
callbackPopup.open();    // открывает окно
callbackPopup.close();   // закрывает окно
callbackPopup.update(); // обновление окна - ищет новые кнопки, вешает на них обработчики событий
callbackPopup.destroy(); // отключает все функции окна
```

## ToDo