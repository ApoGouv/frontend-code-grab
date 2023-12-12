const typeWriterHandler = {
  name: 'Typewriter',
  // init variables.
  text: 'Some catchy heading that auto-magically is written in front of you <3',
  
  textContainerID: 'headline',
  textContainerEl: null,

  charIndex: 0,
  writerSpeed: 100,
  delayBeforeReWrite: 1000,

  debugLogIsEnabled: false,

  init: function() {
    if (this.debugLogIsEnabled) {
      console.log(`${this.name} > Init > started...`);
    }
    
    this.textContainerEl = document.getElementById(this.textContainerID);
    this.charIndex = 0;

    // Start our typeWriter method
    this.makeTypeWriting();
  },

  makeTypeWriting: function(delay = null) {
    if ( null === delay 
      || isNaN(delay)
      || !Number.isInteger(delay)
    ) {
      delay = this.writerSpeed;
    }
    setTimeout( () => {
      this.typeWriter()
    }, delay );
  },

  typeWriter: function() {
    if (this.debugLogIsEnabled) {
      console.log(`${this.name} > typeWriter > called for charIndex: ${this.charIndex}.`);
    }
    
    if (! this.textContainerEl) {
      this.textContainerEl = document.getElementById(this.textContainerID);
    }
    this.textContainerEl.innerText = this.text.slice(0, this.charIndex);

    this.charIndex++;

    // If we have reached the end of the text, reset the index to zero.
    if (this.charIndex > this.text.length) {
      console.log('charIndex: ', this.charIndex);
      console.log('text ln: ', this.text.length -1);
      this.charIndex = 0;

      // Now call typeWriter again after the delay
      this.makeTypeWriting(this.delayBeforeReWrite);
    } else {
      this.makeTypeWriting();
    }
  }
};

typeWriterHandler.init();
