Popup.prototype.allowPageScroll = function() {
  let _ = this.ctx || this,
    options = _.options,
    fakeScrollbar = _.$fakeScrollbar,
    body = document.body,
    otherPopups = Array.prototype.slice.call(document.querySelectorAll('.Popup'));

  if (fakeScrollbar && otherPopups.every(function(el) {return !el.classList.contains(options.popupClass)})) {
    console.log('allowpagescroll');
    body.style.paddingRight = '';
    fakeScrollbar.classList.remove(options.fakeScrollbarClass);
    body.classList.remove(options.bodyClass);
  }
};