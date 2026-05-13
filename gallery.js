/**
 * Saad Ahmed - Gallery Script
 * Handles sequential loading of images from images/gallery/
 * Supports .jpg, .jpeg, and .png extensions automatically.
 */

const folderPath = "images/gallery/";
const extensions = ["jpg", "jpeg", "png"];
let imageIndex = 1; // Start with image 1

/**
 * Main function to start/continue the loading process
 */
function loadNextImage() {
    // Start by trying the first extension for the current index
    tryExtension(0);
}

/**
 * Recursive function to test different file extensions for a single number
 * @param {number} extIndex - The index of the extension array we are currently testing
 */
function tryExtension(extIndex) {
    const galleryContainer = document.getElementById("photo-gallery");

    // If we have tried ALL extensions (jpg, jpeg, png) for this number and none worked:
    // It means we have reached the end of your gallery.
    if (extIndex >= extensions.length) {
        console.log(`✅ Gallery loading complete. Total images found: ${imageIndex - 1}`);
        return;
    }

    const currentExt = extensions[extIndex];
    const imgTest = new Image();
    imgTest.src = `${folderPath}${imageIndex}.${currentExt}`;

    // SUCCESS: The image exists!
    imgTest.onload = function() {
        // 1. Create the wrapper div
        const itemDiv = document.createElement("div");
        itemDiv.className = "gallery-item";

        // 2. Create the image element
        const imgElement = document.createElement("img");
        imgElement.src = this.src;
        imgElement.alt = `Academic moment ${imageIndex}`;
        imgElement.loading = "lazy"; // Better performance

        // 3. Append to the page
        itemDiv.appendChild(imgElement);
        galleryContainer.appendChild(itemDiv);

        // 4. Move to the next number and start checking from the first extension again
        imageIndex++;
        loadNextImage();
    };

    // FAIL: This specific file extension doesn't exist
    imgTest.onerror = function() {
        // Try the next extension in the list (e.g., if .jpg fails, try .jpeg)
        tryExtension(extIndex + 1);
    };
}

// Initialize the gallery as soon as the page loads
window.addEventListener("DOMContentLoaded", () => {
    loadNextImage();
});