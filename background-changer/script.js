"use strict";

const backgroundChangerHandler = {
  name: 'SkeletonSnippet handler',

  changeBackgroundBtnId: 'change-background',
  changeBackgroundBtnEl: null,

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

    this.changeBackgroundBtnEl = document.getElementById(this.changeBackgroundBtnId);

    this.changeBackgroundBtnEl.addEventListener("click", () => this.changeBackground());
  },

  changeBackground: function() {
    this.currentMethod = 'changeBackground';
    this.log('BG is going to change...');

    document.body.style.background = this.randomColor();
  },

  randomColor: function() {
    this.currentMethod = 'randomBgColor';
    this.log('generating a random color...');
    return `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`
  }
};

backgroundChangerHandler.init();