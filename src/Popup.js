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


		console.log('popupdestroy');

	};

		Popup.prototype.init = function() {

			let _ = this,

				options = _.options,

				getElements = function($el, elements, toNodeList) {

					if (typeof elements === 'string') {

						$el = toNodeList ? document.querySelectorAll(elements) : document.querySelector(elements);

					} else {

						$el = elements;

					}

					return $el;

				};



				_.$popup = getElements(_.$popup, _.selector);

			_.$openButtons = getElements(_.$openButtons, options.openButtons, true);

			_.$closeButtons = getElements(_.$closeButtons, options.closeButtons, true);

			_.$fakeScrollbar = getElements(_.$fakeScrollbar, options.fakeScrollbar);



				_.$popup.ctx = _;




			_.openPopupHandler = {

				handleEvent: _.openPopup,

				ctx: _

			};



						_.closePopupHandler = {

				handleEvent: _.closePopup,

				ctx: _

			};



				_.$popup.openPopup = _.openPopup;

			_.$popup.closePopup = _.closePopup;

			_.$popup.refreshPopup = _.refresh;

			_.$popup.destroyPopup = _.destroy;



				_.endEvent = options.transitions ? 'transitionend' : options.animations ? 'animationend' : false;



				_.$popup.classList.add(options.mainPopupClass);



				_.initEvents();



				if (_.$popup.style.display === 'none') {

				_.$popup.style.display = '';

				_.$popup.offsetWidth;

			}	



				_.dispatchEvent(_.$popup, 'popupinit');

			console.log('popupinit');



			};
	Popup.prototype.initEvents = function() {

			let _ = this,
			openButtons = _.$openButtons,
			closeButtons = _.$closeButtons;

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

			_.options.clickToClose && _.$popup.addEventListener('click', _.clickToClose);

			_.options.escToClose && document.addEventListener('keyup', _.closePopupHandler);

		};
	Popup.prototype.transitionEnd = function() {
	  let _ = this.ctx || this,
	    popup = _.$popup;

		  if (_.action === 'open') {
	    _.dispatchEvent(popup, 'popupopen');
	    console.log('popupopen');
	  } else {
	    _.dispatchEvent(popup, 'popupclose');
	    console.log('popupclose');
	    _.allowPageScroll();
	  }

		  popup.removeEventListener(_.endEvent, _.transitionEnd);

		};
	Popup.prototype.clickToClose = function() {

		  if (event.target === this) {
	    this.closePopup();
	  }

		};
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
	Popup.prototype.allowPageScroll = function() {
	  let _ = this.ctx || this,
	    options = _.options,
	    fakeScrollbar = _.$fakeScrollbar,
	    body = document.body,
	    otherPopups = Array.prototype.slice.call(document.querySelectorAll('.Popup'));

		  if (fakeScrollbar && otherPopups.every(function(el) {return !el.classList.contains(options.popupClass)})) {
	    console.log('allowpagescroll');
	    body.style.paddingRight = '';
	    fakeScrollbar.classList.remove(options.fakeScrollbarClass);
	    body.classList.remove(options.bodyClass);
	  }
	};

	return Popup;
});