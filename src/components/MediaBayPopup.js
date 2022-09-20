;(function(factory) {
	if (typeof define === "function" && define.amd) {
		define([], factory);
	} else if (typeof exports === "object") {
		module.exports = factory();
	} else {
		window.MediaBayPopup = factory();
	}
})(function() {

	let MediaBayPopup = function(selector, options) {
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
			mainPopupClass: 'MediaBayPopup',
			clickToClose: true,
			escToClose: true,
			allowPageScroll: false,
			transitions: true,
			animations: false,
			fakeScrollbar: '#fake-scrollbar',
			popupId: ''
		};

		// _.popup = null;
		// _.closeButtons = null;
		// _.openButtons = null;
		// _.fakeScrollbar = null;
		// _.caller = null;

		assign(_.defaults, _.options);

		_.init();

		if (window.MediaBayPopups) {
			window.MediaBayPopups[window.MediaBayPopups.length] = _;
		} else {
			window.MediaBayPopups = [_];
		}

		console.log(_);
		return _.popup;
	};

	MediaBayPopup.prototype.dispatchEvent = function(element, eventName) {
		if (typeof window.CustomEvent === 'function') {
	  	const evt = new CustomEvent(eventName);
	  	element.dispatchEvent(evt);
		}	
	};

	MediaBayPopup.prototype.update = function() {
		const _ = this.ctx || this;
		console.log('update');
		_.destroy();
		_.init(_.selector);
	};

	MediaBayPopup.prototype.destroy = function() {
		const _ = this.ctx || this;
		const popup = _.popup;
		const openButtons = _.openButtons;
		const closeButtons = _.closeButtons;

		if (popup) {
			popup.classList.remove(_.options.mainPopupClass);
			popup.removeEventListener(_.endEvent, _.transitionEnd);
			popup.removeEventListener('click', _.closeByClick);

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

		// _.popup = null;
		// _.closeButtons = null;
		// _.openButtons = null;
		// _.fakeScrollbar = null;
		// _.caller = null;

		console.log('destroy');

	};

	//=require _init.js
	//=require _init-events.js
	//=require _transition-end.js
	//=require _close-by-click.js
	//=require _open-popup.js
	//=require _close-popup.js
	//=require _allow-page-scroll.js

	return MediaBayPopup;
});