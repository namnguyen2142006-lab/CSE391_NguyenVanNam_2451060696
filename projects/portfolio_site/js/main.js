const skillBars = document.querySelectorAll(".skill-progress");

function animateSkills() {
  skillBars.forEach((bar) => {
    const barTop = bar.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (barTop < windowHeight - 50) {
      bar.classList.add("animate");
    }
  });
}

window.addEventListener("scroll", animateSkills);

animateSkills();
