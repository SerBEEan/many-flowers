'use strict'

const   sm = 576,
        md = 765,
        lg = 960,
        xl = 1200;

// window.addEventListener('resize', function () {
//     let nav = document.querySelector('#navbar');
//     let burger = document.querySelector('#button');
//     let parent = burger.parentNode;          //header-items
//
//     if (window.innerWidth <= md) {
//         nav.parentNode.removeChild(nav);
//         parent.parentNode.appendChild(nav);
//     }
//     else {
//         nav.parentNode.removeChild(nav);
//         parent.insertBefore(nav, burger);
//     }
// });

//Нажатие на бургер
document.querySelector('.burger').addEventListener('click', function (ev) {
    this.classList.toggle('action');
    document.querySelector('.navbar').classList.toggle('show');
});

//copyright
if ( new Date().getFullYear() !== 2020 ) {
    document.querySelector('#copy').innerText = `-${new Date().getFullYear()}`;
}

//preloader
window.onload = function () {
    setTimeout(function () {
        document.querySelector('#container-load').classList.add('finishLoad');
        setTimeout(function () {
            document.querySelector('#preloader').classList.add('hide');
            //document.querySelector('body').classList.remove('overflow');
        }, 100);
    }, 1000);
}
