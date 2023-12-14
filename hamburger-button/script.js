"use strict";

const hamburgerButtonHandler = {
  name: 'Hamburger Button handler',

  navId: 'nav',
  hamburgerBtnId: 'hamburger-btn',
  
  navEl: null,
  hamburgerBtnEl: null,

  currentMethod: null,
  debugLogIsEnabled: false,

  log: function(message = '', ...args) {
    if (this.debugLogIsEnabled) {
      console.log(`${this.name} > [${this.currentMethod}()] ${message}: `, args);
    }
  },

  init: function() {
    this.currentMethod = 'init';
    this.log('initiated...');

    this.navEl = document.getElementById(this.navId);
    this.hamburgerBtnEl = document.getElementById(this.hamburgerBtnId);

    // Add click event listener to the hamburgerBtnEl
    this.hamburgerBtnEl.addEventListener('click', () => this.toggleNav());
  },

  toggleNav: function() {
    this.currentMethod = 'toggleNav';
    this.log('triggered.');

    this.navEl.classList.toggle('active');
    this.hamburgerBtnEl.classList.toggle('active');
  }
};

hamburgerButtonHandler.init();