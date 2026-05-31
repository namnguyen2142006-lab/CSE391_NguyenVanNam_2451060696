const images = [
  { src: "https://picsum.photos/800/500?random=1", title: "Ảnh 1" },
  { src: "https://picsum.photos/800/500?random=2", title: "Ảnh 2" },
  { src: "https://picsum.photos/800/500?random=3", title: "Ảnh 3" },
  { src: "https://picsum.photos/800/500?random=4", title: "Ảnh 4" },
  { src: "https://picsum.photos/800/500?random=5", title: "Ảnh 5" },
  { src: "https://picsum.photos/800/500?random=6", title: "Ảnh 6" },
  { src: "https://picsum.photos/800/500?random=7", title: "Ảnh 7" },
  { src: "https://picsum.photos/800/500?random=8", title: "Ảnh 8" },
  { src: "https://picsum.photos/800/500?random=9", title: "Ảnh 9" },
];

const commands = [
  { name: "Next image", action: nextImage },
  { name: "Previous image", action: prevImage },
  { name: "Play slideshow", action: playSlideshow },
  { name: "Pause slideshow", action: pauseSlideshow },
  { name: "Open modal", action: openModal },
  { name: "Close modal", action: closeModal },
];

const galleryImage = document.querySelector("#galleryImage");
const imageCaption = document.querySelector("#imageCaption");

const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const playBtn = document.querySelector("#playBtn");
const openModalBtn = document.querySelector("#openModalBtn");

const imageModal = document.querySelector("#imageModal");
const modalImage = document.querySelector("#modalImage");
const closeModalBtn = document.querySelector("#closeModalBtn");

const openPaletteBtn = document.querySelector("#openPaletteBtn");
const paletteOverlay = document.querySelector("#paletteOverlay");
const commandInput = document.querySelector("#commandInput");
const commandList = document.querySelector("#commandList");

let currentIndex = 0;
let isPlaying = false;
let slideTimer = null;
let filteredCommands = commands;
let activeCommandIndex = 0;

function renderImage() {
  galleryImage.src = images[currentIndex].src;
  galleryImage.alt = images[currentIndex].title;
  imageCaption.textContent =
    images[currentIndex].title + " / Nhấn số " + (currentIndex + 1);
}

function nextImage() {
  currentIndex++;

  if (currentIndex >= images.length) {
    currentIndex = 0;
  }

  renderImage();
}

function prevImage() {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }

  renderImage();
}

function goToImage(index) {
  if (index >= 0 && index < images.length) {
    currentIndex = index;
    renderImage();
  }
}

function playSlideshow() {
  if (isPlaying === true) {
    return;
  }

  isPlaying = true;
  playBtn.textContent = "Pause";

  slideTimer = setInterval(function () {
    nextImage();
  }, 1200);
}

function pauseSlideshow() {
  isPlaying = false;
  playBtn.textContent = "Play";
  clearInterval(slideTimer);
}

function toggleSlideshow() {
  if (isPlaying === true) {
    pauseSlideshow();
  } else {
    playSlideshow();
  }
}

function openModal() {
  modalImage.src = images[currentIndex].src;
  modalImage.alt = images[currentIndex].title;
  imageModal.classList.remove("hidden");
  closeModalBtn.focus();
}

function closeModal() {
  imageModal.classList.add("hidden");
  openModalBtn.focus();
}

function openPalette() {
  paletteOverlay.classList.remove("hidden");
  commandInput.value = "";
  filteredCommands = commands;
  activeCommandIndex = 0;
  renderCommands();
  commandInput.focus();
}

function closePalette() {
  paletteOverlay.classList.add("hidden");
  openPaletteBtn.focus();
}

function renderCommands() {
  commandList.textContent = "";

  for (let i = 0; i < filteredCommands.length; i++) {
    const li = document.createElement("li");
    li.classList.add("command-item");

    if (i === activeCommandIndex) {
      li.classList.add("active");
    }

    li.textContent = filteredCommands[i].name;
    li.dataset.index = i;

    commandList.appendChild(li);
  }
}

function filterCommands() {
  const keyword = commandInput.value.toLowerCase();

  filteredCommands = commands.filter((command) =>
    command.name.toLowerCase().includes(keyword),
  );

  activeCommandIndex = 0;
  renderCommands();
}

function runActiveCommand() {
  if (filteredCommands.length === 0) {
    return;
  }

  const command = filteredCommands[activeCommandIndex];
  closePalette();
  command.action();
}

prevBtn.addEventListener("click", prevImage);
nextBtn.addEventListener("click", nextImage);
playBtn.addEventListener("click", toggleSlideshow);
openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
openPaletteBtn.addEventListener("click", openPalette);

commandInput.addEventListener("input", filterCommands);

commandInput.addEventListener("keydown", function (e) {
  if (e.key === "ArrowDown") {
    e.preventDefault();

    if (activeCommandIndex < filteredCommands.length - 1) {
      activeCommandIndex++;
    }

    renderCommands();
  }

  if (e.key === "ArrowUp") {
    e.preventDefault();

    if (activeCommandIndex > 0) {
      activeCommandIndex--;
    }

    renderCommands();
  }

  if (e.key === "Enter") {
    e.preventDefault();
    runActiveCommand();
  }

  if (e.key === "Escape") {
    closePalette();
  }
});

commandList.addEventListener("click", function (e) {
  const item = e.target.closest(".command-item");

  if (!item) {
    return;
  }

  activeCommandIndex = Number(item.dataset.index);
  runActiveCommand();
});

document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key.toLowerCase() === "k") {
    e.preventDefault();
    openPalette();
    return;
  }

  if (!paletteOverlay.classList.contains("hidden")) {
    return;
  }

  if (e.key === "ArrowRight") {
    nextImage();
  }

  if (e.key === "ArrowLeft") {
    prevImage();
  }

  if (e.key >= "1" && e.key <= "9") {
    goToImage(Number(e.key) - 1);
  }

  if (e.code === "Space") {
    e.preventDefault();
    toggleSlideshow();
  }

  if (e.key === "Escape") {
    if (!imageModal.classList.contains("hidden")) {
      closeModal();
    }
  }
});

imageModal.addEventListener("click", function (e) {
  if (e.target === imageModal) {
    closeModal();
  }
});

renderImage();
