"use strict";

const carouselHandler = {
  name: 'Carousel handler',

  imagesContainerId: 'images-container',
  imagesContainerEl: null,
  images: null,
  imageIndex: 0,
  slideDuration: 2000, // In ms.

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

    this.imagesContainerEl = document.getElementById(this.imagesContainerId);
    
    // Use querySelectorAll to get all img elements inside imagesContainer
    this.images = this.imagesContainerEl.querySelectorAll('img');

    this.startRunning();
  },

  run: function() {
    this.currentMethod = 'run';
    this.log('getting next image soon');

    this.imageIndex++;

    if (this.imageIndex > this.images.length - 1) {
      this.imageIndex = 0;
    }

    this.imagesContainerEl.style.transform = `translateX(${- this.imageIndex * 500}px)`;
  },

  startRunning: function () {
    this.currentMethod = 'startRunning';
    this.log('start carousel');

    setInterval(() => this.run(), this.slideDuration);
  }
};

carouselHandler.init();