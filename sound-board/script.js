"use strict";

const soundBoardHandler = {
  name: 'Sound Board handler',

  audioBoardButtonClass: 'btn-play-sound',
  audioBoardButtonsContainerId: 'audio-board-buttons',
  audioBoardButtonsContainerEl: null,

  sounds: [
    'applause',
    'boo',
    'gasp',
    'tada',
    'victory',
    'wrong',
  ],

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

    this.generateSoundButtons();
  },

  generateSoundButtons: function() {
    this.currentMethod = 'generateSoundButtons';
    this.log('generating sound buttons...');

    this.audioBoardButtonsContainerEl = document.getElementById(this.audioBoardButtonsContainerId);

    // Create a button for each sound.
    this.sounds.forEach((sound) => {
      const button = document.createElement('button');

      button.classList.add(this.audioBoardButtonClass);
      button.innerText = sound[0].toUpperCase() + sound.substring(1);
      
      button.addEventListener('click', () => this.play(sound));

      // Append current button to the sound board buttons container.
      this.audioBoardButtonsContainerEl.appendChild(button);
    });
  },

  play: function (sound) {
    this.currentMethod = 'play';
    this.log(`playing sound: ${sound}`);

    // Stop all currently playing sounds.
    this.stopSounds();

    // Find the corresponding audio element and play it.
    const audioElement = document.getElementById(sound);
    if (audioElement) {
      audioElement.play();
    }
  },

  stopSounds: function () {
    this.currentMethod = 'stopSounds';
    this.log('stopping all sounds...');

    // Iterate through all audio elements and pause them.
    this.sounds.forEach((sound) => {
      const audioElement = document.getElementById(sound);
      if (audioElement) {
        // Pause playback.
        audioElement.pause();
        // Reset playback to the beginning.
        audioElement.currentTime = 0;
      }
    });
  },
};

soundBoardHandler.init();