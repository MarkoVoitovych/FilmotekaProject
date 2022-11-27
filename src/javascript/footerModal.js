import { refs } from './refs';

refs.footerLink.addEventListener("click", callfooterModal)
function callfooterModal() {
    refs.footerBackDrop.classList.remove('is-hidden');
    document.addEventListener('keydown', hideFooterModal);
    refs.footerBackDrop.addEventListener("click", hideFooterModal)
}

function hideFooterModal(e) {
  if (e.key === 'Escape' || e.target === refs.footerBackDrop) {
      refs.footerBackDrop.classList.add('is-hidden');
        document.removeEventListener('keydown', hideFooterModal)
    }
}