// =====================
// Navigasjon
// =====================
const closeButton = document.querySelector('.close-nav');
const openButton = document.querySelector('.open-nav');
const nav = document.querySelector('.nav');

closeButton?.addEventListener("click", () => {
  nav.classList.remove('navigation-open');
});
openButton?.addEventListener("click", () => {
  nav.classList.add('navigation-open');
});

// =====================
// Fade-in ved scroll
// =====================
const faders = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

faders.forEach(fader => fadeObserver.observe(fader));

// =====================
// Dark Mode Toggle
// =====================
const themeToggle = document.getElementById("toggle-theme");
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.checked = true;
}

themeToggle?.addEventListener("change", () => {
  if (themeToggle.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
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

// =====================
//      karusell
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const certImgs = document.querySelectorAll(".cert-img");
  const track = document.querySelector(".carousel-track");
  const dotsContainer = document.querySelector(".carousel-dots");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  if (!certImgs.length || !track) return;

  let currentIndex = 0;
  let intervalId;
  function showSlide(index) {
    const total = certImgs.length;
    const isSmallScreen = window.innerWidth <= 768; // Sett grense for små skjermer
  
    certImgs.forEach((img) => {
      img.classList.remove("active", "prev", "next");
      img.style.display = "none";
    });
  
    if (isSmallScreen) {
      // Kun aktivt bilde
      certImgs[index].classList.add("active");
      certImgs[index].style.display = "block";
    } else {
      // Full visning med prev/next
      const prevIndex = (index - 1 + total) % total;
      const nextIndex = (index + 1) % total;
  
      certImgs[prevIndex].classList.add("prev");
      certImgs[prevIndex].style.display = "block";
  
      certImgs[index].classList.add("active");
      certImgs[index].style.display = "block";
  
      certImgs[nextIndex].classList.add("next");
      certImgs[nextIndex].style.display = "block";
    }
  
    currentIndex = index;
    updateDots();
  }
  
  // 🎯 Klikk på bilder for å bytte (kun på store skjermer)
  certImgs.forEach((img, index) => {
    img.addEventListener("click", () => {
      if (window.innerWidth > 768) { // Kun stor skjerm
        showSlide(index);
        resetAutoPlay();
      }
    });
  });
  
  // 🎯 Lytt til resize for å oppdatere visning
  window.addEventListener("resize", () => {
    showSlide(currentIndex);
    updateNavButtons();
  });
  
  // === Piler for små skjermer ===
  function updateNavButtons() {
    const isSmallScreen = window.innerWidth <= 768;
    if (isSmallScreen) {
      prevBtn.style.display = "block";
      nextBtn.style.display = "block";
    } else {
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
    }
  }
  
  updateNavButtons(); // Kjør ved start
  
  
  

  function showNext() {
    const nextIndex = (currentIndex + 1) % certImgs.length;
    showSlide(nextIndex);
  }

  function showPrev() {
    const prevIndex = (currentIndex - 1 + certImgs.length) % certImgs.length;
    showSlide(prevIndex);
  }

  // Dot-indikatorer
  function updateDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = "";
    certImgs.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.classList.add("carousel-dot");
      if (index === currentIndex) dot.classList.add("active");
      dot.addEventListener("click", () => {
        showSlide(index);
        resetAutoPlay();
      });
      dotsContainer.appendChild(dot);
    });
  }


  function startAutoPlay() {
    intervalId = setInterval(showNext, 5000);
  }

  function resetAutoPlay() {
    clearInterval(intervalId);
    startAutoPlay();
  }

  
  let startX = 0;
  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });
  track.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
      showNext();
      resetAutoPlay();
    } else if (endX - startX > 50) {
      showPrev();
      resetAutoPlay();
    }
  });


  nextBtn?.addEventListener("click", () => {
    showNext();
    resetAutoPlay();
  });
  prevBtn?.addEventListener("click", () => {
    showPrev();
    resetAutoPlay();
  });


  showSlide(currentIndex);
  startAutoPlay();
});
