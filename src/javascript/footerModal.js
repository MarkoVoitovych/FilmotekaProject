import { refs } from './refs';

// console.log(body)

const noScroll = document.querySelector("body")

export function callfooterModal() {
    refs.footerBackDrop.classList.remove('is-hidden');
    noScroll.classList.add('noScroll')
    document.addEventListener('keydown', hideFooterModal);
    refs.footerBackDrop.addEventListener("click", hideFooterModal)
    refs.footerCloseBtn.addEventListener("click", footerCloseBtnOnClick
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
    refs.footerCloseBtn.removeEventListener("click", footerCloseBtnOnClick)
    noScroll.classList.remove('noScroll')

}