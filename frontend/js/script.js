// console.log("JS connected successfully!");

// function myFunction(){
//     let heroSection = document.getElementById("hero");
//     heroSection.classList.add("hero-1");
// }
// setTimeout(myFunction, 3000);

var nav = document.querySelector('nav');

window.addEventListener('scroll', function () {
        if (window.pageYOffset > 100) {
            nav.classList.add('scroll-bg');
        } else {
            nav.classList.remove('scroll-bg');
        }
    }
);