!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},a=t.parcelRequiree717;null==a&&((a=function(e){if(e in r)return r[e].exports;if(e in n){var t=n[e];delete n[e];var a={id:e,exports:{}};return r[e]=a,t.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},t.parcelRequiree717=a);var o=a("bpxeT"),i=a("2TvXO");a("bTMks"),a("h6c0i");var c={library:document.querySelector(".gallery--library"),footerLink:document.querySelector(".footer__link"),footerBackDrop:document.querySelector(".footer__backdrop"),footerCloseBtn:document.querySelector("[data-modal-close]"),watchBtn:document.querySelector(".button-watched"),queueBtn:document.querySelector(".button-queue")};function s(e,t){var r=e.id,n=e.poster_path,a=e.title,o=e.release_date,i=e.vote_average.toFixed(1),c=e.poster_path?"https://image.tmdb.org/t/p/w300".concat(n):"https://astoriamuseums.org/wp-content/uploads/2020/10/OFM-poster-not-available.png",s=new Date(Date.parse(o)).getFullYear()||"";return'<li class="gallery__item movie-card" data-id="'.concat(r,'">\n                  <div class="movie-card__poster-thumb">\n                    <img src="').concat(c,'"\n                        class="movie-card__poster"\n                        alt="').concat(a,'"\n                                            />\n                  </div>\n                  <div class="movie-card__wrap">\n                      <h2 class="movie-info-title"> ').concat(a,'</h2>\n                      <div class="movie-info-list">\n                      <p class="info-item-genre">').concat(t,'</p>\n                        <span class="info-item-slash"> | </span>\n                        <p class="info-item-year">').concat(s,'</p>\n                        <span class="info-item-vote">').concat(i,"</span>\n                      </div>\n                  </div>\n            </li>")}var l=a("X3bd8"),d=a("d1Qha"),u=a("ddUeE"),p=a("2ZtFH");function v(){c.footerBackDrop.classList.add("is-hidden"),m()}function f(e){"Escape"!==e.key&&e.target!==c.footerBackDrop||(c.footerBackDrop.classList.add("is-hidden"),m())}function m(){document.removeEventListener("keydown",f),c.footerBackDrop.removeEventListener("click",f),c.footerCloseBtn.removeEventListener("click",v),document.querySelector("body").classList.remove("noScroll")}var h=new(0,l.ThemoviedbAPI);try{(0,u.spinnerPlay)(),y(),c.footerLink.addEventListener("click",(function(){c.footerBackDrop.classList.remove("is-hidden"),document.querySelector("body").classList.add("noScroll"),document.querySelector(".team").style.animation="text 2500ms linear alternate 2500ms",document.addEventListener("keydown",f),c.footerBackDrop.addEventListener("click",f),c.footerCloseBtn.addEventListener("click",v)}))}catch(e){console.log(e)}finally{(0,u.spinnerStop)()}function g(e){var t=document.querySelector(".js-title-queue"),r=document.querySelector(".js-library-bg-image"),n=document.querySelector("main");e.length>0&&(t.classList.add("visually-hidden"),r.classList.add("visually-hidden"),n.classList.remove("perspective")),0===e.length&&(t.classList.remove("visually-hidden"),r.classList.remove("visually-hidden"),n.classList.add("perspective"))}function y(){return k.apply(this,arguments)}function k(){return k=e(o)(e(i).mark((function t(){var r;return e(i).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:c.library.innerHTML="",g(r=(0,p.get)(h.WATCH_KEY)),r.map((function(e){return e.id})).forEach(function(){var t=e(o)(e(i).mark((function t(r){var n,a;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.fetchMovieById(r);case 2:n=e.sent,(a=n.genres.map((function(e){return e.name}))).length>2&&a.splice(2,a.length-1,"Other"),0===a.length&&a.push("Other"),c.library.insertAdjacentHTML("beforeend",s(n,a.join(", "))),c.library.lastElementChild.setAttribute("data-status","watched");case 8:case"end":return e.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 5:case"end":return t.stop()}}),t)}))),k.apply(this,arguments)}function b(){return b=e(o)(e(i).mark((function t(){var r;return e(i).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:c.library.innerHTML="",g(r=(0,p.get)(h.QUEUE_KEY)),r.map((function(e){return e.id})).forEach(function(){var t=e(o)(e(i).mark((function t(r){var n,a;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.fetchMovieById(r);case 2:n=e.sent,(a=n.genres.map((function(e){return e.name}))).length>2&&a.splice(2,a.length-1,"Other"),0===a.length&&a.push("Other"),c.library.insertAdjacentHTML("beforeend",s(n,a.join(", "))),c.library.lastElementChild.setAttribute("data-status","queue");case 8:case"end":return e.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 5:case"end":return t.stop()}}),t)}))),b.apply(this,arguments)}function _(){return(_=e(o)(e(i).mark((function t(r){var n,a;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.target.closest(".gallery__item"),e.prev=1,(0,u.spinnerPlay)(),a=n.dataset.id,n.dataset.status,e.next=7,h.fetchMovieById(a).then((function(e){var t=e.poster_path?"https://image.tmdb.org/t/p/w300".concat(e.poster_path):"https://astoriamuseums.org/wp-content/uploads/2020/10/OFM-poster-not-available.png",r=new Date(Date.parse(e.release_date)).getFullYear(),a={id:e.id,poster:t,title:e.title,originalTitle:e.original_title,genres:[],popularity:e.popularity.toFixed(1),overview:e.overview,vote_average:e.vote_average.toFixed(1),vote_count:e.vote_count,release_date:r};e.genres.forEach((function(e){a.genres.push(e.name)})),a.genres=a.genres.join(", "),(0,d.createModalMarkUp)(a);var o=document.querySelector(".lightbox-modal__watched-button"),i=document.querySelector(".lightbox-modal__queque-button");L(h.WATCH_KEY,a,o,"Remove from Watched",(function(e){var t=e.target.dataset.btn;"watched"===e.target.dataset.list&&((0,p.removeLocal)(h.WATCH_KEY,t),n.remove(),e.target.textContent="Removed from Watched",e.target.disabled=!0)}),"watched"),L(h.QUEUE_KEY,a,i,"Remove from Queque",(function(e){var t=e.target.dataset.btn;"queue"===e.target.dataset.list&&((0,p.removeLocal)(h.QUEUE_KEY,t),n.remove(),e.target.textContent="Removed from Queque",e.target.disabled=!0)}),"queue")}));case 7:e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),console.log(e.t0);case 12:return e.prev=12,(0,u.spinnerStop)(),e.finish(12);case 15:case"end":return e.stop()}}),t,null,[[1,9,12,15]])})))).apply(this,arguments)}function L(e,t,r,n,a,o){var i=(0,p.get)(e),c=t,s=i.find((function(e){return e.id===c.id}));s&&(r.dataset.list="".concat(o),r.textContent="".concat(n),r.addEventListener("click",a)),s||r.classList.add("visually-hidden")}c.watchBtn.addEventListener("click",y),c.queueBtn.addEventListener("click",(function(){return b.apply(this,arguments)})),c.library.addEventListener("click",(function(e){return _.apply(this,arguments)}));var w="light-theme",E="dark-theme",q="themeKeyLibrary",S=document.querySelector(".library-theme-switch__toggle"),x=document.querySelector(".cloak");S.addEventListener("change",(function(e){e.target.checked?(x.classList.add("cloak--dark"),localStorage.setItem(q,JSON.stringify(E))):(x.classList.remove("cloak--dark"),localStorage.setItem(q,JSON.stringify(w)))})),function(){var e=localStorage.getItem(q);if(e){var t=JSON.parse(e);"dark-theme"===t&&(x.classList.add("cloak--dark"),S.checked=!0),"light-theme"===t&&(x.classList.remove("cloak--dark"),S.checked=!1)}else x.classList.remove("cloak--dark"),localStorage.setItem(q,JSON.stringify(w)),S.checked=!1}()}();
//# sourceMappingURL=library.e511b8fc.js.map
