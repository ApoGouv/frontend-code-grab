const notificationHandler = {
  name: 'Notification Handler',

  toasterBtnId: 'toasterBtn',
  notifContainerId: 'notification-container',
  
  toasterBtnEl: null,
  notifContainerEl: null,

  defaultNotificationMessage: 'Something happened! Just informing you...',

  currentMethod: null,
  debugLogIsEnabled: false,

  log: function(message = '', ...args) {
    if (this.debugLogIsEnabled) {
      console.log(`${this.name} > [${this.currentMethod}()] ${message}: `, args);
    }
  },

  init: function() {
    this.currentMethod = 'init';
    this.log('Initialization started...');

    // Your code here
    this.toasterBtnEl = document.getElementById(this.toasterBtnId);
    this.notifContainerEl = document.getElementById(this.notifContainerId);

    this.toasterBtnEl.addEventListener('click', () => {
      this.createNotification();
    });
  },

  createNotification: function(notificationMessage = '') {
    this.currentMethod = 'createNotification';
    this.log('Creating notification...');

    const notif = document.createElement('div');
    notif.classList.add('toast');

    if (notificationMessage === '') {
      notificationMessage = this.defaultNotificationMessage;
    }

    notif.innerText = notificationMessage;

    this.notifContainerEl.appendChild(notif);

    // Delete current notification after 3s.
    setTimeout(() => {
      notif.remove();
    }, 3000);
  }
};

notificationHandler.init();
