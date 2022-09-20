MediaBayPopup.prototype.closePopup = function() {
	if (event && event.type === 'keyup' && event.keyCode !== 27) {
		return;
	}

	const _ = this.ctx || this;
	const options = _.options;
	const popup = _.popup;

	if (popup.classList.contains(options.popupClass)) {

		_.action = 'close';
		_.dispatchEvent(popup, 'beforeclose');
		console.log('beforeclose');

		if (_.endEvent) {
			popup.addEventListener(_.endEvent, _.transitionEnd);
		} else {
			_.dispatchEvent(popup, 'close');
			_.allowpagescroll();
		}

		popup.classList.remove(options.popupClass);

		if (options.popupId && location.hash.indexOf('#' + options.popupId) !== -1) {
			history.replaceState(null, document.title, location.href.replace('#' + options.popupId, ''));
  	}

	}

};