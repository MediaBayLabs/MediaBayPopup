;(function(factory) {
	if (typeof define === "function" && define.amd) {
		define([], factory);
	} else if (typeof exports === "object") {
		module.exports = factory();
	} else {
		window.Popup = factory();
	}
})(function() {

	let Popup = function(selector, options) {
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
		_.selector = selector;

		_.defaults = {
			popupClass: 'active',
			bodyClass: 'no-scroll',
			fakeScrollbarClass: 'active',
			mainPopupClass: 'Popup',
			clickToClose: true,
			escToClose: true,
			allowPageScroll: false,
			transitions: true,
			animations: false,
			fakeScrollbar: '#fake-scrollbar'
		};

		// _.$popup = null;
		// _.$closeButtons = null;
		// _.$openButtons = null;
		// _.$fakeScrollbar = null;
		// _.$caller = null;

		assign(_.defaults, _.options);

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
		let _ = this.ctx || this;
		console.log('popuprefresh');
		_.destroy();
		_.init(_.selector);
	};


	Popup.prototype.destroy = function() {
		let _ = this.ctx || this,
			popup = _.$popup,
			openButtons = _.$openButtons,
			closeButtons = _.$closeButtons;

		if (popup) {
			popup.classList.remove(_.options.mainPopupClass);
			popup.removeEventListener(_.endEvent, _.transitionEnd);
			popup.removeEventListener('click', _.clickToClose);

			document.removeEventListener('keyup', _.closePopupHandler);

			if (openButtons) {
				for (let i = 0; i < openButtons.length; i++) {
					openButtons[i] && openButtons[i].removeEventListener('click', _.openPopupHandler);
				}		
			}

			if (closeButtons) {
				for (let i = 0; i < closeButtons.length; i++) {
					closeButtons[i] && closeButtons[i].removeEventListener('click', _.closePopupHandler);
				}		
			}
		}

		// _.$popup = null;
		// _.$closeButtons = null;
		// _.$openButtons = null;
		// _.$fakeScrollbar = null;
		// _.$caller = null;

		console.log('popupdestroy');

	};

	//=require _init.js
	//=require _initEvents.js
	//=require _transitionEnd.js
	//=require _clickToClose.js
	//=require _openPopup.js
	//=require _closePopup.js
	//=require _allowPageScroll.js

	return Popup;
});