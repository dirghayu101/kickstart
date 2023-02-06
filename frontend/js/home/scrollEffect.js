var nav = document.querySelector('nav');

window.addEventListener('scroll', function () {
        if (window.pageYOffset > 100) {
            nav.classList.add('scroll-bg');
        } else {
            nav.classList.remove('scroll-bg');
        }
    }
);