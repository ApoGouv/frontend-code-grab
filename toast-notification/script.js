const toasterBtnEl = document.getElementById('toasterBtn');
const notifContainerEl = document.getElementById('notification-container');

toasterBtnEl.addEventListener('click', () => {
  createNotification();
});

function createNotification() {
  const notif = document.createElement('div');
  notif.classList.add('toast');

  notif.innerText = 'Something happened! Just Informing you.'

  notifContainerEl.appendChild(notif);

  // Delete current notification after 3s.
  setTimeout(() => {
    notif.remove();
  }, 3000);
}