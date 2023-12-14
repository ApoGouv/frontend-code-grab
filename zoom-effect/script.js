"use strict";

const zoomEffectHandler = {
  name: 'Zoom Effect handler',

  zoomContainerId: 'zoom-container',
  zoomContainerEl: null,
  zoomContainerBoundingInfo: null,

  imageEl: null,

  zoomLevel: 2,

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

    this.zoomContainerEl = document.getElementById(this.zoomContainerId);

    if (this.zoomContainerEl) {
      // Get zoom container's size and its position relative to the viewport.
      this.zoomContainerBoundingInfo = this.zoomContainerEl.getBoundingClientRect();

      this.imageEl = this.zoomContainerEl.querySelector('img');

      if (this.imageEl) {
        this.zoomContainerEl.addEventListener('mousemove', (e) => this.zoomIn(e));
        this.zoomContainerEl.addEventListener('mouseleave', (e) => this.zoomReset(e));
      } else {
        console.error('Image is missing within the Zoom container...');
      }
    } else {
      console.error('Zoom container element is missing...');
    }
  },
  
  zoomIn: function (event) {
    this.currentMethod = 'zoomIn';

    this.zoomContainerEl.style.cursor = 'zoom-in';

    // Calculate the mouse position relative to the zoomContainer.
    /**
     * Check also: 
     * mouseX = event.clientX - event.target.offsetLeft;
     * const mouseY = event.clientY - event.target.offsetTop;
     */
    const mouseX = event.clientX - this.zoomContainerBoundingInfo.left;
    const mouseY = event.clientY - this.zoomContainerBoundingInfo.top;
    

    this.log('zooming in...', {mouseX, mouseY});

    // Set the transform origin to the mouse position.
    this.imageEl.style.transformOrigin = `${mouseX}px ${mouseY}px`;

    // Apply zoom using the transform property.
    this.imageEl.style.transform = `scale(${this.zoomLevel})`;
  }, 

  zoomReset: function(event) {
    // Reset container cursor.
    this.zoomContainerEl.style.cursor = '';

    // Set the transform origin back to center center.
    this.imageEl.style.transformOrigin = `center center`;

    // Reset zoom using the transform property and set it back to 1.
    this.imageEl.style.transform = `scale(1)`;
  }
};

zoomEffectHandler.init();