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

var myArr = document.querySelectorAll(".slider-pictures img");




/* <div class="spaces-available">

  <div class="space-heading">
    <h2>Spaces</h2>
    <p>Choose from our offerings of  hot seat, private office space, virtual office space and  conference rooms.</p>
  </div>

   <div class="slider-pictures">
    <img src="./assets/space-slider/1.jpeg" alt="" srcset="">
    <img src="./assets/space-slider/2.jpeg" alt="" srcset="">
  </div>

</div> */
