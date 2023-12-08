const navEl = document.getElementById('nav');
const hamburgerBtnEl = document.getElementById('hamburger-btn');

hamburgerBtnEl.addEventListener('click', () => {
  navEl.classList.toggle('active');
  hamburgerBtnEl.classList.toggle('active');
})