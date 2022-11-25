import { refs } from './refs';

refs.footerLink.addEventListener("click", callfooterModal)

function callfooterModal() {
    refs.footerBackDrop.classList.remove('is-hidden');
    document.addEventListener('keydown', function (e) {
        console.log(e);
        if (e.key === 'Escape') {
            refs.footerBackDrop.classList.add('is-hidden');
        }
    });
}

