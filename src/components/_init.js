MediaBayPopup.prototype.init = function() {
  const _ = this;
  const options = _.options;

  function getElements(el, elements, toNodeList) {
    if (typeof elements === 'string') {
      el = toNodeList ? document.querySelectorAll(elements) : document.querySelector(elements);
    } else {
      el = elements;
    }
    return el;
  }

  _.popup = getElements(_.popup, _.selector);
  _.openButtons = getElements(_.openButtons, options.openButtons, true);
  _.closeButtons = getElements(_.closeButtons, options.closeButtons, true);
  _.fakeScrollbar = getElements(_.fakeScrollbar, options.fakeScrollbar);

  _.popup.ctx = _;

  // context events
  _.openPopupHandler = {
    handleEvent: _.openPopup,
    ctx: _
  };

  _.closePopupHandler = {
    handleEvent: _.closePopup,
    ctx: _
  };

  _.popup.open = _.openPopup;
  _.popup.close = _.closePopup;
  _.popup.update = _.update;
  _.popup.destroy = _.destroy;

  _.endEvent = options.transitions ? 'transitionend' : options.animations ? 'animationend' : false;

  _.popup.classList.add(options.mainPopupClass);

  _.initEvents();

  if (_.popup.style.display === 'none') {
    _.popup.style.display = '';
    _.popup.offsetWidth;
  }

  _.dispatchEvent(_.popup, 'init');
  console.log('init');

  if (options.popupId && location.hash.indexOf('#' + options.popupId) !== -1) {
    _.popup.open();
  }

};