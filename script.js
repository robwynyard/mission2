console.log(`Connected Yah,Yah,Yah`);

// ----------------------------- Background Slide -------------------------- //

const images = [
  "/images/background1.jpg",
  "/images/background2.jpg",
  "/images/background3.jpg",
  "/images/background4.jpg",
];

let currentIndex = 0;
let bg1 = document.getElementById("bg1");
let bg2 = document.getElementById("bg2");
let isBg1Visible = true;

function changeBackground() {
  let nextImage = images[currentIndex];

  if (isBg1Visible) {
    bg2.style.backgroundImage = `url(${nextImage})`;
    bg2.style.opacity = 1;
    bg1.style.opacity = 0;
  } else {
    bg1.style.backgroundImage = `url(${nextImage})`;
    bg1.style.opacity = 1;
    bg2.style.opacity = 0;
  }

  isBg1Visible = !isBg1Visible;
  currentIndex = (currentIndex + 1) % images.length;
}

bg1.style.backgroundImage = `url(${images[0]})`;

setInterval(changeBackground, 10000);

// ------------------------------- Nav Bar Fade to Fixed ---------------------- //

const navbar = document.querySelector("#main-nav");
const viewWorkButton = document.querySelector("button");

function handleScroll() {
  if (window.scrollY > viewWorkButton.offsetTop) {
    navbar.classList.add("fixed-navbar");
  } else {
    navbar.classList.remove("fixed-navbar");
  }
}

window.addEventListener("scroll", handleScroll);

// ----------------------------- Navbar Scroll Offset ------------------------///

const offset = 200;

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    window.scrollTo({
      top: targetElement.offsetTop - offset,
      behavior: "smooth",
    });
  });
});

//  --------------------- Gallery Modal ------------------------------------- //

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const closeBtn = document.querySelector(".close");
  const galleryItems = document.querySelectorAll(".gallery-item");
  let currentImageIndex = 0;

  // Add click event to each gallery-item image
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      modal.style.display = "flex";
      modalImage.src = this.querySelector("img").src;
      currentImageIndex = index;
    });
  });

  // Close modal when clicking on close button
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Close modal when clicking outside the image
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Event Listener for using the arrow keys and the esc key
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      modal.style.display = "none";
    } else if (e.key === "ArrowRight") {
      showNextImage();
    } else if (e.key === "ArrowLeft") {
      showPrevImage();
    }
  });

  // Function to show the next image
  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
    modalImage.src = galleryItems[currentImageIndex].querySelector("img").src;
  }

  // Function to show the previous image
  function showPrevImage() {
    currentImageIndex =
      (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    modalImage.src = galleryItems[currentImageIndex].querySelector("img").src;
  }
});
