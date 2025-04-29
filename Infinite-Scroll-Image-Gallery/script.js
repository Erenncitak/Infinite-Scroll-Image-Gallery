const count = 30;
const apiKey = 'P-2Jc9gTMyWPXGjCJE7pUzTgN0fyc1wKopoT1rjQ5Ao';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const imageContainer = document.getElementById('imageDiv');
const loader = document.getElementById('loading');

let imagesArray = [];
let isDownloaded=false;
let imagesLoaded = 0;
let totalImages = 0;


getImages();
async function getImages() {
    try {
        const response = await fetch(apiUrl);
        imagesArray = await response.json();
        // console.log(imagesArray);
        displayImages();
    }
    catch (error) {
    }
}

function displayImages() {
    imagesLoaded = 0;
    totalImages = imagesArray.length;
    imagesArray.forEach((image) => {
        const item = document.createElement('a');
        setAttribute(item, { href: image.urls.regular });
        // item.setAttribute('href', image.urls.regular);
        const img = document.createElement('img');
        // img.setAttribute('src', image.urls.regular);
        // img.setAttribute('alt', image.alt_description);
        setAttribute(img, {
            src: image.urls.regular,
            alt: image.alt_description,
        });
        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        isDownloaded = true;
        loader.hidden = true;
    }
}

function setAttribute(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

window.addEventListener('scroll', () => {
    // console.log("Tetiklendi");
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && isDownloaded) {
        getImages();
    }
});
