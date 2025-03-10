document.addEventListener("DOMContentLoaded", function () {
  // Helper Function: Check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
  }

  // About Section Animation
  const aboutSection = document.querySelector(".about-me");
  const aboutImage = document.querySelector(".about-image");
  const aboutLine = document.querySelector(".about-line");
  let aboutAnimationTriggered = false;

  function handleAboutScroll() {
    if (isInViewport(aboutSection) && !aboutAnimationTriggered) {
      aboutImage.classList.add("animate");
      aboutLine.classList.add("animate");
      aboutAnimationTriggered = true; // Prevent re-triggering
    }
  }

  // Add event listener for About Section
  window.addEventListener("scroll", handleAboutScroll);

  // Run once on load to check initial state for About Section
  handleAboutScroll();

  // Experience Section Animation
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom >= 0;
}

const experienceSection = document.querySelector(".experience-content");
const verticalLines = document.querySelectorAll(".vertical-l");
let experienceAnimationTriggered = false;

function handleExperienceScroll() {
  if (isInViewport(experienceSection) && !experienceAnimationTriggered) {
    verticalLines.forEach((line) => {
      line.classList.add("animate"); // Add animation class to each line
    });
    experienceAnimationTriggered = true; // Prevent re-triggering
  }
}

// Attach scroll event listener
window.addEventListener("scroll", handleExperienceScroll);

  // Add event listener for Experience Section
  window.addEventListener("scroll", handleExperienceScroll);

  // Run once on load to check initial state for Experience Section
  handleExperienceScroll();
});
document.addEventListener("DOMContentLoaded", () => {
  const skillsSection = document.querySelector(".skills-section");
  const progressBars = document.querySelectorAll(".progress");
  let skillsAnimationTriggered = false;

  function handleSkillsScroll() {
    if (isInViewport(skillsSection) && !skillsAnimationTriggered) {
      progressBars.forEach((bar) => {
        const width = bar.style.width;
        bar.style.width = "0"; // Start at 0
        setTimeout(() => {
          bar.style.width = width; // Animate to original width
        }, 200);
      });
      skillsAnimationTriggered = true;
    }
  }

  window.addEventListener("scroll", handleSkillsScroll);
  handleSkillsScroll(); // Run on load in case already in viewport
});



document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".projects-container");
  const leftArrow = document.querySelector(".arrow-left");
  const rightArrow = document.querySelector(".arrow-right");

  const scrollAmount = 350; // Adjust scroll distance

  function checkArrows() {
      if (container.scrollLeft <= 0) {
          leftArrow.style.opacity = "0.5"; // Fade left arrow when at the start
      } else {
          leftArrow.style.opacity = "1"; 
      }

      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
          rightArrow.style.opacity = "0.5"; // Fade right arrow when at the end
      } else {
          rightArrow.style.opacity = "1";
      }
  }

  rightArrow.addEventListener("click", () => {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkArrows, 500);
  });

  leftArrow.addEventListener("click", () => {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      setTimeout(checkArrows, 500);
  });

  // Initial check
  checkArrows();
});
document.addEventListener("DOMContentLoaded", () => {
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(card => {
        card.addEventListener("click", () => {
            // Remove 'active' class from all other cards
            projectCards.forEach(c => c.classList.remove("active"));
            
            // Toggle active class on clicked card
            card.classList.toggle("active");
        });
    });
});



document.addEventListener("DOMContentLoaded", function () {
  const contactSection = document.querySelector(".contact");

  const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
          if (entry.isIntersecting) {
              contactSection.classList.add("in-view");
          } else {
              contactSection.classList.remove("in-view");
          }
      });
  }, { threshold: 0.5 });

  observer.observe(contactSection);
});


