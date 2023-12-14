"use strict";

const purpleHeartRainHandler = {
  name: 'Purple Heart Rain handler',

  heartRainIntervalDelay: 300, // In ms.
  heartRainIntervalId: null,

  heartSelfDestroyTime: 5000, // In ms.

  currentMethod: null,
  debugLogIsEnabled: false,

  log: function(message = '', ...args) {
    if (this.debugLogIsEnabled) {
      console.log(`${this.name} > [${this.currentMethod}()] ${message}: `, args);
    }
  },

  init: function() {
    this.currentMethod = 'init';
    this.log('initializing...');

    this.startHeartRain();
  },

  startHeartRain: function() {
    this.currentMethod = 'startHeartRain';
    this.log('let it rain...');

    if(!this.heartRainIntervalId) {
      this.heartRainIntervalId = setInterval(
        // Pass a function reference using an arrow function
        () => this.createHeart(),
        this.heartRainIntervalDelay
      );
    }
  },

  stopHeartRain: function() {
    this.currentMethod = 'stopHeartRain';
    
    if(this.heartRainIntervalId) {
      this.log('enough with the rain!');
      clearInterval(this.heartRainIntervalId);
      this.heartRainIntervalId = null;
    }
  },

  createHeart: function() {
    this.currentMethod = 'createHeart';
    this.log('heart in progress...');

    const heart = document.createElement('div');
    heart.classList.add('heart');

    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";

    heart.innerText = "💜";

    document.body.appendChild(heart);

    // Self destroy.
    setTimeout(() => {
      heart.remove();
    }, this.heartSelfDestroyTime);
  }
};

purpleHeartRainHandler.init();