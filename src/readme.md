Простой скрипт всплывающих окон для ускорения разработки сайтов.
При вызове конструктора, первым параметром передается селектор окна, а вторым набор опций. Функция возвращает html-элемент окна. Необходимый минимум:
```javascript
let callbackPopup = new Popup('.callback-popup');
```
```html
<div class="popup" style="display:none"></div>
```
Запрет прокрутки страницы реализован с фейковым скроллбаром. Когда открывается всплывающее окно, высчитывается текущая ширина полосы прокрутки на странице и для `body` задается класс `no-scroll` и css-свойство `padding-right`, и показывается сам `div#fake-scrollbar`. Что это дает?
* не просходит скачка контента из-за запрета прокрутки;
* всегда виден скроллбар и нет разрыва фона между контентом и `body` с `padding-right`;
* полоса прокрутки внутри окна накладывается сверху на полосы прокрутки `div#fakescrollbar`.

Чтобы это работало, нужно создать этот самый скроллбар:
```html
<div id="fake-scrollbar"></div>
```
И задать некоторые стили:
```css
body.no-scroll {
  overflow: hidden;
}

#fake-scrollbar {
  width: 100%;
  height: 100%;
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  pointer-events: none;
  z-index: 9999;
}

#fake-scrollbar.active {
  display: block;
}
```
Для элементов с `position: fixed` можно задать `padding-right: inherit`, чтобы они тоже не дергались:
```css
.header.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding-right: inherit;
}
```


Структура окна:
```html
<div class="callback-popup">
  <div class="callback-popup__content">
    <button type="button" class="callback-popup__close">X</button>
  </div>
</div>
```
Минимальный css:
```css
.callback-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s, visibility 0.5s;
  z-index: 1;
}
.popup-content {
  flex-shrink: 0;
  max-width: 320px;
  background-color: #fff;
  /*Эффект плавного исчезновения zoomOut*/
  opacity: 0;
  transform: scale(0);
  transition: transform 0.5s, opacity 0.5s;
}

.callback-popup.active {
  opacity: 1;
  visibility: visible;
}

.callback-popup.active > .popup-content {
  /*Эффект плавого появления zoomIn*/
  opacity: 1;
  transform: scale(1);
}
```
При инициализации окну присваивается класс `Popup`.

```javascript
let callbackPopup = new Popup('.callback-popup', {
  openButtons: '.callback-btn',
  closeButtons: '.callback-popup__close',
  transition: true,
  animation: false
});
```


События:
`popupinit` - срабатывает при инициализации окна.
`popupbeforeopen` - срабатывает перед открытием окна, при нажатии на откр. кнопку.
`popupopen` - если `transitions: true` или `animations: true`, событие сработает после окончания плавного открытия, иначе сработает мгновенно.
`popupbeforeclose` - сработает перед закрытием окна.
`popupclose` - если `transitions: true` или `animations: true`, событие сработает после окончания плавного закрытия, иначе сработает мгновенно.
`popuprefresh` - сработает при обновлении окна вручную.
`popupdestroy` - сработает при отключении всех функций окна вручную.

Функции:
```javascript
callbackPopup.openPopup();    // открывает окно
callbackPopup.closePopup();   // закрывает окно
callbackPopup.refreshPopup(); // обновление окна - ищет новые кнопки, вешает на них обработчики событий
callbackPopup.destroyPopup(); // отключает все функции окна
```

Все настройки:
```javascript
let callbackPopup = new Popup('.callback-popup', {
  openButtons: '.callback-btn',
  closeButtons: '.callback-popup__close',
  transitions: true,
  animations: false,
  allowPageScroll: false,
  popupClass: 'active',
  bodyClass: 'no-scroll'
});
```