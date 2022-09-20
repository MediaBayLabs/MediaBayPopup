;(function(factory) {
	if (typeof define === "function" && define.amd) {
		define([], factory);
	} else if (typeof exports === "object") {
		module.exports = factory();
	} else {
		window.Popup = factory();
	}
})(function() {

	let Popup = function(options) {
		let _ = this,
			assign = function(inserted, obj) {
				for (let key in inserted) {
					if (obj[key] === undefined) {
						obj[key] = inserted[key];
					} else if (typeof obj[key] === 'object') {
						assign(inserted[key], obj[key]);
					}
				}
			};

		_.options = options || {};

		_.defaults = {
			popupClass: 'active',
			clickToClose: true,
			escToClose: true
		};

		_.$popup = null;
		_.$closeButtons = null;
		_.$openButtons = null;

		if (_.options === {} || !_.$popup) {
			return;
		}

		assign(_.defaults, _.options);
		assign(_.initials, _);

				_.init();

		console.log(_);
		return _.$popup;
	};

	Popup.prototype.dispatchEvent = function(element, eventName) {
		if (typeof window.CustomEvent === 'function') {
	  	let evt = new CustomEvent(eventName);
	  	element.dispatchEvent(evt);
		}	
	};

	Popup.prototype.refresh = function() {
		let _ = this;

		_.destroyEvents();
		_.reInit();
	};


	Popup.prototype.destroyEvents = function() {
		let _ = this,
			popup = _.$popup,
			openBtns = _.$openBtns,
			closeBtns = _.$closeBtns;


		popup.removeEventListener(_.endEvent, _.transitionEnd);
		popup.removeEventListener('click', _.clickToClose);

		document.addEventListener('keyup', _.closePopupHandler);

		if (openBtns) {
			for (let i = 0; i < openBtns.length; i++) {
				openBtns[i] && openBtns[i].removeEventListener('click', _.openPopupHandler);
			}		
		}

		if (closeBtns) {
			for (let i = 0; i < closeBtns.length; i++) {
				closeBtns[i] && closeBtns[i].removeEventListener('click', _.closePopupHandler);
			}		
		}

	};


	return Popup;
});