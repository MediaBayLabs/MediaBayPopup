MediaBayPopup.prototype.transitionEnd = function() {
  const _ = this.ctx || this;
  const popup = _.popup;

  if (_.action === 'open') {
    _.dispatchEvent(popup, 'open');
    console.log('open');
  } else {
    _.dispatchEvent(popup, 'close');
    console.log('close');
    _.allowPageScroll();
  }

  popup.removeEventListener(_.endEvent, _.transitionEnd);

};