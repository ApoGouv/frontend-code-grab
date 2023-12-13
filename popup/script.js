const popupHandler = {
  name: 'Popup handler',

  popupOpenBtnId: 'popup-open',
  popupCloseBtnId: 'popup-close',
  popupContainerId: 'popup-container',

  popupOpenedClass: 'active',
  
  popupOpenBtnEl: null,
  popupCloseBtnEl: null,
  popupContainerEl: null,

  _isShown: false,
  _isTransitioning: false,
  transitionOpenDelay: 100,
  transitionCloseDelay: 1000,

  currentMethod: null,
  debugLogIsEnabled: false,

  log: function(message = '', ...args) {
    if (this.debugLogIsEnabled) {
      console.log(`${this.name} > [${this.currentMethod}()] ${message}: `, args);
    }
  },

  init: function() {
    this.currentMethod = 'init';
    this.log('getting started...');

    this.popupOpenBtnEl = document.getElementById(this.popupOpenBtnId);
    this.popupCloseBtnEl = document.getElementById(this.popupCloseBtnId);
    this.popupContainerEl = document.getElementById(this.popupContainerId);

    this.popupOpenBtnEl.addEventListener('click', () => this.openPopup());
    this.popupCloseBtnEl.addEventListener('click', () => this.closePopup());

    this.popupContainerEl.addEventListener('doAfterTransition', this.handleAfterTransition.bind(this));
  },

  toggle: function() {
    return this._isShown ? this.closePopup() : this.openPopup();
  },

  openPopup: function() {
    this.currentMethod = 'openPopup';
    this.log('triggered');

    // Bail out early if already showing or transitioning
    if (this._isShown || this._isTransitioning) {
      this.log('bail out early due to already showing or transitioning: ', {
          _isShown: this._isShown,
          _isTransitioning:this._isTransitioning
      });
      return;
    }

    this._isShown = true;
    this._isTransitioning = true;
    this.popupContainerEl.style.display = 'flex';

    // Trigger a custom event with additional data
    const customEvent = new CustomEvent('doAfterTransition', { detail: { cause: 'open' } });
    // Trigger the custom event on the element
    this.popupContainerEl.dispatchEvent(customEvent);
  },

  closePopup: function() {
    this.currentMethod = 'closePopup';
    this.log('triggered');

    // Bail out early if not showing or already transitioning
    if (!this._isShown || this._isTransitioning) {
      this.log('bail out early due to already not showing or transitioning: ', {
          _isShown: this._isShown,
          _isTransitioning:this._isTransitioning
      });
      return;
    }

    this._isShown = false;
    this._isTransitioning = true;
    this.popupContainerEl.classList.remove(this.popupOpenedClass);
    
    // Trigger a custom event with additional data
    const customEvent = new CustomEvent('doAfterTransition', { detail: { cause: 'close' } });
    // Trigger the custom event on the element
    this.popupContainerEl.dispatchEvent(customEvent);
    
  },

  handleAfterTransition: function(event) {
    // Access the detail property in the event object
    const eventData = event.detail;
    // Check the cause property and handle different cases
    switch (eventData.cause) {
      case 'open':
        setTimeout(() => this.handleOpenCase(), this.transitionOpenDelay);
        break;
      case 'close':
        setTimeout(() => this.handleCloseCase(), this.transitionCloseDelay);
        break;
      default:
        return;
    }
  },

  handleOpenCase: function() {
    this.popupContainerEl.classList.add(this.popupOpenedClass);
    this._isTransitioning = false;
  },
  handleCloseCase: function() {
    this.popupContainerEl.style.display = 'none';
    this._isTransitioning = false;
  }
};

popupHandler.init();
