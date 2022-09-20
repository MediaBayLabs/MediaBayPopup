MediaBayPopup.prototype.openPopup = function() {
	const _ = this.ctx || this;
	const options = _.options;
	const fakeScrollbar = _.fakeScrollbar;
	const body = document.body;
	const popup = _.popup;

	if (!popup.classList.contains(options.popupClass)) {
		if (event && event.type === 'click') {
			_.caller = popup.caller = event.target;
		}

		// if (popup.style.display === 'none') {
		// 	popup.style.display = '';
		// 	popup.offsetWidth;
		// }	

		_.action = 'open';
		_.dispatchEvent(popup, 'beforeopen');
		console.log('beforeopen');

		if (_.endEvent) {
			popup.addEventListener(_.endEvent, _.transitionEnd);
		} else {
			_.dispatchEvent(popup, 'open');
		}

		popup.classList.add(options.popupClass);

		if (fakeScrollbar) {
			fakeScrollbar.classList.add(options.fakeScrollbarClass);
    	body.classList.add(options.bodyClass);
    	body.style.paddingRight = fakeScrollbar.offsetWidth - fakeScrollbar.clientWidth + 'px';
		}

	}
	
};