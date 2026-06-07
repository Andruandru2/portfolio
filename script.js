document.addEventListener("DOMContentLoaded", function () {

  // ── Mobile menu toggle ──
  const menuToggle = document.getElementById("menuToggle");
  const navLinks   = document.getElementById("navLinks");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => navLinks.classList.toggle("active"));
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => navLinks.classList.remove("active"));
    });
  }

  // ── Helper ──
  function isInViewport(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.92 && rect.bottom >= 0;
  }

  // ────────────────────────────────────────
  // PARTICLE CANVAS
  // ────────────────────────────────────────
  const canvas = document.getElementById("particleCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    let W, H;

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", () => { resize(); initParticles(); });

    function initParticles() {
      particles = [];
      const count = Math.floor((W * H) / 14000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x:  Math.random() * W,
          y:  Math.random() * H,
          r:  Math.random() * 1.5 + 0.5,
          dx: (Math.random() - 0.5) * 0.35,
          dy: (Math.random() - 0.5) * 0.35,
          o:  Math.random() * 0.4 + 0.1
        });
      }
    }
    initParticles();

    function drawParticles() {
      ctx.clearRect(0, 0, W, H);
      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,188,212,${0.08 * (1 - dist/120)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      // Draw dots
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,188,212,${p.o})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > W) p.dx *= -1;
        if (p.y < 0 || p.y > H) p.dy *= -1;
      });
      requestAnimationFrame(drawParticles);
    }
    drawParticles();
  }

  // ────────────────────────────────────────
  // STAT COUNTERS
  // ────────────────────────────────────────
  const statsRow = document.querySelector(".stats-row");
  let statsDone = false;

  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-target"));
    const duration = 1600;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current);
    }, 16);
  }

  function handleStatsScroll() {
    if (!statsDone && statsRow && isInViewport(statsRow)) {
      document.querySelectorAll(".stat-number").forEach(el => animateCounter(el));
      statsDone = true;
    }
  }
  window.addEventListener("scroll", handleStatsScroll);
  handleStatsScroll();

  // ────────────────────────────────────────
  // ABOUT SECTION ANIMATION
  // ────────────────────────────────────────
  const aboutSection = document.querySelector(".about-me");
  const aboutImage   = document.querySelector(".about-image");
  const aboutLine    = document.querySelector(".about-line");
  let aboutDone = false;

  function handleAboutScroll() {
    if (!aboutDone && isInViewport(aboutSection)) {
      setTimeout(() => { if (aboutLine)  aboutLine.classList.add("animate"); }, 50);
      setTimeout(() => { if (aboutImage) aboutImage.classList.add("animate"); }, 100);
      aboutDone = true;
    }
  }
  window.addEventListener("scroll", handleAboutScroll);
  handleAboutScroll();

  // ────────────────────────────────────────
  // EDUCATION TIMELINE ANIMATION
  // ────────────────────────────────────────
  const educationContent = document.querySelector(".education-content");
  let eduDone = false;

  function handleEducationScroll() {
    if (!eduDone && isInViewport(educationContent)) {
      setTimeout(() => educationContent.classList.add("animate"), 50);
      eduDone = true;
    }
  }
  window.addEventListener("scroll", handleEducationScroll);
  handleEducationScroll();

  // ────────────────────────────────────────
  // EXPERIENCE TIMELINE ANIMATION
  // ────────────────────────────────────────
  const experienceSection = document.querySelector(".experience-content");
  let expDone = false;

  function handleExperienceScroll() {
    if (!expDone && isInViewport(experienceSection)) {
      setTimeout(() => experienceSection.classList.add("animate"), 50);
      expDone = true;
    }
  }
  window.addEventListener("scroll", handleExperienceScroll);
  handleExperienceScroll();

  // ────────────────────────────────────────
  // SCROLL REVEAL (cards)
  // ────────────────────────────────────────
  const revealEls = document.querySelectorAll(".reveal");

  function handleReveal() {
    revealEls.forEach((el, i) => {
      if (isInViewport(el) && !el.classList.contains("visible")) {
        const delay = (i % 3) * 80;
        setTimeout(() => el.classList.add("visible"), delay);
      }
    });
  }
  window.addEventListener("scroll", handleReveal);
  handleReveal();

  // ────────────────────────────────────────
  // SHOW MORE / LESS PROJECTS
  // ────────────────────────────────────────
  const showMoreBtn     = document.getElementById("showMoreBtn");
  const otherProjects   = document.getElementById("otherProjects");

  if (showMoreBtn && otherProjects) {
    showMoreBtn.addEventListener("click", () => {
      const isExpanded = otherProjects.classList.contains("expanded");
      if (!isExpanded) {
        otherProjects.classList.add("expanded");
        showMoreBtn.innerHTML = 'Show Less <span class="show-more-arrow">↓</span>';
        showMoreBtn.classList.add("active");
        // Trigger reveal on newly visible cards
        setTimeout(handleReveal, 100);
      } else {
        otherProjects.classList.remove("expanded");
        showMoreBtn.innerHTML = 'View All 6 Projects <span class="show-more-arrow">↓</span>';
        showMoreBtn.classList.remove("active");
      }
    });
  }

  // ────────────────────────────────────────
  // ACTIVE NAV ON SCROLL
  // ────────────────────────────────────────
  const sections   = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a");

  function updateActiveNav() {
    let current = "";
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 80) current = sec.getAttribute("id");
    });
    navAnchors.forEach(a => {
      a.classList.remove("active");
      if (a.getAttribute("href") === "#" + current) a.classList.add("active");
    });
  }
  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();

  // ────────────────────────────────────────
  // CONTACT SECTION UNDERLINE
  // ────────────────────────────────────────
  const contactSection = document.querySelector(".contact");
  if (contactSection) {
    new IntersectionObserver((entries) => {
      entries.forEach(e => contactSection.classList.toggle("in-view", e.isIntersecting));
    }, { threshold: 0.3 }).observe(contactSection);
  }

});