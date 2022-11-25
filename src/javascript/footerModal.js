const footerLink = document.querySelector(".footer__link")

const footerBackDrop = document.querySelector('.footer__backdrop')

footerLink.addEventListener("click", callfooterModal)

function callfooterModal() {
    footerBackDrop.classList.remove('is-hidden');
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    footerBackDrop.classList.add('is-hidden');
  }
});