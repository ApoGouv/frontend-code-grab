"use strict";

const darkModeToggleHandler = {
  name: 'SkeletonSnippet handler',

  toggleCheckboxId: 'dark-mode-toggle',
  toggleCheckboxEl: null,

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

    this.toggleCheckboxEl = document.getElementById(this.toggleCheckboxId);

    this.toggleCheckboxEl.addEventListener('change', (e) => this.darkThemeToggle(e));
  },

  darkThemeToggle: function(e) {
    document.body.classList.toggle('dark', e.target.checked);
  }
};

darkModeToggleHandler.init();