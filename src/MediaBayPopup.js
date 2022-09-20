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


		console.log('destroy');

	};

	MediaBayPopup.prototype.init = function() {

	  const _ = this;

	  const options = _.options;



		  function getElements(el, elements, toNodeList) {

	    if (typeof elements === 'string') {

	      el = toNodeList ? document.querySelectorAll(elements) : document.querySelector(elements);

	    } else {

	      el = elements;

	    }

	    return el;

	  }



		  _.popup = getElements(_.popup, _.selector);

	  _.openButtons = getElements(_.openButtons, options.openButtons, true);

	  _.closeButtons = getElements(_.closeButtons, options.closeButtons, true);

	  _.fakeScrollbar = getElements(_.fakeScrollbar, options.fakeScrollbar);



		  _.popup.ctx = _;




	  _.openPopupHandler = {

	    handleEvent: _.openPopup,

	    ctx: _

	  };



		  _.closePopupHandler = {

	    handleEvent: _.closePopup,

	    ctx: _

	  };



		  _.popup.open = _.openPopup;

	  _.popup.close = _.closePopup;

	  _.popup.update = _.update;

	  _.popup.destroy = _.destroy;



		  _.endEvent = options.transitions ? 'transitionend' : options.animations ? 'animationend' : false;



		  _.popup.classList.add(options.mainPopupClass);



		  _.initEvents();



		  if (_.popup.style.display === 'none') {

	    _.popup.style.display = '';

	    _.popup.offsetWidth;

	  }



		  _.dispatchEvent(_.popup, 'init');

	  console.log('init');



		  if (options.popupId && location.hash.indexOf('#' + options.popupId) !== -1) {

	    _.popup.open();

	  }



		};
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
	MediaBayPopup.prototype.transitionEnd = function() {
	  const _ = this.ctx || this;
	  const popup = _.popup;

		  if (_.action === 'open') {
	    _.dispatchEvent(popup, 'open');
	    console.log('open');
	  } else {
	    _.dispatchEvent(popup, 'close');
	    console.log('close');
	    _.allowPageScroll();
	  }

		  popup.removeEventListener(_.endEvent, _.transitionEnd);

		};
	MediaBayPopup.prototype.closeByClick = function() {

		  if (event.target === this) {
	    this.closePopup();
	  }

		};
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
	MediaBayPopup.prototype.allowPageScroll = function() {
	  const _ = this.ctx || this;
	  const options = _.options;
	  const fakeScrollbar = _.fakeScrollbar;
	  const body = document.body;
	  const otherPopups = window.MediaBayPopups;

		  console.log(otherPopups);

		  if (fakeScrollbar && otherPopups.every(el => !el.popup.classList.contains(options.popupClass))) {
	    console.log('allowpagescroll');
	    body.style.paddingRight = '';
	    fakeScrollbar.classList.remove(options.fakeScrollbarClass);
	    body.classList.remove(options.bodyClass);
	  }
	};

	return MediaBayPopup;
});