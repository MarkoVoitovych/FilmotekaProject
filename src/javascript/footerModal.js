import { refs } from "./refs";

const footerLink = document.querySelector(".footer__link")

const footerBackDrop = document.querySelector('.footer__backdrop')

footerLink.addEventListener("click", callfooterModal)

function callfooterModal() {
    footerBackDrop.classList.remove('is-hidden');
    document.addEventListener('keydown', hideFooterModal);
}

function hideFooterModal (e) {
  if (e.key === 'Escape') {
      footerBackDrop.classList.add('is-hidden');
        document.removeEventListener('keydown', hideFooterModal)
    }
}