MediaBayPopup.prototype.closeByClick = function() {

  if (event.target === this) {
    this.closePopup();
  }

};