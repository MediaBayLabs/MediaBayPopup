Popup.prototype.clickToClose = function() {

  if (event.target === this) {
    this.closePopup();
  }

};