Popup.prototype.closePopup = function() {
	if (event && event.type === 'keyup' && event.keyCode !== 27) {
		return;
	}

	let _ = this.ctx || this,
		options = _.options,
		popup = _.$popup;

	if (popup.classList.contains(options.popupClass)) {

		_.action = 'close';
		_.dispatchEvent(popup, 'popupbeforeclose');
		console.log('popupbeforeclose');

		if (_.endEvent) {
			popup.addEventListener(_.endEvent, _.transitionEnd);
		} else {
			_.dispatchEvent(popup, 'popupclose');
			_.allowpagescroll();
		}

		popup.classList.remove(options.popupClass);

	}	

};