import { refs } from './refs';

const footerCloseBtn = document.querySelector('[data-modal-close]')

refs.footerLink.addEventListener("click", callfooterModal)
function callfooterModal() {
    refs.footerBackDrop.classList.remove('is-hidden');
    document.addEventListener('keydown', hideFooterModal);
    refs.footerBackDrop.addEventListener("click", hideFooterModal)
    footerCloseBtn.addEventListener("click", footerCloseBtnOnClick
    )
}

function footerCloseBtnOnClick() {
    refs.footerBackDrop.classList.add('is-hidden')
    removeListeners()
}

function hideFooterModal(e) {
  if (e.key === 'Escape' || e.target === refs.footerBackDrop) {
      refs.footerBackDrop.classList.add('is-hidden');
        removeListeners()
    }
}

function removeListeners() {
    document.removeEventListener('keydown', hideFooterModal)
    refs.footerBackDrop.removeEventListener("click", hideFooterModal)
    footerCloseBtn.removeEventListener("click", footerCloseBtnOnClick)
}