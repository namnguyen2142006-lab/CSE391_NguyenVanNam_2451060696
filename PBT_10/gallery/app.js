const gallery = document.querySelector("#gallery");
const loading = document.querySelector("#loading");
const loadTrigger = document.querySelector("#load-trigger");

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const closeLightbox = document.querySelector("#closeLightbox");

let page = 1;
let isLoading = false;

function showLoading() {
  loading.classList.remove("hidden");
}

function hideLoading() {
  loading.classList.add("hidden");
}

async function loadMorePhotos() {
  if (isLoading) return;

  try {
    isLoading = true;
    showLoading();

    const response = await fetch(
      "https://picsum.photos/v2/list?page=" + page + "&limit=20",
    );

    if (!response.ok) {
      throw new Error("Không tải được ảnh");
    }

    const photos = await response.json();

    renderPhotos(photos);

    page++;
  } catch (error) {
    alert("Lỗi: " + error.message);
  } finally {
    isLoading = false;
    hideLoading();
  }
}

function renderPhotos(photos) {
  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];

    const card = document.createElement("div");
    card.classList.add("photo-card");

    const img = document.createElement("img");
    img.dataset.src = photo.download_url;
    img.src = "";
    img.alt = "Photo by " + photo.author;

    card.appendChild(img);
    gallery.appendChild(card);

    lazyImageObserver.observe(img);
  }
}

const lazyImageObserver = new IntersectionObserver(function (
  entries,
  observer,
) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});

const scrollObserver = new IntersectionObserver(function (entries) {
  if (entries[0].isIntersecting) {
    loadMorePhotos();
  }
});

scrollObserver.observe(loadTrigger);

gallery.addEventListener("click", function (e) {
  const img = e.target.closest("img");

  if (!img) return;

  lightboxImage.src = img.src;
  lightbox.classList.remove("hidden");
});

closeLightbox.addEventListener("click", function () {
  lightbox.classList.add("hidden");
});

lightbox.addEventListener("click", function (e) {
  if (e.target === lightbox) {
    lightbox.classList.add("hidden");
  }
});

loadMorePhotos();
