Popup.prototype.transitionEnd = function() {
  let _ = this.ctx || this,
    popup = _.$popup;

  if (_.action === 'open') {
    _.dispatchEvent(popup, 'popupopen');
    console.log('popupopen');
  } else {
    _.dispatchEvent(popup, 'popupclose');
    console.log('popupclose');
    _.allowPageScroll();
  }

  popup.removeEventListener(_.endEvent, _.transitionEnd);

};