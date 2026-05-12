// Path where your gallery images are stored
const folderPath = "images/gallery/";
let imageIndex = 1; // Always start by looking for 1.jpg

function loadNextImage() {
    const galleryContainer = document.getElementById("photo-gallery");
    
    // Create an image object in memory to test if the file exists on the server
    const imgTest = new Image();
    imgTest.src = `${folderPath}${imageIndex}.jpg`;

    // If the image is successfully found...
    imgTest.onload = function() {
        // Create the protective div wrapper for masonry styling
        const itemDiv = document.createElement("div");
        itemDiv.className = "gallery-item";

        // Create the actual <img> tag for the HTML page
        const imgElement = document.createElement("img");
        imgElement.src = this.src;
        imgElement.alt = `Academic moment ${imageIndex} - Saad Ahmed`;
        imgElement.loading = "lazy"; // Prevents the page from lagging if you have lots of photos

        // Place the image on the screen
        itemDiv.appendChild(imgElement);
        galleryContainer.appendChild(itemDiv);

        // Move to the next number (e.g., from 1 to 2) and loop the function
        imageIndex++;
        loadNextImage(); 
    };

    // If the image is NOT found (meaning we reached the end of your uploads)
    imgTest.onerror = function() {
        console.log(`Gallery finished loading. Displayed ${imageIndex - 1} images.`);
    };
}

// Start the loading sequence as soon as the Gallery page is opened
window.onload = loadNextImage;