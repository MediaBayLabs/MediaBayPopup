Popup.prototype.openPopup = function() {
	let _ = this.ctx || this,
		options = _.options,
		fakeScrollbar = _.$fakeScrollbar,
		body = document.body,
		popup = _.$popup;

	if (!popup.classList.contains(options.popupClass)) {
		if (event && event.type === 'click') {
			_.$caller = popup.caller = event.target;
		}

		// if (popup.style.display === 'none') {
		// 	popup.style.display = '';
		// 	popup.offsetWidth;
		// }	

		_.action = 'open';
		_.dispatchEvent(popup, 'popupbeforeopen');
		console.log('popupbeforeopen');

		if (_.endEvent) {
			popup.addEventListener(_.endEvent, _.transitionEnd);
		} else {
			_.dispatchEvent(popup, 'popupopen');
		}

		popup.classList.add(options.popupClass);

		if (fakeScrollbar) {
			fakeScrollbar.classList.add(options.fakeScrollbarClass);
    	body.classList.add(options.bodyClass);
    	body.style.paddingRight = fakeScrollbar.offsetWidth - fakeScrollbar.clientWidth + 'px';
		}

	}
	
};