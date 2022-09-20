MediaBayPopup.prototype.initEvents = function() {

	const _ = this;
	const openButtons = _.openButtons;
	const closeButtons = _.closeButtons;

	if (closeButtons) {
		for (let i = 0; i < closeButtons.length; i++) {
			closeButtons[i] && closeButtons[i].addEventListener('click', _.closePopupHandler);
		}
	}

	if (openButtons) {
		for (let i = 0; i < openButtons.length; i++) {
			openButtons[i] && openButtons[i].addEventListener('click', _.openPopupHandler);
		}
	}

	_.options.clickToClose && _.popup.addEventListener('click', _.clickToClose);

	_.options.escToClose && document.addEventListener('keyup', _.closePopupHandler);

};