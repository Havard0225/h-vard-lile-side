const closeButton = document.querySelector('.close-nav');
const openButton = document.querySelector('.open-nav');
const nav = document.querySelector('.nav');

closeButton.addEventListener("click", () => {
    nav.classList.remove('navigation-open');
}); 

openButton.addEventListener("click", () => {
    nav.classList.add('navigation-open');
}); 


document.addEventListener("DOMContentLoaded", () => {
    const page = window.location.pathname;
  
    if (page.includes('filmer.html')) {
      setupPage('film');
    } else if (page.includes('serier.html')) {
      setupPage('serie');
    } else if (page.includes('brainrott.html')) {
      setupPage('chill');
    }
  });

  const faders = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

faders.forEach(fader => fadeObserver.observe(fader));

const themeToggle = document.getElementById("toggle-theme");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.checked = true;
}

themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
});


  