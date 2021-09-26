const galleryItems = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

const paletteContainer = document.querySelector(".js-gallery");
const lightboxModal = document.querySelector(".js-lightbox");
const closeLightboxModal = document.querySelector(
  '[data-action="close-lightbox"]'
);
const lightboxImage = document.querySelector(".lightbox__image");
const overlay = document.querySelector(".lightbox__overlay");
const leftBtn = document.querySelector(".left");
const rightBtn = document.querySelector(".right");
const galleryMarkup = createPicturesCardsMarkup(galleryItems);
const dataSources = [];

paletteContainer.addEventListener("click", onOpenLightbox);
closeLightboxModal.addEventListener("click", onCloseLightbox);
overlay.addEventListener("click", onBackdropClick);
leftBtn.addEventListener("click", onLeftBtnClick);
rightBtn.addEventListener("click", onRightBtnClick);

paletteContainer.insertAdjacentHTML("beforeend", galleryMarkup);

function createPicturesCardsMarkup(pictures) {
  return pictures
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
    <a class="gallery__link">
    <img class="gallery__image" data-source="${original}" src="${preview}" alt="${description}" />
    </a>
    </li>
    `;
    })
    .join("");
}

function onOpenLightbox(evt) {
  window.addEventListener("keydown", onEscKeyPress);
  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }
  lightboxModal.classList.add("is-open");
  lightboxImage.src = evt.target.dataset.source;
  lightboxImage.alt = evt.target.alt;
}

function onCloseLightbox(evt) {
  window.removeEventListener("keydown", onEscKeyPress);
  lightboxModal.classList.remove("is-open");
  lightboxImage.src = "";
}

galleryItems.map((picture) => {
  return dataSources.push(picture.original);
});

document.addEventListener("keydown", onKeydown);

function onKeydown(evt) {
  const currentIndex = dataSources.indexOf(lightboxImage.src);
  if (evt.key === "ArrowLeft") {
    leftClick(currentIndex);
  } else if (evt.key === "ArrowRight") {
    rightClick(currentIndex);
  }
}

function onRightBtnClick (evt) {
  const currentIndex = dataSources.indexOf(lightboxImage.src);
  let nextIndex = currentIndex + 1;
  if (nextIndex === dataSources.length) {
    nextIndex = 0;
  }
  lightboxImage.src = dataSources[nextIndex];
}

function onLeftBtnClick (evt) {
  const currentIndex = dataSources.indexOf(lightboxImage.src);
  let nextIndex = currentIndex - 1;
  if (nextIndex === -1) {
    nextIndex = dataSources.length - 1;
  }
  lightboxImage.src = dataSources[nextIndex];
}

function leftClick(currentIndex) {
  let nextIndex = currentIndex - 1;
  if (nextIndex === -1) {
    nextIndex = dataSources.length - 1;
  }
  lightboxImage.src = dataSources[nextIndex];
}

function rightClick(currentIndex) {
  let nextIndex = currentIndex + 1;
  if (nextIndex === dataSources.length) {
    nextIndex = 0;
  }
  lightboxImage.src = dataSources[nextIndex];
}

function onBackdropClick(evt) {
  if (evt.currentTarget === evt.target) {
    onCloseLightbox();
  }
}

function onEscKeyPress(evt) {
  if (evt.code === "Escape") {
    onCloseLightbox();
  }
}
