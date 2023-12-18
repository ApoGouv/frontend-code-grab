"use strict";

const calculatorHandler = {
  name: 'Calculator handler',

  calculatorWrapperId: 'calculator',
  calculatorWrapperEl: null,

  // Screens
  formulaScreenId: 'formula',
  formulaScreenEl: null,
  displayScreenId: 'display',
  displayScreenEl: null,

  // Buttons
  buttonsGridClass: 'buttons-grid',
  buttonsGridEl: null,

  buttons: null,

  currentMethod: null,
  debugLogIsEnabled: true,

  log: function(message = '', ...args) {
    if (this.debugLogIsEnabled) {
      console.log(`${this.name} > [${this.currentMethod}()] ${message}: `, args);
    }
  },

  init: function() {
    this.currentMethod = 'init';
    this.log('getting started...');

    try {
      // Check if there the culculatore wrapper is present.
      this.calculatorWrapperEl = document.getElementById(this.calculatorWrapperId);

      if ( this.calculatorWrapperEl === null ) {
        this.throwError(`Required element: #${this.calculatorWrapperId} is missing.`);
      }

      this.getScreenElements();
      this.getButtonElements();
  
      this.applyButtonsListener();

    } catch (e) {
      this.exitWithError(`${e.name}: ${e.message}`);
      return;
    }
  },

  throwError: function(msg = '', cause = null, name = '') {
    if ( '' === msg || null === msg) {
      msg = 'Required calculator element not found.';
    }

    const er = new Error(msg); 

    if (null !== cause) {
      er.cause = cause;
    }

    // Default er.name is 'Error'
    if ( '' !== name && null !== name) {
      er.name = name;
    }

    throw er;
  },
  
  exitWithError: function(msg = '') {
    if ( '' === msg || null === msg) {
      msg = 'Required calculator element not found.';
    }

    console.error(msg);
    return;
  },

  getScreenElements: function() {
    this.formulaScreenEl = this.calculatorWrapperEl.querySelector(`#${this.formulaScreenId}`);
    this.displayScreenEl = this.calculatorWrapperEl.querySelector(`#${this.displayScreenId}`);

    if ( null === this.formulaScreenEl || null === this.displayScreenEl) {
      this.throwError(`One or both required elements: #${this.formulaScreenId} and #${this.displayScreenId}, missing.`);
    }
  },

  getButtonElements: function() {
    this.buttonsGridEl = this.calculatorWrapperEl.querySelector(`.${this.buttonsGridClass}`);
    if ( null === this.buttonsGridEl ) {
      this.throwError(`Required element: .${this.buttonsGridClass} is missing.`);
    }
  },

  applyButtonsListener: function() {
    console.log('applyButtonsListener...');
    this.buttonsGridEl.addEventListener('click', (e) => {
      // Only hadle click events on button elements inside the our buttons grid element.
      if (e.target.matches('button')) {
        this.handleButtonClick(e);
      }
    });
  },

  handleButtonClick: function(e) {
    const btn = e.target
    const btnAction = btn.dataset.action
    console.log('Button pressed data: ', {btn, action: btnAction});
  }
};

calculatorHandler.init();