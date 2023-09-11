// @Unsplash Api
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
const apiKey = "6WoBj1YN4a_nhK9JL54GkmTnPWV1YtwO5CTWuGXQT3I";
let count = 5;

let ready = false;
let photosArray = [];
let imagesLoaded = 0;
let totalImages = 0;

let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
  }
}

// ^ Create  helper funnction for repeating set attributes.

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// ^Create elements for links and photos, add to Dom

function displayPhotos() {
  imagesLoaded = 0; //^we again set it to 0 so that i counts again from 0 not from 31 so that the images loaded if condition is met.
  totalImages = photosArray.length;

  photosArray.forEach((photo) => {
    // ^ Create <a> to link to unsplash
    const item = document.createElement("a");
    // ^The below ones without helper function
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");

    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    //  ^Create <img> for photo.
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    // ^ Event Listener check when image is finished loading
    img.addEventListener("load", imageLoaded);

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // ^ Put img under item i.e and than anchor inside image container
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//! Get Photos from unsplash.

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log("error");
  }
}

// !Check to see if the scrolling is near the bottom of the page,load more photos;

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
