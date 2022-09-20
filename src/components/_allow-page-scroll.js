MediaBayPopup.prototype.allowPageScroll = function() {
  const _ = this.ctx || this;
  const options = _.options;
  const fakeScrollbar = _.fakeScrollbar;
  const body = document.body;
  // const otherPopups = Array.prototype.slice.call(document.querySelectorAll('.Popup'));
  const otherPopups = window.MediaBayPopups;

  console.log(otherPopups);

  if (fakeScrollbar && otherPopups.every(el => !el.popup.classList.contains(options.popupClass))) {
    console.log('allowpagescroll');
    body.style.paddingRight = '';
    fakeScrollbar.classList.remove(options.fakeScrollbarClass);
    body.classList.remove(options.bodyClass);
  }
};