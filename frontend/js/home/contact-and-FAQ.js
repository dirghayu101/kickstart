//accordion for faqs - home page
const accordion = document.getElementsByClassName('faqs-container');

for (i=0; i<accordion.length; i++) {
  accordion[i].addEventListener('click', function () {
    this.classList.toggle('active')
  })
}
